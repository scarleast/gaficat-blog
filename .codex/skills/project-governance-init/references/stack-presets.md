# Stack Presets

Use these as starting points. Prefer commands already present in package scripts, CI, Makefiles, or project docs.

## Python

Common signals:

- `pyproject.toml`
- `uv.lock`, `poetry.lock`, `requirements.txt`
- `ruff`, `mypy`, `pyright`, `ty`, `pytest`

Suggested checks:

```bash
uv run ruff check .
uv run ty check .
uv run pytest
```

Adjust for the actual project. Do not invent tools the repo does not use unless the owner wants them.

## Node / TypeScript

Common signals:

- `package.json`
- `pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`
- `tsconfig.json`
- framework config files

Suggested checks:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Use `pnpm`, `yarn`, or `bun` when the lockfile indicates that package manager.

## Astro / Static Frontend

Suggested checks:

```bash
npm run lint
npm run typecheck
npm run build
```

For design parity tasks, require browser screenshots and side-by-side design comparison when a design source exists.

## Next.js / React App

Suggested checks:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

If no test command exists, record that gap and use browser smoke tests for user-facing changes.

## Go

Suggested checks:

```bash
go test ./...
go vet ./...
```

## Rust

Suggested checks:

```bash
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test
```

## Mixed Monorepo

Detect workspaces and avoid one-size-fits-all commands.

Suggested pattern:

- root checks for shared formatting/lint
- app-specific checks for touched packages
- CI parity when available

Record which commands are required globally and which are path-specific.
