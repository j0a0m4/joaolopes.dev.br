# Mobile Responsiveness — Design Spec

**Date:** 2026-03-19
**Status:** Approved
**Scope:** Phone-range viewports (≤480px). 768px+ is already solid — no changes there.
**Target devices:** Samsung Z Fold 6 cover (~373px), iPhone 14/15 (390px), common Android (360–430px), iPhone Pro Max (428px)

---

## Problem

The blog has zero `@media (max-width: ...)` breakpoints. Five concrete issues at ≤430px:

| # | Issue | Severity |
|---|-------|----------|
| 1 | Nav logo ("João Lopes") wraps to 2 lines — nav grows to 2× its intended height | Critical |
| 2 | Tags row overflows — last tag clipped off right edge (missing `flex-wrap`) | Critical |
| 3 | Code blocks scroll horizontally with no visual overflow indicator | High |
| 4 | Post dateline breaks mid-sentence at 373px | Medium |
| 5 | TOC dominates the first screen (~400px tall) before any content | Medium |

768px+ (iPad, Z Fold 6 inner) already looks excellent. No changes needed above 480px.

---

## Decisions

**Navigation:** Hamburger menu (☰) at ≤480px. Logo stays left, button right. Opens a vertical nav list. Chosen for clean one-line nav at all phone widths.

**TOC:** Collapsed by default on mobile. Tap "Contents ▸" to expand. Desktop stays always open. Chosen to let readers reach content immediately on long posts.

**Accessibility:** Primary constraint. Every implementation choice must satisfy WCAG 2.2 AA and ARIA APG patterns.

---

## Design

### 1. Hamburger nav

**HTML changes** (`layout.clj` — `base-layout`):

Replace the current `[:span.nav-links ...]` with a button + conditionally-hidden list:

```clojure
;; In <nav>: add toggle button before the links span
[:button.nav-toggle
 {:aria-expanded "false"
  :aria-controls "nav-menu"
  :aria-label "Menu"}
 [:span.hamburger-icon {:aria-hidden "true"} "☰"]]

;; Give nav-links an id and hidden attribute
[:span#nav-menu.nav-links {:hidden ""}
 [:a {:href (href "/")} "Posts"]
 [:a {:href (href "/tags/")} "Tags"]
 [:a {:href (href "/about/")} "About"]
 [:a {:href (href "/feed.xml")} "RSS"]]
```

**Accessibility contract:**

- `<button>` (not div/span) — native keyboard focus, click events, screen reader role
- `aria-expanded="false"` — toggled to `"true"` on open; screen readers announce "Menu, collapsed" / "Menu, expanded"
- `aria-controls="nav-menu"` — links button to the element it controls; VoiceOver/TalkBack can jump to the menu
- `hidden` attribute (not CSS `display:none`) — removes items from accessibility tree when closed; keyboard users cannot tab to hidden links
- Escape key closes menu and returns focus to the toggle button (ARIA APG disclosure navigation pattern)
- Touch target ≥ 44×44px on the toggle button (WCAG 2.5.5)
- No focus trap — disclosure nav (not modal); Tab flows naturally through open items then out

**JS (~20 lines, inline in `base-layout`):**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    menu.toggleAttribute('hidden');
    btn.querySelector('.hamburger-icon').textContent = open ? '☰' : '✕';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('hidden', '');
      btn.querySelector('.hamburger-icon').textContent = '☰';
      btn.focus();
    }
  });
});
```

**CSS:**

```css
/* Hide toggle button on desktop */
.nav-toggle { display: none; }

@media (max-width: 480px) {
  /* Show toggle, hide static links */
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

  /* Nav links: hidden by default (JS removes hidden attr on open) */
  /* When visible: vertical list below the nav bar */
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
}
```

The `<nav>` element needs `position: relative` to anchor the dropdown.

---

### 2. Collapsible TOC

**HTML changes** (`layout.clj` — `toc-nav`):

Wrap the TOC content in `<details>/<summary>`. The `open` attribute is rendered server-side (always open in HTML); CSS removes it on mobile so it starts collapsed.

```clojure
[:details.toc-details {:open true}
 [:summary.toc-label "Contents"]
 [:ul
  (for [...] ...)]]
```

Pass the section count as a `data-count` attribute on the summary for the collapsed label:

```clojure
[:summary.toc-label {:data-count (str (count h2-headings) " sections")} "Contents"]
```

**Accessibility:** `<details>/<summary>` has implicit ARIA roles (`group`/`button`). VoiceOver announces "Contents, collapsed, button" with no manual ARIA needed.

**CSS:**

```css
/* Desktop: details always open, summary non-interactive */
.toc-details > summary {
  list-style: none;
  cursor: default;
  font-weight: 600;
}
.toc-details > summary::-webkit-details-marker { display: none; }

@media (max-width: 480px) {
  /* Remove the server-rendered open attribute effect */
  .toc-details:not([open]) > ul { display: none; }

  /* Show section count hint when collapsed */
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
}
```

---

### 3. Five CSS fixes (all in `@media (max-width: 480px)`)

**① Tags wrap**

```css
.tags { flex-wrap: wrap; }
```

**② Code block overflow indicator**

```css
pre {
  position: relative;
}
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

**③ Dateline wraps gracefully**

```css
.post-dateline {
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem 0.35rem;
}
```

**④ Body padding**

```css
body {
  padding: 1.25rem 1rem;
}
```

**⑤ Nav link touch targets** (applies inside the open mobile menu)

```css
/* Already handled by #nav-menu a { min-height: 44px } in section 1 */
```

---

## Breakpoints

| Breakpoint | Target |
|---|---|
| ≤480px | All phone-range fixes (hamburger, collapsed TOC, CSS fixes) |
| >480px | No changes — existing layout unchanged |

---

## What stays unchanged

- Font size (18px base) — already good on mobile
- Max-width (42rem) — only active on wider screens
- All 768px+ layouts — iPad, Z Fold 6 inner
- Colors, dark/light themes, SVG diagrams
- Clojure SSG build process — changes are CSS + one inline JS block + minor Hiccup edits

---

## Files to change

| File | Change |
|---|---|
| `resources/public/css/style.css` | Add `@media (max-width: 480px)` block + nav-toggle styles + TOC details styles |
| `src/blog/layout.clj` | Hamburger button + nav id/hidden, TOC details/summary wrap, inline JS |
