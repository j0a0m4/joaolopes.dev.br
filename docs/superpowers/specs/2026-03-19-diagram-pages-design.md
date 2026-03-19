# Diagram Pages — Design Spec

**Date:** 2026-03-19
**Status:** Approved
**Goal:** Make SVG diagrams readable on mobile by linking to dedicated diagram pages. Add a Diagrams section to the blog.

---

## Problem

SVG diagrams in posts render at ~354px wide on phone (46% of their 760px design width). Text is cramped but legible. There is no way to view a diagram at full size, no click affordance, no accessibility description, and no way to discover diagrams independently of their parent post.

---

## Decisions

**Diagram pages:** Each SVG in `/assets/` gets a dedicated page at `/diagrams/<slug>/`. Built at compile time. Convention-driven: filename → slug and title. No config file.

**Page layout:** Full blog nav header (Posts, Tags, Diagrams, About, RSS) + diagram title + back-link to parent post + SVG at full content width + visible `<details>` transcript. No footer.

**Index:** `/diagrams/` lists all diagrams as cards — SVG thumbnail, title, parent post. "Diagrams" nav link added to all pages.

**Inline affordance:** Diagrams in posts wrapped in `<figure>`. SVG wrapped in `<a>` to diagram page. `<figcaption>` with visible "View X diagram →" link. Hover overlay (CSS) on desktop.

**Accessibility (primary constraint):** Alt text in Markdown image syntax becomes both the SVG `<desc>` element (screen readers) and the visible `<details>` transcript. Authors MUST write descriptive alt text (enforced by canonic rule `diagram-alt-text`).

**Back-link source:** At build time, `pages.clj` scans all posts to find which post references each SVG. First match wins if multiple posts reference the same SVG.

---

## Convention: filename → metadata

| Input | Output |
|---|---|
| `/assets/agent-loop.svg` | slug: `agent-loop`, title: `"Agent Loop"` |
| `/assets/mcp-architecture.svg` | slug: `mcp-architecture`, title: `"Mcp Architecture"` |
| `/assets/hooks-lifecycle.svg` | slug: `hooks-lifecycle`, title: `"Hooks Lifecycle"` |

Title is derived by splitting on `-` and capitalising each word (Clojure: `(->> (str/split slug #"-") (map str/capitalize) (str/join " "))`).

**Known limitation:** Acronyms in filenames produce mixed-case titles — `mcp-architecture.svg` → `"Mcp Architecture"`. This is an accepted tradeoff of the convention-driven approach. Rename the SVG file if the auto-generated title is unacceptable (e.g. rename to `MCP-architecture.svg` is not practical; prefer a post-processing step if needed in future).

---

## Design

### 1. Inline diagram wrapper (`markdown.clj` — `inline-svgs`)

**Current behaviour:** Replaces `<img src="/assets/foo.svg">` with raw SVG content.

**New behaviour:** Extracts alt text from the `<img>` tag, injects `<title>` + `<desc>` into the SVG, wraps everything in a `<figure>` with caption link and transcript.

**Output HTML:**

```html
<figure class="diagram-figure">
  <a href="/diagrams/agent-loop/"
     class="diagram-link"
     aria-label="View Agent Loop diagram">
    <svg role="img"
         aria-labelledby="diag-agent-loop-title"
         aria-describedby="diag-agent-loop-desc"
         width="100%"
         viewBox="0 0 760 220">
      <title id="diag-agent-loop-title">Agent Loop</title>
      <desc id="diag-agent-loop-desc">
        A loop with three steps: Gather (read context, scan tools, assess
        state), Act (plan steps, call tools, execute), and Observe (check
        results, decide next move). An arrow labeled "repeat" returns from
        Observe back to Gather.
      </desc>
      <!-- original SVG content -->
    </svg>
  </a>
  <figcaption>
    <a href="/diagrams/agent-loop/" class="diagram-caption-link">
      View Agent Loop diagram →
    </a>
    <details class="diagram-transcript">
      <summary>Diagram description</summary>
      <p>A loop with three steps: Gather (read context, scan tools, assess
      state), Act (plan steps, call tools, execute), and Observe (check
      results, decide next move). An arrow labeled "repeat" returns from
      Observe back to Gather.</p>
    </details>
  </figcaption>
</figure>
```

