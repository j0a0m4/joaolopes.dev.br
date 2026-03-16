---
title: "Hello ThinkLoop"
description: "First post on ThinkLoop — a static blog built with Clojure, Stasis, and Obsidian as the authoring environment."
created: 2026-03-16
published-on: 2026-03-16
tags:
  - meta
  - clojure
---

# Hello ThinkLoop

This is the first post on ThinkLoop, a personal blog about software, systems, and thinking tools.

The entire pipeline works like this: I write in Obsidian (a markdown knowledge vault called Calcifer), flip `publish: true` in the frontmatter, and run a publish skill that syncs clean markdown to a Clojure/Stasis static site generator. GitHub Actions handles the deploy to GitHub Pages.

## Why Build a Blog From Scratch?

Every dependency is a trade-off. A custom SSG in ~200 lines of Clojure gives me:

- **Full control** over the markup, styling, and build pipeline
- **No framework churn** — Stasis is a library, not a framework
- **Obsidian as the authoring environment** — I already live here for notes and thinking
- **The blog is a function of the vault** — not a separate system to maintain

The goal is a publishing pipeline that's invisible. Write, flip a flag, push. Done.

## What's Next

More posts about the tools and systems I'm building. Topics on the radar:

- Confidence-weighted knowledge management
- AI agents as vault collaborators
- Clojure for personal infrastructure

Stay tuned.
