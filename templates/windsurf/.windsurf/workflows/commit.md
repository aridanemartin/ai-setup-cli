# Write Commit

Read the staged diff, write a conventional commit message, and commit.

## Steps

1. Run `git diff --cached` — if empty, check `git status` and ask what to stage
2. Write a one-line message: `<type>: <short description>`
   - `feat` — new user-facing feature
   - `fix` — bug fix
   - `chore` — tooling or config, no production impact
   - `refactor` — internal change, no new behaviour
3. Add a blank line + bullet list if the change spans multiple concerns
4. Run `git commit -m "..."` — never use `--no-verify`
5. Do not push unless the user explicitly asks