**Implementation details:**

- `img-svg-pattern` regex must be updated to capture the `alt` attribute. Change capture groups:
  ```clojure
  ;; New pattern — captures full tag, src path, and alt text
  (def ^:private img-svg-pattern
    #"<img\s+[^>]*src=\"(/assets/([^\"]+)\.svg)\"[^>]*(?:alt=\"([^\"]*)\")[^>]*>|<img\s+[^>]*(?:alt=\"([^\"]*)\")[^>]*src=\"(/assets/([^\"]+)\.svg)\"[^>]*>")
  ```
  Since attribute order in the rendered HTML is non-deterministic, the regex must handle `alt` before or after `src`. Alternatively: extract alt separately with a second `re-find` pass on the captured img tag.

  **Simpler approach (recommended):** Keep the existing pattern that captures the full img tag and src path. After matching, run a second `re-find` on the captured img tag to extract `alt`:
  ```clojure
  (defn- extract-alt [img-tag]
    (second (re-find #"alt=\"([^\"]*)\"" img-tag)))
  ```

- Derive slug from src path: `(-> src-path (str/replace #"^/assets/" "") (str/replace #"\.svg$" ""))`
- Derive title from slug: `(->> (str/split slug #"-") (map str/capitalize) (str/join " "))`
- Inject ARIA attributes onto the `<svg>` opening tag AND insert `<title>`/`<desc>` as first children — in one `str/replace` pass. `role`, `aria-labelledby`, and (conditionally) `aria-describedby` are all added here:
  ```clojure
  ;; Splits the <svg> open tag into the tag name and the rest of the attributes+close
  ;; so ARIA attributes can be inserted before the closing >.
  (str/replace svg-content #"(<svg)([ \t\n][^>]*)?(>)"
               (fn [[_ tag attrs close]]
                 (str tag
                      (or attrs "")
                      " role=\"img\""
                      " aria-labelledby=\"diag-" slug "-title\""
                      (when (seq alt)
                        (str " aria-describedby=\"diag-" slug "-desc\""))
                      close
                      "<title id=\"diag-" slug "-title\">" title "</title>"
                      (when (seq alt)
                        (str "<desc id=\"diag-" slug "-desc\">" alt "</desc>")))))
  ```
- If `alt` is empty or absent: `aria-describedby` is NOT emitted on `<svg>` and `<desc>` is NOT emitted as a child. A stranded `aria-describedby` pointing at a non-existent id is an ARIA error — never emit it without a matching `<desc>`.
- If `alt` is empty or absent: also omit the `<details>` transcript block. Do not emit empty accessibility elements.
- `inline-svgs` signature stays the same (takes `html-body` string, returns string).

**A11y contract:**
- `role="img"` — SVG is treated as a single image, not a tree of shapes
- `aria-labelledby` → `<title id>` — short name (accessible name) announced by screen reader
- `aria-describedby` → `<desc id>` — long description read after the name when alt text is present; omit both attributes when alt is absent
- `aria-label` on outer `<a>` — full descriptive link text for keyboard nav ("View Agent Loop diagram")
- `<figcaption>` — associated with `<figure>` by semantic HTML; read by screen readers
- `<details>/<summary>` transcript — accessible to all users, keyboard-navigable natively

---

### 2. Diagram metadata scan (`pages.clj` — new `scan-diagrams`)

At build time, before rendering posts, scan `/assets/*.svg` and cross-reference with post content to build a diagram metadata map.

