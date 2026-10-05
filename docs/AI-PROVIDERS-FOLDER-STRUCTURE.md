# AI Providers Folder Structure

Reference for every provider this CLI supports: where its config lives in a
project (**local**) versus in the user's home directory (**global**), and
exactly how a local path maps to its global counterpart.

Local paths below match this repo's `templates/<tool-id>/` layout. Global
paths and the skip notes are sourced from each provider's own documentation
(see links per section) — re-check them if a provider ships a breaking config
change.

A path marked **skip** has no documented global equivalent: installing that
tool globally omits it rather than guessing a location.

Every provider also skips `README.delete-after-reading.md` globally — it's
project scaffolding, not provider configuration.

---

## Claude Code

Global dir: `~/.claude/` — override with `CLAUDE_CONFIG_DIR`.

| Local (project root) | Global (`~/.claude/`) |
|---|---|
| `.claude/agents/`, `.claude/commands/`, `.claude/hooks/`, `.claude/rules/`, `.claude/skills/`, `.claude/settings.json` | same relative path under `~/.claude/` |
| `AGENTS.md` | **renamed** → `~/.claude/CLAUDE.md` (Claude's user-level instructions file is `CLAUDE.md`, not `AGENTS.md`) |
| `.mcp.json` | **skip** — project-scoped MCP registration; user-scope MCP servers are managed via `claude mcp add --scope user`, which writes into `~/.claude.json`, not a file this CLI should drop in directly |

**Reference docs:**
- https://code.claude.com/docs/en/claude-directory — `~/.claude` vs project `.claude/`, `CLAUDE_CONFIG_DIR` override
- https://code.claude.com/docs/en/memory — `~/.claude/rules/` user-level rules
- https://code.claude.com/docs/en/settings-example — `~/.claude/settings.json`
- https://code.claude.com/docs/en/glossary — `.claude` directory definition
- https://code.claude.com/docs/en/agent-sdk/claude-code-features — CLAUDE.md load locations (project vs user)

---

## GitHub Copilot

Global dir: `~/.copilot/` — override with `COPILOT_HOME`.

| Local (project root) | Global (`~/.copilot/`) |
|---|---|
| `.github/copilot-instructions.md` | → `~/.copilot/copilot-instructions.md` (same filename, no frontmatter conversion needed) |
| `.github/instructions/*.instructions.md` | → `~/.copilot/instructions/*.instructions.md` |
| `.github/agents/*` | → `~/.copilot/agents/*` |
| `.github/skills/*` | → `~/.copilot/skills/*` (same Agent Skills convention Claude Code and Cursor use) |
| `.github/hooks/*` | **skip** — no documented global equivalent |
| `.github/prompts/*` | **skip** — no documented global equivalent |
| `AGENTS.md` | **skip** — no documented global read support for Copilot CLI |

**Reference docs:**
- https://docs.github.com/en/copilot/concepts/agents/about-agent-skills — project vs user-level skills (`.github/skills`, `~/.copilot/skills`, `~/.agents/skills`)
- https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions — `~/.copilot/copilot-instructions.md`, `COPILOT_HOME` override
- https://docs.github.com/en/copilot/reference/custom-instructions-support — instructions file types and precedence

---

## OpenCode + Codex (opencode)

Global dir: `~/.config/opencode/` — respects `XDG_CONFIG_HOME` (then `$XDG_CONFIG_HOME/opencode`).

| Local (project root) | Global (`~/.config/opencode/`) |
|---|---|
| `.opencode/plugins/*` | → `~/.config/opencode/plugins/*` |
| `.opencode/skills/*` | → `~/.config/opencode/skills/*` |
| `opencode.json` | → `~/.config/opencode/opencode.json` |
| `AGENTS.md` | → `~/.config/opencode/AGENTS.md` |
| `prompts/*` | **skip** — this repo's own scaffolding convention, not an OpenCode-native global feature |

**Reference docs:**
- https://opencode.ai/v2/docs/instructions — AGENTS.md hierarchy, `~/.config/opencode/AGENTS.md` global file
- https://opencode.ai/v2/docs/plugins — global plugin discovery path
- https://opencode.ai/v2/docs/skills — skill precedence, global skills directory
- https://opencode.ai/v2/docs/config — skills search paths config
- https://opencode.ai/v2/docs/migrate-v1 — supported `opencode.json(c)` locations

---

## Gemini CLI

Global dir: `~/.gemini/`.

| Local (project root) | Global (`~/.gemini/`) |
|---|---|
| `.gemini/commands/`, `.gemini/hooks/`, `.gemini/skills/`, `.gemini/settings.json` | same relative path under `~/.gemini/` |
| `GEMINI.md` | → `~/.gemini/GEMINI.md` |
| `.geminiignore` | **skip** — project-only exclusion file |

**Reference docs:**
- https://github.com/google-gemini/gemini-cli/blob/main/docs/reference/configuration.md — settings file locations (`~/.gemini/settings.json`)
- https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/tutorials/memory-management.md — `~/.gemini/GEMINI.md` global hierarchy
- https://github.com/google-gemini/gemini-cli/blob/main/docs/core/index.md — memory discovery service

---

## Codex CLI

Global dir: `~/.codex/` — override with `CODEX_HOME`.

| Local (project root) | Global (`~/.codex/`) |
|---|---|
| `.codex/agents/`, `.codex/commands/`, `.codex/hooks/`, `.codex/rules/`, `.codex/skills/`, `.codex/config.toml`, `.codex/hooks.json` | same relative path under `~/.codex/` |
| `AGENTS.md` | → `~/.codex/AGENTS.md` |
| `.codexignore` | **skip** — project-only exclusion file |

**Reference docs:**
- https://github.com/openai/codex/blob/main/codex-rs/codex-home/src/instructions/mod.rs — global `AGENTS.md`/`AGENTS.override.md` discovery from `$CODEX_HOME`
- https://github.com/openai/codex/blob/main/codex-rs/core/src/agents_md.rs — project `AGENTS.md` discovery walk
- https://github.com/openai/codex/blob/main/codex-rs/config/src/loader/README.md — config layering (`CODEX_HOME`, project vs user `config.toml`)

---

## Cursor

Global dir: `~/.cursor/`.

| Local (project root) | Global (`~/.cursor/`) |
|---|---|
| `.cursor/hooks.json`, `.cursor/hooks/*` | same relative path under `~/.cursor/` |
| `.cursor/skills/*` | → `~/.cursor/skills/*` |
| `.cursor/agents/*` | → `~/.cursor/agents/*` |
| `.cursor/mcp.json` | → `~/.cursor/mcp.json` |
| `.cursor/rules/*` | **skip** — "User Rules" are configured only via Cursor Settings → Rules; no file-based global equivalent is documented |
| `.cursor/prompts/*` | **skip** — no documented global equivalent |
| `.cursorignore` | **skip** — project-only exclusion file |
| `AGENTS.md` | **skip** — Cursor documents `AGENTS.md` for project root and subdirectories only, no home-directory discovery |

**Reference docs:**
- https://cursor.com/docs/hooks — `~/.cursor/hooks.json` global hooks
- https://cursor.com/docs/skills — `~/.cursor/skills/`, `~/.agents/skills/`, Claude/Codex-compatible skill paths
- https://cursor.com/docs/subagents — `~/.cursor/agents/` (and Claude/Codex-compatible user subagent paths)
- https://cursor.com/docs/mcp — `~/.cursor/mcp.json` global MCP config
- https://cursor.com/docs/rules — User Rules are GUI-only (Settings → Rules); `AGENTS.md` project/subdirectory scope only
- https://cursor.com/docs/cli/using — CLI reads project `.cursor/rules`, `AGENTS.md`, `CLAUDE.md`
- https://cursor.com/docs/cli/reference/configuration — `~/.cursor/cli-config.json`, `CURSOR_CONFIG_DIR` override

---

## Devin

Global dir: `~/.config/devin/` — on Windows `%APPDATA%\devin\`.

| Local (project root) | Global (`~/.config/devin/`) |
|---|---|
| `.devin/agents/`, `.devin/rules/`, `.devin/scripts/`, `.devin/skills/`, `.devin/config.json`, `.devin/hooks.v1.json` | same relative path under `~/.config/devin/` |
| `AGENTS.md` | → `~/.config/devin/AGENTS.md` |

**Reference docs:**
- https://docs.devin.ai/cli/extensibility/configuration — `~/.config/devin/config.json`, `~/.config/devin/AGENTS.md`, Windows `%APPDATA%\devin\config.json`
- https://docs.devin.ai/cli/extensibility/rules — supported rule file names, global rules directory

---

## Summary table

| Tool | Global base dir | Env override |
|---|---|---|
| claude-code | `~/.claude` | `CLAUDE_CONFIG_DIR` |
| github-copilot | `~/.copilot` | `COPILOT_HOME` |
| opencode | `~/.config/opencode` | `XDG_CONFIG_HOME` (parent) |
| gemini-cli | `~/.gemini` | — |
| codex | `~/.codex` | `CODEX_HOME` |
| cursor | `~/.cursor` | — |
| devin | `~/.config/devin` (`%APPDATA%\devin` on Windows) | — |
