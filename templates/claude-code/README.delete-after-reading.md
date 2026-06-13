# Setup Complete — Delete This File After Reading

This file was created by `ai-setup-cli`. Read it once, then delete it.

## What Was Installed

```
CLAUDE.md                          ← Main project instructions for Claude
.claude/settings.json              ← Permissions and hooks config
.claude/rules/code-style.md        ← Code style rules
.claude/rules/security.md          ← Security rules
.claude/rules/testing.md           ← Testing rules
.claude/hooks/protect-files.sh     ← Hook that prevents overwriting key files
.claude/skills/write-commit/       ← Skill: generates conventional commit messages
.claude/commands/review.md         ← /review slash command — code review on staged changes
.claude/commands/document.md       ← /document slash command — generate inline docs
.claude/agents/code-reviewer.md    ← Sub-agent focused on review only (read-only tools)
.mcp.json                          ← MCP server config (add your servers here)
```

## Next Steps

1. **Edit `CLAUDE.md`** — replace the placeholder comments with your project's actual name, commands, and conventions
2. **Copy or extend the `write-commit` skill** — add your own skills under `.claude/skills/<name>/SKILL.md`
3. **Add MCP servers** to `.mcp.json` if you use any (e.g. context7, filesystem)
4. **Delete this file**

## Resources

- Claude Code docs: https://docs.anthropic.com/claude/claude-code
- Skills spec: https://agentskills.io/specification
