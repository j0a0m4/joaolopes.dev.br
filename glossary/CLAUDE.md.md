---
format: definition
author: João Lopes
title: "CLAUDE.md"
slug: claude-md
created: "2026-03-19"
tags: [claude-code, ai-engineering, behavioral-modeling]
publish: true
---

# CLAUDE.md

## Definition

The instructions file Claude Code loads at session start. Contains behavioral
rules, conventions, and context for the current project. Lives in the project
root or ~/.claude/ for global rules. Instructions model behavior — they do
not enforce it.


`CLAUDE.md` is the file Claude Code reads at the start of every session to load project-specific instructions. It can live in the project root (project-scoped), in `~/.claude/` (global, loaded in every session), or in subdirectories (scoped to that part of the codebase).

The file is plain markdown. It contains behavioral rules, coding conventions, workflow preferences, and any context the agent needs to operate in the project. Claude Code merges multiple `CLAUDE.md` files — global, project, and subdirectory — into a single instruction set.

`CLAUDE.md` is [[behavioral modeling]], not enforcement. The agent reads and internalizes the instructions, but nothing prevents it from ignoring them under pressure or as context fills. For enforcement, see [[Hooks]].

Tools like Canonic treat `CLAUDE.md` as rendered output — a distribution target — rather than a source of truth. Rules are authored and versioned independently, then composed and distributed to `CLAUDE.md` files.

## Related

- [[behavioral modeling]] — what CLAUDE.md contains
- [[Hooks]] — the enforcement layer CLAUDE.md cannot provide
- [[context window]] — why CLAUDE.md instructions degrade over long sessions
