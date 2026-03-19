# Diagram Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add dedicated `/diagrams/<slug>/` pages for every SVG in `/assets/`, a `/diagrams/` index, a "Diagrams" nav entry, and an accessible inline figure wrapper for SVGs embedded in posts.

**Architecture:** Convention-driven — all metadata (title, back-link, transcript) is derived at build time from SVG filenames and Markdown alt text. No config files. `markdown.clj` handles inline wrapping; `pages.clj` handles page generation; `layout.clj` holds layout functions; CSS is purely additive.

**Tech Stack:** Clojure, Hiccup2, Stasis SSG. Build: `clojure -M:build`. Dev: `clojure -M:serve` (port 3000). No test suite — verification is build success + Chrome DevTools visual inspection.

---

## File map

| File | What changes |
|------|-------------|
| `resources/public/css/style.css` | Append `.diagram-*` styles |
| `src/blog/layout.clj` | Add `diagram-path`; add "Diagrams" to nav; add `diagram-page-layout` and `diagrams-index-layout` |
| `src/blog/markdown.clj` | Replace `inline-svgs` with accessible `<figure>` version; add 3 private helpers |
| `src/blog/pages.clj` | Add `scan-diagrams` + helpers; add `render-diagram-page` + `render-diagrams-index`; update `get-pages` signature and `render-sitemap` |
| `src/blog/core.clj` | Pass `assets-dir` to `get-pages` in both `build` and `serve` |

---

## Task 1: CSS — all `.diagram-*` styles

All new styles are additive. No existing rules change. Safe to land first — classes don't exist in HTML yet so nothing renders differently.

**Files:**
- Modify: `resources/public/css/style.css` (append to end)

- [ ] **Step 1: Append diagram styles to end of `style.css`**

Add after the last existing rule:

```css
/* ── Diagram figures (inline in posts) ─────────────────────── */
.diagram-figure { margin: 1.5rem 0; }

.diagram-link {
  display: block;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
}

.diagram-link::after {
  content: '\2197';       /* ↗ — safe in all fonts including Rubik */
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(15, 182, 214, 0.15);
  color: var(--accent);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity 200ms ease;
}

.diagram-link:hover::after { opacity: 1; }
.diagram-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

.diagram-caption-link {
  font-size: 0.82rem;
  color: var(--muted);
  text-decoration: none;
  display: inline-block;
  margin-top: 0.35rem;
}
.diagram-caption-link:hover { color: var(--accent); }

.diagram-transcript { margin-top: 0.5rem; font-size: 0.82rem; }
.diagram-transcript > summary {
  color: var(--muted);
  cursor: pointer;
  list-style: none;
}
.diagram-transcript > summary::-webkit-details-marker { display: none; }
.diagram-transcript > p { color: var(--muted); margin-top: 0.4rem; line-height: 1.5; }

/* ── Diagram standalone page ──────────────────────────────── */
.diagram-page { max-width: var(--max-width); margin: 0 auto; }
.diagram-back {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--muted);
  text-decoration: none;
  margin-bottom: 0.5rem;
}
.diagram-back:hover { color: var(--accent); }
.diagram-title { font-size: 1.6rem; color: var(--accent); margin-bottom: 1.25rem; }
.diagram-full {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
  background: var(--bg-alt);
}
.diagram-full svg { display: block; width: 100%; }

/* ── Diagrams index ───────────────────────────────────────── */
.diagrams-index h1 { margin-bottom: 1.5rem; }
.diagram-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
.diagram-card {
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  text-decoration: none;
  display: block;
  transition: border-color 200ms ease;
}
.diagram-card:hover { border-color: var(--accent); }
.diagram-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.diagram-card-thumb {
  background: var(--bg-alt);
  padding: 0.75rem;
  height: 120px;
  overflow: hidden;
}
.diagram-card-thumb svg { width: 100%; }
.diagram-card-body { padding: 0.75rem; }
.diagram-card-title { font-size: 1rem; font-weight: 500; color: var(--fg); margin: 0 0 0.25rem; }
.diagram-card-source { font-size: 0.8rem; color: var(--muted); margin: 0; }
```

