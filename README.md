# ai-setup-cli

> One command to configure any AI coding tool in your project.

```bash
npx ai-setup-cli
```

## Tools included

| Tool | Files installed |
|------|----------------|
| [Claude Code](https://claude.ai/code) | `CLAUDE.md`, `.claude/settings.json`, `.claude/rules/`, `.claude/hooks/`, `.mcp.json` |
| [GitHub Copilot](https://github.com/features/copilot) | `.github/copilot-instructions.md` |
| [OpenCode](https://opencode.ai) + [Codex](https://openai.com/codex) | `AGENTS.md`, `opencode.json`, `prompts/build.txt` |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | `GEMINI.md`, `.geminiignore` |
| [Cursor](https://cursor.com) | `.cursor/rules/general.mdc`, `.cursor/rules/components.mdc`, `.cursor/mcp.json`, `.cursorignore` |

## What gets installed

### Claude Code

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Project instructions: commands, code style, workflow, banned patterns |
| `.claude/settings.json` | Hooks (blocks `rm -rf`, logs writes) and MCP server config |
| `.claude/rules/code-style.md` | Import conventions, formatting, naming |
| `.claude/rules/testing.md` | Test runner preferences, file colocation |
| `.claude/rules/security.md` | No hardcoded secrets, input validation |
| `.claude/hooks/protect-files.sh` | Prevents editing `.env`, `package-lock.json` |
| `.mcp.json` | Project-scoped MCP server definitions |

**Customize:** Edit `CLAUDE.md` with your actual build/test commands and project description. Add MCP servers to `.mcp.json`.

### GitHub Copilot

| File | Purpose |
|------|---------|
| `.github/copilot-instructions.md` | Repository-wide instructions for code review and suggestions |

**Note:** GitHub Copilot reads only the first 4,000 characters of this file. Keep it concise.

**Customize:** Replace the repository context section with a description of your project.

### OpenCode + Codex

`AGENTS.md` is the shared convention used by both [OpenCode](https://opencode.ai) and [OpenAI Codex](https://openai.com/codex). One file covers both tools.

| File | Purpose |
|------|---------|
| `AGENTS.md` | Project context, conventions, and agent permissions |
| `opencode.json` | Three agents: `build` (edit+bash), `plan` (read-only), `code-reviewer` (subagent) |
| `prompts/build.txt` | System prompt for the `build` agent |

**Customize:** Edit `AGENTS.md` with your project description and architecture. Swap model IDs in `opencode.json` to your preferred provider.

### Gemini CLI

| File | Purpose |
|------|---------|
| `GEMINI.md` | Project-wide rules loaded into every Gemini CLI session |
| `.geminiignore` | Files and directories excluded from Gemini's context |

**Customize:** Fill in the tech stack and commands sections in `GEMINI.md`.

### Cursor

| File | Purpose |
|------|---------|
| `.cursor/rules/general.mdc` | `alwaysApply: true` — applies to all files |
| `.cursor/rules/components.mdc` | Glob-scoped to `src/components/**/*.tsx` — component conventions |
| `.cursor/mcp.json` | Project-scoped MCP server definitions |
| `.cursorignore` | Files excluded from Cursor's context |

**Customize:** Add more `.mdc` files in `.cursor/rules/` for language- or directory-specific conventions. Use `globs` frontmatter to scope rules to file patterns.

## CLI flags

| Flag | Effect |
|------|--------|
| _(none)_ | Interactive: tool selection + per-file overwrite prompts |
| `--dry-run` | Shows what would be written without touching the filesystem |
| `--yes` | Skips overwrite prompts and always overwrites existing files |

## Contributing

To add a new tool:

1. Create `templates/<tool-id>/` with the tool's config files at their real project paths
2. Add an entry to `TOOLS` in `src/tools.ts`
3. Add a section to this README explaining each file
4. Open a PR

## License

MIT
