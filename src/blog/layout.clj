(ns blog.layout
  (:require [clojure.data.json :as json]
            [clojure.string :as str]
            [hiccup2.core :as h]))

;; ── Kept for backwards compat with blog.pages (old controller) ────────────────
(def site-title "João Lopes") ;;TODO(task-14): remove — kept for old blog.pages controller
(def site-url "https://joaolopes.dev.br") ;;TODO(task-14): remove — kept for old blog.pages controller
(def site-description "Notes on software, systems, and thinking tools.") ;;TODO(task-14): remove — kept for old blog.pages controller
(def base-path (or (System/getenv "BASE_PATH") "")) ;;TODO(task-14): remove — kept for old blog.pages controller

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

(defn diagram-path
  "Canonical path for a diagram page."
  [slug]
  (str "/diagrams/" slug "/"))

(defn glossary-path
  "Canonical path for a glossary entry page."
  [slug]
  (str "/glossary/" slug "/"))

;;; ── Base layout ──────────────────────────────────────────────────────────────

(defn base-layout
  "Full HTML document. content is a hiccup vector to embed in <main>.
   config has :site-title :site-url :site-desc :base-path.
   Single serialization boundary — all other layout fns return hiccup data."
  [content {:keys [site-title site-url site-desc base-path]
            :or   {site-title "João Lopes"
                   site-url   "https://joaolopes.dev.br"
                   site-desc  "Notes on software, systems, and thinking tools."
                   base-path  ""}}]
  (let [bp (or base-path (System/getenv "BASE_PATH") "")
        href* #(str bp %)]
    (str
     "<!DOCTYPE html>\n"
     (h/html
      [:html {:lang "en"}
       [:head
        [:meta {:charset "utf-8"}]
        [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
        [:meta {:name "color-scheme" :content "dark"}]
        [:title site-title]
        [:meta {:name "description" :content site-desc}]
        [:link {:rel "preconnect" :href "https://fonts.googleapis.com"}]
        [:link {:rel "preconnect" :href "https://fonts.gstatic.com" :crossorigin ""}]
        [:link {:rel "stylesheet"
                :href "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"}]
        [:link {:rel "stylesheet" :href (href* "/css/style.css")}]
        [:link {:rel "icon" :type "image/svg+xml" :href (href* "/favicon.svg")}]
        [:link {:rel "alternate" :type "application/rss+xml"
                :title site-title :href (href* "/feed.xml")}]
        [:link {:rel "stylesheet"
                :href "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/dracula.min.css"}]
        [:script {:src "/js/main.js" :defer true}]]
       [:body
        [:header
         [:nav
          [:a.site-logo {:href (href* "/")}
           [:svg.logo {:viewBox "0 0 32 32" :width "40" :height "40" :aria-hidden "true"}
            [:path.logo-path {:d "M16 16c-2-2.5-4-4.5-6-4.5a4.5 4.5 0 1 0 0 9c2 0 4-2 6-4.5zm0 0c2 2.5 4 4.5 6 4.5a4.5 4.5 0 1 0 0-9c-2 0-4 2-6 4.5z"
                              :fill "none" :stroke "currentColor" :stroke-width "2"
                              :stroke-linecap "round" :stroke-linejoin "round"}]]
           site-title]
          [:button.nav-toggle
           {:aria-expanded "false"
            :aria-controls "nav-menu"
            :aria-label "Menu"}
           [:span.hamburger-icon {:aria-hidden "true"} "☰"]]
          [:span#nav-menu.nav-links
           [:a {:href (href* "/")} "Posts"]
           [:a {:href (href* "/tags/")} "Tags"]
           [:a {:href (href* "/glossary/")} "Glossary"]
           [:a {:href (href* "/diagrams/")} "Diagrams"]
           [:a {:href (href* "/about/")} "About"]
           [:a {:href (href* "/feed.xml")} "RSS"]]]]
        [:main content]
        [:footer
         [:p (str "© " (.getYear (java.time.LocalDate/now)) " ")
          [:a {:href "https://github.com/j0a0m4" :target "_blank" :rel "noopener noreferrer"} "João Lopes"]]
         [:p "Theme inspired by "
          [:a {:href "https://github.com/bennyxguo/Obsidian-Obsidianite"
               :target "_blank" :rel "noopener noreferrer"} "Obsidianite"]]]]]))))

;;; ── Glossary layouts ─────────────────────────────────────────────────────────

(defn glossary-index-layout
  "A-Z sorted list of all published glossary entries. Returns hiccup."
  [entries config]
  (let [bp        (or (:base-path config) (System/getenv "BASE_PATH") "")
        href*     #(str bp %)
        sorted    (sort-by #(str/lower-case (:title %)) entries)
        grouped   (group-by #(str/upper-case (subs (:title %) 0 1)) sorted)]
    [:article.glossary-index
     [:h1 "Glossary"]
     [:p.subtitle "Definitions for terms used across the blog."]
     (for [[letter es] (sort-by first grouped)]
       [:section.glossary-letter {:id (str/lower-case letter)}
        [:h2 letter]
        [:ul
         (for [{:keys [title slug definition]} es]
           [:li
            [:a {:href (href* (glossary-path slug))} title]
            " — "
            definition])]])]))

(defn glossary-entry-layout
  "Single glossary entry page. entry has :title :html-body :related-links. Returns hiccup."
  [entry config]
  (let [bp    (or (:base-path config) (System/getenv "BASE_PATH") "")
        href* #(str bp %)]
    [:article.glossary-entry
     [:h1 (:title entry)]
     [:p.glossary-back [:a {:href (href* "/glossary/")} "← Glossary"]]
     [:div.glossary-body
      (h/raw (or (:html-body entry) ""))]
     (when (seq (:related-links entry))
       [:nav.glossary-related
        [:span "Related: "]
        (interpose " · "
          (for [{:keys [label slug]} (:related-links entry)]
            [:a {:href (href* (glossary-path slug))} label]))])]))

;;; ── Series / tag helpers ─────────────────────────────────────────────────────

(defn- series-toc
  "Ordered list of series posts, current one highlighted. Returns hiccup."
  [{:keys [series-posts series-title series-slug]} current-slug config]
  (let [bp    (or (:base-path config) (System/getenv "BASE_PATH") "")
        href* #(str bp %)]
    [:aside.series-toc
     [:p.series-label
      [:a {:href (href* (series-path series-slug))} series-title]]
     [:ol
      (for [p series-posts]
        (let [active? (= (get-in p [:identity :slug]) current-slug)]
          [:li {:class (when active? "current")}
           (if active?
             [:strong (get-in p [:identity :title])]
             [:a {:href (href* (or (:url p) (str "/posts/" (get-in p [:identity :slug]) "/")))}
              (get-in p [:identity :title])])]))]]))

(defn- series-nav
  "Prev/next navigation block with link to series index. Returns hiccup."
  [{:keys [prev next series-slug series-title]} config]
  (let [bp    (or (:base-path config) (System/getenv "BASE_PATH") "")
        href* #(str bp %)]
    [:nav.series-nav
     (if prev
       [:a.series-prev {:href (href* (or (:url prev) (str "/posts/" (get-in prev [:identity :slug]) "/")))}
        (str "\u2190 " (get-in prev [:identity :title]))]
       [:span])
     [:a.series-index {:href (href* (series-path series-slug))}
      series-title]
     (if next
       [:a.series-next {:href (href* (or (:url next) (str "/posts/" (get-in next [:identity :slug]) "/")))}
        (str (get-in next [:identity :title]) " \u2192")]
       [:span])]))

(defn- series-json-ld
  "JSON-LD BlogPosting with isPartOf CreativeWorkSeries. Returns hiccup."
  [post {:keys [series-title series-slug]} config]
  (let [site-url* (or (:site-url config) site-url)
        title     (get-in post [:identity :title])
        pub-on    (get-in post [:dates :published-on])
        desc      (get-in post [:content :description])
        slug      (get-in post [:identity :slug])
        url       (str "/posts/" slug "/")
        order     (get-in post [:taxonomy :series :order])
        ld        (cond-> {"@context"    "https://schema.org"
                           "@type"       "BlogPosting"
                           "headline"    title
                           "datePublished" (str pub-on)
                           "url"         (str site-url* url)
                           "author"      {"@type" "Person" "name" "João Lopes"}
                           "isPartOf"    {"@type" "CreativeWorkSeries"
                                          "name"  series-title
                                          "url"   (str site-url* (series-path series-slug))}
                           "position"    order}
                    desc (assoc "description" desc))]
    [:script {:type "application/ld+json"} (h/raw (json/write-str ld))]))

(defn series-index-layout
  "Full series index page. Returns hiccup."
  [slug posts config]
  (let [bp    (or (:base-path config) (System/getenv "BASE_PATH") "")
        href* #(str bp %)
        title (or (get-in (first posts) [:taxonomy :series :title])
                  (:series-title (first posts)) ;;TODO(task-14): remove compat shim — old shape
                  (str slug))]
    [:div.series-index
     [:h1 title]
     [:p.series-count (str (count posts) " post" (when (not= 1 (count posts)) "s") " in this series")]
     [:ol.series-full-toc
      (for [p posts]
        (let [ptitle  (or (get-in p [:identity :title]) (:title p)) ;;TODO(task-14): remove compat shim — old shape
              purl    (or (:url p) (str "/posts/" (or (get-in p [:identity :slug]) (:slug p)) "/"))
              pub-on  (or (get-in p [:dates :published-on]) (:published-on p)) ;;TODO(task-14): remove compat shim — old shape
              desc    (or (get-in p [:content :description]) (:description p))] ;;TODO(task-14): remove compat shim — old shape
          [:li
           [:a {:href (href* purl)} ptitle]
           [:time {:datetime (str pub-on)} (str pub-on)]
           (when desc [:p.description desc])]))]]))

(defn tag-index-layout
  "Tag index page. Returns hiccup."
  [tag posts config]
  (let [bp    (or (:base-path config) (System/getenv "BASE_PATH") "")
        href* #(str bp %)]
    [:div.tag-index
     [:h1 (str "#" (name tag))]
     [:p.series-count (str (count posts) " post" (when (not= 1 (count posts)) "s") " with this tag")]
     [:ul.tag-full-toc
      (for [p posts]
        (let [ptitle (or (get-in p [:identity :title]) (:title p)) ;;TODO(task-14): remove compat shim — old shape
              purl   (or (:url p) (str "/posts/" (or (get-in p [:identity :slug]) (:slug p)) "/"))
              pub-on (or (get-in p [:dates :published-on]) (:published-on p)) ;;TODO(task-14): remove compat shim — old shape
              desc   (or (get-in p [:content :description]) (:description p))] ;;TODO(task-14): remove compat shim — old shape
          [:li
           [:a {:href (href* purl)} ptitle]
           [:time {:datetime (str pub-on)} (str pub-on)]
           (when desc [:p.description desc])]))]]))

(defn tags-overview-layout
  "All-tags overview page. Returns hiccup."
  [tag-map config]
  (let [bp    (or (:base-path config) (System/getenv "BASE_PATH") "")
        href* #(str bp %)]
    [:div.tags-overview
     [:h1 "Tags"]
     [:div.tags-cloud
      (for [[tag posts] tag-map]
        [:a.tag-pill {:href (href* (tag-path (name tag)))}
         (str "#" (name tag))
         [:span.tag-count (str (count posts))]])]]))

;;; ── TOC helper ───────────────────────────────────────────────────────────────

(defn- toc-nav
  "Table of contents from extracted headings. Returns hiccup or nil."
  [headings]
  (when (seq headings)
    (let [h2s           (filter #(= 2 (:level %)) headings)
          section-count (let [n (count h2s)] (str n (if (= 1 n) " section" " sections")))]
      [:details.toc.toc-details {:open true}
       [:summary.toc-label {:data-count section-count} "Contents"]
       [:nav {:id "toc"}
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
                   [:li [:a {:href (str "#" (:anchor s))} (:text s)]])])]))]]])))

;;; ── Icon helpers ─────────────────────────────────────────────────────────────

(defn- icon-link
  "Renders an anchor with an inline SVG icon + label."
  [href-str label icon-path & [{:keys [target onclick extra-class]}]]
  [:a (cond-> {:href href-str :class (str "icon-link" (when extra-class (str " " extra-class)))}
        target  (assoc :target target :rel "noopener noreferrer")
        onclick (assoc :onclick onclick))
   [:svg {:viewBox "0 0 16 16" :width "14" :height "14" :aria-hidden "true"}
    [:path {:d icon-path}]]
   label])

(def ^:private icons
  {:linkedin "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
   :x       "M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75zm-.86 13.028h1.36L4.323 2.145H2.865z"
   :bluesky "M8 1.5C4.134 1.5 1 4.358 1 7.89c0 2.13 1.129 4.006 2.84 5.12L3.5 14.5l1.68-.672A7.07 7.07 0 0 0 8 14.28a7.07 7.07 0 0 0 2.82-.452L12.5 14.5l-.34-1.49C13.871 11.896 15 10.02 15 7.89 15 4.358 11.866 1.5 8 1.5zM5.5 9a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm3 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm3 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z"
   :copy    "M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1zM9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3z"
   :github  "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"})

;;; ── Post layout ──────────────────────────────────────────────────────────────

(defn post-layout
  "Article layout for a single post. Returns hiccup.
   Accepts both the nested domain model and the legacy flat post shape from blog.markdown/parse-post.

   Nested model keys: :identity {:title :slug} :content {:body :description}
     :dates {:published-on :updated-on} :taxonomy {:tags :series}
     :external {:linkedin-url} :navigation {:prev :next}
   Flat model keys (legacy): :title :slug :published-on :updated-on :tags :linkedin-url :url

   config: {:site-url :base-path}
   Optional extra-ctx: {:html-body :series-ctx :toc} for pre-rendered content."
  ([post config] (post-layout post config nil))
  ([post config {:keys [html-body series-ctx toc]}]
   (let [bp         (or (:base-path config) (System/getenv "BASE_PATH") "")
         href*      #(str bp %)
         site-url*  (or (:site-url config) site-url)
         ;; Support both nested domain model and legacy flat shape
         title      (or (get-in post [:identity :title])   (:title post)) ;;TODO(task-14): remove compat shim — old shape
         slug       (or (get-in post [:identity :slug])    (:slug post)) ;;TODO(task-14): remove compat shim — old shape
         published  (or (get-in post [:dates :published-on]) (:published-on post)) ;;TODO(task-14): remove compat shim — old shape
         updated    (or (get-in post [:dates :updated-on])   (:updated-on post)) ;;TODO(task-14): remove compat shim — old shape
         tags       (or (get-in post [:taxonomy :tags])    (:tags post) []) ;;TODO(task-14): remove compat shim — old shape
         linkedin   (or (get-in post [:external :linkedin-url]) (:linkedin-url post)) ;;TODO(task-14): remove compat shim — old shape
         url        (or (:url post) (str "/posts/" slug "/"))
         post-url   (java.net.URLEncoder/encode (str site-url* url) "UTF-8")
         post-title (java.net.URLEncoder/encode (str title " ") "UTF-8")
         share-links [(icon-link "#" "Copy link" (:copy icons)
                                 {:onclick (str "navigator.clipboard.writeText('" (str site-url* url) "');this.textContent='Copied!';setTimeout(()=>this.textContent='Copy link',2000);return false;")})
                      (icon-link (str "https://www.linkedin.com/sharing/share-offsite/?url=" post-url)
                                 "LinkedIn" (:linkedin icons) {:target "_blank"})
                      (icon-link (str "https://x.com/intent/post?url=" post-url "&text=" post-title)
                                 "Twitter" (:x icons) {:target "_blank"})
                      (icon-link (str "https://bsky.app/intent/compose?text=" post-title post-url)
                                 "Bluesky" (:bluesky icons) {:target "_blank"})]]
     [:article {:data-pagefind-body ""}
      [:h1 title]
      [:div.post-dateline
       "Published " [:time {:datetime (str published)} (str published)]
       (when updated
         (list " · Updated " [:time {:datetime (str updated)} (str updated)]))]
      (into [:div.share-cta [:span.share-label "Share"]] share-links)
      (when (seq tags)
        [:div.tags
         (for [tag tags]
           [:a.tag {:href (href* (tag-path (name tag)))} (str "#" (name tag))])])
      (toc-nav toc)
      (when html-body (h/raw html-body))
      (when series-ctx (series-toc series-ctx slug config))
      [:aside.colophon
       "This post was drafted by an AI agent, reviewed by another, and revised by me."]
      [:p.reply-cta
       "Thoughts? "
       [:a {:href "mailto:joao@joaolopes.dev.br"} "Reply by email"]
       (when linkedin
         (list " · "
               [:a {:href linkedin :target "_blank" :rel "noopener noreferrer"} "My LinkedIn post"]))]
      (into [:div.share-cta [:span.share-label "Share"]] share-links)
      (when series-ctx (series-nav series-ctx config))
      (when series-ctx (series-json-ld post series-ctx config))])))

;;; ── Index layout ─────────────────────────────────────────────────────────────

(defn index-layout
  "Post list for the index page. Returns hiccup."
  [posts config]
  (let [bp    (or (:base-path config) (System/getenv "BASE_PATH") "")
        href* #(str bp %)]
    [:div.index
     [:h1 "Posts"]
     (if (seq posts)
       [:ul.post-list
        (for [p posts]
          (let [title  (or (get-in p [:identity :title]) (:title p)) ;;TODO(task-14): remove compat shim — old shape
                slug   (or (get-in p [:identity :slug]) (:slug p)) ;;TODO(task-14): remove compat shim — old shape
                url    (or (:url p) (str "/posts/" slug "/"))
                pub-on (or (get-in p [:dates :published-on]) (:published-on p)) ;;TODO(task-14): remove compat shim — old shape
                desc   (or (get-in p [:content :description]) (:description p)) ;;TODO(task-14): remove compat shim — old shape
                tags   (or (get-in p [:taxonomy :tags]) (:tags p) [])] ;;TODO(task-14): remove compat shim — old shape
            [:li
             [:a {:href (href* url)} title]
             [:time {:datetime (str pub-on)} (str pub-on)]
             (when desc [:p.description desc])
             (when (seq tags)
               [:span.tags
                (for [tag tags]
                  [:a.tag {:href (href* (tag-path (name tag)))} (str "#" (name tag))])])]))]
       [:p "No posts yet. Check back soon."])]))

;;; ── About layout ─────────────────────────────────────────────────────────────

(defn about-layout
  "About page content. Returns hiccup."
  [html-body config]
  [:article.about
   [:h1 "About"]
   (h/raw html-body)])

;;; ── Static page layout ───────────────────────────────────────────────────────

(defn static-page-layout
  "Generic static page. Returns hiccup."
  [{:keys [title body]} config]
  [:section.static-page
   (when title [:h1 title])
   (when body (h/raw body))])

;;; ── Not-found layout ─────────────────────────────────────────────────────────

(defn not-found-layout
  "404 page content. Returns hiccup."
  [config]
  (let [bp    (or (:base-path config) (System/getenv "BASE_PATH") "")
        href* #(str bp %)]
    [:div.not-found
     [:h1 "404"]
     [:p "This page doesn't exist."]
     [:p [:a {:href (href* "/")} "← Back to posts"]]]))

;;; ── Diagram layouts ──────────────────────────────────────────────────────────

(defn diagram-page-layout
  "Standalone diagram viewer page.
   diagram map keys: :slug :path :alt :content (new domain shape)
   Also accepts old shape: :slug :title :back-post :description :svg-content :mermaid-source
   Returns hiccup."
  [{:keys [slug path alt content
           title back-post description svg-content mermaid-source] :as diagram} config]
  (let [bp          (or (:base-path config) (System/getenv "BASE_PATH") "")
        href*       #(str bp %)
        ;; support both new (domain) and old (pages) shapes
        diag-title  (or title (when slug
                                (str/join " " (map str/capitalize (str/split slug #"-"))))) ;;TODO(task-14): remove compat shim — old shape
        diag-content (or svg-content content) ;;TODO(task-14): remove compat shim — old shape
        diag-desc    (or description alt)] ;;TODO(task-14): remove compat shim — old shape
    [:div.diagram-page
     (when back-post
       [:a.diagram-back {:href (href* (:url back-post))}
        (str "\u2190 " (:title back-post))])
     [:h1.diagram-title diag-title]
     [:div.diagram-full
      (when diag-content (h/raw diag-content))]
     (when (seq mermaid-source)
       [:details.diagram-code
        [:summary "View diagram source"]
        [:pre [:code.language-mermaid mermaid-source]]])
     (when (seq diag-desc)
       [:div.diagram-transcript
        [:p diag-desc]])]))

(defn diagrams-index-layout
  "All-diagrams index page. Returns hiccup."
  [diagrams config]
  (let [bp    (or (:base-path config) (System/getenv "BASE_PATH") "")
        href* #(str bp %)]
    [:div.diagrams-index
     [:h1 "Diagrams"]
     [:div.diagram-cards
      (for [{:keys [slug title back-post svg-content content] :as d} diagrams]
        (let [diag-title   (or title (when slug (str/join " " (map str/capitalize (str/split slug #"-"))))) ;;TODO(task-14): remove compat shim — old shape
              diag-content (or svg-content content)] ;;TODO(task-14): remove compat shim — old shape
          [:a.diagram-card {:href (href* (diagram-path slug))}
           [:div.diagram-card-thumb {:aria-hidden "true"}
            (when diag-content (h/raw diag-content))]
           [:div.diagram-card-body
            [:p.diagram-card-title diag-title]
            (when back-post
              [:p.diagram-card-source "From: " (:title back-post)])]]))]]))

;;; ── Feed / sitemap stubs (to be implemented in blog.system) ─────────────────

(defn rss-xml
  "RSS 2.0 feed XML. Stub — real implementation stays in blog.pages for now."
  [posts config]
  (str "<?xml version=\"1.0\" encoding=\"UTF-8\"?><rss version=\"2.0\"></rss>"))

(defn sitemap-xml
  "Sitemap XML. Stub — real implementation stays in blog.pages for now."
  [posts glossary diagrams config]
  (str "<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"></urlset>"))

(defn llms-txt
  "llms.txt plain text. Stub — real implementation stays in blog.pages for now."
  [posts config]
  (str "# Blog\n"))
