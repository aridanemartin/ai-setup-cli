# Setup Complete — Delete This File After Reading

This file was created by `ai-setup-cli`. Read it once, then delete it.

## What Was Installed

```
AGENTS.md                                ← Project-level instructions (read by Codex + other tools)
.codex/config.toml                      ← Codex CLI config (model, sandbox, hooks, MCP)
.codex/rules/general.toml               ← Always-on coding style rules
.codex/rules/testing.toml               ← Rules for test files
.codex/rules/components.toml            ← Rules for component files
.codex/hooks.json                       ← Pre/post tool hooks (protect files + audit log)
.codex/hooks/protect-files.sh          ← Script called by preToolUse hook
.codex/agents/code-reviewer.toml       ← Sub-agent: focused code review (read-only)
.codex/commands/review.toml            ← /review command — code review on staged changes
.codex/commands/commit.toml            ← /commit command — conventional commit helper
.codex/skills/write-commit/SKILL.md    ← Skill: conventional commit messages
.codexignore                           ← Files excluded from Codex context
```

## Next Steps

1. **Edit `AGENTS.md`** — replace the placeholder comments with your project's name, architecture, and conventions
2. **Enable hooks** — add `[features] codex_hooks = true` to `.codex/config.toml`
3. **Delete this file**

## Codex Feature Map

| Feature | Location | How to invoke |
|---------|----------|---------------|
| Project instructions | `AGENTS.md` | Always active |
| Rules | `.codex/rules/*.toml` | Always-on or glob-triggered |
| Sub-agents | `.codex/agents/*.toml` | Codex dispatches automatically |
| Hooks | `.codex/hooks.json` | Fire on tool use events |
| Commands | `.codex/commands/*.toml` | `/`-prefixed slash commands |
| Skills | `.codex/skills/*/SKILL.md` | Discoverable by Codex |
| MCP servers | `.codex/config.toml` | Under `[mcp_servers]` section |

## Resources

- Codex docs: https://github.com/openai/codex