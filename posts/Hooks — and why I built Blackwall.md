---
id: "01KM44WDTVWFZZD43Z8CR0AVZN"
type: post
title: "Hooks — and why I built Blackwall"
confidence: working
scope: personal
created: "2026-03-19"
platform: blog
format: blog
publish: true
published-on: 2026-03-21
tags: [blackwall, clojure, babashka, malli, ports-and-adapters, edn, architecture]
series: ai-first-engineering
series-order: 3
series-title: "AI-First Engineering"
status: active
derived-from: "[[Blackwall Ports & Adapters Refactoring Design — blackwall]]"
generated-by: post
---

# Hooks — and why I built Blackwall

Claude Code has 21 hook events. Session start, session end, every tool call before and after, subagent lifecycle, context compaction. A complete runtime event surface. Out of the box you wire them by pointing `.claude/settings.json` at Babashka scripts. Each script does its own thing, knows nothing about the others, and has no shared infrastructure.

I wanted something different. I wanted to configure gate rules in a data file without touching code. I wanted every event to flow as a typed domain value that any process can subscribe to in real time. I wanted the behaviour of my AI environment to be as inspectable and composable as the rest of my Clojure stack.

That led to a design principle I kept returning to: **if it can't be represented in EDN, it needs a strong rationale.**

Blackwall is what happens when you apply that principle consistently to a hook system.

---

## What blackwall is

Blackwall is a long-running Babashka daemon — Clojure as a scripting runtime, no JVM startup cost — that sits between Claude Code and everything else.

Every hook event goes through `hook.bb`, a thin entry point. It splits into two paths:

- **PreToolUse** — synchronous. `hook.bb` connects to `gate.sock`, sends the tool call, waits for a `GateDecision`. The daemon runs all registered gate guards and returns allow, deny, or allow-with-context. The hook prints the decision and exits. Claude Code either proceeds or stops.
- **Everything else** — asynchronous. `hook.bb` sends the event to `ingest.sock` and exits immediately. The daemon parses it into a typed domain event, publishes it to a `core.async` mult, and fans it out to registered consumers. External processes can connect to `subscribe.sock` to receive the stream.

![hook.bb splits every tool call into two paths: PreToolUse goes synchronous — blocks and waits for allow, deny, or allow-with-context — while every other event fires and forgets into the Event Bus.](/assets/blackwall-hook-split.svg)

`config.edn` drives all of it. Which guards run on which tools, which consumers handle which event types, what the vault schema looks like — all data, none of it hardcoded.

One paragraph on types: I use Malli throughout. If you know Prismatic Schema, Malli is its data-driven successor — schemas are vectors, not types. `[:map [:id :string] [:type :keyword]]` is just EDN. That matters for the same reason everything else in this post matters.

---

## Step one: schema to EDN

When I first built blackwall, the vault schema — which note types exist, what fields they require, what confidence values are valid — lived in `config.bb` as Clojure defaults. Reasonable starting point. Get it working first.

The problem surfaced quickly. Changing the schema meant touching Clojure code. Testing a schema change meant reloading the namespace. The schema wasn't really a configuration; it was data that had been written in code because that was the path of least resistance.

In commit `698c9f5` I moved it to `config.edn` and threaded the config through the validator pipeline. Now `config.edn` owned the vault roots, the type taxonomy, the confidence enum, the field requirements. The validators read it; they didn't define it.

That surfaced the next problem. The schema format was custom — a bespoke set of keys I'd invented: `:required-fields`, `:enums`, `:conditional-fields`. It worked, but it was ad-hoc. I was maintaining a schema description format alongside the actual schema. That's two things to keep in sync.

In `31471d1` I replaced it with pure Malli notation directly in config.edn:

```clojure
:base-schema
[:and
 [:map
  [:id         :string]
  [:type       [:enum :daily :inbox :zettel :spark :post :reference ...]]
  [:confidence [:enum :canonical :working :evidence :speculative :superseded]]
  [:created    :string]]
 [:multi {:dispatch :confidence}
  [:superseded [:map [:superseded-by :string]]]
  [:canonical  [:map [:last-verified :string]]]
  [:malli.core/default [:map]]]]
```

The `write-pipeline` validator, which validates frontmatter on every Write, dropped from 14 hand-rolled check functions to a single `m/explain` call against the schema. Not 14 functions reduced to 1 — 14 functions *replaced* by a schema that already existed in the config and just needed to be pointed at.

The insight here: schema is just data describing data. Of course it belongs in data. Malli made this obvious — because a Malli schema is a vector, it can live anywhere vectors can live. Including config.edn.

---

## Step two: logic to EDN

The read pipeline validator annotates vault notes when you read them. A `confidence: superseded` note gets a prompt telling you it's been replaced and where the replacement is. A `confidence: speculative` note gets a reminder that it's a hypothesis, not truth. A stale `canonical` note warns you the last-verified date is beyond the threshold.

