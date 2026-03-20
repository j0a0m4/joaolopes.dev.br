---
format: definition
author: João Lopes
title: "AI Agent"
slug: ai-agent
created: "2026-03-19"
tags: [ai-engineering, agent-design, claude-code]
publish: true
---

# AI Agent

## Definition

An agent is a model running in a loop — gather context, act with tools, observe results, repeat. Unlike autocomplete, it plans across multiple steps.


An AI agent is a model running as a loop: gather context, act using tools, observe the results, decide what to do next, repeat. Unlike autocomplete — where the model responds once to a prompt — an agent plans, acts, and self-corrects across an extended task.

The loop is the same regardless of task:

1. **Gather** — read context, scan available tools, assess current state
2. **Act** — plan steps, call tools (CLI commands, MCP tools, file reads), execute
3. **Observe** — check results, decide whether to continue, ask for human input, or stop

The loop doesn't care what kind of task it's running. Running a pre-PR pipeline and drafting 1:1 meeting prep use the same architecture. What changes is the [[skills|skill]] that shapes how the agent gathers, what [[CLI]] commands it runs, and where the human gates are.

Claude Code, Cursor, and similar tools are agents in this sense. They are not autocomplete with a shell — they plan, branch, and self-correct. That's the distinction that makes the rest of the toolkit make sense.

## Related

- [[Skills]] — the workflow layer that shapes how agents gather and act
- [[Hooks]] — the enforcement layer that intercepts agent tool calls
- [[CLI]] — the deterministic tool layer agents call
- [[MCP]] — the cross-client protocol agents use to call external tools
- [[context window]] — the finite resource agents operate within
