#!/usr/bin/env python3
"""Check canonical governance skills and runtime copies in a target project."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("project", type=Path, help="Target project root")
    args = parser.parse_args()

    root = args.project.resolve()
    canonical_root = root / "project" / "governance" / "skills"
    codex_root = root / ".codex" / "skills"

    if not canonical_root.exists():
        print(f"missing canonical skills: {canonical_root}", file=sys.stderr)
        return 1

    failures: list[str] = []
    for canonical in canonical_root.glob("*/SKILL.md"):
        name = canonical.parent.name
        runtime = codex_root / name / "SKILL.md"
        if runtime.exists():
            text = runtime.read_text(encoding="utf-8")
            expected = f"project/governance/skills/{name}/SKILL.md"
            if expected not in text:
                failures.append(f"{runtime}: missing source-of-truth header for {expected}")

    if failures:
        for failure in failures:
            print(failure, file=sys.stderr)
        return 1

    print("governance skill sync check passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
