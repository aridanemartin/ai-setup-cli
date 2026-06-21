#!/usr/bin/env bash
# PostToolUse hook — appends an audit log entry for every file write.
# Receives JSON on stdin; exit 0 always (audit-only).

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ -n "$FILE_PATH" ]]; then
  echo "[$(date -u +%FT%TZ)] $TOOL: $FILE_PATH" >> .codex/write.log
fi

exit 0