#!/usr/bin/env bash
# AfterTool hook — runs after every tool execution.
# Appends an audit log entry for every write_file call.
# Exit 0 always — this hook is audit-only.

INPUT=$(cat)
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.path // empty')

if [[ "$TOOL" == "write_file" && -n "$FILE_PATH" ]]; then
  echo "[$(date -u +%FT%TZ)] write_file: $FILE_PATH" >> .gemini/write.log
fi

exit 0
