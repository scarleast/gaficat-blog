# WI-0043 State

## Stage: ship

## Evidence

| Check | Result | Details |
|-------|--------|---------|
| CMS frontend fix deployed | PASS | `splitFrontmatter` preserves raw YAML text |
| File restored on GitHub | PASS | Restored from commit `dfca05d` via git push `aeaee87` |
| CMS save CI test | PASS | Commit `1976326e` — GitHub Actions `success` |
| Frontmatter integrity | PASS | `tags` array, `date` quotes preserved after round-trip |

## Timeline

1. Identified root cause: `parseFrontmatter` doesn't handle YAML arrays, `buildFrontmatterYaml` reconstructs with wrong types
2. Fix: replaced with `splitFrontmatter` — raw text preservation, no parse/rebuild
3. Restored corrupted file from git history
4. Tested CMS save via GitHub Contents API (identical to CMS backend flow)
5. CI passed on commit `1976326e`
