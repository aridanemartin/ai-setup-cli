import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { installTool } from '../src/installer'
import { availableTools, detectedTools, sourceLayout } from '../src/tools'
import { parseGitHubSource, resolveSource } from '../src/source'
import fs from 'fs-extra'
import os from 'os'
import path from 'path'

describe('parseGitHubSource', () => {
  it('parses a full https URL', () => {
    expect(parseGitHubSource('https://github.com/aridanemartin/aridane-martin-ai-setup')).toEqual({
      owner: 'aridanemartin',
      repo: 'aridane-martin-ai-setup',
      ref: undefined,
    })
  })

  it('handles .git, /tree/<ref>, #ref and ssh remotes', () => {
    expect(parseGitHubSource('https://github.com/owner/repo.git')?.repo).toBe('repo')
    expect(parseGitHubSource('https://github.com/owner/repo/tree/dev')?.ref).toBe('dev')
    expect(parseGitHubSource('https://github.com/owner/repo#v1')?.ref).toBe('v1')
    expect(parseGitHubSource('git@github.com:owner/repo.git')).toEqual({
      owner: 'owner',
      repo: 'repo',
      ref: undefined,
    })
  })

  it('parses owner/repo shorthand', () => {
    expect(parseGitHubSource('owner/repo')).toEqual({ owner: 'owner', repo: 'repo', ref: undefined })
  })

  it('returns null for non-repository input', () => {
    expect(parseGitHubSource('not a repo')).toBeNull()
    expect(parseGitHubSource('')).toBeNull()
  })
})

describe('resolveSource', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ai-setup-source-'))
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('resolves an existing local directory', async () => {
    const resolved = await resolveSource(tmpDir)
    expect(resolved.kind).toBe('local')
    expect(resolved.dir).toBe(tmpDir)
  })

  it('rejects unknown input', async () => {
    await expect(resolveSource('definitely not a repo')).rejects.toThrow()
  })
})

describe('provider detection', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ai-setup-detect-'))
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('detects claude-code and github-copilot from markers', async () => {
    await fs.ensureDir(path.join(tmpDir, '.claude'))
    await fs.ensureDir(path.join(tmpDir, '.github'))
    expect(detectedTools(tmpDir).map((t) => t.id)).toEqual(['claude-code', 'github-copilot'])
  })

  it('finds nothing in an empty project', () => {
    expect(detectedTools(tmpDir)).toEqual([])
  })

  it('reads a root-layout source repo', async () => {
    await fs.ensureDir(path.join(tmpDir, '.claude'))
    await fs.ensureDir(path.join(tmpDir, '.github'))
    await fs.writeFile(path.join(tmpDir, 'AGENTS.md'), '# hi')
    await fs.writeFile(path.join(tmpDir, 'opencode.json'), '{}')

    expect(sourceLayout(tmpDir)).toBe('root')
    expect(availableTools(tmpDir).map((t) => t.id)).toEqual([
      'claude-code',
      'github-copilot',
      'opencode',
    ])
  })

  it('reads a providers/<id> source repo', async () => {
    await fs.ensureDir(path.join(tmpDir, 'providers', 'claude-code'))
    await fs.ensureDir(path.join(tmpDir, 'providers', 'devin'))

    expect(sourceLayout(tmpDir)).toBe('providers')
    expect(availableTools(tmpDir).map((t) => t.id)).toEqual(['claude-code', 'devin'])
  })
})

describe('installTool include + handled', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ai-setup-include-'))
    const src = path.join(tmpDir, 'src')
    await fs.ensureDir(path.join(src, 'sub'))
    await fs.ensureDir(path.join(src, 'other'))
    await fs.writeFile(path.join(src, 'config.md'), '# config')
    await fs.writeFile(path.join(src, 'sub', 'nested.md'), '# nested')
    await fs.writeFile(path.join(src, 'other', 'skip.md'), '# skip')
  })

  afterEach(async () => {
    await fs.remove(tmpDir)
  })

  it('installs only the included paths', async () => {
    const src = path.join(tmpDir, 'src')
    const dest = path.join(tmpDir, 'project')
    const result = await installTool(src, dest, {
      dryRun: false,
      include: ['config.md', 'sub'],
      onConflict: async () => true,
    })

    expect(result.written).toContain('config.md')
    expect(result.written).toContain(path.join('sub', 'nested.md'))
    expect(result.written).not.toContain(path.join('other', 'skip.md'))
    expect(await fs.pathExists(path.join(dest, 'other', 'skip.md'))).toBe(false)
  })

  it('skips handled files silently', async () => {
    const src = path.join(tmpDir, 'src')
    const dest = path.join(tmpDir, 'project')
    const result = await installTool(src, dest, {
      dryRun: false,
      include: ['config.md', 'sub'],
      handled: new Set(['config.md']),
      onConflict: async () => true,
    })

    expect(result.written).toEqual([path.join('sub', 'nested.md')])
    expect(result.skipped).toHaveLength(0)
    expect(await fs.pathExists(path.join(dest, 'config.md'))).toBe(false)
  })
})
