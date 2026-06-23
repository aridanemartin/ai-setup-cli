# ai-setup-cli

> One command to configure any AI coding tool in your project.

```bash
npx ai-setup-cli
```

Installs ready-to-use config files for the tool(s) you pick. Edit them to match your project.

## Requirements

- Node.js >= 20.12.0

If you run this with an older Node.js version (for example 20.10.0), the CLI may fail at startup with a `styleText` runtime error.

## Tools

| Tool | Instruction file |
|------|-----------------|
| [Claude Code](https://claude.ai/code) | `CLAUDE.md` |
| [Codex CLI](https://github.com/openai/codex) | `AGENTS.md` |
| [Cursor](https://cursor.com) | `AGENTS.md` |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | `GEMINI.md` |
| [GitHub Copilot](https://github.com/features/copilot) | `.github/copilot-instructions.md` |
| [OpenCode](https://opencode.ai) | `AGENTS.md` |
| [Devin](https://devin.ai) | `AGENTS.md` |

## Files installed

### Claude Code

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project instructions: commands, code style, workflow, banned patterns |
| `.claude/settings.json` | Permissions and hook config |
| `.claude/rules/code-style.md` | Import conventions, formatting, naming |
| `.claude/rules/testing.md` | Test runner preferences, file colocation |
| `.claude/rules/security.md` | No hardcoded secrets, input validation |
| `.claude/hooks/protect-files.sh` | Prevents editing `.env`, `package-lock.json` |
| `.claude/agents/code-reviewer.md` | Code reviewer subagent |
| `.claude/commands/review.md` | `/review` slash command |
| `.claude/commands/document.md` | `/document` slash command |
| `.claude/skills/write-commit/SKILL.md` | `write-commit` skill |
| `.mcp.json` | Project-scoped MCP server definitions |

### Cursor

| File | Purpose |
|------|---------|
| `AGENTS.md` | Project instructions |
| `.cursor/rules/general.mdc` | `alwaysApply: true` — applies to all files |
| `.cursor/rules/components.mdc` | Scoped to `src/components/**/*.tsx` |
| `.cursor/rules/testing.mdc` | Test conventions |
| `.cursor/hooks.json` | Hook definitions |
| `.cursor/hooks/protect-files.sh` | Prevents editing protected files |
| `.cursor/hooks/audit-tool.sh` | Logs tool calls |
| `.cursor/agents/code-reviewer.md` | Code reviewer agent |
| `.cursor/prompts/review.md` | Review prompt |
| `.cursor/prompts/write-commit.md` | Write commit prompt |
| `.cursor/mcp.json` | Project-scoped MCP server definitions |
| `.cursorignore` | Files excluded from Cursor's context |

### Codex CLI

| File | Purpose |
|------|---------|
| `AGENTS.md` | Project instructions |
| `.codex/config.toml` | Codex CLI config: model, sandbox mode, approval policy |
| `.codexignore` | Files excluded from Codex's context |
| `.codex/hooks.json` | Hook definitions |
| `.codex/hooks/protect-files.sh` | Prevents editing sensitive files |
| `.codex/hooks/audit-tool.sh` | Logs tool calls |
| `.codex/rules/general.toml` | General coding rules |
| `.codex/rules/testing.toml` | Test conventions |
| `.codex/rules/components.toml` | Component conventions |
| `.codex/agents/code-reviewer.toml` | Code reviewer agent |
| `.codex/commands/review.toml` | Review command |
| `.codex/commands/commit.toml` | Commit command |
| `.codex/skills/write-commit/SKILL.md` | `write-commit` skill |

### Gemini CLI

| File | Purpose |
|------|---------|
| `GEMINI.md` | Project-wide rules loaded into every session |
| `.geminiignore` | Files excluded from Gemini's context |
| `.gemini/commands/commit.toml` | `/commit` command |
| `.gemini/commands/review.toml` | `/review` command |
| `.gemini/hooks/pre-tool.sh` | Runs before each tool call |
| `.gemini/hooks/post-tool.sh` | Runs after each tool call |
| `.gemini/skills/write-commit/SKILL.md` | `write-commit` skill |

### GitHub Copilot

| File | Purpose |
|------|---------|
| `AGENTS.md` | Project instructions |
| `.github/copilot-instructions.md` | Repository-wide instructions |
| `.github/instructions/typescript.instructions.md` | TypeScript conventions |
| `.github/instructions/testing.instructions.md` | Testing conventions |
| `.github/instructions/security.instructions.md` | Security conventions |
| `.github/instructions/documentation.instructions.md` | Documentation conventions |
| `.github/instructions/code-review.instructions.md` | Code review priorities |
| `.github/agents/code-reviewer.agent.md` | Code reviewer agent |
| `.github/prompts/review.prompt.md` | Review prompt |
| `.github/prompts/write-commit.prompt.md` | Write commit prompt |
| `.github/skills/write-commit/SKILL.md` | `write-commit` skill |

### OpenCode

| File | Purpose |
|------|---------|
| `AGENTS.md` | Project context and agent permissions |
| `opencode.json` | Three agents: `build`, `plan`, `code-reviewer` |
| `prompts/build.txt` | System prompt for the `build` agent |
| `prompts/plan.txt` | System prompt for the `plan` agent |
| `prompts/code-reviewer.txt` | System prompt for the `code-reviewer` agent |
| `.opencode/skills/write-commit/SKILL.md` | `write-commit` skill |

### Devin

| File | Purpose |
|------|---------|
| `AGENTS.md` | Project instructions |
| `.devin/rules/general.md` | General rules applied to all files |
| `.devin/rules/components.md` | Component conventions |
| `.devin/rules/testing.md` | Test conventions |
| `.windsurf/hooks.json` | Hook definitions |
| `.windsurf/scripts/protect-files.sh` | Prevents editing protected files |
| `.windsurf/agents/code-reviewer.md` | Code reviewer agent |
| `.windsurf/workflows/commit.md` | Commit workflow |
| `.windsurf/workflows/review.md` | Review workflow |
| `.windsurf/skills/write-commit/SKILL.md` | `write-commit` skill |
| `.codeiumignore` | Files excluded from Devin's context |

## CLI flags

| Flag | Effect |
|------|--------|
| _(none)_ | Interactive: tool selection + per-file overwrite prompts |
| `--dry-run` | Shows what would be written without touching the filesystem |
| `--yes` | Skips overwrite prompts and always overwrites existing files |

## Contributing

Add a new tool: create `templates/<tool-id>/` with config files at their real project paths, add an entry to `TOOLS` in `src/tools.ts`, and open a PR.

## License

MIT