Originally this was Clojure. A sequence of `cond` branches, each checking a frontmatter field and returning a string if the check triggered. The strings were literals in the code. Changing the wording of an annotation — even fixing a typo — meant editing a `.bb` file.

In `1e7e074` I moved the checks into `:read-checks` in `config.edn`:

```clojure
:read-checks
[{:match   {:has :superseded-by}
  :context "This note is superseded. The latest version is: {{superseded-by}}.
            Follow the chain — prefer the latest version unless you need the historical record."}

 {:match   {:eq [:confidence :speculative]}
  :context "confidence: speculative — this is a hypothesis, not truth.
            Use as context for exploration, not as guidance for decisions."}

 {:match   [{:eq [:confidence :canonical]} {:stale :last-verified}]
  :context "confidence: canonical but last-verified is {{stale-age}} days ago
            (threshold: {{stale-days}} days). Treat as working until re-verified."}]
```

Match primitives: `:eq`, `:has`, `:missing`, `:stale`. Compound matches are AND. Context strings support `{{field}}` interpolation. The `read_pipeline` validator became a generic interpreter — it walks the rules, evaluates matches, returns the first hit.

Adding a new epistemic check is now a config change. The commit message said it plainly: *"adding or rewording a check is a config change, not a code change."*

The insight: if logic only varies by configuration, it's data in disguise. The variation table *was already in the code* as `cond` branches. Moving it to config didn't change the semantics — it just put the data where data belongs.

---

## Step three: the adapter

After schema and logic moved to EDN, there was one remaining coupling that stood out precisely because everything around it was already clean.

Gate validators and event consumers were loaded by convention. Each one was a `.bb` file. The daemon found them by resolving a path from their `:name` in `config.edn` — `read-pipeline` became `validators/read_pipeline.bb`. Once loaded, it called `defn validate` or `defn handle` by convention. No explicit contract. No type. Just a naming agreement.

This meant two things. First, the "contract" was implicit — implement the right function name, return the right shape, or things break silently. Second, the core validator loop was doing I/O in its hot path — calling `script/load-fn` to find and load the file on every hook invocation.

I refactored this to explicit `defmulti` ports:

```clojure
;; port.bb
(defmulti gate    (fn [adapter _ctx]   (:adapter/type adapter)))
(defmulti consume (fn [adapter _event] (:adapter/type adapter)))
```

Each validator became a `defmethod`:

```clojure
;; validators/read_pipeline.bb
(defmethod port/gate :read-pipeline [_ {:keys [tool-name tool-input config]}]
  ...)
```

And `config.edn` got `:adapter/type` instead of `:name`:

```clojure
:validators [{:adapter/type :read-pipeline
              :enabled      true
              :tools        #{:read}
              :on-error     :pass
              :timeout-ms   2000}
             ...]
```

The daemon loads all adapter files at startup — one `load-file` per validator, before binding any sockets. After that, `port/gate` dispatches through in-memory `defmethod` registrations. No file I/O in the hot path. No convention contract. No implicit agreement.

The adapter map from `config.edn` flows directly into `port/gate`. `(:adapter/type adapter)` drives dispatch. The same map carries configuration — `:timeout-ms`, `:on-error`, `:tools`. You don't need a separate registration step or a factory. The config entry is the adapter.

The Malli types evolved alongside this to enforce the contracts properly. Gate votes from individual validators and the aggregated gate decision are distinct types. Return types are discriminated unions — no bare `nil` or `string`, always a map with a `:decision` key:

```clojure
(def GateVote
  [:or
   [:map [:decision [:= :pass]]]
   [:map [:decision [:= :deny]]   [:reason  :string]]
   [:map [:decision [:= :allow]]  [:context :string]]])
```

Named enums constrain keyword values that used to be unchecked:

```clojure
(def ToolName
  [:enum :read :write :bash :edit :glob :grep :notebook-edit :agent :skill ...])

(def ErrorPolicy [:enum :pass :block])
```

Malli instrumentation runs in production — violations log to `blackwalld.log`. They never reach the hook output. If an adapter returns the wrong shape, it surfaces at the port boundary, not three layers deep in formatting code.

---

## What flows through the bus

Here's what a real event looks like, captured by an external subscriber connected to `subscribe.sock`:

```json
{
  "event-id":    "01KM45GV...",
  "event-type":  "tool-invoked",
  "occurred-at": "2026-03-19T23:05:06.364626Z",
  "session-id":  "dcbc5674-bcf6-4721-9514-d694534de273",
  "cwd":         "/Users/joao.lopes/dev/Calcifer",
  "tool-name":   "Glob",
  "tool-input":  {
    "pattern": "sparks/*.md",
    "path":    "/Users/joao.lopes/dev/Calcifer"
  }
}
```

