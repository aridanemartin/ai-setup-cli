---
description: Generate or update documentation for a file or function
allowed-tools: Read, Edit, Write
---

Generate clear, concise documentation for: `$ARGUMENTS`

Rules:
- Public functions and classes get a one-line doc comment explaining WHAT and WHY, not HOW
- Do not restate the function signature in prose
- Skip obvious parameters — only document ones with non-obvious constraints or side effects
- Do not add comments to private/internal helpers unless the logic is genuinely surprising
- Update the relevant section of README.md if the public interface changed

Read the target file first, then apply documentation inline.
