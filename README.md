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
| [Claude Code](https://claude.ai/code) | `AGENTS.md` |
| [Codex CLI](https://github.com/openai/codex) | `AGENTS.md` |
| [Cursor](https://cursor.com) | `AGENTS.md` |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | `GEMINI.md` |
| [GitHub Copilot](https://github.com/features/copilot) | `.github/copilot-instructions.md` |
| [OpenCode](https://opencode.ai) | `AGENTS.md` |
| [Devin](https://devin.ai) | `AGENTS.md` |

## Files installed

### Claude Code

Claude Code reads `AGENTS.md` directly, and the same file also serves Devin, Codex, Cursor, and
OpenCode — there is no separate Claude-only instruction file.

| File | Purpose |
|------|---------|
| `AGENTS.md` | Project instructions: commands, code style, workflow, banned patterns |
| `.claude/settings.json` | Permissions and hook config |
| `.claude/rules/testing.md` | Test runner preferences, file colocation |
| `.claude/hooks/protect-files.sh` | Prevents editing `.env`, `package-lock.json` |
| `.claude/agents/code-reviewer.md` | Code reviewer subagent |
| `.claude/agents/accessibility-reviewer.md` | WCAG 2.2 AA audit subagent |
| `.claude/commands/create-pr.md` | `/create-pr` slash command |
| `.claude/skills/web-design-guidelines/SKILL.md` | UI review skill |
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
| `AGENTS.md` | Always-on project rules (shared with other tools) |
| `.devin/config.json` | Permissions + which other tools' config to import |
| `.devin/rules/testing.md` | Rule loaded only for test files |
| `.devin/hooks.v1.json` | Devin hooks: protect files + audit writes |
| `.devin/scripts/protect-files.sh` | Blocks edits to `.env`, `package-lock.json` |
| `.devin/scripts/audit-write.sh` | Appends edited paths to `.devin/write.log` |
| `.devin/agents/code-reviewer.md` | Read-only code review subagent |
| `.devin/agents/accessibility-reviewer.md` | Read-only WCAG 2.2 AA audit subagent |
| `.devin/skills/create-pr/SKILL.md` | `/create-pr` skill |
| `.devin/skills/web-design-guidelines/SKILL.md` | UI review skill |

> Devin CLI does **not** read `.codeiumignore` when run standalone — it respects `.gitignore`.
> `.devin/` is the Devin-native location and takes precedence over the legacy `.windsurf/`.

## Custom sources

Point the CLI at your own repository (or any local directory) instead of the built-in
templates. It detects which providers the current project already uses from marker paths
(`.claude`, `.github`, `.cursor`, `.codex`, `.gemini`, `.opencode`/`opencode.json`, `.devin`),
pre-selects them, and installs only those.

```bash
npx ai-setup-cli https://github.com/aridanemartin/aridane-martin-ai-setup
```

A source can be a GitHub URL, an `owner/repo` shorthand, or a local path. Two layouts are
supported:

- **Root layout** — real project paths at the repository root (`.claude/`, `.github/`,
  `AGENTS.md`, `GEMINI.md`, `opencode.json`, …). Each selected provider installs only its own
  paths; shared files such as `AGENTS.md` are written once.
- **`providers/<id>/`** — one folder per provider, matching the built-in template ids.

Detected providers are pre-selected. When the project has none of the markers, the CLI shows
the same picker as the no-argument flow, scoped to the providers the source offers — so you can
still install from a repo a project doesn't know about yet.

| Flag | Effect |
|------|--------|
| _(none)_ | Interactive: tool selection + per-file overwrite prompts |
| `--dry-run` | Shows what would be written without touching the filesystem |
| `--yes` | Skips overwrite prompts and always overwrites existing files |
| `--all` | With a source: install every provider available in it, skipping selection |

## Contributing

Add a new tool: create `templates/<tool-id>/` with config files at their real project paths, add an entry to `TOOLS` in `src/tools.ts`, and open a PR.

## License

MIT
