# Mobile Responsiveness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make joaolopes.dev.br readable and navigable on phone-size viewports (≤480px) with a fully accessible hamburger nav and collapsible TOC.

**Architecture:** Two files change — `style.css` gets a `@media (max-width: 480px)` block plus two global rules; `layout.clj` gets a hamburger button, an `#nav-menu` id on the nav links, a `<details>/<summary>` TOC wrapper, and one inline JS block. No new files. No build tooling changes.

**Tech Stack:** Clojure + Hiccup2 (HTML generation), vanilla CSS, ~25 lines inline JS, `clojure -M:build` to compile, `clojure -M:serve` for local preview (port 3000).

---

## File map

| File | What changes |
|------|-------------|
| `resources/public/css/style.css` | Add `.nav-toggle { display: none }` globally; add TOC `<details>` base styles; add `@media (max-width: 480px)` block with all phone fixes |
| `src/blog/layout.clj` | `base-layout`: add `[:button.nav-toggle ...]`, add `id` to nav-links span, add inline `<script>`; `toc-nav`: wrap in `[:details.toc-details ...]` with `[:summary.toc-label ...]` |

**Verification throughout:** No test suite exists. Each task ends with `clojure -M:build` and a Chrome DevTools viewport check at 390px. Final task does a full QA sweep across all target viewports.

---

## Task 1: CSS — tags, dateline, body padding

The three simplest fixes. All inside a new `@media (max-width: 480px)` block appended to `style.css`. These have no layout.clj dependency — do them first to establish the breakpoint and verify the build works.

**Files:**
- Modify: `resources/public/css/style.css` (append to end of file)

- [ ] **Step 1: Append the mobile media query block with three fixes**

Add to the very end of `resources/public/css/style.css`:

```css
/* ── Mobile (≤480px) ────────────────────────────────────────── */
@media (max-width: 480px) {
  body {
    padding: 1.25rem 1rem;
  }

  .tags {
    flex-wrap: wrap;
  }

  .post-dateline {
    display: flex;
    flex-wrap: wrap;
    gap: 0.15rem 0.35rem;
  }
}
```

- [ ] **Step 2: Build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

Expected: `Build complete` with no errors.

- [ ] **Step 3: Verify in browser at 390px**

Open `http://localhost:3000/posts/building-your-ai-toolkit/` in Chrome DevTools with viewport set to 390×844 mobile.

Check:
- All tags visible (no clipping on the right) — `#agent-design` must be fully visible
- `Published … · Updated …` wraps cleanly onto two lines rather than breaking mid-word
- Page top has slightly less vertical whitespace than before

- [ ] **Step 4: Commit**

```bash
cd ~/dev/joaolopes.dev.br
git add resources/public/css/style.css
git commit -m "fix(mobile): tags wrap, dateline flex-wrap, body padding"
```

---

## Task 2: CSS — nav toggle global styles + hamburger dropdown

Adds the global `.nav-toggle { display: none }` rule and the mobile-only nav dropdown styles. The button doesn't exist in the HTML yet — that's Task 4. These CSS rules are inert until then, so they're safe to land first.

**Files:**
- Modify: `resources/public/css/style.css`

- [ ] **Step 1: Add global nav-toggle hidden rule and TOC summary base styles**

After the existing `.nav-links a:hover` rule (use the rule name as your anchor — line numbers drift as the file changes), add:

```css
/* Nav toggle — hidden on desktop, shown via mobile media query */
.nav-toggle { display: none; }

/* TOC details — hide native disclosure marker, non-interactive on desktop */
.toc-details > summary {
  list-style: none;
  font-weight: 600;
}
.toc-details > summary::-webkit-details-marker { display: none; }

/* TOC desktop: force open regardless of [open] attribute */
@media (min-width: 481px) { /* mirrors max-width: 480px mobile breakpoint */
  .toc-details > ul { display: block; }
  .toc-details > summary {
    pointer-events: none;
    cursor: default;
  }
}
```

