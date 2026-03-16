(ns thinkloop.core
  (:require [clojure.java.io :as io]
            [stasis.core :as stasis]
            [ring.adapter.jetty :as jetty]
            [thinkloop.pages :as pages]))

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
  (let [page-map (pages/get-pages posts-dir)]
    ;; Export pages via Stasis
    (stasis/empty-directory! public-dir)
    (stasis/export-pages page-map public-dir)
    ;; Copy static resources (CSS, CNAME)
    (copy-dir static-dir public-dir)
    ;; Copy assets if they exist
    (copy-dir assets-dir (str public-dir "/assets"))
    (println (str "Built " (count page-map) " pages to " public-dir "/"))))

(def ^:private app
  "Ring handler. Passes a fn to stasis so pages rebuild on each request (live dev)."
  (stasis/serve-pages #(pages/get-pages posts-dir)))

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
