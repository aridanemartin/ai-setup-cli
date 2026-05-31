<!-- GitHub Copilot reads only the first 4,000 characters of this file. Keep it concise. -->

## Repository context

<!-- Replace with 1-2 sentences describing what this repo does. -->

## Code quality

- Functions should be small and focused with a single responsibility
- Use clear, descriptive names for variables, functions, and classes
- Prefer early returns to reduce nesting
- No commented-out code in pull requests

## Security

- Never hardcode credentials, API keys, or tokens — use environment variables
- Validate and sanitize all user input before processing or persisting
- Use parameterized queries — never concatenate SQL strings
- Do not log sensitive data (passwords, tokens, full card numbers, PII)

## Error handling

- Handle errors at the boundary where they can be acted on
- Log failures with enough context to debug (operation, inputs, error message)
- Fail fast on invalid configuration — do not silently continue

## Documentation

- All public functions and methods must have doc comments
- Complex algorithms need an inline comment explaining the approach
- Keep the README up to date when changing public interfaces

## Review style

- Be concise and actionable — explain the *why* behind recommendations
- Flag security issues and potential data integrity problems first
- Call out N+1 queries and per-request synchronous network calls
