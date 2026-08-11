# Plan

## Objective

Back up the reusable coding/logging conventions to a private GitHub repository, then integrate the logger into the real Google Apps Script project when its source and Sheet are available.

## Steps

- [x] **P1 — Confirm GitHub access.** Verify the authenticated account and private-repository permission.
- [x] **P2 — Define safe backup scope.** Back up code, conventions, schema, plan, and progress. Exclude live Sheet rows and credentials.
- [x] **P3 — Build reusable ErrorLog mechanism.** Create an idempotent tab initializer, central logger, context sanitization, concurrency lock, and local fallback.
- [ ] **P4 — Create and push private repository.** Commit the artifact and verify it from GitHub.
- [ ] **P5 — Inspect the real project.** Obtain the Apps Script source/repository and preserve its current Git/draft state.
- [ ] **P6 — Run baseline.** Reproduce the current build/test or manually exercise the Apps Script in a safe copy.
- [ ] **P7 — Integrate logging.** Patch `doPost`, `openById`, missing `Responses`, `ensureHeaders_`, `appendRow`, and `flatten_` paths without changing business rules.
- [ ] **P8 — Verify in Google Sheets.** Create `ErrorLog`, trigger one `info`, one recoverable warning, and one controlled error; verify five columns and sanitized context.
- [ ] **P9 — Finish handoff.** Update project instructions, progress, changelog, commit, and push.

## Current gate

P5–P9 require the real Apps Script source plus authorized access to the target Google Sheet or a safe test copy. No production Sheet mutation is permitted without that direct source and verification path.
