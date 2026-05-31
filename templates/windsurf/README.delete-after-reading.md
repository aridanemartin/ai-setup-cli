# Setup Complete — Delete This File After Reading

This file was created by `ai-setup-cli`. Read it once, then delete it.

## What Was Installed

```
AGENTS.md                                ← Always-on agent instructions (root = global scope)
.codeiumignore                           ← Files excluded from Windsurf context indexing
.windsurf/rules/general.md              ← Always-on coding style rules
.windsurf/rules/testing.md              ← Rules activated on *.test.ts / *.spec.ts files
.windsurf/rules/components.md           ← Rules activated on src/components/**/*.tsx
.windsurf/workflows/review.md           ← /review workflow — code review on current branch
.windsurf/workflows/commit.md           ← /commit workflow — conventional commit helper
.windsurf/skills/write-commit/SKILL.md  ← Skill invoked automatically or via /write-commit
.windsurf/hooks.json                    ← pre/post write hooks (protect files + audit log)
.windsurf/scripts/protect-files.sh      ← Script called by pre_write_code hook
```

## Next Steps

1. **Edit `AGENTS.md`** — replace the placeholder comments with your project description and architecture
2. **Add more rules** — create `.windsurf/rules/your-rule.md` with `trigger: always_on` or `trigger: glob`
3. **Add more workflows** — create `.windsurf/workflows/your-workflow.md` (invoke via Cascade chat)
4. **Make the protect-files.sh executable** — `chmod +x .windsurf/scripts/protect-files.sh`
5. **Delete this file**

## Windsurf Feature Map

| Feature | Directory | Scope |
|---------|-----------|-------|
| Rules | `.windsurf/rules/` | Workspace (commit to git) |
| Workflows | `.windsurf/workflows/` | Workspace (commit to git) |
| Skills | `.windsurf/skills/` | Workspace (commit to git) |
| Hooks | `.windsurf/hooks.json` | Workspace (commit to git) |
| Agent instructions | `AGENTS.md` | Directory-scoped |
| MCP servers | `~/.codeium/windsurf/mcp_config.json` | Global only (not project-level) |

## Resources

- Windsurf docs: https://docs.windsurf.com
