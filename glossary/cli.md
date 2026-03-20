---
format: definition
author: João Lopes
title: "CLI"
slug: cli
created: "2026-03-19"
tags: [ai-engineering, cli, agent-design, determinism]
publish: true
---

# CLI

## Definition

The deterministic layer of the agent stack — shell commands that produce the same output every time, regardless of what the model thinks it knows.


In the context of AI-assisted development, CLI (command-line interface) refers to the deterministic tool layer: shell commands and scripts that the [[AI agent]] calls to produce predictable, reproducible outputs. `git commit` commits. `lein test` runs tests. The agent _chooses when_ to call them — the command does the same thing regardless.

CLI is not the same as "simple." It's _deterministic_. You use CLI when the operation must behave identically every time — when you need a guaranteed result rather than a reasoned one. The agent brings the intelligence (when to run, what to do with the result); the CLI brings the certainty.

This is the intelligence-determinism split at the tool layer. [[Skills]] and [[CLAUDE.md]] rules shape agent reasoning — they sit above the determinism line. CLI tools sit below it. [[Hooks]] intercept at the tool call boundary, bridging both.

CLI is also the more context-efficient choice against [[MCP]]. A CLI command returns exactly what it returns — no JSON envelope, no verbose metadata, no protocol overhead. When context budget matters, CLI commands stay cheaper.

Not limited to code tasks: issue tracker queries, calendar checks, standup generation — any shell-executable operation that returns predictable results belongs in the CLI layer.

## Related

- [[MCP]] — the cross-client protocol alternative; heavier, more portable
- [[Skills]] — the orchestration layer that calls CLI commands
- [[AI agent]] — what selects when and which CLI commands to run
- [[context window]] — why CLI's lower token cost matters
