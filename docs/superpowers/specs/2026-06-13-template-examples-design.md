# Template Examples Design

**Date:** 2026-06-13  
**Status:** Approved

## Goal

Every vendor template in `ai-setup-cli` should ship with working examples of every feature that tool supports — so users can see how things fit together rather than staring at placeholders.

## Feature Coverage (corrected after doc research)

| Feature | Claude Code | Windsurf | Cursor | Gemini CLI | Copilot | OpenCode |
|---|---|---|---|---|---|---|
| Instructions | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sub-agents | ✅ | ✅ | ✅ native | ~partial* | ✅ native | ✅ native |
| Hooks | ✅ 2 | ✅ 2 | ✅ native | ✅ native | ✅ in agent | ❌ none |
| Workflow/Prompt/Command | ✅ 2 | ✅ 2 | ❌ | ❌ | ❌ | ✅ 3 |
| Skills | ✅ concrete | ✅ | approx | ✅ native | ✅ native | ✅ |
| README | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

*Gemini CLI subagents: SDK-level feature marked "not implemented" in docs — approximated as persona section in GEMINI.md.

## Consistent Example Content

All templates use the same three example artifacts so users can compare how the same concept maps across tools:

- **Agent**: `code-reviewer` — read-only, security + correctness
- **Prompt/Workflow/Command**: `review` — review staged/branch changes  
- **Skill**: `write-commit` — generate conventional commit messages
- **Hooks**: protect-files (pre-write/tool) + write-log (post-write/tool)

## Changes Per Template

### claude-code
- Rename `example-skill/` → `write-commit/` with real content

### windsurf
- Add `.windsurf/agents/code-reviewer.md`
- Update README to include Agents row in feature table

### cursor (major)
- Add `AGENTS.md` (root instruction file)
- Add `.cursor/agents/code-reviewer.md`
- Add `.cursor/hooks.json` + `.cursor/hooks/protect-files.sh`
- Add `.cursor/prompts/review.md` + `.cursor/prompts/write-commit.md`
- Add `README.delete-after-reading.md`

### gemini-cli (major)
- Update `GEMINI.md` (add agent persona section)
- Add `.gemini/hooks/pre-tool.sh` + `.gemini/hooks/post-tool.sh`
- Add `.gemini/commands/review.toml` + `.gemini/commands/commit.toml`
- Add `.gemini/skills/write-commit/SKILL.md`
- Add `README.delete-after-reading.md`

### github-copilot (major)
- Add `AGENTS.md`
- Add `.github/agents/code-reviewer.agent.md` (hooks embedded in frontmatter)
- Add `.github/prompts/review.prompt.md` + `.github/prompts/write-commit.prompt.md`
- Add `.github/skills/write-commit/SKILL.md`
- Add `README.delete-after-reading.md`

### opencode (major)
- Update `opencode.json` (add agent + skill paths)
- Update `AGENTS.md`
- Add `.opencode/skills/write-commit/SKILL.md`
- Add `README.delete-after-reading.md`

## No installer changes needed
The installer (`src/installer.ts`) copies all files from template directories — new files are picked up automatically.
