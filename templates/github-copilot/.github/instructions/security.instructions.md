---
applyTo: "**"
---

<!-- TIP 3 — Coding Guidelines (security): Security rules apply to all files, hence applyTo
     "**". It deserves its own file because the stakes are high and security concerns are easy
     to overlook under deadline pressure. Separating it makes it harder to accidentally remove
     or bury these rules when editing other conventions. -->

## Security conventions

- No hardcoded secrets, API keys, or passwords — use environment variables
- Validate and sanitize all user input before processing
- Use parameterised queries for database operations — never concatenate SQL
- Set secure headers on HTTP responses (CSP, HSTS, X-Frame-Options)
- Keep dependencies up to date; audit regularly with `npm audit`
