(ns blog.domain
  (:require [clj-yaml.core :as yaml]
            [clojure.string :as str]))

;; Migration map — functions moved from blog.markdown and blog.pages:
;;
;; FROM blog.markdown → blog.domain
;;   parse-frontmatter       — pure YAML frontmatter split
;;   slugify                 — pure string → slug transformation
;;   transform-image-embeds  — Obsidian ![[img]] → Markdown ![]() (no HTML output)
;;   strip-related-section   — removes ## Related section from markdown body
;;   heading-anchor          — pure slug derivation for TOC anchors
;;   extract-toc             — pure heading parser, returns data (no HTML)
;;   extract-alt             — pure alt attribute extraction from img tag string
;;   svg-slug-from-path      — pure /assets/foo.svg → foo derivation
;;   normalize-date          — pure java.util.Date → YYYY-MM-DD string
;;   normalize-dates         — pure frontmatter date normalization
;;   parse-post              — pure file content → post map (no HTML, no IO)
;;
;; FROM blog.markdown → blog.render
;;   transform-highlights    — ==text== → <mark>text</mark>
;;   transform-callouts      — > [!note] → <blockquote class="callout-*">
;;   transform-glossary-links — [[glossary:T]] → <abbr>/<a> HTML
;;   transform-wikilinks     — [[Title]] → <a> or plain text
;;   transform-obsidian      — orchestrates all Obsidian pre-processing transforms
;;   render-markdown         — markdown string → HTML via CommonMark
;;   inject-svg-a11y         — injects role/aria/title/desc into <svg> markup
;;   inline-svgs             — replaces <img src="*.svg"> with <figure> + inlined SVG (IO)
;;
;; FROM blog.pages → blog.domain
;;   published-slugs         — pure #{slug} derivation from post list
;;   extract-definition-text — pure regex extraction of first Definition paragraph
;;   glossary-defs-map       — pure {slug → definition} map from glossary entries
;;   validate-series         — pure series consistency check (side-effect: println)
;;   group-series            — pure {slug → {:posts :slug->idx}} grouping
;;   series-context          — pure prev/next navigation context for a post
;;   group-tags              — pure {tag-slug → [posts]} grouping
;;   rfc822-date             — pure YYYY-MM-DD → RFC 822 date string
;;   svg-slug                — pure foo.svg → foo (NOTE: duplicate of svg-slug-from-path; DELETE one)
;;   slug->title             — pure foo-bar → Foo Bar string transformation
;;   extract-diagram-alt     — pure regex extraction of alt text from post body
;;
;; FROM blog.pages → blog.render
;;   render-tag-index        — produces HTML page via layout
;;   inject-toc-backlinks    — mutates HTML string (inserts ↑ Contents anchors)
;;   render-post             — produces full HTML post page
;;   render-series-index     — produces HTML series index page
;;   render-index            — produces HTML index page
;;   render-rss              — produces RSS 2.0 XML string
;;   render-sitemap          — produces sitemap.xml string
;;   render-about            — reads file + produces HTML (IO in render layer)
;;   render-glossary-body    — applies transform-obsidian + render-markdown to entry
;;   render-glossary-entry   — produces HTML glossary entry page
;;   render-glossary-index   — produces HTML glossary index page
;;   inject-diagram-a11y     — injects ARIA into SVG for diagram pages (NOTE: duplicate of inject-svg-a11y; DELETE one)
;;   render-llms-txt         — produces llms.txt plain text string
;;   render-tags-overview    — produces HTML tags overview page
;;   render-diagram-page     — produces HTML diagram detail page
;;   render-diagrams-index   — produces HTML diagrams index page
;;   render-404              — produces HTML 404 page
;;
;; FROM blog.pages → blog.io.filesystem
;;   git-last-modified       — spawns git process, reads stdout
;;   load-posts              — reads markdown files from disk, parses, sorts
;;   load-glossary           — reads glossary markdown files from disk
;;   scan-diagrams           — reads SVG and .mmd files from assets dir (IO)
;;
;; STAYS in blog.pages (orchestration entry point)
;;   get-pages               — wires IO + domain + render into Stasis page map
;;
;; DUPLICATES TO DELETE (keep one canonical version in blog.domain / blog.render)
;;   svg-slug (pages) vs svg-slug-from-path (markdown)  → keep svg-slug-from-path, delete svg-slug
;;   inject-diagram-a11y (pages) vs inject-svg-a11y (markdown) → unify into single fn in blog.render

;;; ── Utilities ────────────────────────────────────────────────────────────────