```clojure
(defn- svg-slug [filename]
  (str/replace filename #"\.svg$" ""))

(defn- slug->title [slug]
  (->> (str/split slug #"-") (map str/capitalize) (str/join " ")))

(defn- extract-diagram-alt
  "Finds the alt text for a given SVG src path in a post's body."
  [src-path body]
  (let [pattern (re-pattern (str "alt=\"([^\"]*)\"[^>]*src=\"" (java.util.regex.Pattern/quote src-path) "\"|src=\"" (java.util.regex.Pattern/quote src-path) "\"[^>]*alt=\"([^\"]*)"))]
    (when-let [[_ alt1 alt2] (re-find pattern body)]
      (or (when (seq alt1) alt1) (when (seq alt2) alt2)))))

(defn scan-diagrams
  "Builds diagram metadata from assets-dir/*.svg cross-referenced with posts.
   assets-dir is the string path passed from core/assets-dir (default: \"assets\").
   Returns [{:slug :title :back-post :description :svg-content}]
   :svg-content is the raw SVG string with XML declaration stripped, ready for inlining."
  [posts assets-dir]
  (let [asset-dir (io/file assets-dir)]
    (if (.isDirectory asset-dir)
      (->> (.listFiles asset-dir)
           (filter #(str/ends-with? (.getName %) ".svg"))
           (map (fn [f]
                  (let [slug        (svg-slug (.getName f))
                        title       (slug->title slug)
                        src         (str "/assets/" (.getName f))
                        ;; Find first post that references this SVG
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

---

### 3. Diagram page layout (`layout.clj` — new functions)

**`diagram-page-layout`** — renders a single diagram page. Receives the full diagram map including `:svg-content` (the raw SVG string with XML declaration stripped, produced by `scan-diagrams`). The SVG has `<title>` and `<desc>` injected by `pages.clj` before passing to layout, same logic as `inline-svgs`.

```clojure
(defn diagram-page-layout
  "Standalone diagram viewer page. Returns hiccup.
   diagram map keys: :slug :title :back-post :description :svg-content (raw SVG string)"
  [{:keys [slug title back-post description svg-content]}]
  [:div.diagram-page
   (when back-post
     [:a.diagram-back {:href (href (:url back-post))}
      (str "\u2190 " (:title back-post))])
   [:h1.diagram-title title]
   [:div.diagram-full
    (h/raw svg-content)]   ;; svg-content has <title>/<desc> already injected
   (when (seq description)
     [:details.diagram-transcript
      [:summary "Diagram description"]
      [:p description]])])
```

`pages.clj` calls `layout/base-layout` wrapping `diagram-page-layout`, identical pattern to `render-tag-index` and all other page renderers:

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

**`diagrams-index-layout`** — renders `/diagrams/` index:

```clojure
(defn diagrams-index-layout
  "All-diagrams index page. Returns hiccup."
  [diagrams]
  [:div.diagrams-index
   [:h1 "Diagrams"]
   [:div.diagram-cards
    (for [{:keys [slug title back-post svg-content]} diagrams]
      [:a.diagram-card {:href (href (diagram-path slug))}
       [:div.diagram-card-thumb
        (h/raw svg-content)]    ;; SVG thumbnail, CSS clips height
       [:div.diagram-card-body
        [:p.diagram-card-title title]   ;; <p> not <h2> — cards are navigation, not document structure
        (when back-post
          [:p.diagram-card-source
           "From: " (:title back-post)])]])]])
