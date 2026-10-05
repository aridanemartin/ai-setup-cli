# ai-setup-cli

> One command to configure any AI coding tool in your project.

## Requirements

Node.js >= 20.12.0

## Set up a project with the built-in templates

```bash
npx ai-setup-cli
```

Pick one or more tools — Claude Code, Cursor, Codex CLI, Gemini CLI, GitHub Copilot, OpenCode,
or Devin — and get ready-to-use instructions, rules, hooks, and skills for each. Edit them to
match your project.

## Install your own team setup instead

```bash
npx ai-setup-cli https://github.com/you/your-ai-setup
```

Point at any GitHub repo, `owner/repo` shorthand, or local path with its own provider config
(`.claude/`, `.github/`, `AGENTS.md`, …) instead of the built-in templates. The CLI lists every
tool it knows; only the ones your source actually provides are selectable.

## Install globally instead of per-project

```bash
npx ai-setup-cli https://github.com/you/your-ai-setup --global
```

Writes into each tool's user-level config directory (`~/.claude`, `~/.codex`,
`~/.config/opencode`, …) instead of the current project, so the setup applies to every project
on your machine. Files that only make sense per-project are skipped automatically. Exact
local → global mappings: [`docs/AI-PROVIDERS-FOLDER-STRUCTURE.md`](docs/AI-PROVIDERS-FOLDER-STRUCTURE.md).

## Preview before writing anything

```bash
npx ai-setup-cli --dry-run
```

## Flags

| Flag | Effect |
|------|--------|
| `--dry-run` | Show what would be written without touching the filesystem |
| `--yes` | Skip overwrite prompts, always overwrite existing files |
| `--all` | With a source: install every provider it offers, skipping selection |
| `--global` | With a source: install into user-level config dirs without asking |

## Supported tools

 - [Claude Code](https://claude.ai/code) 
 - [Codex CLI](https://github.com/openai/codex) 
 - [Cursor](https://cursor.com) 
 - [Gemini CLI](https://github.com/google-gemini/gemini-cli) 
 - [GitHub Copilot](https://github.com/features/copilot) 
 - [OpenCode](https://opencode.ai) 
 - [Devin](https://devin.ai) 


## License

MIT
