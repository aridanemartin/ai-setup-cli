#!/usr/bin/env bash
# Blocks Claude from editing sensitive files.
# Exit 2 = block the tool use. Exit 0 = allow.

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

PROTECTED_FILES=(".env" ".env.local" ".env.production" "package-lock.json" ".git/")

for pattern in "${PROTECTED_FILES[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $FILE_PATH matches protected pattern '$pattern'" >&2
    exit 2
  fi
done

if [[ "$COMMAND" == *"rm -rf"* ]]; then
  echo "Blocked: rm -rf detected in command" >&2
  exit 2
fi

exit 0
