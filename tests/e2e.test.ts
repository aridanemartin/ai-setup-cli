import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { installTool } from '../src/installer'
import { toolTemplateDir, TOOLS } from '../src/tools'
import fs from 'fs-extra'
import os from 'os'
import path from 'path'

describe('e2e: real templates', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ai-setup-e2e-'))
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  for (const tool of TOOLS) {
    it(`installs ${tool.label} template files`, async () => {
      const srcDir = toolTemplateDir(tool.id)
      const result = await installTool(srcDir, tmpDir, {
        dryRun: false,
        onConflict: async () => true,
      })

      expect(result.written.length).toBeGreaterThan(0)
      expect(result.skipped).toHaveLength(0)

      // Verify at least one expected file exists
      const writtenFiles = result.written
      expect(writtenFiles.length).toBeGreaterThan(0)
    })
  }

  it('dry-run lists files without writing them', async () => {
    const srcDir = toolTemplateDir('claude-code')
    const result = await installTool(srcDir, tmpDir, {
      dryRun: true,
      onConflict: async () => true,
    })

    expect(result.written.length).toBeGreaterThan(0)
    // tmpDir should be empty (dry run)
    const entries = await fs.readdir(tmpDir)
    expect(entries).toHaveLength(0)
  })

  it('conflict handling skips existing files', async () => {
    const srcDir = toolTemplateDir('claude-code')
    // First install
    await installTool(srcDir, tmpDir, { dryRun: false, onConflict: async () => true })
    // Second install - skip all conflicts
    const result = await installTool(srcDir, tmpDir, { dryRun: false, onConflict: async () => false })

    expect(result.skipped.length).toBeGreaterThan(0)
    expect(result.written).toHaveLength(0)
  })
})
