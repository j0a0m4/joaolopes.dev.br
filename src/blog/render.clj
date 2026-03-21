(ns blog.render
  (:require [blog.layout :as layout]))

(defn render-post [post config]
  (layout/base-layout (layout/post-layout post config) config))

(defn render-index [posts config]
  (layout/base-layout (layout/index-layout posts config) config))

(defn render-glossary-entry [entry config]
  (layout/base-layout (layout/glossary-entry-layout entry config) config))

(defn render-glossary-index [glossary config]
  (layout/base-layout (layout/glossary-index-layout glossary config) config))

(defn render-rss [posts config]
  (layout/rss-xml posts config))

(defn render-sitemap [posts glossary diagrams config]
  (layout/sitemap-xml posts glossary diagrams config))

;;; ── Route-map builders ───────────────────────────────────────────────────────

(defn- page-handler [html-fn]
  (fn [_req] (html-fn)))

(defn post-pages [posts glossary diagrams config]
  (into {} (map (fn [post]
                  [(str "/posts/" (get-in post [:identity :slug]) "/")
                   (page-handler #(render-post post config))])
                posts)))

(defn glossary-pages [glossary config]
  (merge
    {"/glossary/" (page-handler #(render-glossary-index glossary config))}
    (into {} (map (fn [entry]
                    [(str "/glossary/" (:slug entry) "/")
                     (page-handler #(render-glossary-entry entry config))])
                  glossary))))

(defn index-pages [posts tags config]
  (merge
    {"/" (page-handler #(render-index posts config))}
    {"/tags/" (page-handler #(layout/base-layout (layout/tags-overview-layout tags config) config))}
    (into {} (map (fn [[tag tag-posts]]
                    [(str "/tags/" (name tag) "/")
                     (page-handler #(layout/base-layout (layout/tag-index-layout tag tag-posts config) config))])
                  tags))))

(defn series-pages [series config]
  (into {} (map (fn [[slug series-posts]]
                  [(str "/series/" (name slug) "/")
                   (page-handler #(layout/base-layout (layout/series-index-layout slug series-posts config) config))])
                series)))

(defn diagram-pages [diagrams config]
  (merge
    {"/diagrams/" (page-handler #(layout/base-layout (layout/diagrams-index-layout diagrams config) config))}
    (into {} (map (fn [d]
                    [(str "/diagrams/" (:slug d) "/")
                     (page-handler #(layout/base-layout (layout/diagram-page-layout d config) config))])
                  diagrams))))

(defn static-pages [pages config]
  (merge
    (into {} (map (fn [p]
                    [(str "/" (:slug p) "/")
                     (page-handler #(layout/base-layout (layout/static-page-layout p config) config))])
                  pages))
    {"/404.html" (page-handler #(layout/base-layout (layout/not-found-layout config) config))}))

(defn feed-pages [posts config]
  {"/feed.xml" (page-handler #(render-rss posts config))
   "/llms.txt"  (page-handler #(layout/llms-txt posts config))})

(defn sitemap-pages [posts glossary diagrams config]
  {"/sitemap.xml" (page-handler #(render-sitemap posts glossary diagrams config))})
