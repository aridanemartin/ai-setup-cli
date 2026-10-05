import * as p from '@clack/prompts'
import path from 'path'
import {
  TOOLS,
  sourceLayout,
  toolById,
  toolChoices,
  toolTemplateDir,
  type Tool,
  type ToolChoice,
} from './tools'
import { installTool, type InstallOptions, type InstallResult } from './installer'
import { resolveSource, type ResolvedSource } from './source'
import { globalBaseDir, globalPathFor } from './global'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const yes = args.includes('--yes')
const all = args.includes('--all')
const globalInstall = args.includes('--global')
const sourceArg = args.find((arg) => !arg.startsWith('-'))

if (args.includes('--help') || args.includes('-h')) {
  console.log(
    'Usage: npx ai-setup-cli [source] [--dry-run] [--yes] [--all] [--global]\n\n' +
      'Arguments:\n' +
      '  source     Optional GitHub repo (https://github.com/owner/repo) or local path\n' +
      '             containing provider config. When omitted, the built-in templates\n' +
      '             are used.\n\n' +
      'Options:\n' +
      '  --dry-run  List files that would be written without writing them\n' +
      '  --yes      Overwrite all existing files without prompting\n' +
      '  --all      Install every provider available in the source (skip selection)\n' +
      '  --global   Install into user-level config dirs (~/.claude, ~/.codex, …).\n' +
      '             Only applies when installing from a source; without it you are\n' +
      '             asked to choose local or global.\n' +
      '  --help     Show this help message\n\n' +
      'Without a source, you pick from the built-in templates. With a source, the CLI\n' +
      'lists every provider: ones the repository offers are selectable, the rest are\n' +
      'shown as "(Not found)". Nothing is pre-selected — you choose what to install\n' +
      'and where (local or global).'
  )
  process.exit(0)
}

async function selectTools(choices: ToolChoice[], message: string): Promise<string[]> {
  const selectable = choices.filter((choice) => choice.available)
  if (all) return selectable.map((choice) => choice.id)

  const selected = await p.multiselect<string>({
    message,
    options: choices.map((choice) => ({
      value: choice.id,
      label: choice.available ? choice.label : `${choice.label} (Not found)`,
      hint: choice.hint,
      disabled: !choice.available,
    })),
    initialValues: [],
    required: false,
  })

  if (p.isCancel(selected)) {
    p.cancel('Cancelled.')
    process.exit(0)
  }
  return selected
}

type InstallScope = 'local' | 'global'

async function selectScope(): Promise<InstallScope> {
  if (globalInstall) return 'global'
  // Non-interactive runs default to local so `--all` stays scriptable.
  if (!process.stdin.isTTY) return 'local'

  const scope = await p.select<InstallScope>({
    message: 'Where should the configuration be installed?',
    options: [
      { value: 'local', label: 'Local', hint: 'this project (current directory)' },
      {
        value: 'global',
        label: 'Global',
        hint: 'your user config dirs (~/.claude, ~/.codex, …)',
      },
    ],
    initialValue: 'local',
  })

  if (p.isCancel(scope)) {
    p.cancel('Cancelled.')
    process.exit(0)
  }
  return scope
}

function conflictHandler(
  tool: Tool,
  spinner: ReturnType<typeof p.spinner>
): InstallOptions['onConflict'] {
  return async (filePath: string) => {
    if (yes) return true
    spinner.stop(`Conflict: ${filePath}`)
    const answer = await p.confirm({ message: `${filePath} already exists — overwrite?` })
    if (p.isCancel(answer)) {
      p.cancel('Cancelled.')
      process.exit(0)
    }
    spinner.start(`Installing ${tool.label}`)
    return answer === true
  }
}

interface InstallTarget {
  srcDir: string
  destDir: string
  include?: string[]
  mapPath?: (relativePath: string) => string | null
}

