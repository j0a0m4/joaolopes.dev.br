---
format: definition
author: João Lopes
title: "Context Window"
slug: context-window
created: "2026-03-19"
tags: [ai-engineering, llm, agent-design]
publish: true
---

# Context Window

## Definition

The finite amount of text an LLM can attend to at inference time — conversation
history, instructions, tools, files, and outputs all compete for this budget.
When it fills, earlier content is evicted or compressed.


The context window is the total amount of text a language model can process in a single inference — the conversation history, system prompt, tool definitions, file contents, and outputs all count against this limit.

For AI agent workflows, the context window is the primary resource to manage. Instructions loaded at session start (behavioral models, CLAUDE.md rules, memory files) consume budget that could hold conversation history, file contents, or tool results. As the window fills through a long session, earlier content — including the instructions that govern behavior — gets evicted or compressed.

This is why behavioral modeling degrades under pressure: the rules that were loaded at the start of the session may no longer be in the window by the time the agent needs them. It's also why render configs in [[profile|profiles]] matter — loading 40k chars of agent instructions at every session start is a significant budget cost for marginal benefit on most tasks.

## Related

- [[behavioral modeling]] — what fills the context window and degrades within it
- [[profile]] — the Canonic layer that manages context budget through render config
- [[hooks]] — the enforcement mechanism that doesn't depend on context window state
