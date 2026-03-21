(ns aux.e2e-helpers
  (:require [ring.adapter.jetty :as jetty]
            [ring.middleware.file :refer [wrap-file]]
            [ring.middleware.content-type :refer [wrap-content-type]]
            [ring.util.response :as response]))

(defmacro with-static-server [[dir port] & body]
  `(let [app#    (-> (fn [_req#] (response/not-found "Not Found"))
                     (wrap-file ~dir {:index-files? true})
                     wrap-content-type)
         server# (jetty/run-jetty app# {:port ~port :join? false})]
     (try
       ~@body
       (finally (.stop server#)))))