Every tool call. Every session start and stop. Every subagent lifecycle event. Typed, timestamped, with ULIDs for time-ordered sorting.

An external subscriber connects to `subscribe.sock` and receives the stream as NDJSON. It doesn't need to know about blackwall's internals. It doesn't need to be running when the event fires — that's a trade-off I accept; this is a local daemon, not a durable queue. What it does get is a clean, typed event surface to build on.

I'm building a queryable history system — Mikoshi — that will subscribe to this bus and maintain a local database of everything Claude did, when, in which session. The bus doesn't need to know that yet. It just publishes.

---

## Adding a new gate rule

To make this concrete: here's what adding a new validator looks like with this architecture.

I wanted blackwall to enforce a vault convention: `reference` and `zettel` notes — the permanent knowledge layer — shouldn't be edited in-place. Neither should notes with `confidence: canonical` (except skills, which are canonical but continuously evolving). When knowledge evolves, you create a new note and supersede the old one. The old note becomes a permanent historical record. Everything else — inbox, sparks, post drafts — is mutable by design.

Two files. No core changes.

First, register it in `config.edn`:

```clojure
{:adapter/type :supersession-guard
 :enabled      true
 :tools        #{:edit :write}
 :on-error     :pass
 :timeout-ms   2000}
```

Then implement `defmethod port/gate :supersession-guard`. The logic checks the *result* of the edit, not the intent: apply the change, parse the resulting frontmatter, and ask whether it produces a properly superseded note — one with both `confidence: superseded` and `superseded-by` set. If yes, the agent is completing the supersession workflow, so pass. If no, deny.

When an agent tries to edit `Ports and Adapters from the Domain Out — v2.md` in-place, this is what it sees:

```
"Ports and Adapters from the Domain Out — v2" is protected (type: reference)
— edit in-place is not allowed.

To update this note:
1. Create a new note with the improved content
2. Add superseded-by: [[Ports and Adapters from the Domain Out — v2]]
   to the OLD note's frontmatter
3. Change the OLD note's confidence to: superseded

The old note becomes a permanent historical record.
The new note is the living version.
```

The daemon picks up the new validator on restart — `load-adapters!` calls `load-file` on everything registered in config. No changes to the runner, the gate server, or `hook.bb`.

One operational detail worth knowing: there's a single daemon process serving all Claude Code sessions on the machine. A validator change merged to main and followed by a daemon restart propagates to every active session simultaneously. The flip side: if you're iterating on a validator in a git worktree and the daemon is loading from the main repo path, your changes won't be picked up until you merge. It looks like a stale daemon — it's actually two different files. Restart after merge, not before.

One thing happened while writing this post. I tried to edit the draft to add this very section. The validator blocked me — the initial policy protected all `confidence: working` notes, and this post has `confidence: working`. A draft post you're actively writing shouldn't trigger supersession enforcement. That's a design gap, not a bug: the right boundary is semantic, not epistemic. `reference` and `zettel` notes are knowledge artifacts — their evolution chain is worth preserving. Post drafts are work artifacts — they're mutable by design.

Two commits to fix it: switch from confidence-based protection to type-based. The system told me the spec was incomplete.

---

## Why this matters as a foundation

Gate rules are data. Adding a new constraint on how Claude interacts with the vault is a config entry and a `defmethod`. I don't touch infrastructure. The gate is composable because the components are data.

Domain events flow to a bus. Any tool in the ecosystem can connect to `subscribe.sock` and receive the typed event stream. The architecture is open in the right direction — not the "we'll add a plugin system later" direction, but the "the event surface is already there, go build something" direction.

There's a subtler reason this matters. Canonic rules live in `CLAUDE.md` — they're instructions, and they depend on the agent reading and following them. Subagents dispatched mid-session get a fresh load of `CLAUDE.md`, but a careless prompt or a model that rationalizes past a rule leaves gaps. Blackwall hooks fire at the process level, wired in `.claude/settings.json`. It doesn't matter if the write came from the main conversation, a background subagent, or a parallel dispatch — the hook fires unconditionally. The supersession guard doesn't care who's writing. Rules are session-scoped. Hooks are universal.

The design principle that shaped each of these decisions wasn't a rule I followed consciously. It was a question I kept asking: *why isn't this data?* When I had a good answer, I left it in code. When I didn't, I moved it to EDN.

The question keeps finding new targets.

## Related

- [[Blackwall Ports & Adapters Refactoring Design — blackwall]] — the spec for the Chapter 4 refactoring
- [[Ports and Adapters from the Domain Out — v2]] — the P&A playbook applied in Chapter 4
- [[Blog — Content Plan]] — series context
