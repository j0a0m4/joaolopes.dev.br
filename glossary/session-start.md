---
format: definition
author: João Lopes
title: "SessionStart"
slug: session-start
created: "2026-03-21"
tags: [ai-engineering, claude-code, hooks]
publish: true
---

# SessionStart

## Definition

A Claude Code hook type that fires a script each time a new session opens. Used to inject skills, rules, or context into the agent before the user types anything. The `superpowers` plugin uses a `SessionStart` hook to wire planning discipline into every session automatically.
