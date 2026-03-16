(ns thinkloop.layout
  (:require [clojure.data.json :as json]
            [hiccup2.core :as h]))

(def site-title "ThinkLoop")
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
      [:link {:rel "alternate" :type "application/rss+xml"
              :title site-title :href (href "/feed.xml")}]
      [:link {:rel "stylesheet"
              :href "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/dracula.min.css"}]
      [:script {:src "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"}]
      [:script "hljs.highlightAll();"]]
     [:body
      [:header
       [:nav
        [:a {:href (href "/")} site-title]
        [:span.nav-links
         [:a {:href (href "/")} "Posts"]
         [:a {:href (href "/feed.xml")} "RSS"]]]]
      [:main body]
      [:footer
       [:p (str "© " (.getYear (java.time.LocalDate/now)) " João Lopes")]
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

(defn post-layout
  "Article layout for a single post. Returns hiccup."
  ([post html-body] (post-layout post html-body nil))
  ([{:keys [title published-on tags slug] :as post} html-body series-ctx]
   [:article
    [:h1 title]
    [:div.post-meta
     [:time {:datetime (str published-on)} (str published-on)]
     (when (seq tags)
       [:span.tags
        (for [tag tags]
          [:span.tag (str "#" (name tag))])])]
    (when series-ctx
      (series-toc series-ctx slug))
    (h/raw html-body)
    (when series-ctx
      (series-nav series-ctx))
    (when series-ctx
      (series-json-ld post series-ctx))]))

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
      (for [{:keys [title url published-on description]} posts]
        [:li
         [:a {:href (href url)} title]
         [:time {:datetime (str published-on)} (str published-on)]
         (when description
           [:p.description description])])]
     [:p "No posts yet. Check back soon."])])
