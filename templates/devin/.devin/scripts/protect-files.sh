#!/usr/bin/env bash
# Blocks Cascade from editing sensitive files.
# Exit 2 = block the action. Exit 0 = allow.

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_info.file_path // empty')

PROTECTED=(".env" ".env.local" ".env.production" "package-lock.json")

for pattern in "${PROTECTED[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "Blocked: $FILE_PATH matches protected pattern '$pattern'" >&2
    exit 2
  fi
done

exit 0
