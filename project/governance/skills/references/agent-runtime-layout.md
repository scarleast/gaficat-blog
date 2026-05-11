# Agent Runtime Layout

The canonical governance source should live in the repository's chosen governance directory. Runtime entrypoints and runtime agent prompts should point back to it.

## Canonical Agent Definitions

Recommended:

```text
project/governance/agents/main-agent.md
project/governance/agents/product-role.md
project/governance/agents/spec-role.md
project/governance/agents/architect-role.md
project/governance/agents/implementation-role.md
project/governance/agents/qa-role.md
project/governance/agents/uiux-role.md
project/governance/agents/closure-role.md
```

These files are the repository-level role definitions for the owner -> main-agent -> subagents model. They should define responsibilities, boundaries, allowed stages, evidence expectations, and handoff rules. Runtime-specific agent files can adapt formatting, but they must not become competing sources of truth.

## Codex

Recommended:

```text
.codex/skills/<skill-name>/SKILL.md
```

Runtime copies should include:

```md
<!-- SOURCE OF TRUTH: project/governance/skills/<skill-name>/SKILL.md -->
```

If the repo ignores `.codex/`, add narrow allow rules only for governance entrypoints. Do not expose private local agent config or caches.

## Claude

Recommended command entrypoints:

```text
.claude/commands/governance.md
.claude/commands/preflight.md
.claude/commands/spec.md
.claude/commands/plan.md
.claude/commands/build.md
.claude/commands/test.md
.claude/commands/review.md
.claude/commands/ship.md
```

Each command should read:

1. authoritative contract
2. canonical skill
3. current work item state when applicable

Recommended agent runtime files:

```text
.claude/agents/main-agent.md
.claude/agents/product-role.md
.claude/agents/spec-role.md
.claude/agents/architect-role.md
.claude/agents/implementation-role.md
.claude/agents/qa-role.md
.claude/agents/uiux-role.md
.claude/agents/closure-role.md
```

Each runtime agent file should be a thin role prompt derived from `project/governance/agents/<role>.md` and should preserve the governance constraints for state ownership, assigned paths, stage gates, and evidence.

If `.claude/` is ignored, add narrow allow rules for `.claude/commands/*.md` and `.claude/agents/*.md` only.

## Other Agents

Prefer a thin runtime command or instruction file that points to the canonical governance skill. Avoid duplicating full contracts in multiple agent-specific formats.

## Sync Rule

When canonical skills or agent definitions change:

1. update `project/governance/skills/**`
2. update `project/governance/agents/**` when role behavior changes
3. sync runtime copies, commands, or agent prompts
4. verify source-of-truth headers or role mapping notes
5. keep private local runtime files ignored
