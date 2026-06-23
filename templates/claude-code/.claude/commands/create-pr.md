---
description: Create a pull request with conventional commits and automated description
allowed-tools: Bash, Read
---

# Create PR

Create a pull request using `gh cli` with:
1. **Task context** — optionally ask user if they want to provide a task/issue reference or context
2. **Conventional commit** — generate a commit message following `<type>(<scope>): <subject>` (feat, fix, docs, refactor, test, chore)
3. **PR title** — auto-generate from Task title if provided, otherwise from commit message or diff summary
4. **PR description** — auto-generate from commits and diff, include checklist
5. **Constraints** — check for clarity of changes
6. **Verification checklist** — ensure quality before publishing

## Workflow

1. Ask: "Do you want to reference a task/issue? If yes, provide the issue number or context."
2. Analyze staged changes via `git diff --cached`
3. Generate conventional commit message and PR title
4. Build PR description.
5. Show checklist before creating PR:

6. Execute `gh pr create` with generated title, body, and labels

## Constraints

- Ask user to confirm PR title and description before publishing
- Ensure PR title is clear and descriptive, not just a diff summary

## PR Checklist

- [ ] Commit message follows conventional commit format
- [ ] PR title is clear and descriptive 
- [ ] PR description includes context, changes, and verification steps
- [ ] All changes are clear and maintainable