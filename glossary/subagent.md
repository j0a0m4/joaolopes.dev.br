---
format: definition
author: João Lopes
title: "Subagent"
slug: subagent
created: "2026-03-19"
tags: [ai-engineering, claude-code, agent-design, subagent]
publish: true
---

# Subagent

## Definition

A fresh agent instance dispatched by a parent agent to execute an isolated
task. Subagents have clean context, no session history, and run concurrently.
The parent coordinates results; subagents do the work.


A subagent is an [[AI agent]] instance spawned by a parent agent to execute a specific task in isolation. The parent dispatches it with a focused prompt and waits for the result — or dispatches multiple subagents in parallel and synthesizes their outputs.

Subagents have three key properties:

- **Clean context** — no session history, no accumulated conversation. The parent provides exactly what the subagent needs, nothing more.
- **Concurrent execution** — multiple subagents run simultaneously. A [[Skills|skill]] can dispatch four subagents in parallel (lint, unit tests, integration tests, code review) and collect results when all complete.
- **Isolation** — a subagent's failures don't corrupt the parent's context. The parent can evaluate the output, handle errors, and decide what to do next.

Subagents are how skills achieve parallelism. [[MCP]] tools block the agent on every call. Subagents don't — the parent continues working while they execute. This is what makes the pre-PR pipeline possible: four independent checks running concurrently, not sequentially.

[[Hooks]] fire for subagent tool calls too, since hooks are wired at the process level. Every Write or Edit a subagent makes goes through the same validators as the parent.

## Related

- [[AI agent]] — what a subagent is an instance of
- [[Skills]] — the orchestration layer that dispatches subagents
- [[Hooks]] — fire on subagent tool calls just as on parent calls
