---
name: project-governance-init
description: Use when initializing this governance model in a new or existing repository, including auditing an old project, recommending a governance mode, customizing stack-specific checks, and generating Codex/Claude runtime entrypoints after user confirmation.
---

# Project Governance Init

<!-- SOURCE OF TRUTH: This file is the authoritative version. -->
<!-- Sync targets: .codex/skills/project-governance-init/SKILL.md -->

Use this skill to install an adaptable governance system into another repository.

Do not assume the target project must copy this repository exactly. Preserve useful existing project conventions and ask for confirmation before applying changes to existing projects.

## Core Model

Install three layers:

```text
contracts = law
project-local skills = execution manuals
runtime entrypoints = agent triggers
```

Recommended default directories:

```text
project/governance/contracts/
project/governance/templates/
project/governance/skills/
project/work/
.codex/skills/
.claude/commands/
AGENTS.md
```

These paths are defaults, not mandates. Existing repositories may use `docs/`, `.governance/`, existing ADR folders, or external issue systems.

## Choose Path

### New Project

Use the scaffold path when the repository is empty or the owner is starting a new project:

1. Ask for project type, stack, package manager, agent runtimes, and strictness mode.
2. Generate governance contracts, templates, work index, runtime entries, and root guidance.
3. Create the first work item for adopting governance.
4. Record stack-specific checks.
5. Verify the generated file layout.

### Existing Project

Use the audit-first path for repositories with existing code or process:

```text
/discover -> /recommend -> /confirm -> /apply -> /verify
```

1. Discover the project without editing files.
2. Recommend a governance mode and integration plan.
3. Ask the user to confirm the plan.
4. Apply only the confirmed changes.
5. Verify the generated governance files and git diff.

Hard rule: never overwrite existing `AGENTS.md`, `CLAUDE.md`, ADRs, CI, or task documents in an existing project without explicit user confirmation.

## Questions To Ask

Ask only what cannot be inferred safely:

- Is this a new project or existing project?
- Which governance mode: lightweight, standard, or strict?
- Which agent runtimes should be supported: Codex, Claude, both, or other?
- Which check commands are required before completion?
- Should the governance work items live in the repo, or map to an external tracker?

For old projects, inspect first and then present recommendations instead of asking every question upfront.

## References

Load only the reference needed for the current situation. Bundled templates live in `assets/templates/`, and deterministic helpers live in `scripts/`:

- New vs existing flow and modes: `references/modes.md`
- Stack-specific check presets: `references/stack-presets.md`
- Runtime entrypoint layouts: `references/agent-runtime-layout.md`
- Existing project audit procedure: `references/existing-project-audit.md`
- Template assets: `assets/templates/`
- Helper scripts: `scripts/audit_project.py`, `scripts/init_governance.py`, `scripts/check_sync.py`

## Output Contract

For a new project, produce:

- selected mode
- selected paths
- selected runtimes
- stack check commands
- generated file list
- first governance work item
- verification results

For an existing project, produce before applying:

- discovered structure
- recommended mode
- proposed control-plane and execution-plane boundaries
- proposed check commands
- files to create
- files to modify
- risks and conflicts
- explicit user confirmation request

After applying, produce:

- changed files
- verification results
- remaining manual steps

## Safety

- Keep project contracts authoritative.
- Do not install external generic skills as competing facts.
- Do not force strict mode into simple projects.
- Do not replace existing project management systems unless the owner explicitly chooses that.
- Prefer merge/append patches for root agent guidance in existing projects.
