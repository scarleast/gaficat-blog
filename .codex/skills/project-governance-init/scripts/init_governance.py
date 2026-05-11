#!/usr/bin/env python3
"""Scaffold governance files into a target project after user confirmation."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


SKILL_ROOT = Path(__file__).resolve().parents[1]
TEMPLATES = SKILL_ROOT / "assets" / "templates"


def copytree(src: Path, dst: Path, overwrite: bool) -> None:
    if dst.exists() and not overwrite:
        return
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst)


def copy_file(src: Path, dst: Path, overwrite: bool) -> None:
    if dst.exists() and not overwrite:
        return
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)


def rewrite_codex_runtime_header(skill_file: Path, skill_name: str) -> None:
    if not skill_file.exists():
        return
    text = skill_file.read_text(encoding="utf-8")
    text = text.replace(
        "<!-- SOURCE OF TRUTH: This file is the authoritative version. -->",
        f"<!-- SOURCE OF TRUTH: project/governance/skills/{skill_name}/SKILL.md -->",
    )
    skill_file.write_text(text, encoding="utf-8")


def install_runtime(root: Path, runtime: str, overwrite: bool) -> None:
    if runtime == "codex":
        skills_src = TEMPLATES / "skills"
        for skill_dir in skills_src.iterdir():
            if skill_dir.is_dir():
                runtime_dir = root / ".codex" / "skills" / skill_dir.name
                copytree(skill_dir, runtime_dir, overwrite)
                rewrite_codex_runtime_header(runtime_dir / "SKILL.md", skill_dir.name)
    elif runtime == "claude":
        commands = TEMPLATES / "runtime" / "claude" / "commands"
        copytree(commands, root / ".claude" / "commands", overwrite)
    else:
        raise ValueError(f"unsupported runtime: {runtime}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("project", type=Path, help="Target project root")
    parser.add_argument("--mode", choices=["lightweight", "standard", "strict"], default="standard")
    parser.add_argument("--runtime", action="append", choices=["codex", "claude"], default=[])
    parser.add_argument("--overwrite", action="store_true", help="Overwrite generated governance files")
    args = parser.parse_args()

    root = args.project.resolve()
    if not root.exists() or not root.is_dir():
        parser.error(f"not a directory: {root}")

    governance = root / "project" / "governance"
    copytree(TEMPLATES / "contracts", governance / "contracts", args.overwrite)
    copytree(TEMPLATES / "work-templates", governance / "templates", args.overwrite)
    copytree(TEMPLATES / "skills", governance / "skills", args.overwrite)

    work = root / "project" / "work"
    work.mkdir(parents=True, exist_ok=True)
    work_index = work / "work_index.md"
    if args.overwrite or not work_index.exists():
        work_index.write_text(
            "# Work Index\n\n"
            "- `active_work_count`: `0`\n"
            "- `current_stage_summary`: (idle)\n\n"
            "## Active Work\n\n"
            "| work_id | stage | owner | title | path |\n"
            "| --- | --- | --- | --- | --- |\n\n"
            "## Closed Work\n\n"
            "| work_id | closed_at | title | path |\n"
            "| --- | --- | --- | --- |\n",
            encoding="utf-8",
        )

    for runtime in args.runtime:
        install_runtime(root, runtime, args.overwrite)

    print(f"installed governance mode={args.mode} runtimes={','.join(args.runtime) or 'none'} into {root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
