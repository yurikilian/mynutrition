#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DB_PATH="${1:-$REPO_ROOT/.codex/history/history.db}"

mkdir -p "$(dirname "$DB_PATH")"

sqlite3 "$DB_PATH" <<'SQL'
PRAGMA journal_mode = DELETE;

CREATE TABLE IF NOT EXISTS history_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  source TEXT NOT NULL,
  event_type TEXT NOT NULL,
  ref TEXT,
  summary TEXT NOT NULL,
  details TEXT
);

CREATE INDEX IF NOT EXISTS idx_history_events_created_at
  ON history_events (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_history_events_event_type
  ON history_events (event_type);

CREATE UNIQUE INDEX IF NOT EXISTS idx_history_events_commit_ref
  ON history_events (event_type, ref)
  WHERE event_type = 'commit' AND ref IS NOT NULL;
SQL

echo "SQLite history tracker initialized at: $DB_PATH"
