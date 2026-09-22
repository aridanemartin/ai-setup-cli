---
name: create-pr
description: Open a pull request for the current branch with the gh CLI. Use when asked to create a PR, open a pull request, or ship the current branch.
allowed-tools:
  - read
  - grep
  - glob
  - exec
triggers:
  - user
  - model
---

# Create PR

Create a pull request using the `gh` CLI. Follow the steps below and confirm the title and
description with the user before publishing.

## Steps

1. Ask: "Do you want to reference a task or issue? If so, share the number or context."
2. Analyse the staged changes with `git diff --cached` (fall back to `git diff` when nothing
   is staged) and the branch's commits with `git log`.
3. Generate a conventional commit message — `<type>(<scope>): <subject>` using `feat`, `fix`,
   `docs`, `refactor`, `test`, or `chore`.
4. Derive the PR title from the task title when one was given, otherwise from the commit
   message or a diff summary. The title must be clear and descriptive — not a raw diff dump.
5. Draft the PR description from the commits and diff, including context, changes, and a
   verification checklist.
6. Show the title and description to the user and wait for confirmation.
7. Create the PR: `gh pr create --title "<title>" --body "<description>"`.

## Constraints

- Never create the PR without the user confirming the title and description.
- Keep the body focused: context, what changed, and how it was verified.

## Checklist

- [ ] Commit message follows conventional commit format
- [ ] PR title is clear and descriptive
- [ ] PR description includes context, changes, and verification steps
- [ ] Changes are clear and maintainable
