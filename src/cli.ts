import * as p from '@clack/prompts'
import path from 'path'
import { TOOLS, toolTemplateDir } from './tools'
import { installTool } from './installer'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const yes = args.includes('--yes')

async function main(): Promise<void> {
  p.intro('ai-setup-cli — AI tool configuration installer')

  if (dryRun) {
    p.log.warn('Dry run mode: no files will be written')
  }

  const selected = await p.multiselect<{ value: string; label: string; hint: string }, string>({
    message: 'Which AI tools do you want to set up?',
    options: TOOLS.map(t => ({ value: t.id, label: t.label, hint: t.hint })),
  })

  if (p.isCancel(selected)) {
    p.cancel('Cancelled.')
    process.exit(0)
  }

  const destDir = process.cwd()
  const allWritten: string[] = []
  const allSkipped: string[] = []

  for (const toolId of selected) {
    const tool = TOOLS.find(t => t.id === toolId)!
    const srcDir = toolTemplateDir(toolId)
    const spinner = p.spinner()
    spinner.start(`Installing ${tool.label}`)

    const result = await installTool(srcDir, destDir, {
      dryRun,
      onConflict: async (filePath: string) => {
        if (yes) return true
        spinner.stop(`Conflict: ${filePath}`)
        const answer = await p.confirm({
          message: `${filePath} already exists — overwrite?`,
        })
        if (p.isCancel(answer)) {
          p.cancel('Cancelled.')
          process.exit(0)
        }
        spinner.start(`Installing ${tool.label}`)
        return answer === true
      },
    })

    const label = dryRun ? `${tool.label} (dry run)` : tool.label
    spinner.stop(`${label}: ${result.written.length} file(s) written, ${result.skipped.length} skipped`)
    allWritten.push(...result.written)
    allSkipped.push(...result.skipped)
  }

  const summary = [
    allWritten.length ? `Written:\n  ${allWritten.join('\n  ')}` : null,
    allSkipped.length ? `Skipped:\n  ${allSkipped.join('\n  ')}` : null,
  ]
    .filter(Boolean)
    .join('\n\n')

  p.note(summary || 'Nothing to do.', 'Summary')
  p.outro('Customize the generated files for your project. Happy coding!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
