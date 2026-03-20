(ns blog.pages
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [hiccup.util :as hu]
            [blog.layout :as layout]
            [blog.markdown :as markdown])
  (:import [java.time LocalDate ZoneId]
           [java.time.format DateTimeFormatter]
           [java.util Locale]))

(defn- git-last-modified
  "Returns the last git commit date for a file as a YYYY-MM-DD string, or nil."
  [file]
  (try
    (let [result (-> (ProcessBuilder. ["git" "log" "-1" "--format=%cs" (.getAbsolutePath file)])
                     (.start)
                     (.getInputStream)
                     (slurp)
                     (str/trim))]
      (when (seq result) result))
    (catch Exception _ nil)))

(defn load-posts
  "Loads all markdown files from dir, parses them, returns sorted by published-on desc."
  [dir]
  (let [d (io/file dir)]
    (if (.isDirectory d)
      (->> (.listFiles d)
           (filter #(str/ends-with? (.getName %) ".md"))
           (map (fn [f]
                  (let [post     (markdown/parse-post (.getName f) (slurp f))
                        modified (git-last-modified f)]
                    (if (and modified (:published-on post)
                             (pos? (compare modified (str (:published-on post)))))
                      (assoc post :updated-on modified)
                      post))))
           (filter :published-on)
           (sort-by :published-on #(compare %2 %1))
           vec)
      [])))

(defn- published-slugs
  "Set of slugs from published posts, for wikilink resolution."
  [posts]
  (into #{} (map :slug posts)))

(defn- extract-definition-text
  "Extracts the ## Definition section from a glossary entry body as plain text."
  [body]
  (when-let [[_ section] (re-find #"(?s)## Definition\n\n(.*?)(?=\n##|\z)" body)]
    (-> section str/trim (str/replace #"\n+" " "))))

(defn load-glossary
  "Loads all markdown files from glossary-dir with format: definition and publish: true.
   Returns [{:title :slug :definition :html-body :related-links}] sorted by title."
  [glossary-dir]
  (let [d (io/file glossary-dir)]
    (if (.isDirectory d)
      (->> (.listFiles d)
           (filter #(str/ends-with? (.getName %) ".md"))
           (keep (fn [f]
                   (let [[meta body] (markdown/parse-frontmatter (slurp f))
                         title       (:title meta)
                         slug        (:slug meta (markdown/slugify title))
                         definition  (extract-definition-text body)
                         clean-body  (str/replace body #"(?s)## Definition\n\n.*?(?=\n##|\z)" "")
                         html-body   (markdown/render-markdown clean-body)
                         related     (or (:related meta) [])]
                     (when (and title (:publish meta) (= "definition" (name (or (:format meta) ""))))
                       {:title         title
                        :slug          slug
                        :definition    definition
                        :html-body     html-body
                        :related-links (mapv (fn [r] {:label r
                                                       :slug  (markdown/slugify r)})
                                             related)}))))
           (sort-by #(str/lower-case (:title %)))
           vec)
      [])))

(defn- glossary-defs-map
  "Builds {slug → definition-text} from loaded glossary entries."
  [entries]
  (into {} (map (juxt :slug :definition)) entries))

(defn- validate-series
  "Validates a series-map. Checks title consistency and series-order presence."
  [series-map]
  (doseq [[slug {:keys [posts]}] series-map]
    (let [titles (into #{} (map :series-title) posts)]
      (when (< 1 (count titles))
        (println (str "WARNING: Series '" slug "' has inconsistent titles: "
                      (pr-str titles)))))
    (doseq [p posts
            :when (nil? (:series-order p))]
      (println (str "WARNING: Post '" (:title p) "' in series '" slug
                    "' is missing series-order")))))

(defn- group-series
  "Groups posts by :series slug. Returns {slug {:posts [vec] :slug->idx {slug->int}}}."
  [posts]
  (-> (->> posts (filter :series) (group-by :series))
      (update-vals (fn [group]
                     (let [sorted (vec (sort-by :series-order group))]
                       {:posts sorted
                        :slug->idx (into {} (map-indexed (fn [i p] [(:slug p) i])) sorted)})))))

(defn- series-context
  "Returns series navigation context for a post, or nil if not in a series.
   Keys: :series-posts, :series-title, :series-slug, :prev, :next."
  [post series-map]
  (when-let [slug (:series post)]
    (when-let [{:keys [posts slug->idx]} (get series-map slug)]
      (when-let [idx (slug->idx (:slug post))]
        {:series-posts posts
         :series-title (:series-title post)
         :series-slug slug
         :prev (get posts (dec idx))
         :next (get posts (inc idx))}))))

(defn- group-tags
  "Groups posts by tag. Returns {tag-slug [posts]} sorted by published-on desc within each tag."
  [posts]
  (reduce (fn [acc post]
            (reduce (fn [acc2 tag]
                      (update acc2 (name tag) (fnil conj []) post))
                    acc
                    (:tags post)))
          (sorted-map)
          posts))

(defn- render-tag-index
  "Renders a tag index page at /tags/<slug>/."
  [tag posts]
  (layout/base-layout
   (str "#" tag " — Posts")
   (str "All posts tagged #" tag ".")
   (layout/tag-index-layout tag posts)))

(defn- inject-toc-backlinks
  "Inserts ↑ Contents links before each <h2> (except the first)."
  [html-body]
  (let [backlink "<a class=\"toc-back\" href=\"#toc\">\u2191 Contents</a>"
        parts (str/split html-body #"(?=<h2 )")]
    (if (<= (count parts) 1)
      html-body
      (str (first parts)
           (str/join (map #(str backlink %) (rest parts)))))))

(defn- render-post
  "Renders a single post to full HTML page."
  [post slugs glossary-defs series-ctx]
  (let [body (:body post)
        toc (markdown/extract-toc body)
        html-body (-> body
                      (markdown/transform-obsidian slugs glossary-defs)
                      markdown/render-markdown
                      markdown/inline-svgs
                      (cond-> toc inject-toc-backlinks))]
    (layout/base-layout
     (:title post)
     (:description post)
     (layout/post-layout post html-body series-ctx toc))))

(defn- render-series-index
  "Renders a series index page at /series/<slug>/."
  [slug {:keys [posts]}]
  (let [title (:series-title (first posts))]
    (layout/base-layout
     (str title " — Series")
     (str "All posts in the " title " series.")
     (layout/series-index-layout slug posts))))

(defn- render-index
  "Renders the index page."
  [posts]
  (layout/base-layout nil nil (layout/index-layout posts)))

(def ^:private ^DateTimeFormatter rfc822-fmt
  (DateTimeFormatter/ofPattern "EEE, dd MMM yyyy HH:mm:ss Z" Locale/US))

(defn- rfc822-date
  "Formats a date string (YYYY-MM-DD) as RFC 822 for RSS."
  [date-str]
  (let [ld (LocalDate/parse (str date-str))
        zdt (.atStartOfDay ld (ZoneId/of "America/Sao_Paulo"))]
    (.format zdt rfc822-fmt)))

(defn- render-rss
  "Generates RSS 2.0 feed XML."
  [posts]
  (let [items (take 20 posts)]
    (str "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
         "<?xml-stylesheet href=\"feed.xsl\" type=\"text/xsl\"?>\n"
         "<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n"
         "<channel>\n"
         "<title>" layout/site-title "</title>\n"
         "<link>" layout/site-url "</link>\n"
         "<description>" (hu/escape-html layout/site-description) "</description>\n"
         "<language>en</language>\n"
         "<atom:link href=\"" (layout/absolute-url "/feed.xml") "\" rel=\"self\" type=\"application/rss+xml\"/>\n"
         (when (seq items)
           (str "<lastBuildDate>" (rfc822-date (:published-on (first items))) "</lastBuildDate>\n"))
         (str/join
          (for [{:keys [title url description published-on]} items]
            (str "<item>\n"
                 "<title>" (hu/escape-html title) "</title>\n"
                 "<link>" (layout/absolute-url url) "</link>\n"
                 "<guid>" (layout/absolute-url url) "</guid>\n"
                 (when description
                   (str "<description>" (hu/escape-html description) "</description>\n"))
                 "<pubDate>" (rfc822-date published-on) "</pubDate>\n"
                 "</item>\n")))
         "</channel>\n"
         "</rss>")))

(defn- render-sitemap
  "Generates sitemap.xml."
  [posts series-map tag-map diagrams glossary]
  (str "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
       "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"
       "<url><loc>" (layout/absolute-url "/") "</loc></url>\n"
       "<url><loc>" (layout/absolute-url "/about/") "</loc></url>\n"
       "<url><loc>" (layout/absolute-url "/diagrams/") "</loc></url>\n"
       "<url><loc>" (layout/absolute-url "/glossary/") "</loc></url>\n"
       (str/join
        (for [{:keys [url published-on]} posts]
          (str "<url>"
               "<loc>" (layout/absolute-url url) "</loc>"
               "<lastmod>" published-on "</lastmod>"
               "</url>\n")))
       (str/join
        (for [[slug {:keys [posts]}] series-map]
          (str "<url>"
               "<loc>" (layout/absolute-url (layout/series-path slug)) "</loc>"
               "<lastmod>" (:published-on (last posts)) "</lastmod>"
               "</url>\n")))
       (str/join
        (for [[tag posts] tag-map]
          (str "<url>"
               "<loc>" (layout/absolute-url (layout/tag-path tag)) "</loc>"
               "<lastmod>" (:published-on (first posts)) "</lastmod>"
               "</url>\n")))
       (str/join
        (for [{:keys [slug]} diagrams]
          (str "<url>"
               "<loc>" (layout/absolute-url (layout/diagram-path slug)) "</loc>"
               "</url>\n")))
       (str/join
        (for [{:keys [slug]} glossary]
          (str "<url>"
               "<loc>" (layout/absolute-url (layout/glossary-path slug)) "</loc>"
               "</url>\n")))
       "</urlset>"))

(defn- render-about
  "Renders the about page from pages/about.md."
  []
  (let [f (io/file "pages" "about.md")
        html-body (-> (slurp f) markdown/render-markdown)]
    (layout/base-layout
     "About" nil
     (layout/about-layout html-body))))

(defn- render-glossary-entry
  "Renders a single glossary entry page."
  [entry]
  (layout/base-layout
   (:title entry)
   (:definition entry)
   (layout/glossary-entry-layout entry)))

(defn- render-glossary-index
  "Renders /glossary/ index page."
  [entries]
  (layout/base-layout
   "Glossary"
   "Definitions for terms used across the blog."
   (layout/glossary-index-layout entries)))

(defn- svg-slug
  "agent-loop.svg → agent-loop"
  [filename]
  (str/replace filename #"\.svg$" ""))

(defn- slug->title
  "agent-loop → Agent Loop"
  [slug]
  (->> (str/split slug #"-") (map str/capitalize) (str/join " ")))

(defn- extract-diagram-alt
  "Finds alt text for src-path in a post body (raw markdown).
   Matches Markdown image syntax: ![alt text](/assets/foo.svg)
   Returns nil if alt is absent or empty."
  [src-path body]
  (let [q (java.util.regex.Pattern/quote src-path)
        p (re-pattern (str "!\\[([^\\]]*)\\]\\(" q "\\)"))
        m (re-find p body)]
    (when m
      (let [alt (nth m 1 nil)]
        (when (seq alt) alt)))))

(defn- inject-diagram-a11y
  "Injects ARIA attributes and <title>/<desc> into an SVG string for diagram pages.
   Mirrors markdown/inject-svg-a11y but operates on diagram metadata maps."
  [svg-content slug title description]
  (str/replace svg-content #"(<svg)([ \t\n][^>]*)?(>)"
               (fn [[_ tag attrs close]]
                 (str tag
                      (or attrs "")
                      " role=\"img\""
                      " aria-labelledby=\"diag-" slug "-title\""
                      (when description
                        (str " aria-describedby=\"diag-" slug "-desc\""))
                      close
                      "<title id=\"diag-" slug "-title\">" title "</title>"
                      (when description
                        (str "<desc id=\"diag-" slug "-desc\">" description "</desc>"))))))

(defn scan-diagrams
  "Builds diagram metadata from assets-dir/*.svg cross-referenced with posts.
   assets-dir is a string path (e.g. \"assets\").
   Returns [{:slug :title :back-post :description :svg-content}]
   :svg-content is the raw SVG string with XML declaration stripped and ARIA injected."
  [posts assets-dir]
  (let [asset-dir (io/file assets-dir)]
    (if (.isDirectory asset-dir)
      (->> (.listFiles asset-dir)
           (filter #(str/ends-with? (.getName %) ".svg"))
           (map (fn [f]
                  (let [slug           (svg-slug (.getName f))
                        title          (slug->title slug)
                        src            (str "/assets/" (.getName f))
                        back           (first (filter #(str/includes? (:body %) src) posts))
                        alt            (when back (extract-diagram-alt src (:body back)))
                        svg-raw        (-> (slurp f)
                                           (str/replace #"<\?xml[^>]*\?>\s*" "")
                                           str/trim)
                        svg-content    (inject-diagram-a11y svg-raw slug title alt)
                        mmd-file       (io/file (str/replace (.getAbsolutePath f) #"\.svg$" ".mmd"))
                        mermaid-source (when (.exists mmd-file) (slurp mmd-file))]
                    {:slug           slug
                     :title          title
                     :back-post      (when back {:title (:title back) :url (:url back)})
                     :description    alt
                     :svg-content    svg-content
                     :mermaid-source mermaid-source})))
           vec)
      [])))

(defn- render-llms-txt
  "Generates llms.txt for AI crawler discoverability."
  [posts]
  (let [published (filter :published-on posts)]
    (str "# João Lopes — joaolopes.dev.br\n\n"
         "> Notes on software, systems, and thinking tools.\n\n"
         "## About\n\n"
         "João Lopes is a software engineer at Nubank and an AI-first practitioner.\n"
         "He builds systems where AI agents are collaborators, not afterthoughts.\n"
         "He writes from first-hand experience — no trend summaries, no documentation rewrites.\n\n"
         "## Topics\n\n"
         "- AI-first engineering: agents, skills, rules, hooks, MCP\n"
         "- Knowledge systems: Obsidian vaults, zettelkasten, working memory for AI\n"
         "- Developer tooling: Clojure, CLI, static site generation\n"
         "- Career and craft: IC5 engineering, thinking tools, deliberate practice\n\n"
         "## Blog\n\n"
         "URL: " layout/site-url "\n"
         "RSS: " (layout/absolute-url "/feed.xml") "\n\n"
         "## Posts\n\n"
         (str/join "\n"
          (for [{:keys [title url description published-on]} published]
            (str "- " title "\n"
                 "  " (layout/absolute-url url) "\n"
                 (when description (str "  " description "\n")))))
         "\n## Contact\n\n"
         "GitHub: https://github.com/j0a0m4\n"
         "LinkedIn: https://www.linkedin.com/in/j0a0m4/\n")))

(defn- render-tags-overview
  "Renders the /tags/ overview page listing all tags."
  [tag-map]
  (layout/base-layout
   "Tags"
   "All tags."
   (layout/tags-overview-layout tag-map)))

(defn- render-diagram-page
  "Renders a single diagram page to full HTML."
  [{:keys [title description] :as diagram}]
  (layout/base-layout
   (str title " — Diagram")
   description
   (layout/diagram-page-layout diagram)))

(defn- render-diagrams-index
  "Renders the /diagrams/ index page."
  [diagrams]
  (layout/base-layout
   "Diagrams"
   "Visual diagrams from the blog."
   (layout/diagrams-index-layout diagrams)))

(defn- render-404 []
  (layout/base-layout
   "Not Found" nil
   (layout/not-found-layout)))

(defn get-pages
  "Builds the Stasis page map from posts and assets directories."
  [posts-dir assets-dir]
  (let [posts         (load-posts posts-dir)
        glossary      (load-glossary "glossary")
        defs          (glossary-defs-map glossary)
        slugs         (published-slugs posts)
        series-map    (group-series posts)
        tag-map       (group-tags posts)
        diagrams      (scan-diagrams posts assets-dir)
        _             (validate-series series-map)]
    (merge
     {"/" (fn [_] (render-index posts))
      "/tags/" (fn [_] (render-tags-overview tag-map))
      "/glossary/" (fn [_] (render-glossary-index glossary))
      "/about/" (fn [_] (render-about))
      "/feed.xml" (fn [_] (render-rss posts))
      "/sitemap.xml" (fn [_] (render-sitemap posts series-map tag-map diagrams glossary))
      "/llms.txt" (fn [_] (render-llms-txt posts))
      "/404.html" (fn [_] (render-404))
      "/diagrams/" (fn [_] (render-diagrams-index diagrams))}
     (into {}
           (map (fn [post]
                  [(:url post)
                   (fn [_] (render-post post slugs defs (series-context post series-map)))]))
           posts)
     (into {}
           (map (fn [entry]
                  [(layout/glossary-path (:slug entry))
                   (fn [_] (render-glossary-entry entry))]))
           glossary)
     (into {}
           (map (fn [[slug group]]
                  [(layout/series-path slug)
                   (fn [_] (render-series-index slug group))]))
           series-map)
     (into {}
           (map (fn [[tag posts]]
                  [(layout/tag-path tag)
                   (fn [_] (render-tag-index tag posts))]))
           tag-map)
     (into {}
           (map (fn [d]
                  [(layout/diagram-path (:slug d))
                   (fn [_] (render-diagram-page d))])
                diagrams)))))
