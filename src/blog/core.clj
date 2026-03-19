(ns blog.core
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [stasis.core :as stasis]
            [ring.adapter.jetty :as jetty]
            [ring.middleware.content-type :refer [wrap-content-type]]
            [blog.pages :as pages]))

(def posts-dir "posts")
(def public-dir "public")
(def assets-dir "assets")
(def static-dir "resources/public")

(defn- copy-dir
  "Recursively copies source dir into target dir."
  [src dest]
  (let [src-dir (io/file src)]
    (when (.isDirectory src-dir)
      (doseq [f (file-seq src-dir)
              :when (.isFile f)]
        (let [rel (.relativize (.toPath src-dir) (.toPath f))
              target (io/file dest (str rel))]
          (.mkdirs (.getParentFile target))
          (io/copy f target))))))

(defn build
  "Exports static site to public/."
  []
  (println "Building site...")
  (let [page-map (pages/get-pages posts-dir assets-dir)]
    ;; Export pages via Stasis
    (stasis/empty-directory! public-dir)
    (stasis/export-pages page-map public-dir)
    ;; Copy static resources (CSS, CNAME)
    (copy-dir static-dir public-dir)
    ;; Copy assets if they exist
    (copy-dir assets-dir (str public-dir "/assets"))
    (println (str "Built " (count page-map) " pages to " public-dir "/"))))

(defn- wrap-static-dirs
  "Serves static files from specific directories that Stasis doesn't handle.
   Only matches known static prefixes to avoid intercepting page routes."
  [handler]
  (let [mappings {"/css/"    (io/file static-dir "css")
                  "/assets/" (io/file assets-dir)}]
    (fn [req]
      (let [uri (:uri req)]
        (or (some (fn [[prefix dir]]
                    (when (str/starts-with? uri prefix)
                      (let [path (subs uri (count prefix))
                            f (io/file dir path)]
                        (when (and (.exists f) (.isFile f))
                          {:status 200 :body f}))))
                  mappings)
            (handler req))))))

(def ^:private app
  "Ring handler. Stasis serves pages (live rebuild). wrap-static-dirs serves
   CSS and assets from filesystem. wrap-content-type sets MIME types."
  (-> (stasis/serve-pages #(pages/get-pages posts-dir assets-dir))
      (wrap-static-dirs)
      (wrap-content-type)))

(defn serve
  "Starts dev server on port 3000."
  []
  (println "Serving at http://localhost:3000")
  (jetty/run-jetty app {:port 3000 :join? true}))

(defn -main [& args]
  (case (first args)
    "build" (build)
    "serve" (serve)
    (do (println "Usage: clojure -M:build  or  clojure -M:serve")
        (System/exit 1))))
