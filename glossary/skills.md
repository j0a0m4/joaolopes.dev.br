---
format: definition
author: João Lopes
title: "Skills"
slug: skills
created: "2026-03-19"
tags: [ai-engineering, claude-code, skills, agent-design]
publish: true
---

# Skills

## Definition

SKILL.md files that teach an AI agent how to think about a specific task.
Actively invoked by name (/pre-pr, /meeting-prep). They orchestrate multi-step
workflows, define what to gather, and specify human checkpoints.


Skills are `SKILL.md` files that define how an [[AI agent]] should approach a specific workflow. Unlike [[CLAUDE.md]] rules — which load passively into every session — skills are actively invoked by name: `/pre-pr`, `/meeting-prep`, `/standup`.

A skill tells the agent what to gather, how to reason about the task, what tools to call, and where to pause for human input. The skill is the workflow brain: it decides _what_ to execute, _when_ to connect to external systems, and _where_ to check in.

Skills sit above the tool layer. They orchestrate both [[CLI]] commands and [[MCP]] tools — dispatching subagents in parallel, narrating progress, synthesizing results. This orchestration is what makes skills distinct from both rules (passive) and tools (atomic): skills coordinate a sequence across time.

The feedback loop for skill development is fast: describe the workflow in conversation, let the agent draft the file, refine, test. No server to build, no schema to validate, no deployment. Edit a markdown file and reload.

## Related

- [[AI agent]] — the runtime that executes skills
- [[CLAUDE.md]] — the passive rules layer skills operate alongside
- [[CLI]] — the deterministic tool layer skills orchestrate
- [[MCP]] — the cross-client protocol layer skills orchestrate
- [[Hooks]] — the enforcement layer below skills
