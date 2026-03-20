(ns blog.markdown
  (:require [clj-yaml.core :as yaml]
            [clojure.java.io :as io]
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

(defn slugify [title]
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

(defn- transform-glossary-links
  "[[glossary:Term]] or [[glossary:Term|display]] →
   <details class='glossary-term'> with inline definition baked in.
   glossary-defs is {slug → definition-text}.
   Falls back to plain <a href> if no entry found.
   MUST run before transform-wikilinks (ordering constraint)."
  [text glossary-defs]
  (str/replace text #"\[\[glossary:([^\]|]+)(?:\|([^\]]+))?\]\]"
    (fn [[_ target display]]
      (let [label (or display target)
            slug  (slugify target)
            defn  (get glossary-defs slug)]
        (if defn
          (str "<details class=\"glossary-term\">"
               "<summary>" label "</summary>"
               "<div><strong>" target "</strong> " defn "</div>"
               "</details>")
          (str "<a href=\"/glossary/" slug "/\">" label "</a>"))))))

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
   published-slugs: set of slugs for post cross-linking.
   glossary-defs: {slug → definition-text} map for glossary term expansion.
   NOTE: transform-glossary-links MUST run before transform-wikilinks."
  [text published-slugs glossary-defs]
  (-> text
      transform-highlights
      transform-image-embeds
      transform-callouts
      (transform-glossary-links glossary-defs)
      (transform-wikilinks published-slugs)))

(defn- strip-related-section
  "Removes ## Related section (vault internal, not public)."
  [body]
  (str/replace body #"(?s)\n## Related\n.*$" ""))

(defn- heading-anchor
  "Replicates commonmark-java HeadingAnchorExtension slugification:
   lowercase → spaces to hyphens → strip remaining non-word/non-hyphen chars."
  [text]
  (-> text
      str/lower-case
      str/trim
      (str/replace #"\s+" "-")
      (str/replace #"[^\w-]" "")))

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

(def ^:private img-svg-pattern
  #"<img\s+[^>]*src=\"(/assets/[^\"]+\.svg)\"[^>]*>")

(defn- extract-alt
  "Extracts alt attribute value from an HTML img tag string.
   Returns nil if absent or empty."
  [img-tag]
  (when-let [alt (second (re-find #"alt=\"([^\"]*)\"" img-tag))]
    (when (seq alt) alt)))

(defn- svg-slug-from-path
  "Derives diagram slug from SVG src path.
   Example: /assets/agent-loop.svg → agent-loop"
  [src-path]
  (-> src-path
      (str/replace #"^/assets/" "")
      (str/replace #"\.svg$" "")))

(defn- inject-svg-a11y
  "Injects role, aria-labelledby, and (when alt present) aria-describedby onto
   the <svg> opening tag. Inserts <title> and <desc> as first children.
   Never emits aria-describedby without a matching <desc>."
  [svg-content slug title alt]
  (str/replace svg-content #"(<svg)([ \t\n][^>]*)?(>)"
               (fn [[_ tag attrs close]]
                 (str tag
                      (or attrs "")
                      " role=\"img\""
                      " aria-labelledby=\"diag-" slug "-title\""
                      (when alt
                        (str " aria-describedby=\"diag-" slug "-desc\""))
                      close
                      "<title id=\"diag-" slug "-title\">" title "</title>"
                      (when alt
                        (str "<desc id=\"diag-" slug "-desc\">" alt "</desc>"))))))

(defn inline-svgs
  "Replaces <img> tags pointing to local SVGs with accessible <figure> elements.
   Extracts Markdown alt text to inject as SVG <title>/<desc> and visible
   <details> transcript. SVGs inherit the page's fonts and styles when inlined."
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
                           svg     (inject-svg-a11y svg-raw slug title alt)
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
