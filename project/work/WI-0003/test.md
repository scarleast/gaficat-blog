# /test

- work_id: WI-0003
- stage: test
- status: passed
- tester: main-agent
- updated_at: 2026-05-11

## Commands

| command | result | notes |
| --- | --- | --- |
| `rg -n "Subagent Assignment Rules|Runtime Entrypoint Rules|runtime copies|assigned subagent" project/governance .codex/skills .claude/commands AGENTS.md` | pass | Verified synced governance wording is present. |
| `python3 .codex/skills/project-governance-init/scripts/check_sync.py .` | pass | Verified canonical governance skills and Codex runtime copies have required source-of-truth headers. |
| `npm run build` | not-run | Skipped because this work changed only control-plane governance files. |

## Manual Checks

- Confirmed WI-0003 affects only control-plane paths.
- Confirmed Codex runtime skill copies keep source-of-truth headers pointing to canonical project governance skills.

## Screenshots / Evidence

- command output recorded in chat transcript

## Failures

- none

## Residual Risk

- none

## Exit Criteria

- required commands passed or failures are justified
- required manual/browser checks are recorded
- evidence is linked
