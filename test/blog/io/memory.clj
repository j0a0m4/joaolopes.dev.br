(ns blog.io.memory
  (:require [blog.ports.io :as ports]))

(defrecord MemorySource [posts glossary pages diagrams]
  ports/ContentSource
  (read-posts!    [this] (:posts this))
  (read-glossary! [this] (:glossary this))
  (read-pages!    [this] (:pages this))
  (read-diagrams! [this] (:diagrams this)))
