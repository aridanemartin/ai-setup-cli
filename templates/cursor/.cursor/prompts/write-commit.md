---
description: Read the staged diff and write a conventional commit message, then commit
---

Read the staged diff, write a conventional commit message, and commit.

Steps:
1. Run `git diff --cached` — if empty, check `git status` for unstaged changes
2. Stage specific files if needed: `git add <file>` (avoid `git add -A` without review)
3. Write a message in the format: `type: short imperative description` (under 72 chars)
4. Commit: `git commit -m "..."` — never use `--no-verify`

Commit types:
- `feat` — new user-facing feature
- `fix` — bug fix
- `chore` — config, tooling, deps (no prod code)
- `refactor` — internal restructure, no new feature
- `docs` — documentation only
- `test` — tests only

Never push without explicit approval. Never skip pre-commit hooks.
