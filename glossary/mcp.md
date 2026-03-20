---
format: definition
author: João Lopes
title: "MCP"
slug: mcp
created: "2026-03-19"
tags: [ai-engineering, mcp, claude-code, protocol]
publish: true
---

# MCP

## Definition

Model Context Protocol — a standardized JSON-RPC interface for AI agents to
call external tools. Define a server once; it works across Claude Code, Cursor,
VS Code, and any MCP-compatible client. Anthropic calls it "USB-C for AI."


MCP (Model Context Protocol) is a standardized JSON-RPC interface that lets [[AI agent|AI agents]] call external tools. You define an MCP server once — it exposes tools with names, descriptions, and parameter schemas — and it works in any MCP-compatible client: Claude Code, Cursor, VS Code, and others. Anthropic describes it as [USB-C for AI](https://www.anthropic.com/news/model-context-protocol).

Each MCP tool is self-describing. The agent reads the descriptions, decides which tools are relevant, and calls them with structured parameters. This makes MCP ideal for capability discovery at runtime and cross-client portability.

**Two key tradeoffs:**

- **Context cost** — MCP responses are often verbose JSON. A single search result can return thousands of tokens. Every token in a response competes with conversation and instructions for space in the [[context window]].
- **Blocking** — every MCP call blocks the agent until it returns. No progress updates, no parallelism. When a workflow needs duration or concurrent execution, prefer [[CLI]] commands or [[Skills]] with subagents.

Use MCP when you need cross-client portability, runtime capability discovery, or integration with external systems via fast atomic operations. Prefer CLI for fast, predictable, context-efficient operations. Use skills to orchestrate both.

## Related

- [[CLI]] — the deterministic alternative for fast, local operations
- [[Skills]] — the orchestration layer above MCP and CLI
- [[AI agent]] — the runtime that calls MCP tools
- [[context window]] — the resource MCP responses consume
