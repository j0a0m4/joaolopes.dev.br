(ns blog.markdown
  (:require [clj-yaml.core :as yaml]
            [clojure.string :as str])
  (:import [java.time Instant ZoneOffset]
           [java.time.format DateTimeFormatter]
           [java.util Date]
           [org.commonmark.parser Parser]
           [org.commonmark.renderer.html HtmlRenderer]
           [org.commonmark.ext.heading.anchor HeadingAnchorExtension]
           [org.commonmark.ext.gfm.tables TablesExtension]))

(defn parse-frontmatter
  "Splits YAML frontmatter from markdown body. Returns [metadata body]."
  [content]
  (if-let [[_ yaml-str body] (re-matches #"(?s)^---\r?\n(.*?)\r?\n---\r?\n(.*)" content)]
    [(yaml/parse-string yaml-str :keywords true :load-all false) (str/trim body)]
    [nil (str/trim content)]))

(defn- slugify [title]
  (-> title
      str/lower-case
      str/trim
      (str/replace #"[^\w\s-]" "")
      (str/replace #"\s+" "-")
      (str/replace #"-+" "-")
      (str/replace #"^-|-$" "")))

(defn- transform-highlights
  "==text== → <mark>text</mark>"
  [text]
  (str/replace text #"==(.*?)==" "<mark>$1</mark>"))

(defn- transform-image-embeds
  "![[image.png]] → ![image.png](/assets/image.png)"
  [text]
  (str/replace text #"!\[\[([^\]]+)\]\]" "![$1](/assets/$1)"))

(defn- transform-callouts
  "> [!note] Title  →  styled blockquote"
  [text]
  (str/replace text
               #"(?m)^> \[!(\w+)\]\s*(.*)"
               "<blockquote class=\"callout callout-$1\"><strong>$2</strong>"))

(defn- transform-wikilinks
  "[[Title]] → plain text for links to unpublished posts.
   published-slugs is a set of slugs that have published posts."
  [text published-slugs]
  (str/replace text #"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]"
               (fn [[_ target display]]
                 (let [label (or display target)
                       slug (slugify target)]
                   (if (contains? published-slugs slug)
                     (str "<a href=\"/posts/" slug "/\">" label "</a>")
                     label)))))

(defn transform-obsidian
  "Pre-processes Obsidian-flavored markdown before passing to markdown-clj.
   published-slugs is a set of slugs for cross-linking."
  [text published-slugs]
  (-> text
      transform-highlights
      transform-image-embeds
      transform-callouts
      (transform-wikilinks published-slugs)))

(defn- strip-related-section
  "Removes ## Related section (vault internal, not public)."
  [body]
  (str/replace body #"(?s)\n## Related\n.*$" ""))

(defn- heading-anchor
  "Replicates markdown-clj's heading anchor slugification:
   lowercase → spaces to _ → URL-encode."
  [text]
  (-> text
      str/lower-case
      str/trim
      (str/replace " " "_")
      (java.net.URLEncoder/encode "UTF-8")
      (str/replace "+" "_")))

(defn extract-toc
  "Parses ## and ### headings from raw markdown body.
   Returns [{:level 2, :text \"...\", :anchor \"...\"}] or nil if < min-headings."
  ([body] (extract-toc body 3))
  ([body min-headings]
   (let [headings (->> (str/split-lines body)
                       (keep (fn [line]
                               (when-let [[_ hashes text] (re-matches #"^(#{2,3})\s+(.*)" line)]
                                 {:level (count hashes)
                                  :text (str/trim text)
                                  :anchor (heading-anchor (str/trim text))})))
                       vec)]
     (when (>= (count (filter #(= 2 (:level %)) headings)) min-headings)
       headings))))

(def ^:private extensions
  [(HeadingAnchorExtension/create)
   (TablesExtension/create)])

(def ^:private parser
  (-> (Parser/builder)
      (.extensions extensions)
      (.build)))

(def ^:private renderer
  (-> (HtmlRenderer/builder)
      (.extensions extensions)
      (.build)))

(defn render-markdown
  "Converts markdown string to HTML."
  [text]
  (->> (.parse parser text)
       (.render renderer)))

(def ^:private ^DateTimeFormatter iso-date
  (DateTimeFormatter/ISO_LOCAL_DATE))

(defn- normalize-date
  "Converts java.util.Date (from clj-yaml) back to YYYY-MM-DD string.
   clj-yaml parses dates as UTC midnight — format must use UTC to avoid timezone shift."
  [v]
  (if (instance? Date v)
    (.format (.atOffset (Instant/ofEpochMilli (.getTime ^Date v)) ZoneOffset/UTC) iso-date)
    (str v)))

(defn- normalize-dates
  "Normalizes date fields in frontmatter that clj-yaml parses as java.util.Date."
  [meta]
  (reduce (fn [m k]
            (if (contains? m k)
              (update m k normalize-date)
              m))
          meta
          [:created :published-on :last-verified]))

(defn parse-post
  "Parses a markdown file into a post map with :meta, :body, :slug, :url."
  [filename content]
  (let [[meta body] (parse-frontmatter content)
        meta (normalize-dates meta)
        title (or (:title meta) (str/replace filename #"\.md$" ""))
        slug (slugify title)
        clean-body (strip-related-section body)
        ;; Strip leading H1 if it matches the title (avoid duplicate)
        body-no-h1 (str/replace clean-body #"(?m)^# .+\n*" "")]
    (merge meta
           {:title title
            :body body-no-h1
            :slug slug
            :url (str "/posts/" slug "/")
            :filename filename})))
