# Setup Complete — Delete This File After Reading

This file was created by `ai-setup-cli`. Read it once, then delete it.

## What Was Installed

```
AGENTS.md                                   ← Project-level instructions (read by Copilot + other tools)
.github/copilot-instructions.md             ← Always-on Copilot instructions (code quality, security)
.github/instructions/typescript.instructions.md     ← TypeScript conventions
.github/instructions/testing.instructions.md        ← Testing conventions
.github/instructions/security.instructions.md       ← Security conventions
.github/instructions/documentation.instructions.md  ← Documentation conventions
.github/instructions/code-review.instructions.md    ← Code review priorities
.github/agents/code-reviewer.agent.md       ← Custom agent: focused code review (read-only + audit hook)
.github/prompts/review.prompt.md            ← Prompt: code review on staged changes
.github/prompts/write-commit.prompt.md      ← Prompt: conventional commit helper
.github/skills/write-commit/SKILL.md        ← Skill: generates conventional commit messages
```

## Next Steps

1. **Edit `AGENTS.md`** — replace placeholder comments with your project description and conventions
2. **Edit `.github/copilot-instructions.md`** — fill in the Repository overview, Build & validation, and Project layout sections. Validate every command by running it yourself
3. **Review instruction files** — `.github/instructions/*.instructions.md` are loaded automatically based on each file's `applyTo` glob. Adjust the glob or content to match your project
4. **Use prompts** — reference `.github/prompts/review.prompt.md` in Copilot Chat with `#file`
5. **Delete this file**

## Instruction file frontmatter

Files in `.github/instructions/` **must** start with frontmatter containing an `applyTo` glob — Copilot uses it to decide when the instructions activate:

```markdown
---
applyTo: "**/*.ts,**/*.tsx"
---

## TypeScript conventions
...
```

Glob examples:

| Pattern | Matches |
|---------|---------|
| `**` | All files (use for cross-cutting concerns like security) |
| `**/*.ts,**/*.tsx` | All TypeScript files recursively |
| `src/**/*.py` | Python files under `src/` at any depth |
| `**/*.test.*,**/*.spec.*` | All test files |

Optional `excludeAgent: "code-review"` or `"cloud-agent"` keeps a file from being used by those Copilot features.

## GitHub Copilot Feature Map

| Feature | Location | How to invoke |
|---------|----------|---------------|
| Always-on instructions | `.github/copilot-instructions.md` | Auto-loaded in every chat |
| Modular instructions | `.github/instructions/*.instructions.md` | Auto-loaded alongside copilot-instructions.md |
| Project instructions | `AGENTS.md` | Read by Copilot + compatible tools |
| Custom agents | `.github/agents/*.agent.md` | Select agent in Copilot Chat |
| Prompt files | `.github/prompts/*.prompt.md` | Attach via `#file` or `/prompt-name` |
| Skills | `.github/skills/*/SKILL.md` | Referenced from agents or prompts |

## Custom Agent Format

Agents are defined as `*.agent.md` files with YAML frontmatter:

```markdown
---
name: my-agent
description: When to use this agent
model: gpt-4o
tools:
  - read_file
  - run_in_terminal
hooks:
  PostToolUse:
    - type: command
      command: "./scripts/my-hook.sh"
---

Agent instructions here...
```

## Hooks

Hooks in GitHub Copilot are embedded in the agent file's frontmatter (`hooks:` key). They fire when that specific agent uses tools. Enable them in VS Code with:

```json
"chat.useCustomAgentHooks": true
```

## Resources

- Copilot customization: https://code.visualstudio.com/docs/copilot/customization/overview
- Custom agents: https://code.visualstudio.com/docs/copilot/customization/custom-agents
- Prompt files: https://code.visualstudio.com/docs/copilot/customization/prompt-files
