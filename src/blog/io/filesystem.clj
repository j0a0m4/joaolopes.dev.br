(ns blog.io.filesystem
  (:require [blog.ports.io :as ports]
            [clojure.java.io :as io]
            [clojure.string :as str]))

(defn- git-date! [path]
  (try
    (let [result (-> (ProcessBuilder. ["git" "log" "-1" "--format=%cs" path])
                     (.start)
                     (.inputStream)
                     (slurp)
                     (str/trim))]
      (when-not (str/blank? result) result))
    (catch Exception _ nil)))

(defn- read-md-file! [file]
  (let [content (slurp file)
        path    (.getPath file)]
    (if-let [[_ fm body] (re-find #"(?s)^---\n(.+?)\n---\n(.*)$" content)]
      {:path            path
       :raw-frontmatter (str/trim fm)
       :raw-body        (str/trim body)
       :git-updated-on  (git-date! path)}
      nil)))

(defn load-markdown-dir! [dir]
  (->> (file-seq (io/file dir))
       (filter #(str/ends-with? (.getName %) ".md"))
       (keep read-md-file!)))

(defn load-svg-dir! [dir]
  (->> (file-seq (io/file dir))
       (filter #(str/ends-with? (.getName %) ".svg"))
       (map (fn [f] {:filename (.getName f) :content (slurp f)}))))

(defrecord FilesystemSource [content-dir glossary-dir pages-dir assets-dir]
  ports/ContentSource
  (read-posts!    [this] (load-markdown-dir! (:content-dir this)))
  (read-glossary! [this] (load-markdown-dir! (:glossary-dir this)))
  (read-pages!    [this] (load-markdown-dir! (:pages-dir this)))
  (read-diagrams! [this] (load-svg-dir!      (:assets-dir this))))
