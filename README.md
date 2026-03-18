# joaolopes.dev.br

Personal blog at [joaolopes.dev.br](https://joaolopes.dev.br). Built with Clojure and [Stasis](https://github.com/magnars/stasis).

Posts are authored in Obsidian, synced via a publish skill, and deployed to GitHub Pages.

## Development

```bash
# Build static site to public/
clojure -M:build

# Dev server with live reload on port 3000
clojure -M:serve
```

## Diagrams

SVG diagrams are **inlined at build time** — the markdown pipeline replaces
`<img src="/assets/*.svg">` with raw `<svg>` content. This means:

- SVGs inherit the page's loaded Rubik font (no sandboxed `<img>` fallback)
- SVGs must exist in `assets/` before running `clojure -M:build`
- Source canvases live in the Calcifer vault (`canvas/`)

The inline transformation lives in `src/blog/markdown.clj` (`inline-svgs`),
wired into the rendering pipeline in `src/blog/pages.clj`.

## Theme

Obsidianite-inspired deep-space theme. Key colors:

| Token        | Value     |
| ------------ | --------- |
| --bg         | `#100e17` |
| --bg-alt     | `#191621` |
| --fg         | `#bebebe` |
| --muted      | `#7a7a8e` |
| --accent     | `#0fb6d6` |
| --sub-accent | `#f4569d` |

Font: Rubik (body), ui-monospace (code). SVG diagrams must use this palette.
