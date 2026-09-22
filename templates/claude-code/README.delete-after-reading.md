# Setup Complete — Delete This File After Reading

This file was created by `ai-setup-cli`. Read it once, then delete it.

## What Was Installed

```
AGENTS.md                               ← Shared project instructions (single source of truth)
.claude/settings.json                   ← Permissions and hook config
.claude/rules/testing.md                ← Test conventions, loaded every session
.claude/hooks/protect-files.sh          ← Hook that blocks edits to sensitive files
.claude/agents/code-reviewer.md         ← Read-only review subagent
.claude/agents/accessibility-reviewer.md← Read-only WCAG 2.2 AA audit subagent
.claude/commands/create-pr.md           ← /create-pr slash command
.claude/skills/web-design-guidelines/   ← UI review skill (invoked by relevance)
.mcp.json                               ← MCP server config (add your servers here)
```

## Project instructions

`AGENTS.md` is the shared project instruction file. One file now serves Claude Code, Devin,
Codex, Cursor, and OpenCode, so there is no separate Claude-only instruction file to maintain.
Edit `AGENTS.md` and every tool picks up the change.

## Next Steps

1. **Edit `AGENTS.md`** — replace the placeholder comments with your project's actual name,
   commands, and conventions
2. **Add rules** — create `.claude/rules/<topic>.md`; rules load every session, or only for
   matching files when they start with `paths:` frontmatter
3. **Add MCP servers** to `.mcp.json` if you use any (e.g. context7, filesystem)
4. **Delete this file**

## Resources

- Claude Code docs — memory: https://code.claude.com/docs/en/memory
- Claude Code docs: https://docs.anthropic.com/claude/claude-code
- Skills spec: https://agentskills.io/specification
