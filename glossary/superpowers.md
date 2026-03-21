---
format: definition
author: João Lopes
title: "Superpowers"
slug: superpowers
created: "2026-03-21"
tags: [ai-engineering, claude-code, skills, agent-design]
publish: true
---

# Superpowers

## Definition

A Claude Code plugin that wires planning discipline into every session via a `SessionStart` hook. It injects one meta-skill — check for relevant skills before doing anything — and ships a library of workflow skills (brainstorming, TDD, subagent-driven development, code review) that lazy-load on demand rather than consuming context upfront.
