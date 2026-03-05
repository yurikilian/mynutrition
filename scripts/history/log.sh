#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DB_PATH="$REPO_ROOT/.codex/history/history.db"

SOURCE="${1:-manual}"
EVENT_TYPE="${2:-note}"
SUMMARY="${3:-}"
REF_VALUE="${4:-}"
DETAILS="${5:-}"

if [[ -z "$SUMMARY" ]]; then
  echo "Usage: $0 <source> <event_type> <summary> [ref] [details]" >&2
  exit 1
fi

"$SCRIPT_DIR/init.sh" "$DB_PATH" >/dev/null

escape_sql() {
  printf '%s' "$1" | sed "s/'/''/g"
}

SOURCE_ESCAPED="$(escape_sql "$SOURCE")"
EVENT_TYPE_ESCAPED="$(escape_sql "$EVENT_TYPE")"
SUMMARY_ESCAPED="$(escape_sql "$SUMMARY")"
REF_ESCAPED="$(escape_sql "$REF_VALUE")"
DETAILS_ESCAPED="$(escape_sql "$DETAILS")"

sqlite3 "$DB_PATH" <<SQL
INSERT OR IGNORE INTO history_events (source, event_type, ref, summary, details)
VALUES ('$SOURCE_ESCAPED', '$EVENT_TYPE_ESCAPED', '$REF_ESCAPED', '$SUMMARY_ESCAPED', '$DETAILS_ESCAPED');
SQL

echo "Logged event: [$EVENT_TYPE] $SUMMARY"
