# WI-0004 Review

- reviewed_at: 2026-05-12
- reviewer: main-agent
- decision: changes_required

## Findings

| severity | finding | evidence | required action |
| --- | --- | --- | --- |
| high | WI-0004 claimed full site visual parity but did not provide evidence for all scoped pages. | `project/work/WI-0004/work-item.md` scopes home, post, links, about, archives, categories, tags; `project/work/WI-0004/test.md` only records homepage screenshots as matched. | Reopen parity work in WI-0006 and require page-by-page screenshots. |
| high | WI-0004 accepted residual post-detail mismatch despite post detail being in scope. | `project/work/WI-0004/test.md` says "Post detail page banner needs further refinement — acceptable for initial parity pass"; this contradicts full 1:1 parity AC. | Treat WI-0004 as incomplete for post detail and repair in WI-0006. |
| high | Current post detail bottom is visibly not Fluid parity. | Owner-provided screenshot shows oversized bordered prev/next cards, broken cloud-provider image, and footer layout/content mismatch. | Repair post bottom/footer first. |
| medium | WI-0004 state says `/ship` but `work_index.md` did not list WI-0004 as closed before later work, creating governance inconsistency. | `project/work/WI-0004/state.md`; prior `work_index.md` state observed during WI-0005. | Keep WI-0004 as historical incomplete work and track corrective work in WI-0006. |

## Conclusion

WI-0004 is not an effective full visual parity delivery. It contains useful diff analysis and some partial homepage-oriented changes, but the acceptance evidence is insufficient and current post-detail UI proves remaining material regressions.
