---
title: "I Built This Blog by Prompting Claude Code"
created: 2026-03-19
published-on: "2026-03-21"
description: "I built this blog entirely by prompting Claude Code — no file editing by hand, no manual git workflow. This is the story of how, and the stack that made it work: a Clojure SSG, vault-sourced content, devtools-mcp, and superpowers."
tags:
  - ai-first-engineering
  - claude-code
  - skills
  - mcp
  - building-in-public
series: building-in-public
series-order: 1
series-title: "Building in Public with Claude Code"
---

# I Built This Blog by Prompting Claude Code

Claude is resizing my browser right now.

Not because I told it to resize the browser — because I told it to review the responsive design, and it figured out that resizing the browser was part of the job. It's checking the header on an iPhone SE viewport. Now a Z Fold 6. Now an iPad in landscape. It spots a padding issue, proposes two fixes, opens them in separate browser windows so I can compare side by side, asks which I prefer, builds an implementation plan with my choice, and dispatches it to a [[glossary:subagent|sub-agent]] — a fresh Claude instance with isolated context — while it moves on to the next viewport.

I'm watching this happen in real time.

This blog was built entirely this way — no file editing by hand, no manual git workflow, no copy-pasting error messages into chat. Just prompts.

The repo is [public](https://github.com/j0a0m4/joaolopes.dev.br). Every commit, every PR, every GitHub Actions run is there. This is the first post in building it in public — and "in public" is literal.

---

## One session from idea to architecture

I didn't open a text editor. I ran `/spark`.

[[glossary:skills|`/spark`]] is a skill in my vault — it takes a raw idea, evaluates it from multiple angles, and produces a structured output. I told it what I wanted: a blog reading from my Obsidian vault, built in Clojure, deployed to GitHub Pages. One session later, before a single line of code existed, the blog had a shape.

I also knew what it should look like. I use Obsidian with the [Obsidianite](https://github.com/bencodezen/obsidianite) theme — dark background, purple accents, clean typography. I wanted the blog to feel like the place I write. I asked Claude to replicate it, and it did. The footer credits the creator. **If you're going to be inspired by someone's work, name them.**

---

## Skills shipped the blog before I installed anything

The infrastructure came first. Claude scaffolded the Stasis pipeline, wired the GitHub Actions workflow, and set up the preview environment — a PR-based preview deployed on every push, so every change is reviewable before it merges to main. I described what I wanted. Claude built it.

Then came content. The first post wasn't written from scratch — it was mined from the vault. I'd given a workshop, captured it as a reference note in Obsidian, and that became the raw material. Three [[glossary:skills|skills]] handled the writing workflow:

- `/tech-writer` flagged a paragraph that claimed "agents replace developers" with no evidence backing it. It got rewritten.
- `/post` structured the content with the frontmatter the SSG expects — series metadata, tags, description for RSS
- `/publish` ran the build, created the PR, waited for the preview check, and asked "merge to main?" — I never touched git

**The loop: describe → review → publish.** The infrastructure was already in place — [[glossary:rules|rules]], [[glossary:hooks|hooks]], an Obsidian vault wired as working memory. Skills were the publishing workflow on top of a system that was already thinking.

![The publishing loop: three steps — Describe, Review, Publish — inside an infrastructure envelope of rules, hooks, and vault. A pink dashed arrow loops from Publish back to Describe.](/assets/publishing-loop.svg)

---

## Then I broke it

The diagrams started with mermaid — Claude is pretty good at it. Generate, review, done. But JSON Canvas is visually richer, and the collaboration model is different: I drag nodes around in Obsidian, Claude works in the same file alongside me. I wanted that.

Even with a dedicated [[glossary:skills|skill]] for it, Claude isn't proficient enough at JSON Canvas to get complex diagrams right from prompts alone. So I built a compiler: mermaid → JSON Canvas → SVG. Feed it mermaid, get a polished SVG out.

The compiler generated garbage. The pipeline pushed it without verifying the output visually. **Users got the garbage.**

Separately: I had no idea some users were seeing a light theme. The Obsidianite design is dark-first — I'd never checked what the diagrams looked like on a light background.

Two separate failures, one root: **I had no feedback loop between "code pushed" and "what users actually see."**

I reverted the GitHub Actions deployment. And then I stopped adding features.

---

## Two tools that closed the loop

The revert was the turning point. Two things changed everything: `superpowers` and `chrome-devtools-mcp`.

`superpowers` wires planning discipline into every session before you type a word. A [[glossary:session-start|SessionStart]] [[glossary:hooks|hook]] — a script that runs each time Claude Code opens — fires at the beginning of every session and injects one meta-[[glossary:skills|skill]] into Claude's [[glossary:context-window|context]]: _if there's even a 1% chance a relevant skill exists, invoke it before doing anything_. That's it. The skills superpowers ships aren't loaded into context — they sit on disk and lazy-load on demand. When you describe something to build, Claude steps back, extracts a spec from the conversation, writes an implementation plan, gets your sign-off, then executes — dispatching [[glossary:subagent|sub-agents]] per task, each with a fresh [[glossary:context-window|context window]].

Not because you typed a command. Because the session was wired that way before you typed anything.

`chrome-devtools-mcp` — a [[glossary:mcp|MCP]] server — gives [[glossary:claude-code|Claude Code]] a live connection to your browser: console logs, network requests, DOM inspection, JavaScript execution, viewport control. Instead of copying error messages into chat or describing what you see on screen, Claude reads it directly. It closes the feedback loop between code changes and browser state without you acting as the relay.

The combination is what's happening in the opening of this post. I described a responsive design review. Claude opened DevTools, resized viewports, identified rendering issues on mobile, proposed design variants in separate browser windows, let me pick one, built an implementation plan, and dispatched it to sub-agents — all without me describing what a viewport is.

---

## The thing worth naming

The Clojure part of this story is almost incidental. The blog shipped as a small Stasis pipeline, a markdown parser, and Hiccup templates. That codebase has grown significantly since. But developers building with Next.js or Astro would have the same experience. The [[glossary:skills|skills]], the [[glossary:mcp|MCPs]], the session wiring — none of it is language-specific.

What's specific is the pattern: **vault as content source, skills as workflow, devtools-mcp as feedback loop, superpowers as discipline.**

That's the stack that made "building by prompting" actually work — and that caught what "building by prompting without discipline" broke.

The order matters. The blog was live before `superpowers` was installed. Skills alone were enough to ship. The level-up came after, when the question stopped being "can I build this?" and became "can I trust what I'm shipping?"
