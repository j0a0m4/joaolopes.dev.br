(ns aux.e2e-helpers
  (:require [ring.adapter.jetty :as jetty]
            [ring.util.response :as response]
            [ring.middleware.content-type :refer [wrap-content-type]]))

(defn- static-handler [root-dir]
  (wrap-content-type
    (fn [req]
      (let [path  (str root-dir (:uri req))
            file  (java.io.File. path)
            index (java.io.File. (str path "index.html"))]
        (cond
          (.isFile file)  (response/file-response path)
          (.isFile index) (response/file-response (str path "index.html"))
          :else           (response/file-response (str root-dir "/404.html")))))))

(defmacro with-static-server [[dir port] & body]
  `(let [handler# (var-get (find-var 'aux.e2e-helpers/static-handler))
         server#  (jetty/run-jetty (handler# ~dir) {:port ~port :join? false})]
     (try
       ~@body
       (finally
         (.stop server#)))))
