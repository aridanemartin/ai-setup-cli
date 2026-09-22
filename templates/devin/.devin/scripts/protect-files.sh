#!/usr/bin/env bash
# Blocks Devin from editing sensitive files.
# Devin passes the hook payload as JSON on stdin.
# Exit 2 = block the action. Exit 0 = allow.
# Docs: https://docs.devin.ai/cli/extensibility/hooks/lifecycle-hooks

INPUT=$(cat)
FILE_PATH=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty')

PROTECTED=(".env" ".env.local" ".env.production" "package-lock.json")

for pattern in "${PROTECTED[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    printf 'Blocked: %s matches protected pattern "%s"\n' "$FILE_PATH" "$pattern" >&2
    exit 2
  fi
done

exit 0
