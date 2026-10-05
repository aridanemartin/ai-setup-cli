import os from 'os'
import path from 'path'

/**
 * Base directory for a provider's user-level ("global") configuration.
 *
 * Values follow `docs/AI-PROVIDERS-FOLDER-STRUCTURE.md`, including the
 * environment variables each provider honours to relocate its config.
 */
export function globalBaseDir(toolId: string): string {
  const home = os.homedir()

  switch (toolId) {
    case 'claude-code':
      return process.env.CLAUDE_CONFIG_DIR || path.join(home, '.claude')
    case 'github-copilot':
      return process.env.COPILOT_HOME || path.join(home, '.copilot')
    case 'opencode':
      return process.env.XDG_CONFIG_HOME
        ? path.join(process.env.XDG_CONFIG_HOME, 'opencode')
        : path.join(home, '.config', 'opencode')
    case 'gemini-cli':
      return path.join(home, '.gemini')
    case 'codex':
      return process.env.CODEX_HOME || path.join(home, '.codex')
    case 'cursor':
      return path.join(home, '.cursor')
    case 'devin':
      return process.platform === 'win32' && process.env.APPDATA
        ? path.join(process.env.APPDATA, 'devin')
        : path.join(home, '.config', 'devin')
    default:
      throw new Error(`Unknown provider: ${toolId}`)
  }
}

/** Project scaffolding that is never part of a provider's global config. */
const PROJECT_README = 'README.delete-after-reading.md'

function stripDir(prefix: string): (relativePath: string) => string | null {
  const withSlash = `${prefix}/`
  return (relativePath) =>
    relativePath.startsWith(withSlash) ? relativePath.slice(withSlash.length) : null
}

const stripClaude = stripDir('.claude')
const stripGemini = stripDir('.gemini')
const stripCodex = stripDir('.codex')
const stripDevin = stripDir('.devin')

/**
 * Maps a project-relative config path to its path inside a provider's global
 * base directory. Returns `null` when the path has no documented global
 * equivalent and must be omitted — for example project-only exclusion files,
 * `README.delete-after-reading.md`, or Claude's `.mcp.json` (user-scope MCP
 * servers are managed through `claude mcp add`, not a dropped file).
 */
export function globalPathFor(toolId: string, relativePath: string): string | null {
  if (relativePath === PROJECT_README) return null

  switch (toolId) {
    case 'claude-code':
      if (relativePath === 'AGENTS.md') return 'CLAUDE.md'
      if (relativePath === '.mcp.json') return null
      return stripClaude(relativePath)

    case 'github-copilot':
      if (relativePath === '.github/copilot-instructions.md') return 'copilot-instructions.md'
      if (relativePath.startsWith('.github/instructions/'))
        return `instructions/${relativePath.slice('.github/instructions/'.length)}`
      if (relativePath.startsWith('.github/agents/'))
        return `agents/${relativePath.slice('.github/agents/'.length)}`
      if (relativePath.startsWith('.github/skills/'))
        return `skills/${relativePath.slice('.github/skills/'.length)}`
      // hooks/, prompts/ and AGENTS.md have no global Copilot equivalent.
      return null

    case 'opencode':
      if (relativePath === 'opencode.json') return 'opencode.json'
      if (relativePath === 'AGENTS.md') return 'AGENTS.md'
      if (relativePath.startsWith('.opencode/plugins/'))
        return `plugins/${relativePath.slice('.opencode/plugins/'.length)}`
      if (relativePath.startsWith('.opencode/skills/'))
        return `skills/${relativePath.slice('.opencode/skills/'.length)}`
      // prompts/ is this repo's scaffolding convention, not an OpenCode global path.
      return null

    case 'gemini-cli':
      if (relativePath === 'GEMINI.md') return 'GEMINI.md'
      if (relativePath === '.geminiignore') return null
      return stripGemini(relativePath)

    case 'codex':
      if (relativePath === 'AGENTS.md') return 'AGENTS.md'
      if (relativePath === '.codexignore') return null
      return stripCodex(relativePath)

    case 'cursor':
      if (relativePath === '.cursor/hooks.json') return 'hooks.json'
      if (relativePath.startsWith('.cursor/hooks/'))
        return `hooks/${relativePath.slice('.cursor/hooks/'.length)}`
      if (relativePath.startsWith('.cursor/skills/'))
        return `skills/${relativePath.slice('.cursor/skills/'.length)}`
      if (relativePath.startsWith('.cursor/agents/'))
        return `agents/${relativePath.slice('.cursor/agents/'.length)}`
      if (relativePath === '.cursor/mcp.json') return 'mcp.json'
      // rules/, prompts/, .cursorignore and AGENTS.md are project-only for Cursor.
      return null

    case 'devin':
      if (relativePath === 'AGENTS.md') return 'AGENTS.md'
      return stripDevin(relativePath)

    default:
      return null
  }
}
