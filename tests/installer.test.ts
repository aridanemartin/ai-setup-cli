import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { installTool } from '../src/installer'
import fs from 'fs-extra'
import os from 'os'
import path from 'path'

describe('installTool', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ai-setup-test-'))
    // Create a minimal fake template so tests don't depend on real templates
    await fs.ensureDir(path.join(tmpDir, '_templates', 'fake-tool'))
    await fs.writeFile(
      path.join(tmpDir, '_templates', 'fake-tool', 'config.md'),
      '# Fake Config'
    )
    await fs.ensureDir(path.join(tmpDir, '_templates', 'fake-tool', 'sub'))
    await fs.writeFile(
      path.join(tmpDir, '_templates', 'fake-tool', 'sub', 'nested.md'),
      '# Nested'
    )
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('copies all template files to destDir', async () => {
    const srcDir = path.join(tmpDir, '_templates', 'fake-tool')
    const destDir = path.join(tmpDir, 'project')
    await fs.ensureDir(destDir)

    const result = await installTool(srcDir, destDir, {
      dryRun: false,
      onConflict: async () => true,
    })

    expect(result.written).toContain('config.md')
    expect(result.written).toContain(path.join('sub', 'nested.md'))
    expect(result.skipped).toHaveLength(0)
    expect(await fs.pathExists(path.join(destDir, 'config.md'))).toBe(true)
    expect(await fs.pathExists(path.join(destDir, 'sub', 'nested.md'))).toBe(true)
  })

  it('skips existing files when onConflict returns false', async () => {
    const srcDir = path.join(tmpDir, '_templates', 'fake-tool')
    const destDir = path.join(tmpDir, 'project')
    await fs.ensureDir(destDir)
    await fs.writeFile(path.join(destDir, 'config.md'), 'existing content')

    const result = await installTool(srcDir, destDir, {
      dryRun: false,
      onConflict: async () => false,
    })

    expect(result.skipped).toContain('config.md')
    expect(await fs.readFile(path.join(destDir, 'config.md'), 'utf-8')).toBe('existing content')
  })

  it('overwrites existing files when onConflict returns true', async () => {
    const srcDir = path.join(tmpDir, '_templates', 'fake-tool')
    const destDir = path.join(tmpDir, 'project')
    await fs.ensureDir(destDir)
    await fs.writeFile(path.join(destDir, 'config.md'), 'old content')

    const result = await installTool(srcDir, destDir, {
      dryRun: false,
      onConflict: async () => true,
    })

    expect(result.written).toContain('config.md')
    expect(await fs.readFile(path.join(destDir, 'config.md'), 'utf-8')).toBe('# Fake Config')
  })

  it('reports files as written without writing them in dry-run mode', async () => {
    const srcDir = path.join(tmpDir, '_templates', 'fake-tool')
    const destDir = path.join(tmpDir, 'project')
    await fs.ensureDir(destDir)

    const result = await installTool(srcDir, destDir, {
      dryRun: true,
      onConflict: async () => true,
    })

    expect(result.written.length).toBeGreaterThan(0)
    expect(await fs.pathExists(path.join(destDir, 'config.md'))).toBe(false)
  })

  it('calls onConflict only for files that already exist', async () => {
    const srcDir = path.join(tmpDir, '_templates', 'fake-tool')
    const destDir = path.join(tmpDir, 'project')
    await fs.ensureDir(destDir)
    await fs.writeFile(path.join(destDir, 'config.md'), 'existing')

    const conflictedFiles: string[] = []
    await installTool(srcDir, destDir, {
      dryRun: false,
      onConflict: async (filePath) => {
        conflictedFiles.push(filePath)
        return false
      },
    })

    expect(conflictedFiles).toEqual(['config.md'])
  })
})
