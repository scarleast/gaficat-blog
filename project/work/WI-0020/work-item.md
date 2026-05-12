# WI-0020: Close Stale WI Delivery Metadata

## Summary

Clean up stale `pending` delivery fields in already shipped work items and record the actual local commit / push state.

## Acceptance Criteria

1. No closed WI ship record still says commit or push is pending when the work is already committed locally.
2. Work index remains with zero active work.
3. Cleanup is committed locally.
