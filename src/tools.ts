import path from 'path'

export interface Tool {
  id: string
  label: string
  hint: string
}

export const TOOLS: Tool[] = [
  {
    id: 'claude-code',
    label: 'Claude Code',
    hint: '.claude/, CLAUDE.md, .mcp.json',
  },
  {
    id: 'github-copilot',
    label: 'GitHub Copilot',
    hint: '.github/copilot-instructions.md',
  },
  {
    id: 'opencode',
    label: 'OpenCode + Codex',
    hint: 'AGENTS.md, opencode.json',
  },
  {
    id: 'gemini-cli',
    label: 'Gemini CLI',
    hint: 'GEMINI.md, .geminiignore',
  },
  {
    id: 'cursor',
    label: 'Cursor',
    hint: '.cursor/rules/, .cursorignore',
  },
]

export function templatesDir(): string {
  return path.resolve(__dirname, '..', 'templates')
}

export function toolTemplateDir(toolId: string): string {
  return path.join(templatesDir(), toolId)
}
