---
title: "Hello ThinkLoop"
description: "First post on ThinkLoop — what this blog is about, who's behind it, and the Obsidian + Clojure stack that powers it."
created: 2026-03-16
published-on: 2026-03-16
tags:
  - meta
  - clojure
---

# Hello ThinkLoop

ThinkLoop is a blog about software, systems, and thinking tools — written from inside an AI-powered markdown knowledge vault. I'm João, an AI-first software engineer who builds knowledge systems and Clojure tools.

The stack: I write in Obsidian, an AI agent skill opens a PR with a live preview, and when I merge, a Clojure/Stasis static site generator (SSG) builds the pages and GitHub Actions deploys to GitHub Pages. The whole thing is ~500 lines of Clojure.

## Why Build a Blog From Scratch?

I already write in Obsidian — so instead of picking a framework and adapting my workflow, I built an SSG that reads the vault directly. Every dependency is a decision someone else made for you. A custom SSG gives me:

- **Full control** over the markup, styling, and build pipeline
- **No framework churn** — Stasis is a library, not a framework
- **Obsidian as the authoring environment** — I already live here for notes and thinking
- **The blog is a function of the vault** — not a separate system to maintain

The goal is a publishing pipeline that's invisible. Write, publish, done.

## What's Next

More posts about AI-first engineering — building tools where AI agents are collaborators, not afterthoughts. Topics on the radar:

- **Epistemic memory** — confidence-weighted knowledge that decays, gets verified, and supersedes itself
- **Obsidian as infrastructure** — vaults that serve as the source of truth for both humans and AI agents
- **Clojure for personal tools** — static site generators, hook systems, and knowledge pipelines
- **AI-powered workflows** — agents that read, write, and reason over your knowledge graph

Stay tuned.
