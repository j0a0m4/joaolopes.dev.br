---
format: definition
author: João Lopes
title: "Behavioral Modeling"
slug: behavioral-modeling
created: "2026-03-19"
tags: [ai-engineering, agent-design, claude-code]
publish: true
---

# Behavioral Modeling

## Definition

Natural language descriptions of desired AI agent behavior — how the agent
should act, what conventions it should follow, what it should avoid. Distinct
from enforcement: modeling describes intent, enforcement constrains action.


Behavioral modeling is the practice of writing natural language instructions that describe how an AI agent should behave. In Claude Code, this lives in `CLAUDE.md` files — rules about coding conventions, collaboration style, safety constraints, epistemic standards.

The critical distinction: modeling is not enforcement. A behavioral model tells the agent what to do. It does not prevent the agent from doing something else. Instructions compete with context — as the context window fills, they degrade. Under pressure, models rationalize past them.

This is why the ecosystem conflates "rules" with "hooks." Both are called rules. Only one enforces.

## Related

- [[Hooks]] — the enforcement layer that behavioral modeling cannot provide
- [[context window]] — why behavioral models degrade: finite attention
