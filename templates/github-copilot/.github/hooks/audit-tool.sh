#!/usr/bin/env bash
# postToolUse hook — appends an audit log entry for every file write.
# Receives JSON on stdin; exit 0 always (audit-only).

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.toolName // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.toolArgs.filePath // .toolArgs.path // .toolArgs.file_path // empty')

if [[ -n "$FILE_PATH" ]]; then
  echo "[$(date -u +%FT%TZ)] $TOOL: $FILE_PATH" >> .github/write.log
fi

exit 0
