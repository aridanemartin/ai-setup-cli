# ai-setup-cli

> 💻 One command to configure any AI coding tool in your project!

## Requirements

Node.js >= 20.12.0

## OPTION 1: Set up a project with a template

```bash
npx ai-setup-cli
```

- Select if you want to install into the current project or globally for all projects on your machine.
- Pick providers to install, or install all of them at once.
- Voila! You have an ready-to-use AI setup template to play with!

## OPTION 2: Copy an AI setup from a public GitHub repo

‼️ Works with any public GitHub repo with .github, .claude, .codex, .gemini, .opencode, or .cursor directories in the root.

```bash
npx ai-setup-cli https://github.com/aridanemartin/aridane-martin-public-ai-setup
```

- Select if you want to install into the current project or globally for all projects on your machine.
- Pick providers to install, or install all of them at once.
- Voila! Your project is now ready to use with your AI coding tools.

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