- [ ] **Step 2: Build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

Expected: `Built 17 pages to public/` — no errors.

- [ ] **Step 3: Commit**

```bash
cd ~/dev/joaolopes.dev.br
git add resources/public/css/style.css
git commit -m "feat(diagrams): add diagram CSS styles"
```

---

## Task 2: layout.clj — `diagram-path` helper + "Diagrams" in nav

Two small changes. Safe to land before the layout functions exist.

**Files:**
- Modify: `src/blog/layout.clj`

- [ ] **Step 1: Add `diagram-path` helper after the existing `tag-path` function**

The current `tag-path` is around line 31:
```clojure
(defn tag-path [slug] (str "/tags/" slug "/"))
```

Add immediately after it:
```clojure
(defn diagram-path
  "Canonical path for a diagram page."
  [slug]
  (str "/diagrams/" slug "/"))
```

- [ ] **Step 2: Add "Diagrams" to the nav links**

Find the `[:span#nav-menu.nav-links ...]` block in `base-layout` (around line 82). It currently has Posts, Tags, About, RSS. Add Diagrams between Tags and About:

```clojure
[:span#nav-menu.nav-links
 [:a {:href (href "/")} "Posts"]
 [:a {:href (href "/tags/")} "Tags"]
 [:a {:href (href "/diagrams/")} "Diagrams"]
 [:a {:href (href "/about/")} "About"]
 [:a {:href (href "/feed.xml")} "RSS"]]
```

- [ ] **Step 3: Build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

Expected: `Built 17 pages to public/`. Reload the blog in Chrome DevTools at 800px — the nav should now show "Diagrams" between Tags and About. On mobile (390px), hamburger menu should list it too.

- [ ] **Step 4: Commit**

```bash
cd ~/dev/joaolopes.dev.br
git add src/blog/layout.clj
git commit -m "feat(diagrams): add diagram-path helper and Diagrams nav link"
```

---

## Task 3: layout.clj — `diagram-page-layout` and `diagrams-index-layout`

Add the two layout functions that render diagram pages. These return hiccup — the same pattern as all other layout functions in the file.

**Files:**
- Modify: `src/blog/layout.clj` (append before the final closing form)

- [ ] **Step 1: Add `diagram-page-layout` after `not-found-layout`**

Find `not-found-layout` (around line 271). After it, add:

```clojure
(defn diagram-page-layout
  "Standalone diagram viewer page. Returns hiccup.
   diagram map keys: :slug :title :back-post :description :svg-content"
  [{:keys [title back-post description svg-content]}]
  [:div.diagram-page
   (when back-post
     [:a.diagram-back {:href (href (:url back-post))}
      (str "\u2190 " (:title back-post))])
   [:h1.diagram-title title]
   [:div.diagram-full
    (h/raw svg-content)]
   (when (seq description)
     [:details.diagram-transcript
      [:summary "Diagram description"]
      [:p description]])])

(defn diagrams-index-layout
  "All-diagrams index page. Returns hiccup."
  [diagrams]
  [:div.diagrams-index
   [:h1 "Diagrams"]
   [:div.diagram-cards
    (for [{:keys [slug title back-post svg-content]} diagrams]
      [:a.diagram-card {:href (href (diagram-path slug))}
       [:div.diagram-card-thumb
        (h/raw svg-content)]
       [:div.diagram-card-body
        [:p.diagram-card-title title]
        (when back-post
          [:p.diagram-card-source
           "From: " (:title back-post)])]])]])
```

- [ ] **Step 2: Build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

Expected: `Built 17 pages to public/` — no errors. No visible change yet (functions not called).

- [ ] **Step 3: Commit**

```bash
cd ~/dev/joaolopes.dev.br
git add src/blog/layout.clj
git commit -m "feat(diagrams): add diagram-page-layout and diagrams-index-layout"
```