```

Add helper: `(defn diagram-path [slug] (str "/diagrams/" slug "/"))`.

**Nav change:** Add `[:a {:href (href "/diagrams/")} "Diagrams"]` to `base-layout` nav, between Tags and About.

---

### 4. Page generation (`pages.clj` — `get-pages`)

**`get-pages` signature change:** Add `assets-dir` as a second parameter, passed from `core.clj`'s `assets-dir` constant (`"assets"`). Update `core.clj` caller: `(pages/get-pages posts-dir assets-dir)`. The dev server lambda also passes it: `(stasis/serve-pages #(pages/get-pages posts-dir assets-dir))`.

```clojure
(defn get-pages
  "Builds the Stasis page map. assets-dir is the path to SVG assets (e.g. \"assets\")."
  [posts-dir assets-dir]
  (let [posts      (load-posts posts-dir)
        slugs      (published-slugs posts)
        series-map (group-series posts)
        tag-map    (group-tags posts)
        diagrams   (scan-diagrams posts assets-dir)   ;; new
        _          (validate-series series-map)]
    (merge
     { ... existing entries ... }
     {"/diagrams/" (fn [_] (render-diagrams-index diagrams))}
     (into {}
       (map (fn [d]
              [(layout/diagram-path (:slug d))
               (fn [_] (render-diagram-page d))])
            diagrams)))))
```

**`render-sitemap` signature change:** Add `diagrams` as a fourth parameter and emit `/diagrams/` + each `/diagrams/<slug>/` URL:

```clojure
(defn- render-sitemap
  [posts series-map tag-map diagrams]
  (str ...existing...
       "<url><loc>" (layout/absolute-url "/diagrams/") "</loc></url>\n"
       (str/join
        (for [{:keys [slug]} diagrams]
          (str "<url><loc>" (layout/absolute-url (layout/diagram-path slug)) "</loc></url>\n")))
       "</urlset>"))
```

Update the call site in `get-pages` accordingly.

---

### 5. CSS additions (`style.css`)

```css
/* Diagram figure (inline in post) */
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
  content: '\2197';          /* ↗ arrow — safe in all fonts including Rubik */
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

.diagram-transcript {
  margin-top: 0.5rem;
  font-size: 0.82rem;
}
.diagram-transcript > summary {
  color: var(--muted);
  cursor: pointer;
  list-style: none;
}
.diagram-transcript > summary::-webkit-details-marker { display: none; }
.diagram-transcript > p {
  color: var(--muted);
  margin-top: 0.4rem;
  line-height: 1.5;
}

/* Diagram standalone page */
.diagram-page { max-width: var(--max-width); margin: 0 auto; }
.diagram-back {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--muted);
  text-decoration: none;
  margin-bottom: 0.5rem;
}
.diagram-back:hover { color: var(--accent); }
.diagram-title {
  font-size: 1.6rem;
  color: var(--accent);
  margin-bottom: 1.25rem;
}
.diagram-full {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
  background: var(--bg-alt);
}
.diagram-full svg { display: block; width: 100%; }

/* Diagrams index */
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
.diagram-card-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg);
  margin: 0 0 0.25rem;
}
.diagram-card-source {
  font-size: 0.8rem;
  color: var(--muted);
  margin: 0;
}
```

---

## Files changed

| File | Change |
|---|---|
| `src/blog/markdown.clj` | Extend `inline-svgs`: extract alt, inject `<title>`/`<desc>`, wrap in `<figure>` with caption + transcript |
| `src/blog/layout.clj` | Add "Diagrams" to nav; add `diagram-path`, `diagram-page-layout`, `diagrams-index-layout` |
| `src/blog/pages.clj` | Add `scan-diagrams`, `render-diagram-page`, `render-diagrams-index`; extend `get-pages` and `render-sitemap` |
| `resources/public/css/style.css` | Add `.diagram-*` styles |

---

## What stays unchanged

- `inline-svgs` function signature (takes/returns string) — callers unchanged
- All existing post rendering, TOC, series, tag pages
- SVG files in `/assets/` — read-only at build time, not modified
- Stasis/Clojure build pipeline — no new dependencies

## Dev server note

`core.clj`'s `wrap-static-dirs` maps `/css/` and `/assets/` only. The `/diagrams/` routes are served by Stasis's `serve-pages` handler (which rebuilds on every request) — no handler change needed. The `get-pages` signature change requires updating both the `build` call and the `serve-pages` lambda in `core.clj`.
