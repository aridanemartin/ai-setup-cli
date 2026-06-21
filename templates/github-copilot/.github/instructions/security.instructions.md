## Security conventions

- No hardcoded secrets, API keys, or passwords — use environment variables
- Validate and sanitize all user input before processing
- Use parameterised queries for database operations — never concatenate SQL
- Set secure headers on HTTP responses (CSP, HSTS, X-Frame-Options)
- Keep dependencies up to date; audit regularly with `npm audit`