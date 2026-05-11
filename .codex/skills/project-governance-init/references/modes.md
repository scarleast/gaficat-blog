# Governance Modes

Use modes to fit project size and risk. The mode can be changed later.

## Lightweight

Best for small libraries, prototypes, single-owner scripts, or repos that already have an external issue tracker.

Install:

- `AGENTS.md`
- `project/work/work_index.md`
- `project/governance/templates/`
- optional `.codex/skills/project-governance-flow/SKILL.md`

Rules:

- Work items are recommended, not mandatory for every small edit.
- Required checks are documented.
- Reviews can be lightweight but must record blocking findings.

## Standard

Best default for active applications and shared repositories.

Install:

- `project/governance/contracts/`
- `project/governance/templates/`
- `project/governance/skills/project-governance-flow/`
- `project/governance/skills/governance-*`
- `project/work/`
- runtime entries for selected agents
- root `AGENTS.md`

Rules:

- New work uses `/spec -> /plan -> /build -> /test -> /review -> /ship`.
- Evidence is written to work item files.
- Execution-plane changes require at least accepted `/spec`.

## Strict

Best for multi-agent work, regulated domains, production systems, design-as-law frontends, or repositories with high regression cost.

Install everything in Standard plus:

- explicit control-plane / execution-plane contract
- preflight skill or command
- stage-specific runtime commands
- sync checks for runtime copies
- stricter review and ship gates

Rules:

- Execution-plane changes require WI, accepted `/spec`, and accepted `/plan`.
- `/review` requires `/test` evidence.
- `/ship` requires explicit review decision.
- Runtime entrypoints must not drift from canonical skills.

## Selection Heuristic

- Choose Lightweight when governance overhead is the main risk.
- Choose Standard when multiple people or agents will work in the repo.
- Choose Strict when uncontrolled edits, missing evidence, or design/security drift would be expensive.