async function installTools(
  ids: string[],
  resolve: (tool: Tool) => InstallTarget
): Promise<{ written: string[]; skipped: string[] }> {
  const allWritten: string[] = []
  const allSkipped: string[] = []
  const handled = new Set<string>()

  for (const id of ids) {
    const tool = toolById(id)
    if (!tool) continue

    const { srcDir, destDir, include, mapPath } = resolve(tool)
    const spinner = p.spinner()
    spinner.start(`Installing ${tool.label}`)

    const result: InstallResult = await installTool(srcDir, destDir, {
      dryRun,
      include,
      mapPath,
      handled,
      onConflict: conflictHandler(tool, spinner),
    })

    const label = dryRun ? `${tool.label} (dry run)` : tool.label
    spinner.stop(
      `${label}: ${result.written.length} file(s) written, ${result.skipped.length} skipped`
    )
    allWritten.push(...result.written)
    allSkipped.push(...result.skipped)
  }

  return { written: allWritten, skipped: allSkipped }
}

function printSummary(written: string[], skipped: string[]): void {
  const summary = [
    written.length ? `Written:\n  ${written.join('\n  ')}` : null,
    skipped.length ? `Skipped:\n  ${skipped.join('\n  ')}` : null,
  ]
    .filter(Boolean)
    .join('\n\n')
  p.note(summary || 'Nothing to do.', 'Summary')
}

async function runBuiltIn(targetDir: string): Promise<void> {
  const choices: ToolChoice[] = TOOLS.map((tool) => ({
    id: tool.id,
    label: tool.label,
    hint: tool.hint,
    available: true,
  }))

  const ids = await selectTools(
    choices,
    'Which AI tools do you want to set up?\n' +
      '  (select one or more with Space, then press Enter to continue)'
  )

  const { written, skipped } = await installTools(ids, (tool) => ({
    srcDir: toolTemplateDir(tool.id),
    destDir: targetDir,
  }))
  printSummary(written, skipped)
}

async function runFromSource(source: ResolvedSource, targetDir: string): Promise<boolean> {
  const layout = sourceLayout(source.dir)
  const choices = toolChoices(source.dir)

  if (!choices.some((choice) => choice.available)) {
    p.log.error(
      `No provider configuration found in ${source.label}. Expected .claude/, .github/, ` +
        '.devin/ … or a providers/ folder.'
    )
    return false
  }

  const scope = await selectScope()
  if (scope === 'global') {
    p.log.info('Installing into your user-level config directories.')
  }

  // Providers the source offers are selectable; the rest are shown as "(Not found)".
  // Nothing is pre-selected, so the user explicitly chooses what to install.
  const ids = await selectTools(
    choices,
    scope === 'global'
      ? 'Choose which providers to install globally:'
      : 'Choose which providers to install:'
  )

  const { written, skipped } = await installTools(ids, (tool) => {
    const sourceTarget =
      layout === 'providers'
        ? { srcDir: path.join(source.dir, 'providers', tool.id) }
        : { srcDir: source.dir, include: tool.rootPaths }

    if (scope === 'global') {
      return {
        ...sourceTarget,
        destDir: globalBaseDir(tool.id),
        mapPath: (relativePath: string) => globalPathFor(tool.id, relativePath),
      }
    }

    return { ...sourceTarget, destDir: targetDir }
  })

  printSummary(written, skipped)
  return ids.length > 0
}

async function main(): Promise<void> {
  p.intro('ai-setup-cli — AI tool configuration installer')

  if (dryRun) {
    p.log.warn('Dry run mode: no files will be written')
  }

  const targetDir = process.cwd()

  if (!sourceArg) {
    await runBuiltIn(targetDir)
    p.outro('Customize the generated files for your project. Happy coding!')
    return
  }

  const spinner = p.spinner()
  spinner.start(`Fetching ${sourceArg}`)
  let source: ResolvedSource
  try {
    source = await resolveSource(sourceArg)
  } catch (err) {
    spinner.stop('Failed to fetch source')
    p.log.error(err instanceof Error ? err.message : String(err))
    process.exit(1)
  }
  spinner.stop(`Source ready: ${source.label}`)

  let installed = false
  try {
    installed = await runFromSource(source, targetDir)
  } finally {
    await source.cleanup()
  }

  p.outro(
    installed
      ? 'Customize the installed files for your project. Happy coding!'
      : 'Nothing installed.'
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
