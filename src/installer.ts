import fs from 'fs-extra'
import path from 'path'

export interface InstallOptions {
  dryRun: boolean
  onConflict: (filePath: string) => Promise<boolean>
  /**
   * Relative files/directories (from `srcDir`) to install. Defaults to the whole `srcDir`.
   * Used when installing a provider from a repository that mirrors project paths at its root.
   */
  include?: string[]
  /**
   * Relative paths already written earlier in the same run. Skipped silently so a file
   * shared by several providers (e.g. `AGENTS.md`) is only offered/installed once.
   */
  handled?: Set<string>
}

export interface InstallResult {
  written: string[]
  skipped: string[]
}

export async function installTool(
  srcDir: string,
  destDir: string,
  options: InstallOptions
): Promise<InstallResult> {
  const files = await collectFiles(srcDir, options.include)
  const written: string[] = []
  const skipped: string[] = []

  for (const srcFile of files) {
    const relativePath = path.relative(srcDir, srcFile)

    if (options.handled?.has(relativePath)) continue

    if (options.dryRun) {
      written.push(relativePath)
      continue
    }

    if (await fs.pathExists(path.join(destDir, relativePath))) {
      const overwrite = await options.onConflict(relativePath)
      if (!overwrite) {
        skipped.push(relativePath)
        continue
      }
    }

    const destFile = path.join(destDir, relativePath)
    await fs.ensureDir(path.dirname(destFile))
    await fs.copy(srcFile, destFile)
    written.push(relativePath)
  }

  return { written, skipped }
}

async function collectFiles(dir: string, include?: string[]): Promise<string[]> {
  if (!include) return collectAll(dir)

  const results: string[] = []
  for (const relativePath of include) {
    const abs = path.join(dir, relativePath)
    if (!(await fs.pathExists(abs))) continue
    const stats = await fs.stat(abs)
    results.push(...(stats.isDirectory() ? await collectAll(abs) : [abs]))
  }
  return results
}

async function collectAll(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const results: string[] = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...(await collectAll(fullPath)))
    } else {
      results.push(fullPath)
    }
  }
  return results
}
