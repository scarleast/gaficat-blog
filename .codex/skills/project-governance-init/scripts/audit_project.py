#!/usr/bin/env python3
"""Read-only project audit for governance initialization."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


STACK_SIGNALS = {
    "python": ["pyproject.toml", "requirements.txt", "uv.lock", "poetry.lock"],
    "node": ["package.json", "package-lock.json", "pnpm-lock.yaml", "yarn.lock", "bun.lockb"],
    "go": ["go.mod"],
    "rust": ["Cargo.toml"],
}

GUIDANCE_FILES = [
    "AGENTS.md",
    "CLAUDE.md",
    ".github/copilot-instructions.md",
]


def rel(path: Path, root: Path) -> str:
    return path.relative_to(root).as_posix()


def existing(root: Path, names: list[str]) -> list[str]:
    return [name for name in names if (root / name).exists()]


def top_dirs(root: Path) -> list[str]:
    ignored = {".git", ".venv", "node_modules", "__pycache__"}
    return sorted(
        p.name for p in root.iterdir() if p.is_dir() and p.name not in ignored
    )


def detect_stack(root: Path) -> dict[str, list[str]]:
    return {
        stack: existing(root, signals)
        for stack, signals in STACK_SIGNALS.items()
        if existing(root, signals)
    }


def detect_ci(root: Path) -> list[str]:
    workflows = root / ".github" / "workflows"
    if not workflows.exists():
        return []
    return sorted(rel(p, root) for p in workflows.glob("*.yml")) + sorted(
        rel(p, root) for p in workflows.glob("*.yaml")
    )


def detect_docs(root: Path) -> list[str]:
    candidates = ["README.md", "docs", "doc", "adr", "docs/adr"]
    return [name for name in candidates if (root / name).exists()]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("project", type=Path, help="Target project root")
    args = parser.parse_args()

    root = args.project.resolve()
    if not root.exists() or not root.is_dir():
        parser.error(f"not a directory: {root}")

    result = {
        "root": str(root),
        "top_dirs": top_dirs(root),
        "stack_signals": detect_stack(root),
        "guidance_files": existing(root, GUIDANCE_FILES),
        "ci_files": detect_ci(root),
        "docs": detect_docs(root),
        "has_project_governance": (root / "project" / "governance").exists(),
        "has_work_index": (root / "project" / "work" / "work_index.md").exists(),
    }
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
