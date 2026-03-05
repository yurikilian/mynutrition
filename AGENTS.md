# AGENTS.md

## Repository Workflow
- Use `pnpm` for all package and script operations.
- Run `pnpm lint` and `pnpm build` before creating commits.
- Keep commits focused and avoid rewriting unrelated files.
- Do not add `Co-authored-by` git commit trailers unless explicitly requested.

## Codex History Tracker (SQLite)
- Tracker database path: `.codex/history/history.db`.
- Initialize schema: `pnpm history:init`.
- Read latest entries: `pnpm history:tail`.
- Manual event log (optional):
  - `bash scripts/history/log.sh codex note "your summary" "optional-ref" "optional-details"`

## Automatic Commit Tracking
- A versioned git hook is provided in `.githooks/post-commit`.
- This hook appends commit metadata into `.codex/history/history.db` after each commit.
- Local hook activation command:
  - `git config core.hooksPath .githooks`

## Notes
- Keep `.codex/history/history.db` in the repository for historical references.
- If schema changes are needed, update `scripts/history/init.sh` and re-run `pnpm history:init`.
