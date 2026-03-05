#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$REPO_ROOT"

COMMIT_HASH="$(git rev-parse HEAD)"
PARENT_HASH="$(git rev-parse HEAD^ 2>/dev/null || true)"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
SUBJECT="$(git log -1 --pretty=%s)"
AUTHOR_NAME="$(git log -1 --pretty=%an)"
AUTHOR_EMAIL="$(git log -1 --pretty=%ae)"
COMMITTED_AT="$(git log -1 --pretty=%cI)"

DETAILS="author=${AUTHOR_NAME} <${AUTHOR_EMAIL}>; branch=${BRANCH}; committed_at=${COMMITTED_AT}; parent=${PARENT_HASH:-none}"

"$SCRIPT_DIR/log.sh" "git" "commit" "$SUBJECT" "$COMMIT_HASH" "$DETAILS"
