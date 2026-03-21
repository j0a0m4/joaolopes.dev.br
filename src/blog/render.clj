(ns blog.render
  (:require [blog.layout :as layout]
            [clojure.java.io :as io]
            [clojure.string :as str])
  (:import [org.commonmark.parser Parser]
           [org.commonmark.renderer.html HtmlRenderer]
           [org.commonmark.ext.heading.anchor HeadingAnchorExtension]
           [org.commonmark.ext.gfm.tables TablesExtension]))

;;; ── CommonMark pipeline ──────────────────────────────────────────────────────

(def ^:private extensions
  [(HeadingAnchorExtension/create)
   (TablesExtension/create)])

(def ^:private md-parser
  (-> (Parser/builder)
      (.extensions extensions)
      (.build)))

(def ^:private md-renderer
  (-> (HtmlRenderer/builder)
      (.extensions extensions)
      (.build)))

(defn render-markdown
  "Converts markdown string to HTML via CommonMark."
  [text]
  (->> (.parse md-parser text)
       (.render md-renderer)))

;;; ── TOC extraction ───────────────────────────────────────────────────────────

(defn- heading-anchor
  "Derives a TOC anchor slug from heading text."
  [text]
  (-> text
      str/lower-case
      str/trim
      (str/replace #"\s+" "-")
      (str/replace #"[^\w-]" "")))

(defn extract-toc
  "Parses ## and ### headings from raw markdown body.
   Returns [{:level 2, :text ..., :anchor ...}] or nil if fewer than min-headings h2s."
  ([body] (extract-toc body 3))
  ([body min-headings]
   (let [headings (->> (str/split-lines body)
                       (keep (fn [line]
                               (when-let [[_ hashes text] (re-matches #"^(#{2,3})\s+(.*)" line)]
                                 {:level  (count hashes)
                                  :text   (str/trim text)
                                  :anchor (heading-anchor (str/trim text))})))
                       vec)]
     (when (>= (count (filter #(= 2 (:level %)) headings)) min-headings)
       headings))))

;;; ── SVG ARIA helpers ─────────────────────────────────────────────────────────

(defn- escape-html [s]
  (-> s
      (str/replace "&"  "&amp;")
      (str/replace "<"  "&lt;")
      (str/replace ">"  "&gt;")
      (str/replace "\"" "&quot;")))

(defn inject-svg-aria
  "Injects role, aria-labelledby, and <title>/<desc> onto the <svg> opening tag.
   Takes raw SVG content and a diagram map with :slug and :alt keys."
  [svg-content {:keys [slug alt]}]
  (let [title-id  (str slug "-title")
        desc-id   (str slug "-desc")
        aria-attr (str " role=\"img\" aria-labelledby=\"" title-id " " desc-id "\"")
        with-aria (str/replace svg-content #"<svg([^>]*?)>" (str "<svg$1" aria-attr ">"))
        title-el  (str "<title id=\"" title-id "\">" (escape-html alt) "</title>")
        desc-el   (str "<desc id=\""  desc-id  "\">" (escape-html alt) "</desc>")]
    (str/replace with-aria #"(<svg[^>]*>)" (str "$1" title-el desc-el))))

;;; ── SVG inlining ─────────────────────────────────────────────────────────────

(def ^:private img-svg-pattern
  #"<img\s+[^>]*src=\"(/assets/[^\"]+\.svg)\"[^>]*>")

(defn- extract-alt
  "Extracts alt attribute value from an HTML img tag string."
  [img-tag]
  (when-let [alt (second (re-find #"alt=\"([^\"]*)\"" img-tag))]
    (when (seq alt) alt)))

(defn- svg-slug-from-path
  "Derives diagram slug from SVG src path. /assets/agent-loop.svg → agent-loop"
  [src-path]
  (-> src-path
      (str/replace #"^/assets/" "")
      (str/replace #"\.svg$" "")))

(defn inline-svgs
  "Replaces <img> tags pointing to local SVGs with accessible <figure> elements."
  [html-body]
  (str/replace html-body img-svg-pattern
               (fn [[img-tag src-path]]
                 (let [f (io/file (str "." src-path))]
                   (if (.exists f)
                     (let [slug    (svg-slug-from-path src-path)
                           title   (str/join " " (map str/capitalize (str/split slug #"-")))
                           alt     (extract-alt img-tag)
                           svg-raw (-> (slurp f)
                                       (str/replace #"<\?xml[^>]*\?>\s*" "")
                                       str/trim)
                           svg     (inject-svg-aria svg-raw {:slug slug :alt (or alt title)})
                           base    (or (System/getenv "BASE_PATH") "")
                           href    (str base "/diagrams/" slug "/")]
                       (str "<figure class=\"diagram-figure\">"
                            "<a href=\"" href "\""
                            " class=\"diagram-link\""
                            " aria-label=\"View " title " diagram\">"
                            svg
                            "</a>"
                            "<figcaption>"
                            "<a href=\"" href "\" class=\"diagram-caption-link\">"
                            "View " title " diagram \u2192"
                            "</a>"
                            (when alt
                              (str "<div class=\"diagram-transcript\">"
                                   "<p>" alt "</p>"
                                   "</div>"))
                            "</figcaption>"
                            "</figure>"))
                     img-tag)))))

;;; ── Internal rendering pipeline ──────────────────────────────────────────────

(defn- inject-toc-backlinks
  "Inserts ↑ Contents links before each <h2> (except the first)."
  [html-body]
  (let [backlink "<a class=\"toc-back\" href=\"#toc\">\u2191 Contents</a>"
        parts    (str/split html-body #"(?=<h2 )")]
    (if (<= (count parts) 1)
      html-body
      (str (first parts)
           (str/join (map #(str backlink %) (rest parts)))))))

(defn- strip-md-formatting
  "Strips bold, italic, and backtick formatting from a string."
  [s]
  (-> s
      (str/replace #"\*{1,2}" "")
      (str/replace "`" "")))

(defn- transform-glossary-links
  "Converts [[glossary:slug|display]] → [display](/glossary/slug/) markdown links.
   Strips formatting from display text — glossary links are styled via CSS, not inline markdown.
   Runs BEFORE CommonMark so the output is standard markdown, not raw HTML."
  [md]
  (str/replace md
               #"\[\[glossary:([^\]|]+)(?:\|([^\]]+))?\]\]"
               (fn [[_ slug display]]
                 (str "[" (strip-md-formatting (or display slug)) "](/glossary/" slug "/)"))))

(defn- enhance-glossary-links
  "After CommonMark, wraps <a href=\"/glossary/{slug}/\"> with <abbr class=\"glossary-term\">
   when slug is a published glossary entry — restores tooltip attrs and e2e selectors."
  [html-body glossary-by-slug]
  (if (empty? glossary-by-slug)
    html-body
    (str/replace html-body
                 #"<a href=\"/glossary/([^\"/]+)/\">([^<]*)</a>"
                 (fn [& gs]
                   (let [[whole slug _display]
                         (if (and (= 1 (count gs)) (vector? (first gs)))
                           (first gs)
                           gs)]
                     (if-let [entry (get glossary-by-slug slug)]
                       (str "<abbr class=\"glossary-term\""
                            " title=\"" (escape-html (:definition entry)) "\""
                            " data-slug=\"" slug "\""
                            " data-definition=\"" (escape-html (:definition entry)) "\">"
                            whole
                            "</abbr>")
                       whole))))))

(defn- render-body
  "Renders a post's raw markdown body to HTML.
   Returns {:html-body html :toc toc}."
  [raw-body glossary-by-slug]
  (let [toc       (extract-toc raw-body)
        html-body (-> raw-body
                      transform-glossary-links
                      render-markdown
                      inline-svgs
                      (cond-> toc inject-toc-backlinks)
                      (enhance-glossary-links glossary-by-slug))]
    {:html-body html-body :toc toc}))

;;; ── Individual renderers ─────────────────────────────────────────────────────

(defn render-post
  ([post config]
   (render-post post config {}))
  ([post config glossary-by-slug]
   (let [{:keys [html-body toc]} (render-body (get-in post [:content :body] "") glossary-by-slug)]
     (layout/base-layout (layout/post-layout post config {:html-body html-body :toc toc}) config))))

(defn render-index [posts config]
  (layout/base-layout (layout/index-layout posts config) config))

(defn render-glossary-entry [entry config]
  (let [html-body (-> (or (:definition entry) "") render-markdown)]
    (layout/base-layout (layout/glossary-entry-layout (assoc entry :html-body html-body) config) config)))

(defn render-glossary-index [glossary config]
  (layout/base-layout (layout/glossary-index-layout glossary config) config))

(defn render-rss [posts config]
  (layout/rss-xml posts config))

(defn render-sitemap [posts glossary diagrams config]
  (layout/sitemap-xml posts glossary diagrams config))

;;; ── Route-map builders ───────────────────────────────────────────────────────

(defn- page-handler [html-fn]
  (fn [_req] (html-fn)))

(defn post-pages [posts glossary _diagrams config]
  (let [glossary-by-slug (into {} (map (juxt :slug identity) glossary))]
    (into {} (map (fn [post]
                    [(str "/posts/" (get-in post [:identity :slug]) "/")
                     (page-handler #(render-post post config glossary-by-slug))])
                  posts))))

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
