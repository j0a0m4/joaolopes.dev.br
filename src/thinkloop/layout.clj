(ns thinkloop.layout
  (:require [hiccup2.core :as h]
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

(defn base-layout
  "Full HTML document. body is a sequence of hiccup forms."
  [title description & body]
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
      [:main (map h/raw body)]
      [:footer
       [:p (str "© " (.getYear (java.time.LocalDate/now)) " João Lopes")]]]])))

(defn post-layout
  "Article layout for a single post. Returns hiccup-rendered HTML string."
  [{:keys [title published-on tags]} html-body]
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
     (h/raw html-body)])))

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
