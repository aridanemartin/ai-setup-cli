#!/usr/bin/env bash
# Appends every edited file path to .devin/write.log as a lightweight audit trail.
# Devin passes the hook payload as JSON on stdin and sets DEVIN_PROJECT_DIR.
# Docs: https://docs.devin.ai/cli/extensibility/hooks/lifecycle-hooks

INPUT=$(cat)
FILE_PATH=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty')

if [[ -n "$FILE_PATH" ]]; then
  LOG_FILE="${DEVIN_PROJECT_DIR:-.}/.devin/write.log"
  printf '[%s] edited: %s\n' "$(date -u +%FT%TZ)" "$FILE_PATH" >> "$LOG_FILE"
fi

exit 0
