---
format: definition
author: João Lopes
title: "Hooks"
slug: hooks
created: "2026-03-19"
tags: [ai-engineering, claude-code, blackwall]
publish: true
---

# Hooks

## Definition

Lifecycle events that fire before and after every tool call. Unlike instructions, hooks run as code — they enforce behavior unconditionally, outside the model's context.


Claude Code exposes 21 lifecycle events as hooks: `SessionStart`, `SessionEnd`, `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `SubagentStart`, `SubagentStop`, and more. Each hook fires when the named event occurs during a Claude Code session.

Hooks are wired in `.claude/settings.json` and point at scripts that run synchronously (PreToolUse can block a tool call) or asynchronously (everything else). They fire at the process level — not per-conversation, not per-agent, but on every tool invocation regardless of what agent or subagent triggered it.

This is what makes hooks a reliable enforcement mechanism where behavioral modeling is not: hooks do not read context, do not drift with conversation length, and cannot be rationalized past. They execute unconditionally.

## Related

- [[behavioral modeling]] — the softer layer hooks complement
- [[context window]] — what hooks bypass: they fire regardless of context state
