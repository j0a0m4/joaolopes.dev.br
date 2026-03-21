(ns blog.pages
  (:require [blog.ports.io :refer [read-posts! read-glossary! read-pages! read-diagrams!]]
            [blog.domain :as domain]
            [blog.render :as render]))

(defn get-pages! [{:keys [io site-url site-title site-desc base-path]}]
  (let [config   {:site-url site-url :site-title site-title :site-desc site-desc :base-path base-path}
        glossary (-> (read-glossary! io) domain/parse-glossary)
        posts    (-> (read-posts! io) domain/parse-posts domain/enrich-series
                     (domain/expand-wikilinks glossary))
        pages    (mapv domain/parse-page (read-pages! io))
        diagrams (-> (read-diagrams! io) (domain/parse-diagrams posts))]
    (merge
     (render/post-pages     posts glossary diagrams config)
     (render/glossary-pages glossary config)
     (render/index-pages    posts (domain/group-tags posts) config)
     (render/series-pages   (domain/group-series posts) config)
     (render/diagram-pages  diagrams config)
     (render/static-pages   pages config)
     (render/feed-pages     posts config)
     (render/sitemap-pages  posts glossary diagrams config))))
