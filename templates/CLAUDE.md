# Templates

This directory contains starter instruction files for every AI coding tool this project supports.

## Structure

Each subdirectory maps to one provider:

- `claude-code/` — CLAUDE.md + `.claude/rules/`, agents, skills, commands, hooks
- `codex/` — AGENTS.md + `.codex/` config
- `cursor/` — AGENTS.md + `.cursor/rules/`, agents, prompts
- `gemini-cli/` — GEMINI.md + `.gemini/` config
- `github-copilot/` — `.github/copilot-instructions.md` + `.github/instructions/`
- `opencode/` — AGENTS.md + `opencode.json`
- `windsurf/` — AGENTS.md + `.windsurf/rules/`, workflows

## Reference implementation

**`claude-code/` is the canonical template.** All sections, examples, and didactic comments
originate there. Every other provider's template is an adaptation of the same content to that
tool's file format, frontmatter conventions, and directory layout.

When updating an example or adding a new section, start with `claude-code/CLAUDE.md`, then
propagate the change to the other providers.

## Didactic conventions

All templates are intentionally instructive:

- `<!-- TIP N — ... -->` comments explain *why* a section exists (hidden from the AI at
  runtime, visible to the human setting up the project)
- Visible placeholder content (e.g. `**[Your Project Name]**`, example directory trees,
  example scripts) shows the expected format and is replaced by the user
- Short `<!-- Replace with your actual ... -->` hints mark every placeholder that needs
  customisation
