---
format: definition
author: João Lopes
title: "Claude Code"
slug: claude-code
created: "2026-03-19"
tags: [claude-code, ai-engineering, anthropic]
publish: true
---

# Claude Code

## Definition

Anthropic's official CLI for Claude. An agentic coding tool that runs in the
terminal, uses tools (Read, Write, Bash, Edit, Glob, Grep), and exposes 21
lifecycle hook events for customization and enforcement.


Claude Code is Anthropic's official CLI for Claude — an agentic coding tool that runs directly in the terminal. It operates through tools: Read, Write, Edit, Bash, Glob, Grep, Agent (subagent dispatch), and more. It maintains a conversation, reads codebases, writes and modifies files, runs commands, and coordinates subagents.

Claude Code is configured through [[CLAUDE.md]] files that load at session start and through `.claude/settings.json` which wires [[Hooks]] to scripts. The hooks fire at 21 lifecycle points — session start and end, every tool call before and after, subagent lifecycle, context compaction — giving developers a programmatic layer to observe, enforce, and extend Claude Code's behavior.

The series this glossary accompanies — AI-First Engineering — is about building on top of Claude Code: the tools, conventions, and infrastructure that make AI-assisted development reliable and composable.

## Related

- [[CLAUDE.md]] — the instructions file Claude Code loads at session start
- [[Hooks]] — the 21 lifecycle events Claude Code exposes
- [[context window]] — the resource Claude Code operates within