---

## Task 4: markdown.clj — accessible `inline-svgs` with `<figure>` wrapper

This is the most complex task. Replace the existing `inline-svgs` with a version that extracts alt text, injects ARIA attributes, and wraps everything in an accessible `<figure>`.

**Files:**
- Modify: `src/blog/markdown.clj`

⚠️ Read the actual `inline-svgs` function and surrounding code before editing. Preserve the existing `img-svg-pattern` regex — only the replacement function changes.

- [ ] **Step 1: Add three private helpers before `inline-svgs`**

Add these three functions immediately before the `inline-svgs` function:

```clojure
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
```

- [ ] **Step 2: Replace the `inline-svgs` function body**

Keep the `inline-svgs` function signature and docstring position. Replace its implementation:

```clojure
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
                           title   (clojure.string/join
                                    " " (map clojure.string/capitalize
                                             (clojure.string/split slug #"-")))
                           alt     (extract-alt img-tag)
                           svg-raw (-> (slurp f)
                                       (str/replace #"<\?xml[^>]*\?>\s*" "")
                                       str/trim)
                           svg     (inject-svg-a11y svg-raw slug title alt)
                           href    (str "/diagrams/" slug "/")]
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
                              (str "<details class=\"diagram-transcript\">"
                                   "<summary>Diagram description</summary>"
                                   "<p>" alt "</p>"
                                   "</details>"))
                            "</figcaption>"
                            "</figure>"))
                     img-tag)))))
```

Note: `title` is derived inline here (not using a separate function) to keep `inline-svgs` self-contained. The logic matches `slug->title` in `pages.clj`.

- [ ] **Step 3: Build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

Expected: `Built 17 pages to public/` — no errors.

- [ ] **Step 4: Verify figure wrapper in browser**

Open `http://localhost:3000/posts/building-your-ai-toolkit/` in Chrome DevTools. Scroll to the first diagram. Verify:
- The diagram is wrapped in `<figure class="diagram-figure">`
- The SVG is inside `<a href="/diagrams/agent-loop/" class="diagram-link">`
- The SVG has `role="img"` and `aria-labelledby="diag-agent-loop-title"`
- A `<figcaption>` with "View Agent Loop diagram →" link appears below
- Clicking the caption link navigates to `/diagrams/agent-loop/` (404 for now — pages.clj not updated yet)

Use Chrome DevTools Elements panel to inspect the figure structure.

- [ ] **Step 5: Commit**

```bash
cd ~/dev/joaolopes.dev.br
git add src/blog/markdown.clj
git commit -m "feat(diagrams): wrap inline SVGs in accessible figure with caption link"
```

---

## Task 5: pages.clj — `scan-diagrams` and helpers

Add the diagram scanning logic. This is a pure data function — no page rendering yet.

**Files:**
- Modify: `src/blog/pages.clj`

- [ ] **Step 1: Add private helpers and `scan-diagrams` after `render-about`**

Find `render-about` (around line 205). Add after it:

