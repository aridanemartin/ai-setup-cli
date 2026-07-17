#!/usr/bin/env bash
# preToolUse hook — blocks writes to sensitive files.
# Non-zero exit (other than 2) denies the tool call; exit 0 allows.

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.toolName // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.toolArgs.filePath // .toolArgs.path // .toolArgs.file_path // empty')

PROTECTED=(
  ".env"
  ".env.local"
  ".env.production"
  "package-lock.json"
  ".git/"
)

for pattern in "${PROTECTED[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $TOOL on protected file '$FILE_PATH'" >&2
    exit 1
  fi
done

exit 0
