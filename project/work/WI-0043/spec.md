# WI-0043: Fix CMS save/publish frontmatter corruption

## Problem

CMS PostEditPage used `parseFrontmatter` + `buildFrontmatterYaml` to round-trip YAML frontmatter through save. This corrupted data:

- YAML arrays (`tags: \n  - 关于`) became strings (`tags: ""`)
- Quoted dates (`date: '2019-11-20 16:29:34'`) got double-quoted
- Build failed with schema validation errors

## Scope

- `cms/frontend/src/pages/PostEditPage.tsx` — replace parse/rebuild with raw text preservation

## Acceptance Criteria

1. CMS save sends raw frontmatter text to API (no parse/rebuild)
2. GitHub Actions CI passes after CMS save
3. File content on GitHub matches original structure (YAML arrays, dates preserved)

## Fix

Replaced `parseFrontmatter`/`buildFrontmatterYaml` with `splitFrontmatter` that splits content at `---` delimiters and preserves raw YAML text without parsing.

## Changed Files

- `cms/frontend/src/pages/PostEditPage.tsx`

## Verification

- CMS save via GitHub Contents API: commit `1976326e` → CI **success**
- Previous broken CMS saves: `70142bd9`, `417b23bf`, `98989422` → CI **failure** (frontmatter corruption)