```clojure
(defn- svg-slug
  "agent-loop.svg → agent-loop"
  [filename]
  (str/replace filename #"\.svg$" ""))

(defn- slug->title
  "agent-loop → Agent Loop"
  [slug]
  (->> (str/split slug #"-") (map str/capitalize) (str/join " ")))

(defn- extract-diagram-alt
  "Finds alt text for src-path in a post body string.
   Handles both attribute orderings: alt before src, src before alt."
  [src-path body]
  (let [q  (java.util.regex.Pattern/quote src-path)
        p  (re-pattern (str "(?:alt=\"([^\"]*)\"[^>]*src=\"" q "\"|src=\"" q "\"[^>]*alt=\"([^\"]*)\")"))
        m  (re-find p body)]
    (when m
      (let [alt (or (nth m 1 nil) (nth m 2 nil))]
        (when (seq alt) alt)))))

(defn scan-diagrams
  "Builds diagram metadata from assets-dir/*.svg cross-referenced with posts.
   assets-dir is a string path (e.g. \"assets\").
   Returns [{:slug :title :back-post :description :svg-content}]
   :svg-content is the raw SVG string with XML declaration stripped."
  [posts assets-dir]
  (let [asset-dir (io/file assets-dir)]
    (if (.isDirectory asset-dir)
      (->> (.listFiles asset-dir)
           (filter #(str/ends-with? (.getName %) ".svg"))
           (map (fn [f]
                  (let [slug        (svg-slug (.getName f))
                        title       (slug->title slug)
                        src         (str "/assets/" (.getName f))
                        back        (first (filter #(str/includes? (:body %) src) posts))
                        alt         (when back (extract-diagram-alt src (:body back)))
                        svg-content (-> (slurp f)
                                        (str/replace #"<\?xml[^>]*\?>\s*" "")
                                        str/trim)]
                    {:slug        slug
                     :title       title
                     :back-post   (when back {:title (:title back) :url (:url back)})
                     :description alt
                     :svg-content svg-content})))
           vec)
      [])))
```

- [ ] **Step 2: Build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

Expected: `Built 17 pages to public/` — no errors. `scan-diagrams` is defined but not called yet.

- [ ] **Step 3: Commit**

```bash
cd ~/dev/joaolopes.dev.br
git add src/blog/pages.clj
git commit -m "feat(diagrams): add scan-diagrams and slug helpers"
```

---

## Task 6: pages.clj — render functions, `get-pages` and `render-sitemap` updates

Wire everything together. This task generates the actual pages.

**Files:**
- Modify: `src/blog/pages.clj`

- [ ] **Step 1: Add `render-diagram-page` and `render-diagrams-index` after `render-tags-overview`**

Find `render-tags-overview` (around line 242). Add after it:

```clojure
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
```

- [ ] **Step 2: Update `render-sitemap` to accept and emit diagrams**

The current signature is `[posts series-map tag-map]`. Change to `[posts series-map tag-map diagrams]` and add diagram URLs:

```clojure
(defn- render-sitemap
  "Generates sitemap.xml."
  [posts series-map tag-map diagrams]
  (str "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
       "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"
       "<url><loc>" (layout/absolute-url "/") "</loc></url>\n"
       "<url><loc>" (layout/absolute-url "/about/") "</loc></url>\n"
       "<url><loc>" (layout/absolute-url "/diagrams/") "</loc></url>\n"
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
       "</urlset>"))
```

- [ ] **Step 3: Update `get-pages` to accept `assets-dir`, scan diagrams, and generate pages**

The current signature is `[posts-dir]`. Change it and add diagram generation:

```clojure
(defn get-pages
  "Builds the Stasis page map from posts and assets directories."
  [posts-dir assets-dir]
  (let [posts      (load-posts posts-dir)
        slugs      (published-slugs posts)
        series-map (group-series posts)
        tag-map    (group-tags posts)
        diagrams   (scan-diagrams posts assets-dir)
        _          (validate-series series-map)]
    (merge
     {"/" (fn [_] (render-index posts))
      "/tags/" (fn [_] (render-tags-overview tag-map))
      "/about/" (fn [_] (render-about))
      "/feed.xml" (fn [_] (render-rss posts))
      "/sitemap.xml" (fn [_] (render-sitemap posts series-map tag-map diagrams))
      "/llms.txt" (fn [_] (render-llms-txt posts))
      "/404.html" (fn [_] (render-404))
      "/diagrams/" (fn [_] (render-diagrams-index diagrams))}
     (into {}
           (map (fn [post]
                  [(:url post)
                   (fn [_] (render-post post slugs (series-context post series-map)))]))
           posts)
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
```

- [ ] **Step 4: Build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

Expected: **build will FAIL** — `core.clj` still calls `get-pages` with one argument. This is expected. Do not fix `pages.clj` — fix `core.clj` in Task 7.

Actually: if the build fails, do not commit yet. Proceed directly to Task 7 Step 1, then come back and build.

