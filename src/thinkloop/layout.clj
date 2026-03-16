(ns thinkloop.layout
  (:require [clojure.data.json :as json]
            [hiccup2.core :as h]
            [hiccup.util :as hu]))

(def site-title "ThinkLoop")
(def site-url "https://joaolopes.dev.br")
(def site-description "Notes on software, systems, and thinking tools.")

;; Base path for GitHub Pages subpath hosting. Set to "" for custom domain.
(def base-path (or (System/getenv "BASE_PATH") ""))

(defn href
  "Prepends base-path to an absolute path."
  [path]
  (str base-path path))

(defn series-path
  "Canonical path for a series index page."
  [slug]
  (str "/series/" slug "/"))

(defn base-layout
  "Full HTML document. body is an HTML string to embed in <main>."
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
      [:link {:rel "stylesheet" :href (href "/css/style.css")}]
      [:link {:rel "alternate" :type "application/rss+xml"
              :title site-title :href (href "/feed.xml")}]
      [:link {:rel "stylesheet"
              :href "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"}]
      [:script {:src "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"}]
      [:script "hljs.highlightAll();"]]
     [:body
      [:header
       [:nav
        [:a {:href (href "/")} site-title]
        [:span.nav-links
         [:a {:href (href "/")} "Posts"]
         [:a {:href (href "/feed.xml")} "RSS"]]]]
      [:main (h/raw body)]
      [:footer
       [:p (str "© " (.getYear (java.time.LocalDate/now)) " João Lopes")]]]])))

(defn- series-toc
  "Ordered list of series posts, current one highlighted. Returns HTML string."
  [{:keys [series-posts series-title series-slug]} current-slug]
  (str
   (h/html
    [:aside.series-toc
     [:p.series-label
      [:a {:href (href (series-path series-slug))} (hu/escape-html series-title)]]
     [:ol
      (for [p series-posts]
        (let [active? (= (:slug p) current-slug)]
          [:li {:class (when active? "current")}
           (if active?
             [:strong (hu/escape-html (:title p))]
             [:a {:href (href (:url p))} (hu/escape-html (:title p))])]))]])))

(defn- series-nav
  "Prev/next navigation block with link to series index. Returns HTML string."
  [{:keys [prev next series-slug series-title]}]
  (str
   (h/html
    [:nav.series-nav
     (if prev
       [:a.series-prev {:href (href (:url prev))}
        (str "\u2190 " (hu/escape-html (:title prev)))]
       [:span])
     [:a.series-index {:href (href (series-path series-slug))}
      (hu/escape-html series-title)]
     (if next
       [:a.series-next {:href (href (:url next))}
        (str (hu/escape-html (:title next)) " \u2192")]
       [:span])])))

(defn- series-json-ld
  "JSON-LD BlogPosting with isPartOf CreativeWorkSeries."
  [{:keys [title published-on description url series-order]} {:keys [series-title series-slug]}]
  (let [ld {"@context" "https://schema.org"
             "@type" "BlogPosting"
             "headline" title
             "datePublished" (str published-on)
             "url" (str site-url url)
             "author" {"@type" "Person" "name" "João Lopes"}
             "isPartOf" {"@type" "CreativeWorkSeries"
                         "name" series-title
                         "url" (str site-url (series-path series-slug))}
             "position" series-order}
        ld (cond-> ld description (assoc "description" description))]
    (str "<script type=\"application/ld+json\">" (json/write-str ld) "</script>")))

(defn series-index-layout
  "Full series index page with title, count, ordered list."
  [slug posts]
  (let [title (:series-title (first posts))]
    (str
     (h/html
      [:div.series-index
       [:h1 (hu/escape-html title)]
       [:p.series-count (str (count posts) " post" (when (not= 1 (count posts)) "s") " in this series")]
       [:ol.series-full-toc
        (for [p posts]
          [:li
           [:a {:href (href (:url p))} (hu/escape-html (:title p))]
           [:time {:datetime (str (:published-on p))} (str (:published-on p))]
           (when (:description p)
             [:p.description (hu/escape-html (:description p))])])]]))))

(defn post-layout
  "Article layout for a single post. Returns hiccup-rendered HTML string."
  ([post html-body] (post-layout post html-body nil))
  ([{:keys [title published-on tags slug] :as post} html-body series-ctx]
   (str
    (h/html
     [:article
      [:h1 (hu/escape-html title)]
      [:div.post-meta
       [:time {:datetime (str published-on)} (str published-on)]
       (when (seq tags)
         [:span.tags
          (for [tag tags]
            [:span.tag (str "#" (name tag))])])]
      (when series-ctx
        (h/raw (series-toc series-ctx slug)))
      (h/raw html-body)
      (when series-ctx
        (h/raw (series-nav series-ctx)))
      (when series-ctx
        (h/raw (series-json-ld post series-ctx)))]))))

(defn not-found-layout
  "404 page content."
  []
  (str
   (h/html
    [:div.not-found
     [:h1 "404"]
     [:p "This page doesn't exist."]
     [:p [:a {:href (href "/")} "← Back to posts"]]])))

(defn index-layout
  "Post list for the index page. Returns hiccup-rendered HTML string."
  [posts]
  (str
   (h/html
    [:div.index
     [:h1 "Posts"]
     (if (seq posts)
       [:ul.post-list
        (for [{:keys [title url published-on description]} posts]
          [:li
           [:a {:href (href url)} (hu/escape-html title)]
           [:time {:datetime (str published-on)} (str published-on)]
           (when description
             [:p.description (hu/escape-html description)])])]
       [:p "No posts yet. Check back soon."])])))
