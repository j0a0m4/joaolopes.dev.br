---
format: definition
author: João Lopes
title: "Profile"
slug: profile
created: "2026-03-19"
tags: [canonic, ai-engineering, agent-design]
publish: true
---

# Profile

## Definition

A Canonic concept: a composition plan specifying which rulesets to include,
how to render them per severity level, and which files to distribute the
output to. Running canonic compose renders and distributes to all targets.


A profile is the top-level composition unit in Canonic. It answers three questions: which rulesets to include, how to render each severity level, and where to send the output.

A profile named `calcifer` might include the `agent-behavior`, `blog`, and `obsidian-vault-behavior` rulesets, render critical rules with `title + description + example` and guidance rules with `title + description` only, and distribute the result to `~/dev/Calcifer/CLAUDE.md`.

```bash
canonic compose calcifer     # render and distribute to all targets
canonic profile show calcifer  # inspect includes, render config, char count
canonic sync                   # recompose all profiles at once
```

The render config is where context budget management happens. A profile without render config defaults to "all fields" — which is how 40k+ character context loads accumulate silently.

## Related

- [[ruleset]] — the collections a profile composes
- [[context window]] — what the render config protects
