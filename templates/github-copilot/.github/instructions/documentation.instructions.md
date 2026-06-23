---
applyTo: "**/*.md,**/*.ts,**/*.tsx,**/*.js,**/*.jsx"
---

<!-- TIP 3 — Coding Guidelines (scoped): Documentation rules apply to source and markdown
     files. Scoping avoids loading these into context for config files, scripts, or other
     file types where they're irrelevant. -->

## Documentation conventions

- Document public APIs with JSDoc/TSDoc: purpose, params, returns, examples
- Keep README up to date with setup, architecture, and usage instructions
- Use inline comments for non-obvious logic, not for what the code already says
- Document breaking changes in CHANGELOG.md or release notes
