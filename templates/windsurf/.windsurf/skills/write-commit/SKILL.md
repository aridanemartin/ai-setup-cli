---
name: write-commit
description: Use when committing changes — reads the diff and writes a conventional message. SKIP if the user wants to push or open a PR.
---

Read the diff, write a conventional commit message, and commit.

## Steps

1. Run `git diff --cached` — if empty, check `git status`
2. Write a message: `[type]: [short description]`
3. Run `git commit -m "..."` — never `--no-verify`

## Commit Types

| Type       | When                          |
|------------|-------------------------------|
| `feat`     | New user-facing feature       |
| `fix`      | Bug fix                       |
| `chore`    | Config or tooling, no prod code |
| `refactor` | Internal change, no new feat  |

## Constraints

- Never push without explicit user approval
- Never skip pre-commit hooks