- [ ] **Step 5: Do NOT commit yet**

`pages.clj` and `core.clj` are committed together in Task 7 Step 3 once the build passes. Committing `pages.clj` alone here would leave the repo in a broken state (build fails until `core.clj` is updated).

---

## Task 7: core.clj — pass `assets-dir` to `get-pages`

One-line change in two places. This unblocks the build.

**Files:**
- Modify: `src/blog/core.clj`

- [ ] **Step 1: Update both `get-pages` call sites**

In `build` (around line 30), change:
```clojure
(let [page-map (pages/get-pages posts-dir)]
```
to:
```clojure
(let [page-map (pages/get-pages posts-dir assets-dir)]
```

In `app` (around line 60), change:
```clojure
(stasis/serve-pages #(pages/get-pages posts-dir))
```
to:
```clojure
(stasis/serve-pages #(pages/get-pages posts-dir assets-dir))
```

Both `posts-dir` and `assets-dir` are already defined as `def` constants at the top of `core.clj`.

- [ ] **Step 2: Build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

Expected: `Built 22+ pages to public/` — 5 new diagram pages (one per SVG in `/assets/`) plus the `/diagrams/` index.

- [ ] **Step 3: Commit both pages.clj and core.clj together**

```bash
cd ~/dev/joaolopes.dev.br
git add src/blog/pages.clj src/blog/core.clj
git commit -m "feat(diagrams): wire diagram page generation — scan-diagrams, get-pages, core"
```

---

## Task 8: Full visual QA

Restart the dev server and verify all new pages and behaviors across viewports.

**Files:** None (read-only verification)

- [ ] **Step 1: Restart dev server after build**

```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null
cd ~/dev/joaolopes.dev.br && nohup clojure -M:serve > /tmp/blog-serve.log 2>&1 &
sleep 2 && echo "server up"
```

- [ ] **Step 2: Verify `/diagrams/` index**

Open `http://localhost:3000/diagrams/` in Chrome DevTools at 1280px.

- [ ] Page loads (no 404)
- [ ] "Diagrams" heading visible
- [ ] Cards show SVG thumbnail (cropped to 120px height), title, "From: [post]" link
- [ ] Cards link to `/diagrams/<slug>/`

- [ ] **Step 3: Verify a diagram page at desktop**

Open `http://localhost:3000/diagrams/agent-loop/` at 1280px.

- [ ] "← Building Your AI Toolkit" back-link visible and correct
- [ ] "Agent Loop" heading in accent color
- [ ] SVG renders full-width in bordered box
- [ ] "Diagram description" `<details>` present (will be empty — no alt text in current posts yet; that's correct)
- [ ] Nav shows "Diagrams" highlighted (or at least present)

- [ ] **Step 4: Verify a diagram page on mobile**

Switch to 390px mobile viewport. Open `/diagrams/agent-loop/`.

- [ ] SVG fills the full content width (much larger than inline in the post — this is the goal)
- [ ] Back-link tappable
- [ ] Nav hamburger works

- [ ] **Step 5: Verify inline figure wrapper in post**

Open `http://localhost:3000/posts/building-your-ai-toolkit/` at 390px.

- [ ] Diagrams are wrapped in `<figure>` (inspect with DevTools Elements)
- [ ] "View Agent Loop diagram →" caption link appears below each diagram
- [ ] Tapping the caption navigates to `/diagrams/agent-loop/`
- [ ] Tapping the SVG itself also navigates (the whole SVG is inside the `<a>`)

- [ ] **Step 6: Verify nav on desktop and mobile**

Desktop 1280px:
- [ ] Nav shows: Posts · Tags · Diagrams · About · RSS

Mobile 390px (hamburger open):
- [ ] Dropdown shows all 5 links including Diagrams

- [ ] **Step 7: Commit any QA fixes**

```bash
cd ~/dev/joaolopes.dev.br
git add -p
git commit -m "fix(diagrams): QA corrections"
```

If no fixes needed, skip this step.
