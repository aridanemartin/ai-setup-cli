# Security

- Never hardcode secrets, tokens, or API keys — use environment variables
- Validate all input at system boundaries (HTTP, CLI, file I/O)
- Use parameterized queries — never concatenate SQL strings
- Log errors with context but without sensitive data (no passwords, tokens, PII)
- Keep dependencies up to date; check `npm audit` before shipping
