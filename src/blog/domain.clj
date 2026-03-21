(ns blog.domain
  (:require [clj-yaml.core :as yaml]
            [clojure.string :as str])
  (:import [java.time ZoneId]
           [java.time.format DateTimeFormatter]))

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

;;; ── Date normalization ───────────────────────────────────────────────────────

(def ^:private iso-fmt (DateTimeFormatter/ofPattern "yyyy-MM-dd"))
(def ^:private display-fmt (DateTimeFormatter/ofPattern "d MMMM yyyy" java.util.Locale/ENGLISH))
(def ^:private rfc822-fmt (DateTimeFormatter/ofPattern "EEE, dd MMM yyyy HH:mm:ss Z" java.util.Locale/ENGLISH))

(defn normalize-date
  "Converts a clj-yaml date value (java.util.Date or String) to a YYYY-MM-DD string.
   Returns nil when value is nil or unparseable."
  [v]
  (cond
    (nil? v)                    nil
    (instance? java.util.Date v) (-> v .toInstant (.atZone (ZoneId/of "UTC")) .toLocalDate (.format iso-fmt))
    (string? v)                  (when (re-matches #"\d{4}-\d{2}-\d{2}.*" v) (subs v 0 10))
    :else                        nil))

(defn display-date
  "Converts a YYYY-MM-DD string to a human-readable date like '16 March 2026'."
  [iso-str]
  (when iso-str
    (-> (java.time.LocalDate/parse iso-str iso-fmt) (.format display-fmt))))

(defn rfc822-date
  "Converts a YYYY-MM-DD string to RFC 822 format for RSS feeds."
  [iso-str]
  (when iso-str
    (-> (java.time.LocalDate/parse iso-str iso-fmt)
        (.atStartOfDay (ZoneId/of "UTC"))
        (.format rfc822-fmt))))

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
       :dates      {:created-on   (normalize-date (:created-on fm))
                    :published-on (normalize-date (:published-on fm))
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
