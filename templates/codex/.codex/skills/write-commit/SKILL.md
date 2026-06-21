## write-commit

Generate a conventional commit message from the staged diff.

### Input

- `git diff --cached` output

### Output

A commit message following this convention:

| Type | Scope | Description |
|------|-------|-------------|
| feat | — | New feature |
| fix | — | Bug fix |
| chore | — | Maintenance |
| refactor | — | Code restructure |
| docs | — | Documentation |
| test | — | Tests |

### Constraints

- Line 1: `<type>(<scope>): <description>` (50 chars max)
- Body: wrapped at 72 chars
- No breaking changes without `!` after type