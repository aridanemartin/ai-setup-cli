import * as p from '@clack/prompts'
import path from 'path'
import {
  TOOLS,
  availableTools,
  detectedTools,
  sourceLayout,
  toolById,
  toolTemplateDir,
  type Tool,
} from './tools'
import { installTool, type InstallOptions, type InstallResult } from './installer'
import { resolveSource, type ResolvedSource } from './source'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const yes = args.includes('--yes')
const all = args.includes('--all')
const sourceArg = args.find((arg) => !arg.startsWith('-'))

if (args.includes('--help') || args.includes('-h')) {
  console.log(
    'Usage: npx ai-setup-cli [source] [--dry-run] [--yes] [--all]\n\n' +
      'Arguments:\n' +
      '  source     Optional GitHub repo (https://github.com/owner/repo) or local path\n' +
      '             containing provider config. When omitted, the built-in templates\n' +
      '             are used.\n\n' +
      'Options:\n' +
      '  --dry-run  List files that would be written without writing them\n' +
      '  --yes      Overwrite all existing files without prompting\n' +
      '  --all      Install every provider available in the source (skip selection)\n' +
      '  --help     Show this help message\n\n' +
      'Without a source, you pick from the built-in templates. With a source, the CLI\n' +
      'detects which providers this project already uses (.claude, .github, .devin, …)\n' +
      'and lets you install the matching configuration from that repository.'
  )
  process.exit(0)
}

async function selectTools(
  tools: Tool[],
  detectedIds: string[],
  message: string
): Promise<string[]> {
  if (all) return tools.map((t) => t.id)

  const selected = await p.multiselect<string>({
    message,
    options: tools.map((t) => ({
      value: t.id,
      label: detectedIds.includes(t.id) ? `${t.label} (detected)` : t.label,
      hint: t.hint,
    })),
    initialValues: detectedIds,
    required: false,
  })

  if (p.isCancel(selected)) {
    p.cancel('Cancelled.')
    process.exit(0)
  }
  return selected
}

function conflictHandler(tool: Tool, spinner: ReturnType<typeof p.spinner>): InstallOptions['onConflict'] {
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

async function installTools(
  targetDir: string,
  ids: string[],
  resolve: (tool: Tool) => { srcDir: string; include?: string[] }
): Promise<{ written: string[]; skipped: string[] }> {
  const allWritten: string[] = []
  const allSkipped: string[] = []
  const handled = new Set<string>()

  for (const id of ids) {
    const tool = toolById(id)
    if (!tool) continue

    const { srcDir, include } = resolve(tool)
    const spinner = p.spinner()
    spinner.start(`Installing ${tool.label}`)

    const result: InstallResult = await installTool(srcDir, targetDir, {
      dryRun,
      include,
      handled,
      onConflict: conflictHandler(tool, spinner),
    })

    for (const file of result.written) handled.add(file)

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
  const ids = await selectTools(
    TOOLS,
    [],
    'Which AI tools do you want to set up?\n' +
      '  (select one or more with Space, then press Enter to continue)'
  )

  const { written, skipped } = await installTools(targetDir, ids, (tool) => ({
    srcDir: toolTemplateDir(tool.id),
  }))
  printSummary(written, skipped)
}

async function runFromSource(source: ResolvedSource, targetDir: string): Promise<boolean> {
  const layout = sourceLayout(source.dir)
  const available = availableTools(source.dir)

  if (available.length === 0) {
    p.log.error(
      `No provider configuration found in ${source.label}. Expected .claude/, .github/, ` +
        '.devin/ … or a providers/ folder.'
    )
    return false
  }

  const detectedIds = detectedTools(targetDir)
    .filter((t) => available.some((a) => a.id === t.id))
    .map((t) => t.id)

  if (detectedIds.length === 0 && !all) {
    const markers = TOOLS.map((t) => t.markers[0]).join(', ')
    p.log.warn(`This repository doesn't have any ${markers}, etc. — nothing to detect.`)
    p.log.info('Re-run with --all to install every provider available in the source.')
    return false
  }

  const ids = await selectTools(
    available,
    detectedIds,
    'Detected providers are pre-selected. Choose what to install:'
  )

  const { written, skipped } = await installTools(targetDir, ids, (tool) =>
    layout === 'providers'
      ? { srcDir: path.join(source.dir, 'providers', tool.id) }
      : { srcDir: source.dir, include: tool.rootPaths }
  )
  printSummary(written, skipped)
  return true
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
