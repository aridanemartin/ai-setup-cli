import fs from 'fs-extra'
import path from 'path'

export interface Tool {
  id: string
  label: string
  hint: string
  /** Relative paths that indicate this provider is already configured in a project. */
  markers: string[]
  /**
   * Relative paths this provider contributes when installing from a repository that
   * mirrors real project paths at its root (e.g. `.claude/`, `.github/`, `AGENTS.md`).
   */
  rootPaths: string[]
}

export const TOOLS: Tool[] = [
  {
    id: 'claude-code',
    label: 'Claude Code',
    hint: '.claude/, AGENTS.md, .mcp.json',
    markers: ['.claude', '.mcp.json'],
    rootPaths: ['.claude', 'AGENTS.md', '.mcp.json'],
  },
  {
    id: 'github-copilot',
    label: 'GitHub Copilot',
    hint: '.github/copilot-instructions.md',
    markers: ['.github', '.github/copilot-instructions.md'],
    rootPaths: ['.github'],
  },
  {
    id: 'opencode',
    label: 'OpenCode + Codex',
    hint: 'AGENTS.md, opencode.json, prompts/',
    markers: ['.opencode', 'opencode.json', 'opencode.jsonc'],
    rootPaths: ['.opencode', 'opencode.json', 'AGENTS.md'],
  },
  {
    id: 'gemini-cli',
    label: 'Gemini CLI',
    hint: 'GEMINI.md, .geminiignore',
    markers: ['.gemini', 'GEMINI.md', '.geminiignore'],
    rootPaths: ['.gemini', 'GEMINI.md'],
  },
  {
    id: 'codex',
    label: 'Codex CLI',
    hint: '.codex/config.toml, .codexignore, AGENTS.md',
    markers: ['.codex', '.codexignore'],
    rootPaths: ['.codex', 'AGENTS.md'],
  },
  {
    id: 'cursor',
    label: 'Cursor',
    hint: '.cursor/rules/, .cursorignore',
    markers: ['.cursor', '.cursorrules'],
    rootPaths: ['.cursor', 'AGENTS.md', '.cursorrules', '.cursorignore'],
  },
  {
    id: 'devin',
    label: 'Devin',
    hint: '.devin/rules/, skills/, agents/, hooks.v1.json',
    markers: ['.devin', '.windsurf'],
    rootPaths: ['.devin', 'AGENTS.md'],
  },
]

export function templatesDir(): string {
  return path.resolve(__dirname, '..', 'templates')
}

export function toolTemplateDir(toolId: string): string {
  return path.join(templatesDir(), toolId)
}

export function toolById(id: string): Tool | undefined {
  return TOOLS.find((t) => t.id === id)
}

/** Finds a provider whose marker file/directory exists in `dir`. */
export function detects(dir: string, tool: Tool): boolean {
  return tool.markers.some((marker) => fs.existsSync(path.join(dir, marker)))
}

/** All providers detected in `dir`, in TOOLS order. */
export function detectedTools(dir: string): Tool[] {
  return TOOLS.filter((tool) => detects(dir, tool))
}

/**
 * Providers a repository can supply. Supports two layouts:
 *  - `providers/<id>/` — one folder per provider (built-in template style)
 *  - root layout       — real project paths at the repo root (`.claude/`, `.github/`…)
 */
export function availableTools(sourceDir: string): Tool[] {
  const providersDir = path.join(sourceDir, 'providers')
  const hasProvidersLayout = fs.existsSync(providersDir)

  return TOOLS.filter((tool) => {
    if (hasProvidersLayout) return fs.existsSync(path.join(providersDir, tool.id))
    return hasDistinctivePath(sourceDir, tool)
  })
}

export function sourceLayout(sourceDir: string): 'providers' | 'root' {
  return fs.existsSync(path.join(sourceDir, 'providers')) ? 'providers' : 'root'
}

/**
 * Files shared by many providers. Their presence alone must not make a provider
 * "available" in a root-layout source, or every AGENTS.md repo would expose every tool.
 */
const SHARED_ROOT_PATHS = new Set(['AGENTS.md'])

function hasDistinctivePath(sourceDir: string, tool: Tool): boolean {
  return tool.rootPaths.some(
    (p) => !SHARED_ROOT_PATHS.has(p) && fs.existsSync(path.join(sourceDir, p))
  )
}
