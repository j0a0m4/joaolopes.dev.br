(ns blog.core
  (:require [clojure.java.io :as io]
            [stasis.core :as stasis]
            [ring.adapter.jetty :as jetty]
            [ring.middleware.content-type :refer [wrap-content-type]]
            [blog.pages :as pages]
            [blog.system :as system]))

(defn- copy-dir!
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

(defn build! [{:keys [output-dir] :as sys}]
  (let [site-pages (pages/get-pages! sys)]
    (println "Building site...")
    (stasis/empty-directory! output-dir)
    (stasis/export-pages site-pages output-dir)
    (copy-dir! "resources/public" output-dir)
    (copy-dir! "assets" (str output-dir "assets/"))
    (println (str "Built " (count site-pages) " pages to " output-dir))))

(defn serve! [sys]
  (let [app (-> (stasis/serve-pages #(pages/get-pages! sys))
                wrap-content-type)]
    (println "Serving at http://localhost:3000")
    (jetty/run-jetty app {:port 3000 :join? false})))

(defn -main [& [command]]
  (let [sys (system/load-config!)]
    (case command
      "build" (build! sys)
      "serve" (serve! sys)
      (println "Usage: build | serve"))))
