# Setup Complete — Delete This File After Reading

This file was created by `ai-setup-cli`. Read it once, then delete it.

## What Was Installed

```
AGENTS.md                               ← Project instructions (loaded via opencode.json "instructions")
opencode.json                           ← Main config: agents, skills, models, permissions
prompts/build.txt                       ← System prompt for the build agent
prompts/plan.txt                        ← System prompt for the plan agent
prompts/code-reviewer.txt               ← System prompt for the code-reviewer sub-agent
.opencode/skills/write-commit/SKILL.md  ← Skill: generates conventional commit messages
```

## Next Steps

1. **Edit `AGENTS.md`** — replace placeholder comments with your project's name, architecture, and conventions
2. **Edit `opencode.json`** — update model IDs, add MCP servers, adjust permissions
3. **Add more skills** — create `.opencode/skills/<name>/SKILL.md` for repeatable tasks
4. **Delete this file**

## OpenCode Feature Map

| Feature | Location | How to invoke |
|---------|----------|---------------|
| Project instructions | `AGENTS.md` + `opencode.json "instructions"` | Always loaded |
| Primary agents | `opencode.json "agent"` with `"mode": "primary"` | Select at session start |
| Sub-agents | `opencode.json "agent"` with `"mode": "subagent"` | Main agent delegates automatically |
| Prompts/commands | `opencode.json "command"` | `/command-name` in chat |
| Skills | `.opencode/skills/*/SKILL.md` | Loaded on-demand via the `skill` tool |
| MCP servers | `opencode.json "mcp"` | Auto-loaded |

## Agents Reference

Agents are configured in `opencode.json`:

```json
{
  "agent": {
    "my-agent": {
      "model": "anthropic/claude-sonnet-4-6",
      "mode": "primary",
      "description": "When to use this agent",
      "permission": {
        "edit": "allow",
        "bash": "ask"
      }
    }
  }
}
```

## Note on Hooks

OpenCode does not currently support project-level lifecycle hooks (PreToolUse / PostToolUse). Use the `permission` field in `opencode.json` to control what agents can do, and configure MCP servers for custom tooling.

## Resources

- OpenCode docs: https://opencode.ai/docs
- Config reference: https://opencode.ai/docs/configuration
- Skills: https://opencode.ai/docs/skills
