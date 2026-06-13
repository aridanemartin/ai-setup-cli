#!/usr/bin/env bash
# BeforeTool hook — runs before every tool call.
# Blocks write_file calls on protected files.
# Exit 2 = block the tool call. Exit 0 = allow.

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.path // empty')

PROTECTED=(
  ".env"
  ".env.local"
  ".env.production"
  "package-lock.json"
)

if [[ "$TOOL" == "write_file" ]]; then
  for pattern in "${PROTECTED[@]}"; do
    if [[ "$FILE_PATH" == *"$pattern"* ]]; then
      echo "Blocked: write_file on protected file '$FILE_PATH'" >&2
      exit 2
    fi
  done
fi

exit 0
