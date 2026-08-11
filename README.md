# Vibe Coding Operations Backup

Private backup for Đại ca's coding conventions, execution plan, handoff state, and reusable Google Apps Script logging mechanism.

## Scope

This repository stores:

- The canonical Vibe Coding rules used by the AI.
- A reusable `ErrorLog` mechanism for Google Apps Script.
- Mandatory conventions for continuous, investigation-ready logging.
- `PLAN.md` and `PROGRESS.md` so work can be handed between AI sessions without guessing.

This repository does **not** store live Google Sheet rows, tokens, cookies, credentials, or unfiltered payloads. Actual Sheet data remains in Google Workspace until a separate backup scope and access method are approved.

## Files

- `VIBECODING.md`: global coding rules.
- `AGENT_NOTES.md`: project-level instructions every AI must follow.
- `PLAN.md`: approved implementation plan.
- `PROGRESS.md`: verified state and next step.
- `BACKUP_POLICY.md`: what may and may not be pushed to GitHub.
- `apps-script/Logging.gs`: reusable central logger and `ErrorLog` tab initializer.
- `apps-script/IntegrationExample.gs`: integration patterns; adapt them to the real project rather than deploying verbatim.

## ErrorLog schema

| Timestamp | Level | Function | Message | Context |
|---|---|---|---|---|
| `Date` | `info` / `warn` / `error` | Function or component | Specific event/error | Sanitized JSON or string |

## Integration

1. Copy `apps-script/Logging.gs` into the existing Apps Script project.
2. Run `setupErrorLog_()` once from the Apps Script editor.
3. Add `logError_()` calls at external boundaries and every relevant `catch`.
4. Ensure `doPost()` logs before returning `{ok:false}`.
5. Test only in a safe Sheet/project copy first.
6. Record the real result in `PROGRESS.md`.

The current repository is a backup and reusable mechanism. It is not proof that the real Google Sheet has already been modified.
