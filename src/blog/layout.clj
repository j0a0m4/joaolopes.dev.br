(ns blog.layout
  (:require [clojure.data.json :as json]
            [clojure.string :as str]
            [hiccup2.core :as h]))

(def site-title "João Lopes")
(def site-url "https://joaolopes.dev.br")
(def site-description "Notes on software, systems, and thinking tools.")

;; Base path for GitHub Pages subpath hosting. Set to "" for custom domain.
(def base-path (or (System/getenv "BASE_PATH") ""))

(defn href
  "Prepends base-path to an absolute path."
  [path]
  (str base-path path))

(defn absolute-url
  "Full URL for a site-relative path."
  [path]
  (str site-url path))

(defn series-path
  "Canonical path for a series index page."
  [slug]
  (str "/series/" slug "/"))

(defn tag-path
  "Canonical path for a tag index page."
  [slug]
  (str "/tags/" slug "/"))

(defn base-layout
  "Full HTML document. body is a hiccup vector to embed in <main>.
   Single serialization boundary — all other layout fns return hiccup data."
  [title description body]
  (str
   "<!DOCTYPE html>\n"
   (h/html
    [:html {:lang "en"}
     [:head
      [:meta {:charset "utf-8"}]
      [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
      [:title (if title (str title " — " site-title) site-title)]
      [:meta {:name "description" :content (or description site-description)}]
      [:link {:rel "preconnect" :href "https://fonts.googleapis.com"}]
      [:link {:rel "preconnect" :href "https://fonts.gstatic.com" :crossorigin ""}]
      [:link {:rel "stylesheet"
              :href "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"}]
      [:link {:rel "stylesheet" :href (href "/css/style.css")}]
      [:link {:rel "icon" :type "image/svg+xml" :href (href "/favicon.svg")}]
      [:link {:rel "alternate" :type "application/rss+xml"
              :title site-title :href (href "/feed.xml")}]
      [:link {:rel "stylesheet"
              :href "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/dracula.min.css"}]
      [:script {:src "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"}]
      [:script (h/raw "document.addEventListener('DOMContentLoaded', () => document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el)));")]
      [:script {:type "module"}
       (h/raw "import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
        document.querySelectorAll('pre > code.language-mermaid').forEach(code => {
          const pre = code.parentElement;
          const div = document.createElement('pre');
          div.className = 'mermaid';
          div.textContent = code.textContent;
          pre.replaceWith(div);
        });
        mermaid.initialize({ startOnLoad: true, theme: 'dark' });")]]
     [:body
      [:header
       [:nav
        [:a.site-logo {:href (href "/")}
         [:svg.logo {:viewBox "0 0 32 32" :width "40" :height "40" :aria-hidden "true"}
          [:path.logo-path {:d "M16 16c-2-2.5-4-4.5-6-4.5a4.5 4.5 0 1 0 0 9c2 0 4-2 6-4.5zm0 0c2 2.5 4 4.5 6 4.5a4.5 4.5 0 1 0 0-9c-2 0-4 2-6 4.5z"
                            :fill "none" :stroke "currentColor" :stroke-width "2"
                            :stroke-linecap "round" :stroke-linejoin "round"}]]
         site-title]
        [:span.nav-links
         [:a {:href (href "/")} "Posts"]
         [:a {:href (href "/tags/")} "Tags"]
         [:a {:href (href "/about/")} "About"]
         [:a {:href (href "/feed.xml")} "RSS"]]]]
      [:main body]
      [:footer
       [:p (str "© " (.getYear (java.time.LocalDate/now)) " ")
        [:a {:href "https://github.com/j0a0m4" :target "_blank" :rel "noopener noreferrer"} "João Lopes"]]
       [:p "Theme inspired by "
        [:a {:href "https://github.com/bennyxguo/Obsidian-Obsidianite"
             :target "_blank" :rel "noopener noreferrer"} "Obsidianite"]]]]])))

(defn- series-toc
  "Ordered list of series posts, current one highlighted. Returns hiccup."
  [{:keys [series-posts series-title series-slug]} current-slug]
  [:aside.series-toc
   [:p.series-label
    [:a {:href (href (series-path series-slug))} series-title]]
   [:ol
    (for [p series-posts]
      (let [active? (= (:slug p) current-slug)]
        [:li {:class (when active? "current")}
         (if active?
           [:strong (:title p)]
           [:a {:href (href (:url p))} (:title p)])]))]])

(defn- series-nav
  "Prev/next navigation block with link to series index. Returns hiccup."
  [{:keys [prev next series-slug series-title]}]
  [:nav.series-nav
   (if prev
     [:a.series-prev {:href (href (:url prev))}
      (str "\u2190 " (:title prev))]
     [:span])
   [:a.series-index {:href (href (series-path series-slug))}
    series-title]
   (if next
     [:a.series-next {:href (href (:url next))}
      (str (:title next) " \u2192")]
     [:span])])

(defn- series-json-ld
  "JSON-LD BlogPosting with isPartOf CreativeWorkSeries. Returns hiccup."
  [{:keys [title published-on description url series-order]} {:keys [series-title series-slug]}]
  (let [ld {"@context" "https://schema.org"
             "@type" "BlogPosting"
             "headline" title
             "datePublished" (str published-on)
             "url" (absolute-url url)
             "author" {"@type" "Person" "name" "João Lopes"}
             "isPartOf" {"@type" "CreativeWorkSeries"
                         "name" series-title
                         "url" (absolute-url (series-path series-slug))}
             "position" series-order}
        ld (cond-> ld description (assoc "description" description))]
    [:script {:type "application/ld+json"} (h/raw (json/write-str ld))]))

(defn series-index-layout
  "Full series index page with title, count, ordered list. Returns hiccup."
  [slug posts]
  (let [title (:series-title (first posts))]
    [:div.series-index
     [:h1 title]
     [:p.series-count (str (count posts) " post" (when (not= 1 (count posts)) "s") " in this series")]
     [:ol.series-full-toc
      (for [p posts]
        [:li
         [:a {:href (href (:url p))} (:title p)]
         [:time {:datetime (str (:published-on p))} (str (:published-on p))]
         (when (:description p)
           [:p.description (:description p)])])]]))

(defn tag-index-layout
  "Tag index page with tag name, count, unordered post list. Returns hiccup."
  [tag posts]
  [:div.tag-index
   [:h1 (str "#" tag)]
   [:p.series-count (str (count posts) " post" (when (not= 1 (count posts)) "s") " with this tag")]
   [:ul.tag-full-toc
    (for [p posts]
      [:li
       [:a {:href (href (:url p))} (:title p)]
       [:time {:datetime (str (:published-on p))} (str (:published-on p))]
       (when (:description p)
         [:p.description (:description p)])])]])

(defn tags-overview-layout
  "All-tags overview page. Shows every tag as a pill with post count. Returns hiccup."
  [tag-map]
  [:div.tags-overview
   [:h1 "Tags"]
   [:div.tags-cloud
    (for [[tag posts] tag-map]
      [:a.tag-pill {:href (href (tag-path tag))}
       (str "#" tag)
       [:span.tag-count (str (count posts))]])]])

(defn- toc-nav
  "Table of contents from extracted headings. Returns hiccup or nil."
  [headings]
  (when (seq headings)
    [:nav.toc {:id "toc"}
     [:p.toc-label "Contents"]
     [:ul
      (for [{:keys [level text anchor]} headings
            :when (= 2 level)]
        (let [subs (take-while #(= 3 (:level %))
                               (rest (drop-while #(not= anchor (:anchor %)) headings)))]
          [:li
           [:a {:href (str "#" anchor)} text]
           (when (seq subs)
             [:ul
              (for [s subs]
                [:li [:a {:href (str "#" (:anchor s))} (:text s)]])])]))]]))

(defn post-layout
  "Article layout for a single post. Returns hiccup."
  ([post html-body] (post-layout post html-body nil nil))
  ([post html-body series-ctx] (post-layout post html-body series-ctx nil))
  ([{:keys [title published-on updated-on tags slug linkedin-url url filename] :as post} html-body series-ctx toc]
   [:article {:data-pagefind-body ""}
    [:h1 title]
    [:div.post-dateline
     [:time {:datetime (str published-on)} (str published-on)]
     (when updated-on
       (list " · Updated " [:time {:datetime (str updated-on)} (str updated-on)]))
     (when filename
       (list " | "
             [:a.raw-link
              {:href (str "https://raw.githubusercontent.com/j0a0m4/joaolopes.dev.br/main/posts/"
                          (str/replace (java.net.URLEncoder/encode filename "UTF-8") "+" "%20"))
               :target "_blank" :rel "noopener noreferrer"}
              [:svg {:viewBox "0 0 16 16" :width "12" :height "12"
                     :style "vertical-align:middle;margin-right:3px;fill:currentColor"}
               [:path {:d "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"}]]
              "RAW Markdown"]))]
    (when (seq tags)
      [:div.tags
       (for [tag tags]
         [:a.tag {:href (href (tag-path (name tag)))} (str "#" (name tag))])])
    (toc-nav toc)
    (h/raw html-body)
    (when series-ctx
      (series-toc series-ctx slug))
    [:aside.colophon
     "This post was drafted by an AI agent, reviewed by another, and revised by me."]
    [:p.reply-cta
     "Thoughts? "
     [:a {:href "mailto:joao@joaolopes.dev.br"} "Reply by email"]
     (when linkedin-url
       (list " · "
             [:a {:href linkedin-url :target "_blank" :rel "noopener noreferrer"} "My LinkedIn post"]))]
    (let [post-url   (java.net.URLEncoder/encode (absolute-url url) "UTF-8")
          post-title (java.net.URLEncoder/encode (str title " ") "UTF-8")]
      [:p.share-cta
       "Share: "
       [:a {:href (str "https://www.linkedin.com/sharing/share-offsite/?url=" post-url)
            :target "_blank" :rel "noopener noreferrer"} "LinkedIn"]
       " · "
       [:a {:href (str "https://x.com/intent/post?url=" post-url "&text=" post-title)
            :target "_blank" :rel "noopener noreferrer"} "X"]
       " · "
       [:a {:href (str "https://bsky.app/intent/compose?text=" post-title post-url)
            :target "_blank" :rel "noopener noreferrer"} "Bluesky"]
       " · "
       [:a {:href "#"
            :onclick (str "navigator.clipboard.writeText('" (absolute-url url) "');this.textContent='Copied!';setTimeout(()=>this.textContent='Copy link',2000);return false;")} "Copy link"]])
    (when series-ctx
      (series-nav series-ctx))
    (when series-ctx
      (series-json-ld post series-ctx))]))

(defn about-layout
  "About page content. Returns hiccup."
  [html-body]
  [:article.about
   [:h1 "About"]
   (h/raw html-body)])

(defn not-found-layout
  "404 page content. Returns hiccup."
  []
  [:div.not-found
   [:h1 "404"]
   [:p "This page doesn't exist."]
   [:p [:a {:href (href "/")} "← Back to posts"]]])

(defn index-layout
  "Post list for the index page. Returns hiccup."
  [posts]
  [:div.index
   [:h1 "Posts"]
   (if (seq posts)
     [:ul.post-list
      (for [{:keys [title url published-on description tags]} posts]
        [:li
         [:a {:href (href url)} title]
         [:time {:datetime (str published-on)} (str published-on)]
         (when description
           [:p.description description])
         (when (seq tags)
           [:span.tags
            (for [tag tags]
              [:a.tag {:href (href (tag-path (name tag)))} (str "#" (name tag))])])])]
     [:p "No posts yet. Check back soon."])])
