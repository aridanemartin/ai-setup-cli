import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['cjs'],
  target: 'node18',
  outDir: 'dist',
  clean: true,
  bundle: true,
  noExternal: ['@clack/prompts', '@clack/core'],
  banner: { js: '#!/usr/bin/env node' },
})
