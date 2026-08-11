# Mandatory Agent Notes

Read `VIBECODING.md`, `PLAN.md`, and `PROGRESS.md` before changing code.

## Stay on plan

- Work only on the current step in `PLAN.md`.
- State the step, completion condition, and verification command before editing.
- If new work appears outside scope, record it and request a decision before expanding the plan.
- Update `PROGRESS.md` after every verified step.

## Continuous logging

Every new function or change that crosses a failure boundary must leave an investigation-ready trace. Boundaries include:

- API calls and webhooks.
- Google Apps Script entry points such as `doGet` and `doPost`.
- Parsing external input.
- Reading or writing Sheets, files, databases, or external services.
- Uploads, migrations, deployments, and background jobs.

Required behavior:

1. Use `info` for meaningful start/success milestones, `warn` for recoverable anomalies, and `error` for failures/exceptions.
2. Every relevant `catch` calls `logError_(functionName, message, level, context)`.
3. The backend logs an `error` before returning a failure result such as `{ok:false}`.
4. Log messages identify the actual operation and failure. Never write only “an error occurred”.
5. Context is minimal, sanitized, bounded in size, and contains no secret or unnecessary personal data.
6. If the logger fails, it falls back to the Apps Script execution log and does not throw recursively.
7. Do not log every line or pure helper call. Log boundaries and milestones that help reproduce or investigate behavior.

## Completion report

Record:

- Plan step completed.
- Files changed.
- Test/build/lint commands and real output.
- Logs verified.
- Commit or remaining diff.
- Known risks and next step.
