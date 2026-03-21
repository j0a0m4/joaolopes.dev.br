# joaolopes.dev.br

Personal blog at [joaolopes.dev.br](https://joaolopes.dev.br). Built with Clojure, ClojureScript, and [Stasis](https://github.com/magnars/stasis).

Posts are authored in Obsidian, synced via a publish skill, and deployed to GitHub Pages.

## Architecture

Layered pipeline with a clean IO boundary. Pure logic never touches the filesystem or receives the system map.

```
config.edn → blog.system/load-config! → system map
                                           │
blog.io.filesystem ──── ContentSource protocol (IO port)
                              │
                    blog.domain (pure transforms)
                              │
                    blog.render (pure HTML/XML output)
                              │
                    blog.pages/get-pages! (thin controller)
                              │
                    blog.core/build! → public/
```

| Namespace            | Role                                       | Pure? |
|----------------------|--------------------------------------------|-------|
| `blog.ports.io`     | `ContentSource` protocol                   | —     |
| `blog.io.filesystem` | Production `FilesystemSource`             | No    |
| `blog.system`        | `load-config!` — reads `config.edn`       | No    |
| `blog.domain`        | Parse, enrich, validate, expand wikilinks  | Yes   |
| `blog.render`        | Render HTML/XML, build Stasis route maps   | Yes   |
| `blog.layout`        | Hiccup templates (vectors, not strings)    | Yes   |
| `blog.pages`         | Controller — wires io → domain → render    | No    |
| `blog.core`          | Entry point — `build!`, `serve!`           | No    |
| `blog.client.core`   | ClojureScript — nav, tooltips, mermaid     | —     |

## Development

```bash
# Build static site to public/
clojure -M:shadow compile app && clojure -M:build

# Dev server with live reload on port 3000
clojure -M:serve

# Run all tests locally
clojure -M:test

# Run unit / integration separately
clojure -M:unit
clojure -M:integration

# Run e2e tests (requires built public/ and Playwright)
npx playwright test
```

## Testing

Three layers, each testing a different boundary.

| Layer       | Alias          | What                               | IO              |
|-------------|----------------|------------------------------------|-----------------|
| Unit        | `:unit`        | `blog.domain`, `blog.render`       | None            |
| Integration | `:integration` | `blog.pages` controller            | `MemorySource`  |
| E2e         | Playwright     | Full build + headless browser      | Real filesystem |

`MemorySource` (`test/blog/io/memory.clj`) is a test-only stub — never in `src/`.

## CI Pipeline

```
PR opened / pushed
├── tests.yml         → unit | integration (parallel)
├── e2e.yml           → build → Playwright (headless Chromium)
└── preview.yml       → build (BASE_PATH=/preview) → deploy preview

Merge to main
└── deploy.yml        → build → deploy to GitHub Pages
```

Branch protection requires: `unit`, `integration`, `e2e`.

## Diagrams

SVG diagrams are **inlined at build time** — the render pipeline replaces
`<img src="/assets/*.svg">` with raw `<svg>` content injected via `h/raw`. This means:

- SVGs inherit the page's loaded Rubik font (no sandboxed `<img>` fallback)
- Every inlined SVG gets ARIA attributes: `role="img"`, `<title>`, `<desc>`, `aria-labelledby`
- SVGs must exist in `assets/` before running `clojure -M:build`
- Source canvases live in the Calcifer vault (`canvas/`)

## ClojureScript Client

Single namespace `blog.client.core` compiled by shadow-cljs to `resources/public/js/main.js`.

- Mobile nav toggle with `aria-expanded` / `aria-controls`
- Glossary click-to-reveal tooltips with `role="tooltip"`, `aria-describedby`, keyboard (Enter/Space/Escape)
- Mermaid diagram rendering
- Scroll position restoration

## Theme

Obsidianite-inspired deep-space theme. Key colors:

| Token        | Value     |
|--------------|-----------|
| --bg         | `#100e17` |
| --bg-alt     | `#191621` |
| --fg         | `#bebebe` |
| --muted      | `#7a7a8e` |
| --accent     | `#0fb6d6` |
| --sub-accent | `#f4569d` |

Font: Rubik (body), ui-monospace (code). SVG diagrams must use this palette.
