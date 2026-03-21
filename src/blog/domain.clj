(ns blog.domain
  (:require [clj-yaml.core :as yaml]
            [clojure.string :as str]))

;; Migration map — functions moved from blog.markdown and blog.pages:
;;
;; FROM blog.markdown → blog.domain
;;   parse-frontmatter       — pure YAML frontmatter split
;;   slugify                 — pure string → slug transformation
;;   transform-image-embeds  — Obsidian ![[img]] → Markdown ![]() (no HTML output)
;;   strip-related-section   — removes ## Related section from markdown body
;;   heading-anchor          — pure slug derivation for TOC anchors
;;   extract-toc             — pure heading parser, returns data (no HTML)
;;   extract-alt             — pure alt attribute extraction from img tag string
;;   svg-slug-from-path      — pure /assets/foo.svg → foo derivation
;;   normalize-date          — pure java.util.Date → YYYY-MM-DD string
;;   normalize-dates         — pure frontmatter date normalization
;;   parse-post              — pure file content → post map (no HTML, no IO)
;;
;; FROM blog.markdown → blog.render
;;   transform-highlights    — ==text== → <mark>text</mark>
;;   transform-callouts      — > [!note] → <blockquote class="callout-*">
;;   transform-glossary-links — [[glossary:T]] → <abbr>/<a> HTML
;;   transform-wikilinks     — [[Title]] → <a> or plain text
;;   transform-obsidian      — orchestrates all Obsidian pre-processing transforms
;;   render-markdown         — markdown string → HTML via CommonMark
;;   inject-svg-a11y         — injects role/aria/title/desc into <svg> markup
;;   inline-svgs             — replaces <img src="*.svg"> with <figure> + inlined SVG (IO)
;;
;; FROM blog.pages → blog.domain
;;   published-slugs         — pure #{slug} derivation from post list
;;   extract-definition-text — pure regex extraction of first Definition paragraph
;;   glossary-defs-map       — pure {slug → definition} map from glossary entries
;;   validate-series         — pure series consistency check (side-effect: println)
;;   group-series            — pure {slug → {:posts :slug->idx}} grouping
;;   series-context          — pure prev/next navigation context for a post
;;   group-tags              — pure {tag-slug → [posts]} grouping
;;   rfc822-date             — pure YYYY-MM-DD → RFC 822 date string
;;   svg-slug                — pure foo.svg → foo (NOTE: duplicate of svg-slug-from-path; DELETE one)
;;   slug->title             — pure foo-bar → Foo Bar string transformation
;;   extract-diagram-alt     — pure regex extraction of alt text from post body
;;
;; FROM blog.pages → blog.render
;;   render-tag-index        — produces HTML page via layout
;;   inject-toc-backlinks    — mutates HTML string (inserts ↑ Contents anchors)
;;   render-post             — produces full HTML post page
;;   render-series-index     — produces HTML series index page
;;   render-index            — produces HTML index page
;;   render-rss              — produces RSS 2.0 XML string
;;   render-sitemap          — produces sitemap.xml string
;;   render-about            — reads file + produces HTML (IO in render layer)
;;   render-glossary-body    — applies transform-obsidian + render-markdown to entry
;;   render-glossary-entry   — produces HTML glossary entry page
;;   render-glossary-index   — produces HTML glossary index page
;;   inject-diagram-a11y     — injects ARIA into SVG for diagram pages (NOTE: duplicate of inject-svg-a11y; DELETE one)
;;   render-llms-txt         — produces llms.txt plain text string
;;   render-tags-overview    — produces HTML tags overview page
;;   render-diagram-page     — produces HTML diagram detail page
;;   render-diagrams-index   — produces HTML diagrams index page
;;   render-404              — produces HTML 404 page
;;
;; FROM blog.pages → blog.io.filesystem
;;   git-last-modified       — spawns git process, reads stdout
;;   load-posts              — reads markdown files from disk, parses, sorts
;;   load-glossary           — reads glossary markdown files from disk
;;   scan-diagrams           — reads SVG and .mmd files from assets dir (IO)
;;
;; STAYS in blog.pages (orchestration entry point)
;;   get-pages               — wires IO + domain + render into Stasis page map
;;
;; DUPLICATES TO DELETE (keep one canonical version in blog.domain / blog.render)
;;   svg-slug (pages) vs svg-slug-from-path (markdown)  → keep svg-slug-from-path, delete svg-slug
;;   inject-diagram-a11y (pages) vs inject-svg-a11y (markdown) → unify into single fn in blog.render
