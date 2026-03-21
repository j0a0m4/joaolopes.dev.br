(ns blog.system
  (:require [blog.io.filesystem :refer [->FilesystemSource]]
            [clojure.edn :as edn]))

(defn load-config! []
  (let [{:keys [content-dir glossary-dir pages-dir assets-dir base-path] :as cfg}
        (edn/read-string (slurp "config.edn"))]
    (assoc cfg
      :base-path (or (System/getenv "BASE_PATH") base-path)
      :io        (->FilesystemSource content-dir glossary-dir pages-dir assets-dir))))
