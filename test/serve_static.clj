(require '[ring.adapter.jetty :as jetty]
         '[ring.middleware.file :refer [wrap-file]]
         '[ring.middleware.content-type :refer [wrap-content-type]]
         '[ring.util.response :as response])

(def mime-types
  {"html" "text/html; charset=utf-8"
   "css"  "text/css; charset=utf-8"
   "js"   "application/javascript; charset=utf-8"
   "json" "application/json"
   "svg"  "image/svg+xml"
   "png"  "image/png"
   "jpg"  "image/jpeg"
   "ico"  "image/x-icon"
   "xml"  "application/xml"
   "woff2" "font/woff2"
   "woff"  "font/woff"
   "ttf"   "font/ttf"})

(defn wrap-uri-content-type
  "Sets Content-Type from URI extension. Falls back to text/html for
   extensionless paths (index.html served by wrap-file)."
  [handler]
  (fn [req]
    (when-let [resp (handler req)]
      (if (get-in resp [:headers "Content-Type"])
        resp
        (let [uri  (:uri req)
              ext  (some-> (re-find #"\.([^./]+)$" uri) second)
              mime (get mime-types ext "text/html; charset=utf-8")]
          (assoc-in resp [:headers "Content-Type"] mime))))))

(def app
  (-> (fn [_] (response/not-found "Not Found"))
      (wrap-file "public" {:index-files? true})
      wrap-uri-content-type))

(println "Static server starting on http://127.0.0.1:3001")
(jetty/run-jetty app {:port 3001 :join? true})