(defn slugify [title]
  (-> title
      str/lower-case
      (str/replace #"[^\w\s-]" "")
      (str/replace #"[\s_]+" "-")
      (str/replace #"-+" "-")
      (str/replace #"^-|-$" "")))

(defn- warn! [msg]
  (binding [*out* *err*]
    (println (str "[WARN] " msg))))

;;; ── Post parsing ─────────────────────────────────────────────────────────────

(defn parse-post [{:keys [path raw-frontmatter raw-body git-updated-on]}]
  (let [fm (yaml/parse-string raw-frontmatter)]
    (when-not (:title fm)
      (warn! (str "Missing :title in " path)))
    (when-not (:published-on fm)
      (warn! (str "Missing :published-on in " path)))
    (when (and (:title fm) (:published-on fm))
      {:identity   {:title (:title fm)
                    :slug  (slugify (:title fm))}
       :content    {:body        raw-body
                    :description (:description fm)}
       :dates      {:created-on   (str (:created-on fm))
                    :published-on (str (:published-on fm))
                    :updated-on   git-updated-on}
       :taxonomy   {:tags   (mapv keyword (:tags fm []))
                    :series (when (:series fm)
                              {:id    (keyword (:series fm))
                               :order (:series-order fm)
                               :title (:series-title fm)})}
       :external   {:linkedin-url (:linkedin-url fm)}
       :navigation {:prev nil :next nil}})))

(defn parse-posts [raw-maps]
  (->> raw-maps
       (keep parse-post)
       (filter #(get-in % [:dates :published-on]))
       (sort-by #(get-in % [:dates :published-on]) #(compare %2 %1))))

;;; ── Glossary parsing ─────────────────────────────────────────────────────────

(defn- first-paragraph [body]
  (->> (str/split (str/trim body) #"\n\n")
       (map str/trim)
       (remove #(str/starts-with? % "#"))
       first))

(defn- parse-glossary-entry [{:keys [raw-frontmatter raw-body]}]
  (let [fm (yaml/parse-string raw-frontmatter)]
    (when (:publish fm)
      {:title      (:title fm)
       :slug       (or (:slug fm) (slugify (str (:title fm ""))))
       :definition (first-paragraph raw-body)
       :related    (vec (:related fm []))
       :publish    true})))

(defn parse-glossary [raw-maps]
  (keep parse-glossary-entry raw-maps))

;;; ── Page parsing ─────────────────────────────────────────────────────────────

(defn parse-page [{:keys [raw-frontmatter raw-body]}]
  (let [fm (yaml/parse-string raw-frontmatter)]
    {:slug  (or (:slug fm) (slugify (str (:title fm ""))))
     :title (:title fm)
     :body  raw-body}))

;;; ── Diagram parsing ──────────────────────────────────────────────────────────

(defn- title-case [s]
  (->> (str/split s #"-")
       (map str/capitalize)
       (str/join " ")))

(defn- extract-alt [posts filename]
  (let [pattern (re-pattern (str "!\\[([^\\]]+)\\]\\(/assets/" (java.util.regex.Pattern/quote filename) "\\)"))]
    (some #(second (re-find pattern (get-in % [:content :body] ""))) posts)))

(defn parse-diagrams [raw-maps posts]
  (map (fn [{:keys [filename content]}]
         (let [slug (str/replace filename #"\.svg$" "")]
           {:slug    slug
            :path    (str "/assets/" filename)
            :alt     (or (extract-alt posts filename) (title-case slug))
            :content content}))
       raw-maps))

;;; ── Series enrichment ────────────────────────────────────────────────────────

(defn group-series [posts]
  (->> posts
       (filter #(get-in % [:taxonomy :series]))
       (group-by #(get-in % [:taxonomy :series :id]))))

(defn group-tags [posts]
  (->> posts
       (mapcat (fn [p] (map #(vector % p) (get-in p [:taxonomy :tags] []))))
       (reduce (fn [acc [tag post]] (update acc tag (fnil conj []) post)) {})))

(defn enrich-series [posts]
  (let [by-series (group-series posts)]
    (map (fn [post]
           (if-let [series-posts (get by-series (get-in post [:taxonomy :series :id]))]
             (let [sorted (sort-by #(get-in % [:taxonomy :series :order]) series-posts)
                   idx    (.indexOf sorted post)]
               (assoc-in post [:navigation]
                 {:prev (when (pos? idx) (nth sorted (dec idx)))
                  :next (when (< idx (dec (count sorted))) (nth sorted (inc idx)))}))
             post))
         posts)))

(defn validate-series [posts]
  (let [grouped (group-series posts)]
    (mapcat (fn [[id series-posts]]
              (let [titles (set (map #(get-in % [:taxonomy :series :title]) series-posts))]
                (cond-> []
                  (> (count titles) 1)
                  (conj (str "Series " id " has inconsistent titles: " titles))
                  (some nil? (map #(get-in % [:taxonomy :series :order]) series-posts))
                  (conj (str "Series " id " has posts missing :order")))))
            grouped)))

;;; ── Wikilink expansion ───────────────────────────────────────────────────────

(defn- glossary-abbr [{:keys [slug definition]} display]
  (str "<abbr class=\"glossary-term\""
       " title=\"" definition "\""
       " data-slug=\"" slug "\""
       " data-definition=\"" definition "\">"
       "<a href=\"/glossary/" slug "/\">" display "</a>"
       "</abbr>"))

(defn- expand-post-wikilinks [body glossary-by-title]
  (str/replace body
    #"\[\[glossary:([^\]|]+)(?:\|([^\]]+))?\]\]"
    (fn [[_ term display]]
      (if-let [entry (get glossary-by-title term)]
        (glossary-abbr entry (or display term))
        (or display term)))))

(defn expand-wikilinks [posts glossary]
  (let [by-title (into {} (map (juxt :title identity) glossary))]
    (map #(update-in % [:content :body] expand-post-wikilinks by-title) posts)))
