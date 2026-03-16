(ns thinkloop.pages
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [thinkloop.layout :as layout]
            [thinkloop.markdown :as markdown])
  (:import [java.time LocalDate ZoneId]
           [java.time.format DateTimeFormatter]
           [java.util Locale]))

(defn load-posts
  "Loads all markdown files from dir, parses them, returns sorted by published-on desc."
  [dir]
  (let [d (io/file dir)]
    (when (.isDirectory d)
      (->> (.listFiles d)
           (filter #(str/ends-with? (.getName %) ".md"))
           (map (fn [f]
                  (markdown/parse-post (.getName f) (slurp f))))
           (filter :published-on)
           (sort-by :published-on #(compare %2 %1))))))

(defn- published-slugs
  "Set of slugs from published posts, for wikilink resolution."
  [posts]
  (into #{} (map :slug posts)))

(defn- render-post
  "Renders a single post to full HTML page."
  [post slugs]
  (let [transformed (markdown/transform-obsidian (:body post) slugs)
        html-body (markdown/render-markdown transformed)]
    (layout/base-layout
     (:title post)
     (:description post)
     (layout/post-layout post html-body))))

(defn- render-index
  "Renders the index page."
  [posts]
  (layout/base-layout nil nil (layout/index-layout posts)))

(defn- rfc822-date
  "Formats a date string (YYYY-MM-DD) as RFC 822 for RSS."
  [date-str]
  (let [ld (LocalDate/parse (str date-str))
        zdt (.atStartOfDay ld (ZoneId/of "America/Sao_Paulo"))
        fmt (DateTimeFormatter/ofPattern "EEE, dd MMM yyyy HH:mm:ss Z" Locale/US)]
    (.format zdt fmt)))

(defn- xml-escape [s]
  (-> (str s)
      (str/replace "&" "&amp;")
      (str/replace "<" "&lt;")
      (str/replace ">" "&gt;")
      (str/replace "\"" "&quot;")))

(defn- render-rss
  "Generates RSS 2.0 feed XML."
  [posts]
  (let [items (take 20 posts)]
    (str "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
         "<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n"
         "<channel>\n"
         "<title>" layout/site-title "</title>\n"
         "<link>" layout/site-url "</link>\n"
         "<description>" (xml-escape layout/site-description) "</description>\n"
         "<language>en</language>\n"
         "<atom:link href=\"" layout/site-url "/feed.xml\" rel=\"self\" type=\"application/rss+xml\"/>\n"
         (when (seq items)
           (str "<lastBuildDate>" (rfc822-date (:published-on (first items))) "</lastBuildDate>\n"))
         (str/join
          (for [{:keys [title url description published-on]} items]
            (str "<item>\n"
                 "<title>" (xml-escape title) "</title>\n"
                 "<link>" layout/site-url url "</link>\n"
                 "<guid>" layout/site-url url "</guid>\n"
                 (when description
                   (str "<description>" (xml-escape description) "</description>\n"))
                 "<pubDate>" (rfc822-date published-on) "</pubDate>\n"
                 "</item>\n")))
         "</channel>\n"
         "</rss>")))

(defn- render-sitemap
  "Generates sitemap.xml."
  [posts]
  (str "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
       "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"
       "<url><loc>" layout/site-url "/</loc></url>\n"
       (str/join
        (for [{:keys [url published-on]} posts]
          (str "<url>"
               "<loc>" layout/site-url url "</loc>"
               "<lastmod>" published-on "</lastmod>"
               "</url>\n")))
       "</urlset>"))

(defn- render-404 []
  (layout/base-layout
   "Not Found" nil
   (str (hiccup2.core/html
         [:div.not-found
          [:h1 "404"]
          [:p "This page doesn't exist."]
          [:p [:a {:href "/"} "← Back to posts"]]]))))

(defn get-pages
  "Builds the Stasis page map from posts directory."
  [posts-dir]
  (let [posts (or (load-posts posts-dir) [])
        slugs (published-slugs posts)]
    (merge
     {"/" (fn [_] (render-index posts))
      "/feed.xml" (fn [_] (render-rss posts))
      "/sitemap.xml" (fn [_] (render-sitemap posts))
      "/404.html" (fn [_] (render-404))}
     (into {}
           (for [post posts]
             [(:url post) (fn [_] (render-post post slugs))])))))
