# /plan

- work_id: WI-0034
- stage: plan
- status: accepted
- owner: main-agent
- updated_at: 2026-05-13

## Implementation Strategy

Implement a remark plugin that scans text nodes for block-level `{% ... %}` shortcodes and replaces them with HTML nodes. Wire it before rehype processing in `astro.config.mjs`. Migrate existing media posts by replacing JSX component usages with shortcodes and removing now-unused imports. Verify build output and absence of old imports.

## Affected Areas

- control plane:
  - `project/work/WI-0034/**`
  - `project/work/work_index.md`
- execution plane:
  - `src/utils/remark-media-shortcodes.ts`
  - `astro.config.mjs`
  - `source/_posts/**/*.mdx`

## Work Slices

| slice | owner | owned paths | output |
| --- | --- | --- | --- |
| shortcode plugin | main-agent | `src/utils/remark-media-shortcodes.ts`, `astro.config.mjs` | build-time shortcode conversion |
| content migration | main-agent | `source/_posts/**/*.mdx` | media imports/JSX replaced with shortcodes |
| verification/governance | main-agent | `project/work/WI-0034/**`, `project/work/work_index.md` | evidence and closure |

## Dependencies

- Existing Astro Markdown/MDX pipeline.
- Existing media CSS and `PlyrInit.astro` initialization.

## Test Strategy

- `npm run build`
- `rg` check that media component imports/JSX no longer remain in posts.
- Inspect generated `dist/posts/*` for Bilibili iframe, `data-audio-player`, and `data-plyr` markup.

## Rollback Strategy

- Revert WI-0034 changes if shortcode conversion breaks content rendering.

## Exit Criteria

- implementation path is clear
- owned paths are assigned
- verification plan is clear
- no uncontrolled shared-file conflicts remain
