---
name: write-commit
description: Use when committing changes — reads the diff and writes a conventional commit message. SKIP if the user wants to push or open a PR.
---

Read the staged diff, write a conventional commit message, and commit.

## Steps

1. **Check staged changes** — run `shell("git diff --cached")`; if empty, run `shell("git status")`
2. **Stage files if needed** — `shell("git add <specific files>")` (never `git add -A` without review)
3. **Write the message** — `type: short imperative description` (under 72 chars)
4. **Commit** — `shell("git commit -m '...'")` — never use `--no-verify`

## Commit Types

| Type       | When                               |
|------------|------------------------------------|
| `feat`     | New user-facing feature            |
| `fix`      | Bug fix                            |
| `chore`    | Config, tooling, deps — no prod code |
| `refactor` | Internal restructure, no new feat  |
| `docs`     | Documentation only                 |
| `test`     | Tests only                         |

## Constraints

- Never push without explicit user approval
- Never skip pre-commit hooks
- Never use `git add -A` without showing the user what will be staged
- Ask before staging files that look like secrets (`.env`, keys, tokens)
