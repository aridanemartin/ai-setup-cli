<!-- TIP 3 — Coding Guidelines (security): Security rules apply to all files, so this rule
     has no paths frontmatter and loads unconditionally at every session. It gets its own
     file because: (a) it applies everywhere, (b) the stakes are high enough to deserve
     dedicated attention, and (c) it's easy to forget under deadline pressure. -->

# Security

- Never hardcode secrets, tokens, or API keys — use environment variables
- Validate all input at system boundaries (HTTP, CLI, file I/O)
- Use parameterized queries — never concatenate SQL strings
- Log errors with context but without sensitive data (no passwords, tokens, PII)
- Keep dependencies up to date; check `npm audit` before shipping
