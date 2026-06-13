# Setup Complete — Delete This File After Reading

This file was created by `ai-setup-cli`. Read it once, then delete it.

## What Was Installed

```
AGENTS.md                              ← Project-level instructions (read by Cursor + other tools)
.cursor/rules/general.mdc              ← Always-on coding style rules
.cursor/rules/testing.mdc              ← Rules for test files
.cursor/rules/components.mdc           ← Rules for component files
.cursor/agents/code-reviewer.md        ← Sub-agent: focused code review (read-only)
.cursor/hooks.json                     ← Pre/post tool hooks (protect files + audit log)
.cursor/hooks/protect-files.sh         ← Script called by preToolUse hook
.cursor/prompts/review.md              ← /review prompt — code review on staged changes
.cursor/prompts/write-commit.md        ← /write-commit prompt — conventional commit helper
.cursor/mcp.json                       ← MCP server config (add your servers here)
```

## Next Steps

1. **Edit `AGENTS.md`** — replace the placeholder comments with your project's name, architecture, and conventions
2. **Make the hook executable** — `chmod +x .cursor/hooks/protect-files.sh`
3. **Add MCP servers** to `.cursor/mcp.json` if you use any (e.g. context7, filesystem)
4. **Delete this file**

## Cursor Feature Map

| Feature | Location | How to invoke |
|---------|----------|---------------|
| Project instructions | `AGENTS.md` | Always active |
| Rules | `.cursor/rules/*.mdc` | Always-on or glob-triggered |
| Sub-agents | `.cursor/agents/*.md` | Cursor dispatches automatically |
| Hooks | `.cursor/hooks.json` | Fire on tool use events |
| Prompts | `.cursor/prompts/*.md` | Reference in chat or attach |
| MCP servers | `.cursor/mcp.json` | Auto-loaded by Cursor |

## Hooks Reference

Cursor supports these hook events in `.cursor/hooks.json`:

| Event | When it fires |
|-------|---------------|
| `preToolUse` | Before any tool executes (use `matcher` to filter) |
| `postToolUse` | After any tool executes |
| `sessionStart` | When a new agent session begins |
| `sessionEnd` | When an agent session ends |
| `afterFileEdit` | After a file is written |
| `subagentStart` | Before a sub-agent is launched |
| `subagentStop` | After a sub-agent finishes |

Exit code `2` from a `preToolUse` hook blocks the action. Exit code `0` allows it.

## Resources

- Cursor docs: https://docs.cursor.com
- Cursor hooks: https://docs.cursor.com/context/rules
