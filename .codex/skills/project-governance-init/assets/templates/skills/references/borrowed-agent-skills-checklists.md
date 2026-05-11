# Borrowed Agent-Skills Checklists

These notes adapt useful generic skill concepts from `https://github.com/addyosmani/agent-skills`.

They are advisory only. `project/governance/contracts/**` remains the source of truth, and project-local skills must not introduce new states, object types, or closure rules.

## Planning And Task Breakdown

Use during `/plan`:

- Define the smallest coherent work slice.
- Separate control-plane paths from execution-plane paths.
- Assign owned paths before implementation starts.
- Name dependencies and ordering constraints.
- Define rollback and verification before build.

## Incremental Implementation

Use during `/build`:

- Prefer narrow, reversible edits.
- Keep implementation inside owned paths.
- Record deviations as soon as they appear.
- Avoid unrelated refactors.
- Preserve user or parallel-agent changes.

## Browser Testing With DevTools

Use during `/test` for frontend work:

- Check console errors.
- Check failed network requests.
- Verify key user flows in browser, not only by static inspection.
- For design parity, compare side-by-side screenshots, not only computed style numbers.
- Test the relevant responsive viewport(s).

## Debugging And Error Recovery

Use during failed `/test` or returned `/build`:

- Reproduce first.
- Narrow the failing surface.
- Fix the smallest cause that explains the evidence.
- Re-run the failing check.
- Record failure and fix in `test.md` or `build.md`.

## Code Review And Quality

Use during `/review`:

- Lead with findings.
- Prioritize correctness, regressions, missing tests, security, and contract drift.
- Cite concrete files, commands, screenshots, or evidence.
- Mark no-finding reviews explicitly.
- Send rework to a specific stage.

## Security And Hardening

Use during `/review` when code touches API, data, auth, secrets, dependencies, or deployment:

- Check secret handling.
- Check input validation and output encoding.
- Check dependency and package-manager changes.
- Check authorization and trust boundaries.
- Check whether logs can leak sensitive data.

## Shipping And Launch

Use during `/ship`:

- Verify review decision is `accept`.
- Update indexes and state before declaring closure.
- Record commit, push, and deployment status.
- Record follow-ups outside the shipped work item.
- Ask before force push, rebase, cross-branch operations, or deployment.
