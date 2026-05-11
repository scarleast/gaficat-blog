# Engineering Workflow

This project uses standard governance mode.

## Work Intake

Create or update a work item in `project/work/WI-XXXX/` before changing execution-plane files. Use the templates in `project/governance/templates/`.

Small documentation-only edits to governance files may be recorded directly in the active governance work item. Business code, content behavior, build config, and dependency changes require at least an accepted `/spec`.

## Stage Flow

All substantive work follows:

```text
/spec -> /plan -> /build -> /test -> /review -> /ship
```

Each stage records evidence in the matching work item file:

- `spec.md`: goal, scope, non-goals, acceptance criteria, risks.
- `plan.md`: owned paths, strategy, checks, rollback.
- `build.md`: changed files and implementation notes.
- `test.md`: commands, browser/manual checks, failures, residual risk.
- `review.md`: findings and explicit decision.
- `ship.md`: closure notes and follow-ups.

## Checks

Default required check for execution-plane changes:

```bash
npm run build
```

There is currently no project script for lint, typecheck, or tests. If those are added later, update this document and the relevant work item plans.

## Content Rules

Posts under `src/content/posts/**` are authored content. Preserve frontmatter fields and existing filename conventions unless the work item explicitly changes content structure.

## Build Output

Treat `dist/**` as generated output. Do not edit it directly during normal implementation. Regenerate it with `npm run build` when publish artifacts are needed.

## Dependency Changes

Any change to `package.json` or `package-lock.json` must be called out in `/plan`, recorded in `/build`, and verified with `npm run build`.
