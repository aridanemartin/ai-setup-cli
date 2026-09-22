# Setup Complete — Delete This File After Reading

This file was created by `ai-setup-cli`. Read it once, then delete it.

## What Was Installed

```
AGENTS.md                                ← Always-on project rules (single source of truth)
.devin/config.json                       ← Permissions + which other tools' config to import
.devin/hooks.v1.json                     ← Devin hooks (protect files + audit log)
.devin/scripts/protect-files.sh          ← Blocks edits to .env / package-lock.json
.devin/scripts/audit-write.sh            ← Appends edited paths to .devin/write.log
.devin/rules/testing.md                  ← Rule loaded only for test files
.devin/agents/code-reviewer.md           ← Read-only code review subagent
.devin/agents/accessibility-reviewer.md  ← Read-only WCAG 2.2 AA audit subagent
.devin/skills/create-pr/SKILL.md         ← /create-pr skill
.devin/skills/web-design-guidelines/     ← UI review skill
```

## Next Steps

1. **Edit `AGENTS.md`** — replace the placeholder comments with your project description,
   commands, and conventions
2. **Add rules** — create `.devin/rules/<topic>.md` (one rule per file). Add `trigger: always_on`
   or `trigger: glob` frontmatter to control when it loads
3. **Add skills** — create `.devin/skills/<name>/SKILL.md`; invoke with `/<name>`. Skills keep
   the context window lean because they load only when invoked or relevant
4. **Add subagents** — create `.devin/agents/<name>.md` with `allowed-tools` and a system prompt
5. **Add MCP servers** — create `.devin/mcp_config.json` (never commit secrets; use `.devin/config.local.json`)
6. **Delete this file**

The hook scripts run through `bash`, so no `chmod +x` is required.

## Devin Feature Map

| Feature              | Path                              | Scope                    |
| -------------------- | --------------------------------- | ------------------------ |
| Agent instructions   | `AGENTS.md`                       | Project (commit to git)  |
| Rules                | `.devin/rules/*.md`               | Project (commit to git)  |
| Skills               | `.devin/skills/<name>/SKILL.md`   | Project (commit to git)  |
| Subagents            | `.devin/agents/<name>.md`         | Project (commit to git)  |
| Hooks                | `.devin/hooks.v1.json`            | Project (commit to git)  |
| Permissions/imports  | `.devin/config.json`              | Project (commit to git)  |
| MCP servers          | `.devin/mcp_config.json`          | Project (commit to git)  |
| Global rules         | `~/.config/devin/AGENTS.md`       | Personal (all projects)  |
| Global skills        | `~/.config/devin/skills/`         | Personal (all projects)  |
| Ignore               | `.gitignore`                      | Devin respects it by default |

> `.devin/` is the Devin-native directory and takes precedence over the legacy `.windsurf/`.
> If you are migrating an existing Windsurf setup, run `devin migrate hooks` and
> `devin migrate workflows`. Devin CLI does **not** read `.codeiumignore` — use `.gitignore`.

## Resources

- Devin CLI docs: https://docs.devin.ai/cli
- Rules & AGENTS.md: https://docs.devin.ai/cli/extensibility/rules
- Skills: https://docs.devin.ai/cli/extensibility/skills/overview
- Hooks: https://docs.devin.ai/cli/extensibility/hooks/overview
