# Setup Complete — Delete This File After Reading

This file was created by `ai-setup-cli`. Read it once, then delete it.

## What Was Installed

```
GEMINI.md                              ← Project instructions for Gemini CLI (always loaded)
.geminiignore                          ← Files excluded from Gemini context
.gemini/commands/review.toml           ← /review command — code review on staged changes
.gemini/commands/commit.toml           ← /commit command — conventional commit helper
.gemini/hooks/pre-tool.sh              ← BeforeAgent hook: blocks writes to protected files
.gemini/hooks/post-tool.sh             ← AfterTool hook: appends audit log on write_file
.gemini/skills/write-commit/SKILL.md   ← Skill: generates conventional commit messages
```

## Next Steps

1. **Edit `GEMINI.md`** — replace placeholder comments with your project name, stack, and conventions
2. **Make hooks executable** — `chmod +x .gemini/hooks/pre-tool.sh .gemini/hooks/post-tool.sh`
3. **Register hooks** in `~/.gemini/settings.json` (see Hooks section below)
4. **Delete this file**

## Gemini CLI Feature Map

| Feature | Location | How to invoke |
|---------|----------|---------------|
| Project instructions | `GEMINI.md` | Always loaded at session start |
| Custom commands | `.gemini/commands/*.toml` | `/command-name [args]` in chat |
| Hooks | `.gemini/hooks/*.sh` | Registered in settings.json |
| Skills | `.gemini/skills/*/SKILL.md` | Loaded on-demand via `${AgentSkills}` |

## Registering Hooks

Add hooks to `~/.gemini/settings.json` (global) or `.gemini/settings.json` (project):

```json
{
  "hooks": {
    "BeforeTool": [
      {
        "hooks": [
          {
            "name": "protect-files",
            "type": "command",
            "command": "bash .gemini/hooks/pre-tool.sh"
          }
        ]
      }
    ],
    "AfterTool": [
      {
        "hooks": [
          {
            "name": "audit-log",
            "type": "command",
            "command": "bash .gemini/hooks/post-tool.sh"
          }
        ]
      }
    ]
  }
}
```

Hook exit codes:
- `0` — success, continue
- `2` — block the current action (pre-hooks only)

## Agent Personas

Gemini CLI does not yet support file-based sub-agents. Define distinct agent personas directly in `GEMINI.md` using a `## Agents` section, or pass `--system-prompt` at startup.

## Resources

- Gemini CLI docs: https://github.com/google-gemini/gemini-cli
- Custom commands: https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/custom-commands.md
- Hooks reference: https://github.com/google-gemini/gemini-cli/blob/main/docs/hooks/reference.md
