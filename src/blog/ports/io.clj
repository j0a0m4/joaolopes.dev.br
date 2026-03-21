(ns blog.ports.io)

(defprotocol ContentSource
  (read-posts!    [this])
  (read-glossary! [this])
  (read-pages!    [this])
  (read-diagrams! [this]))
