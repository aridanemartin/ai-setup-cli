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
   * Absolute destination paths already written earlier in the same run. Skipped silently
   * so a file shared by several providers (e.g. `AGENTS.md` in a project root) is only
   * offered/installed once. `installTool` reads and updates this set itself.
   */
  handled?: Set<string>
  /**
   * Rewrites a source-relative path to its destination-relative path. Return `null`
   * to omit the file entirely (e.g. project-only files when installing globally).
   * Defaults to copying paths unchanged.
   */
  mapPath?: (relativePath: string) => string | null
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
    const destRelative = options.mapPath ? options.mapPath(relativePath) : relativePath

    // No global/local destination for this file — omit it silently.
    if (destRelative === null) continue

    const destFile = path.join(destDir, destRelative)
    if (options.handled?.has(destFile)) continue

    if (options.dryRun) {
      options.handled?.add(destFile)
      written.push(destRelative)
      continue
    }

    if (await fs.pathExists(destFile)) {
      const overwrite = await options.onConflict(destRelative)
      if (!overwrite) {
        skipped.push(destRelative)
        continue
      }
    }

    await fs.ensureDir(path.dirname(destFile))
    await fs.copy(srcFile, destFile)
    options.handled?.add(destFile)
    written.push(destRelative)
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
