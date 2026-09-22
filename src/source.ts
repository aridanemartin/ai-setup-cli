import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import { execFile } from 'child_process'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

export interface GitHubRef {
  owner: string
  repo: string
  ref?: string
}

export interface ResolvedSource {
  dir: string
  kind: 'local' | 'remote'
  label: string
  cleanup: () => Promise<void>
}

/**
 * Parses GitHub sources in the shapes users actually paste:
 *   https://github.com/owner/repo
 *   https://github.com/owner/repo.git
 *   https://github.com/owner/repo/tree/<ref>
 *   git@github.com:owner/repo.git
 *   owner/repo
 *   ...any of the above with `#<ref>`
 */
export function parseGitHubSource(input: string): GitHubRef | null {
  let value = input.trim()
  if (!value) return null

  if (value.startsWith('git@github.com:')) {
    value = `https://github.com/${value.slice('git@github.com:'.length)}`
  }

  let ref: string | undefined
  const hashIndex = value.lastIndexOf('#')
  if (hashIndex !== -1) {
    ref = value.slice(hashIndex + 1) || undefined
    value = value.slice(0, hashIndex)
  }
  value = value.replace(/\/+$/, '')

  const urlMatch = value.match(
    /^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+?)(?:\.git)?(?:\/tree\/(.+))?$/
  )
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2], ref: ref ?? urlMatch[3] }
  }

  const shortMatch = value.match(/^([\w.-]+)\/([\w.-]+?)$/)
  if (shortMatch) return { owner: shortMatch[1], repo: shortMatch[2], ref }

  return null
}

export async function resolveSource(input: string): Promise<ResolvedSource> {
  const asPath = path.resolve(input)
  if (await fs.pathExists(asPath)) {
    const stats = await fs.stat(asPath)
    if (!stats.isDirectory()) {
      throw new Error(`Source is not a directory: ${asPath}`)
    }
    return { dir: asPath, kind: 'local', label: asPath, cleanup: async () => {} }
  }

  const gh = parseGitHubSource(input)
  if (!gh) {
    throw new Error(
      `Could not understand source "${input}".\n` +
        'Pass a local path or a GitHub repository, e.g. https://github.com/owner/repo'
    )
  }

  const { dir, cleanup } = await downloadGitHub(gh)
  return { dir, kind: 'remote', label: `${gh.owner}/${gh.repo}`, cleanup }
}

async function downloadGitHub(gh: GitHubRef): Promise<{ dir: string; cleanup: () => Promise<void> }> {
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'ai-setup-src-'))
  const cleanup = async () => {
    await fs.remove(tmp)
  }
  const extractDir = path.join(tmp, 'repo')
  await fs.ensureDir(extractDir)

  const refs = gh.ref ? [gh.ref] : ['main', 'master']
  let lastError: unknown

  for (const ref of refs) {
    const url = `https://codeload.github.com/${gh.owner}/${gh.repo}/tar.gz/${ref}`
    try {
      const res = await fetch(url, { redirect: 'follow' })
      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status} for ${url}`)
        continue
      }
      const tarball = path.join(tmp, 'source.tgz')
      await fs.writeFile(tarball, Buffer.from(await res.arrayBuffer()))
      await execFileAsync('tar', ['-xzf', tarball, '-C', extractDir, '--strip-components=1'])
      return { dir: extractDir, cleanup }
    } catch (err) {
      lastError = err
    }
  }

  // Fallback for environments without a usable `tar`.
  try {
    await fs.emptyDir(extractDir)
    const args = ['clone', '--depth', '1']
    if (gh.ref) args.push('--branch', gh.ref)
    args.push(`https://github.com/${gh.owner}/${gh.repo}.git`, extractDir)
    await execFileAsync('git', args)
    return { dir: extractDir, cleanup }
  } catch (err) {
    await cleanup()
    const reason = lastError instanceof Error ? lastError.message : String(lastError ?? err)
    throw new Error(`Failed to download ${gh.owner}/${gh.repo}: ${reason}`)
  }
}
