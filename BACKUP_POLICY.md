# Backup Policy

## Stored in private GitHub

- Apps Script source code.
- Logging mechanism and Sheet schema.
- Project instructions, plans, progress, changelog, and runbooks.
- Sanitized examples and test fixtures containing synthetic data only.

## Never stored in GitHub

- Google OAuth tokens or client-secret files.
- Passwords, API keys, cookies, session identifiers, authorization headers, or webhook secrets.
- `.env` files.
- Unfiltered webhook/request payloads.
- Live Google Sheet rows containing personal, customer, assessment, or operational data.
- Exports whose sharing and retention rules have not been approved.

## Live Sheet backup

GitHub is a code and documentation backup, not the default backup target for live spreadsheet records. Use Google Drive version history and controlled copies/exports for Sheet data. A separate data-export workflow requires:

1. The target Sheet ID and owner approval.
2. Data classification and retention period.
3. A private, encrypted destination appropriate for personal data.
4. A restore test.
5. Confirmation that the export excludes or protects sensitive columns.

Until those conditions are met, this repository stores only code and structure.
