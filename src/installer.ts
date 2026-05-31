import fs from 'fs-extra'
import path from 'path'

export interface InstallOptions {
  dryRun: boolean
  onConflict: (filePath: string) => Promise<boolean>
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
  const files = await collectFiles(srcDir)
  const written: string[] = []
  const skipped: string[] = []

  for (const srcFile of files) {
    const relativePath = path.relative(srcDir, srcFile)
    const destFile = path.join(destDir, relativePath)

    if (options.dryRun) {
      written.push(relativePath)
      continue
    }

    if (await fs.pathExists(destFile)) {
      const overwrite = await options.onConflict(relativePath)
      if (!overwrite) {
        skipped.push(relativePath)
        continue
      }
    }

    await fs.ensureDir(path.dirname(destFile))
    await fs.copy(srcFile, destFile)
    written.push(relativePath)
  }

  return { written, skipped }
}

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const results: string[] = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...(await collectFiles(fullPath)))
    } else {
      results.push(fullPath)
    }
  }
  return results
}
