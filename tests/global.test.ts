import { describe, it, expect, afterEach, vi } from 'vitest'
import os from 'os'
import path from 'path'
import { globalBaseDir, globalPathFor } from '../src/global'

describe('globalBaseDir', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('uses provider env overrides when present', () => {
    vi.stubEnv('CLAUDE_CONFIG_DIR', '/custom/claude')
    vi.stubEnv('COPILOT_HOME', '/custom/copilot')
    vi.stubEnv('CODEX_HOME', '/custom/codex')
    vi.stubEnv('XDG_CONFIG_HOME', '/custom/xdg')

    expect(globalBaseDir('claude-code')).toBe('/custom/claude')
    expect(globalBaseDir('github-copilot')).toBe('/custom/copilot')
    expect(globalBaseDir('codex')).toBe('/custom/codex')
    expect(globalBaseDir('opencode')).toBe(path.join('/custom/xdg', 'opencode'))
  })

  it('falls back to the documented home directories', () => {
    const home = os.homedir()
    expect(globalBaseDir('gemini-cli')).toBe(path.join(home, '.gemini'))
    expect(globalBaseDir('cursor')).toBe(path.join(home, '.cursor'))
    expect(globalBaseDir('devin')).toBe(path.join(home, '.config', 'devin'))
  })

  it('throws for an unknown provider', () => {
    expect(() => globalBaseDir('nope')).toThrow(/Unknown provider/)
  })
})

describe('globalPathFor', () => {
  it('renames Claude AGENTS.md and drops project-only files', () => {
    expect(globalPathFor('claude-code', 'AGENTS.md')).toBe('CLAUDE.md')
    expect(globalPathFor('claude-code', '.mcp.json')).toBeNull()
    expect(globalPathFor('claude-code', '.claude/rules/testing.md')).toBe('rules/testing.md')
    expect(globalPathFor('claude-code', 'README.delete-after-reading.md')).toBeNull()
  })

  it('maps Copilot paths under ~/.copilot and skips the rest', () => {
    expect(globalPathFor('github-copilot', '.github/copilot-instructions.md')).toBe(
      'copilot-instructions.md'
    )
    expect(globalPathFor('github-copilot', '.github/instructions/ts.instructions.md')).toBe(
      'instructions/ts.instructions.md'
    )
    expect(globalPathFor('github-copilot', '.github/skills/x/SKILL.md')).toBe('skills/x/SKILL.md')
    expect(globalPathFor('github-copilot', 'AGENTS.md')).toBeNull()
    expect(globalPathFor('github-copilot', '.github/prompts/review.prompt.md')).toBeNull()
  })

  it('maps OpenCode paths and skips scaffolding', () => {
    expect(globalPathFor('opencode', 'opencode.json')).toBe('opencode.json')
    expect(globalPathFor('opencode', 'AGENTS.md')).toBe('AGENTS.md')
    expect(globalPathFor('opencode', '.opencode/skills/write-commit/SKILL.md')).toBe(
      'skills/write-commit/SKILL.md'
    )
    expect(globalPathFor('opencode', 'prompts/build.txt')).toBeNull()
  })

  it('maps Gemini and Codex paths', () => {
    expect(globalPathFor('gemini-cli', 'GEMINI.md')).toBe('GEMINI.md')
    expect(globalPathFor('gemini-cli', '.geminiignore')).toBeNull()
    expect(globalPathFor('gemini-cli', '.gemini/commands/commit.toml')).toBe('commands/commit.toml')
    expect(globalPathFor('codex', 'AGENTS.md')).toBe('AGENTS.md')
    expect(globalPathFor('codex', '.codexignore')).toBeNull()
    expect(globalPathFor('codex', '.codex/config.toml')).toBe('config.toml')
  })

  it('maps only the Cursor paths that have a global equivalent', () => {
    expect(globalPathFor('cursor', '.cursor/hooks.json')).toBe('hooks.json')
    expect(globalPathFor('cursor', '.cursor/skills/x/SKILL.md')).toBe('skills/x/SKILL.md')
    expect(globalPathFor('cursor', '.cursor/agents/reviewer.md')).toBe('agents/reviewer.md')
    expect(globalPathFor('cursor', '.cursor/mcp.json')).toBe('mcp.json')
    expect(globalPathFor('cursor', '.cursor/rules/general.mdc')).toBeNull()
    expect(globalPathFor('cursor', 'AGENTS.md')).toBeNull()
  })

  it('maps Devin paths', () => {
    expect(globalPathFor('devin', 'AGENTS.md')).toBe('AGENTS.md')
    expect(globalPathFor('devin', '.devin/rules/testing.md')).toBe('rules/testing.md')
  })
})
