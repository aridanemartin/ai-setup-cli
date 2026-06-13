---
name: write-commit
description: Generates a conventional commit message by analyzing the git diff and commits the staged changes. Use when the user asks to commit changes. Skip if the user wants to push or open a PR.
---

Read the diff, write a conventional commit message, and commit.

## Steps

1. Run `git diff --cached` — if empty, check `git status`
2. Stage specific files if needed — never `git add -A` without review
3. Write a message: `type: short imperative description` (under 72 chars)
4. Run `git commit -m "..."` — never `--no-verify`

## Commit Types

| Type       | When                             |
|------------|----------------------------------|
| `feat`     | New user-facing feature          |
| `fix`      | Bug fix                          |
| `chore`    | Config or tooling, no prod code  |
| `refactor` | Internal change, no new feat     |
| `docs`     | Documentation only               |
| `test`     | Tests only                       |

## Constraints

- Never push without explicit user approval
- Never skip pre-commit hooks
- Never use `git add -A` without showing the user what will be staged
- Ask before staging files that look like secrets (`.env`, keys, tokens)