- [ ] **Step 2: Add hamburger styles inside the existing `@media (max-width: 480px)` block**

Append inside the `@media (max-width: 480px)` block added in Task 1:

```css
  /* Nav — hamburger button */
  nav { position: relative; }

  .nav-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--muted);
    font-size: 1.1rem;
    min-width: 44px;
    min-height: 44px;
    cursor: pointer;
  }

  /* Nav links open state — dropdown below nav bar */
  #nav-menu:not([hidden]) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-alt);
    border-bottom: 1px solid var(--border);
    z-index: 100;
    padding: 0.5rem 0;
  }

  #nav-menu a {
    padding: 0.65rem 1rem;
    min-height: 44px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border);
    font-size: 1rem;
  }
```

- [ ] **Step 3: Build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

Expected: `Build complete` with no errors. No visible changes in browser yet (button doesn't exist in HTML).

- [ ] **Step 4: Commit**

```bash
cd ~/dev/joaolopes.dev.br
git add resources/public/css/style.css
git commit -m "fix(mobile): nav toggle + hamburger dropdown CSS"
```

---

## Task 3: CSS — code block overflow indicator + TOC mobile styles

Adds the `pre::after` fade gradient and the mobile TOC collapse affordance styles.

**Files:**
- Modify: `resources/public/css/style.css`

- [ ] **Step 1: Add code block overflow fade (inside `@media (max-width: 480px)`)**

Append inside the `@media (max-width: 480px)` block:

```css
  /* Code block overflow indicator */
  pre { position: relative; }
  pre::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 2rem;
    background: linear-gradient(to right, transparent, var(--code-bg));
    pointer-events: none;
    border-radius: 0 6px 6px 0;
  }
```

Note: this gradient appears on all `pre` blocks including short ones — this is a known tradeoff documented in the spec.

- [ ] **Step 2: Add TOC mobile collapse styles (inside `@media (max-width: 480px)`)**

Append inside the `@media (max-width: 480px)` block:

```css
  /* TOC — collapsed by default on mobile (native <details> behaviour) */
  .toc-details:not([open]) > summary::after {
    content: " ▸ " attr(data-count);
    color: var(--muted);
    font-weight: 400;
  }
  .toc-details[open] > summary::after {
    content: " ▾";
    color: var(--muted);
  }
  .toc-details > summary {
    cursor: pointer;
    min-height: 44px;
    display: flex;
    align-items: center;
  }
```

- [ ] **Step 3: Build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

Expected: `Build complete` with no errors. No visible TOC change yet (layout.clj still uses the old `.toc` nav structure).

- [ ] **Step 4: Commit**

```bash
cd ~/dev/joaolopes.dev.br
git add resources/public/css/style.css
git commit -m "fix(mobile): code block overflow fade, TOC collapse styles"
```

---

## Task 4: layout.clj — hamburger button + nav-menu id

Modifies `base-layout` in `src/blog/layout.clj` to add the hamburger toggle button and give the nav-links span an `id`. This is the HTML side of the hamburger — JS comes in Task 5.

**Files:**
- Modify: `src/blog/layout.clj` — `base-layout` function, the `[:nav ...]` block (around line 70)

The current nav hiccup is:
```clojure
[:nav
 [:a.site-logo {:href (href "/")}
  [:svg.logo ...]
  site-title]
 [:span.nav-links
  [:a {:href (href "/")} "Posts"]
  [:a {:href (href "/tags/")} "Tags"]
  [:a {:href (href "/about/")} "About"]
  [:a {:href (href "/feed.xml")} "RSS"]]]
```

- [ ] **Step 1: Add hamburger button and id to nav-links**

⚠️ Read the actual `[:svg.logo ...]` node in `layout.clj` before applying this edit — preserve it exactly. The SVG shown here is for reference only; the real file is the source of truth.

Replace the `[:nav ...]` block with:

```clojure
[:nav
 [:a.site-logo {:href (href "/")}
  ;; Keep the existing [:svg.logo ...] node exactly as-is
  site-title]
 [:button.nav-toggle
  {:aria-expanded "false"
   :aria-controls "nav-menu"
   :aria-label "Menu"}
  [:span.hamburger-icon {:aria-hidden "true"} "☰"]]
 [:span#nav-menu.nav-links
  [:a {:href (href "/")} "Posts"]
  [:a {:href (href "/tags/")} "Tags"]
  [:a {:href (href "/about/")} "About"]
  [:a {:href (href "/feed.xml")} "RSS"]]]
```

Key changes:
- Added `[:button.nav-toggle ...]` between logo and nav-links
- Changed `[:span.nav-links ...]` to `[:span#nav-menu.nav-links ...]` (adds `id="nav-menu"`)
- No `hidden` attribute on the span — JS sets that after checking the viewport

- [ ] **Step 2: Build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

Expected: `Build complete`. The ☰ button is invisible on desktop (CSS hides it) but present in the DOM.

- [ ] **Step 3: Verify button in DOM at 390px**

In Chrome DevTools at 390px, confirm:
- The ☰ button is visible in the top-right of the nav
- "João Lopes" logo and nav links are both visible (no JS yet — links show)
- No console errors

- [ ] **Step 4: Commit**

```bash
cd ~/dev/joaolopes.dev.br
git add src/blog/layout.clj
git commit -m "fix(mobile): add hamburger toggle button, nav-menu id"
```

---

## Task 5: layout.clj — inline JS for hamburger behaviour

Adds the JS script block to `base-layout`. This wires the button to show/hide the nav, sets the initial hidden state on mobile, and handles Escape key.

**Files:**
- Modify: `src/blog/layout.clj` — `base-layout` function, inside `[:head ...]` (after the existing mermaid script, around line 67)

- [ ] **Step 1: Add the nav JS script to `[:head ...]`**

After the existing mermaid `[:script {:type "module"} ...]` block, add:

```clojure
[:script
 (h/raw "document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  // Hide on mobile only — not server-rendered, so desktop without JS sees links
  if (window.matchMedia('(max-width: 480px)').matches) {
    menu.setAttribute('hidden', '');
  }

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    menu.toggleAttribute('hidden');
    btn.querySelector('.hamburger-icon').textContent = open ? '\u2630' : '\u2715';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('hidden', '');
      btn.querySelector('.hamburger-icon').textContent = '\u2630';
      btn.focus();
    }
  });
});")]
```

Note: `☰` is `\u2630` and `✕` is `\u2715` — using Unicode escapes avoids encoding issues in the Clojure string.

- [ ] **Step 2: Build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

Expected: `Build complete` with no errors.

- [ ] **Step 3: Verify hamburger behaviour at 390px**

In Chrome DevTools at 390×844 mobile:
- Nav links hidden on load (☰ button shows)
- Tap ☰ → nav opens as vertical dropdown, button shows ✕
- Tap ✕ → nav closes, button shows ☰
- `aria-expanded` toggles in DevTools Elements panel
- Press Escape → menu closes, focus returns to button

In Chrome DevTools at 800px (desktop):
- ☰ button invisible, nav links always visible
- No JS interference with desktop layout

- [ ] **Step 4: Commit**

```bash
cd ~/dev/joaolopes.dev.br
git add src/blog/layout.clj
git commit -m "fix(mobile): hamburger JS — toggle, initial state, Escape key"
```

---

## Task 6: layout.clj — TOC `<details>/<summary>`

Modifies the `toc-nav` private function to wrap the TOC in `<details>/<summary>`. No `open` attribute — the `<details>` starts collapsed natively. Desktop CSS (added in Task 2) forces it open.

**Files:**
- Modify: `src/blog/layout.clj` — `toc-nav` function (around line 175)

The current `toc-nav` function:
```clojure
(defn- toc-nav
  "Table of contents from extracted headings. Returns hiccup or nil."
  [headings]
  (when (seq headings)
    [:nav.toc {:id "toc"}
     [:p.toc-label "Contents"]
     [:ul
      (for [{:keys [level text anchor]} headings
            :when (= 2 level)]
        ...)]]))
```

- [ ] **Step 1: Wrap toc-nav in `<details>/<summary>`**

⚠️ Read the actual `toc-nav` function before applying — it may already handle h3 sub-items differently. Preserve any existing sub-item logic; only change the outer structure (wrap in `<details>`, replace `[:p.toc-label]` with `[:summary.toc-label]`).

Replace the `toc-nav` function with:

```clojure
(defn- toc-nav
  "Table of contents from extracted headings. Returns hiccup or nil.
   Uses <details>/<summary> for native collapse on mobile — no JS needed.
   Desktop CSS forces it open via min-width: 481px override."
  [headings]
  (when (seq headings)
    (let [h2s (filter #(= 2 (:level %)) headings)
          section-count (str (count h2s) " sections")]
      [:details.toc-details
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
```

Key changes:
- Outer element is now `[:details.toc-details ...]` (no `open` attribute)
- `[:p.toc-label ...]` becomes `[:summary.toc-label {:data-count section-count} ...]`
- Count of h2 headings passed as `data-count` for the CSS `attr()` hint
- `[:nav {:id "toc"} ...]` is now inside the `<details>`, preserving the `#toc` anchor for the existing `↑ Contents` back-links

- [ ] **Step 2: Build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

Expected: `Build complete` with no errors.

- [ ] **Step 3: Verify TOC behaviour**

In Chrome DevTools at 390px:
- TOC collapsed on load — shows "Contents ▸ N sections"
- Tap to expand — shows full list with "Contents ▾"
- Tap to collapse again — works

In Chrome DevTools at 800px:
- TOC expanded and non-interactive (no pointer cursor, no triangle)
- `↑ Contents` back-links still work (they reference `#toc` which is still in the DOM inside `<details>`)

- [ ] **Step 4: Commit**

```bash
cd ~/dev/joaolopes.dev.br
git add src/blog/layout.clj
git commit -m "fix(mobile): collapsible TOC via <details>/<summary>"
```

---

## Task 7: Full visual QA

Build once more and do a complete sweep across all target viewports to confirm nothing regressed.

**Files:** None (read-only verification)

- [ ] **Step 1: Final build**

```bash
cd ~/dev/joaolopes.dev.br && clojure -M:build
```

- [ ] **Step 2: QA checklist at 373px (Z Fold 6 cover)**

Set Chrome DevTools viewport to 373×815. Open `http://localhost:3000/posts/building-your-ai-toolkit/`.

- [ ] Nav logo on one line, ☰ button visible and tappable
- [ ] ☰ opens/closes dropdown; links have ≥44px tap targets
- [ ] Escape key closes menu, focus returns to button
- [ ] Tags row wraps — all tags visible
- [ ] Dateline wraps cleanly
- [ ] Code block has right-edge fade gradient
- [ ] TOC collapsed on load, expands on tap

- [ ] **Step 3: QA checklist at 390px (iPhone 14/15)**

Same checks as above at 390×844.

- [ ] **Step 4: QA checklist at 428px (iPhone Pro Max)**

Same checks at 428×926.

- [ ] **Step 5: QA desktop regression check at 800px**

Set viewport to 800px (no mobile emulation).

- [ ] Nav shows logo + inline links, no ☰ button visible
- [ ] TOC expanded and non-interactive
- [ ] No layout regressions vs pre-change desktop view

- [ ] **Step 6: Check index page at 390px**

Open `http://localhost:3000/` at 390px.

- [ ] Nav hamburger works
- [ ] Post list tags wrap correctly

- [ ] **Step 7: Final commit if any last-minute fixes**

```bash
cd ~/dev/joaolopes.dev.br
git add -p  # stage only what changed
git commit -m "fix(mobile): QA corrections"
```

If no fixes needed, skip this step.
