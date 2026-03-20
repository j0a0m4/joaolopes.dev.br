(ns blog.layout
  (:require [clojure.data.json :as json]
            [clojure.string :as str]
            [hiccup2.core :as h]))

(def site-title "João Lopes")
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

(defn glossary-index-layout
  "A-Z sorted list of all published glossary entries."
  [entries]
  (let [sorted  (sort-by #(str/lower-case (:title %)) entries)
        grouped (group-by #(str/upper-case (subs (:title %) 0 1)) sorted)]
    [:article.glossary-index
     [:h1 "Glossary"]
     [:p.subtitle "Definitions for terms used across the blog."]
     (for [[letter entries] (sort-by first grouped)]
       [:section.glossary-letter {:id (str/lower-case letter)}
        [:h2 letter]
        [:ul
         (for [{:keys [title slug definition]} entries]
           [:li
            [:a {:href (href (glossary-path slug))} title]
            " — "
            definition])]])]))

(defn glossary-entry-layout
  "Single glossary entry page — article-style.
   entry has :title :html-body and :related-links [{:label :slug}]."
  [entry]
  [:article.glossary-entry
   [:h1 (:title entry)]
   [:p.glossary-back [:a {:href (href "/glossary/")} "← Glossary"]]
   [:div.glossary-body
    (h/raw (:html-body entry))]
   (when (seq (:related-links entry))
     [:nav.glossary-related
      [:span "Related: "]
      (interpose " · "
        (for [{:keys [label slug]} (:related-links entry)]
          [:a {:href (href (glossary-path slug))} label]))])])

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
      [:link {:rel "icon" :type "image/svg+xml" :href (href "/favicon.svg")}]
      [:link {:rel "alternate" :type "application/rss+xml"
              :title site-title :href (href "/feed.xml")}]
      [:link {:rel "stylesheet"
              :href "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/dracula.min.css"}]
      [:script {:src "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"}]
      [:script (h/raw "document.addEventListener('DOMContentLoaded', () => document.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el)));")]
      [:script {:type "module"}
       (h/raw "import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
        document.querySelectorAll('pre > code.language-mermaid').forEach(code => {
          const pre = code.parentElement;
          const div = document.createElement('pre');
          div.className = 'mermaid';
          div.textContent = code.textContent;
          pre.replaceWith(div);
        });
        mermaid.initialize({ startOnLoad: true, theme: 'dark' });")]
      [:script
       (h/raw "document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  // Hide on mobile only — not server-rendered, so desktop without JS sees links
  if (window.matchMedia('(max-width: 480px)').matches) {
    menu.setAttribute('hidden', '');
    // TOC starts open (server-rendered); close it on mobile
    const toc = document.querySelector('.toc-details');
    if (toc) toc.removeAttribute('open');
  }

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    menu.toggleAttribute('hidden');
    btn.querySelector('.hamburger-icon').textContent = open ? '\\u2630' : '\\u2715';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('hidden', '');
      btn.querySelector('.hamburger-icon').textContent = '\\u2630';
      btn.focus();
    }
  });
});

// Scroll restoration: save position when clicking a diagram link, restore on back
(function() {
  if (history.scrollRestoration) history.scrollRestoration = 'manual';
  const key = 'scroll:' + location.pathname;
  const saved = sessionStorage.getItem(key);
  if (saved !== null) {
    sessionStorage.removeItem(key);
    // Restore after DOM is parsed and layout is complete
    document.addEventListener('DOMContentLoaded', () => {
      requestAnimationFrame(() => window.scrollTo(0, parseInt(saved, 10)));
    });
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('.diagram-link, .diagram-caption-link, .diagram-card');
    if (a) sessionStorage.setItem('scroll:' + location.pathname, window.scrollY);
  });
})();")]]
     [:body
      [:header
       [:nav
        [:a.site-logo {:href (href "/")}
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
         [:a {:href (href "/")} "Posts"]
         [:a {:href (href "/tags/")} "Tags"]
         [:a {:href (href "/glossary/")} "Glossary"]
         [:a {:href (href "/diagrams/")} "Diagrams"]
         [:a {:href (href "/about/")} "About"]
         [:a {:href (href "/feed.xml")} "RSS"]]]]
      [:main body]
      [:footer
       [:p (str "© " (.getYear (java.time.LocalDate/now)) " ")
        [:a {:href "https://github.com/j0a0m4" :target "_blank" :rel "noopener noreferrer"} "João Lopes"]]
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

(defn tag-index-layout
  "Tag index page with tag name, count, unordered post list. Returns hiccup."
  [tag posts]
  [:div.tag-index
   [:h1 (str "#" tag)]
   [:p.series-count (str (count posts) " post" (when (not= 1 (count posts)) "s") " with this tag")]
   [:ul.tag-full-toc
    (for [p posts]
      [:li
       [:a {:href (href (:url p))} (:title p)]
       [:time {:datetime (str (:published-on p))} (str (:published-on p))]
       (when (:description p)
         [:p.description (:description p)])])]])

(defn tags-overview-layout
  "All-tags overview page. Shows every tag as a pill with post count. Returns hiccup."
  [tag-map]
  [:div.tags-overview
   [:h1 "Tags"]
   [:div.tags-cloud
    (for [[tag posts] tag-map]
      [:a.tag-pill {:href (href (tag-path tag))}
       (str "#" tag)
       [:span.tag-count (str (count posts))]])]])

(defn- toc-nav
  "Table of contents from extracted headings. Returns hiccup or nil.
   Uses <details>/<summary> for native collapse on mobile — no JS needed.
   Desktop CSS forces it open via min-width: 481px override."
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

(defn- icon-link
  "Renders an anchor with an inline SVG icon + label. Centered via flex."
  [href label icon-path & [{:keys [target onclick extra-class]}]]
  [:a (cond-> {:href href :class (str "icon-link" (when extra-class (str " " extra-class)))}
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

(defn post-layout
  "Article layout for a single post. Returns hiccup."
  ([post html-body] (post-layout post html-body nil nil))
  ([post html-body series-ctx] (post-layout post html-body series-ctx nil))
  ([{:keys [title published-on updated-on tags slug linkedin-url url filename] :as post} html-body series-ctx toc]
   (let [post-url   (java.net.URLEncoder/encode (absolute-url url) "UTF-8")
         post-title (java.net.URLEncoder/encode (str title " ") "UTF-8")
         raw-url    (when filename
                      (str "https://raw.githubusercontent.com/j0a0m4/joaolopes.dev.br/main/posts/"
                           (str/replace (java.net.URLEncoder/encode filename "UTF-8") "+" "%20")))
         share-links (concat
                       [(icon-link "#" "Copy link" (:copy icons)
                                   {:onclick (str "navigator.clipboard.writeText('" (absolute-url url) "');this.textContent='Copied!';setTimeout(()=>this.textContent='Copy link',2000);return false;")})
                        (icon-link (str "https://www.linkedin.com/sharing/share-offsite/?url=" post-url)
                                   "LinkedIn" (:linkedin icons) {:target "_blank"})
                        (icon-link (str "https://x.com/intent/post?url=" post-url "&text=" post-title)
                                   "Twitter" (:x icons) {:target "_blank"})
                        (icon-link (str "https://bsky.app/intent/compose?text=" post-title post-url)
                                   "Bluesky" (:bluesky icons) {:target "_blank"})]
                       (when raw-url
                         [(icon-link raw-url "RAW Markdown" (:github icons)
                                     {:target "_blank" :extra-class "raw-link"})]))]
   [:article {:data-pagefind-body ""}
    [:h1 title]
    [:div.post-dateline
     "Published " [:time {:datetime (str published-on)} (str published-on)]
     (when updated-on
       (list " · Updated " [:time {:datetime (str updated-on)} (str updated-on)]))]
    (into [:div.share-cta [:span.share-label "Share"]] share-links)
    (when (seq tags)
      [:div.tags
       (for [tag tags]
         [:a.tag {:href (href (tag-path (name tag)))} (str "#" (name tag))])])
    (toc-nav toc)
    (h/raw html-body)
    (when series-ctx
      (series-toc series-ctx slug))
    [:aside.colophon
     "This post was drafted by an AI agent, reviewed by another, and revised by me."]
    [:p.reply-cta
     "Thoughts? "
     [:a {:href "mailto:joao@joaolopes.dev.br"} "Reply by email"]
     (when linkedin-url
       (list " · "
             [:a {:href linkedin-url :target "_blank" :rel "noopener noreferrer"} "My LinkedIn post"]))]
    (into [:div.share-cta [:span.share-label "Share"]] share-links)
    (when series-ctx
      (series-nav series-ctx))
    (when series-ctx
      (series-json-ld post series-ctx))])))

(defn about-layout
  "About page content. Returns hiccup."
  [html-body]
  [:article.about
   [:h1 "About"]
   (h/raw html-body)])

(defn not-found-layout
  "404 page content. Returns hiccup."
  []
  [:div.not-found
   [:h1 "404"]
   [:p "This page doesn't exist."]
   [:p [:a {:href (href "/")} "← Back to posts"]]])

(defn diagram-page-layout
  "Standalone diagram viewer page. Returns hiccup.
   diagram map keys: :slug :title :back-post :description :svg-content :mermaid-source"
  [{:keys [title back-post description svg-content mermaid-source]}]
  [:div.diagram-page
   (when back-post
     [:a.diagram-back {:href (href (:url back-post))}
      (str "\u2190 " (:title back-post))])
   [:h1.diagram-title title]
   [:div.diagram-full
    (h/raw svg-content)]
   (when (seq mermaid-source)
     [:details.diagram-code
      [:summary "View diagram source"]
      [:pre [:code.language-mermaid mermaid-source]]])
   (when (seq description)
     [:div.diagram-transcript
      [:p description]])])

(defn diagrams-index-layout
  "All-diagrams index page. Returns hiccup."
  [diagrams]
  [:div.diagrams-index
   [:h1 "Diagrams"]
   [:div.diagram-cards
    (for [{:keys [slug title back-post svg-content]} diagrams]
      [:a.diagram-card {:href (href (diagram-path slug))}
       [:div.diagram-card-thumb {:aria-hidden "true"}
        (h/raw svg-content)]
       [:div.diagram-card-body
        [:p.diagram-card-title title]
        (when back-post
          [:p.diagram-card-source
           "From: " (:title back-post)])]])]])

(defn index-layout
  "Post list for the index page. Returns hiccup."
  [posts]
  [:div.index
   [:h1 "Posts"]
   (if (seq posts)
     [:ul.post-list
      (for [{:keys [title url published-on description tags]} posts]
        [:li
         [:a {:href (href url)} title]
         [:time {:datetime (str published-on)} (str published-on)]
         (when description
           [:p.description description])
         (when (seq tags)
           [:span.tags
            (for [tag tags]
              [:a.tag {:href (href (tag-path (name tag)))} (str "#" (name tag))])])])]
     [:p "No posts yet. Check back soon."])])
