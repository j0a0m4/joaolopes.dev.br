---
format: definition
author: João Lopes
title: "Ruleset"
slug: ruleset
created: "2026-03-19"
tags: [canonic, ai-engineering, agent-design]
publish: true
---

# Ruleset

## Definition

A Canonic concept: an ordered collection of rule references representing a
domain of behavioral instructions — Clojure conventions, blog workflow, vault
behavior. Rules belong to rulesets; rulesets belong to profiles.


A ruleset is an ordered collection of rule references in [Canonic](https://github.com/j0a0m4/canonic). It represents a domain: a coherent set of behavioral instructions that belong together — Clojure code conventions, blog publishing workflow, vault write rules, agent ergonomics.

Rules exist independently of rulesets. A rule can belong to multiple rulesets without duplication. The ruleset is the organizational layer: it groups rules by concern and determines their order in the rendered output.

Rulesets are included in [[profile|profiles]]. A profile that includes three rulesets composes them all into a single rendered `CLAUDE.md`.

```bash
canonic ruleset show blog    # every rule in the blog domain with severity codes
canonic ruleset include blog rule use-publish-skill
```

## Related

- [[profile]] — the composition layer that includes rulesets
- [[behavioral modeling]] — what rulesets contain
