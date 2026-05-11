# Agent Runtime Layout

The canonical governance source should live in the repository's chosen governance directory. Runtime entrypoints should point back to it.

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

If `.claude/` is ignored, add narrow allow rules for `.claude/commands/*.md` only.

## Other Agents

Prefer a thin runtime command or instruction file that points to the canonical governance skill. Avoid duplicating full contracts in multiple agent-specific formats.

## Sync Rule

When canonical skills change:

1. update `project/governance/skills/**`
2. sync runtime copies or commands
3. verify source-of-truth headers
4. keep private local runtime files ignored
