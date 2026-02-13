---
name: commit-push
description: Commit changes to the current branch and push to remote
invokable: true
---

# Commit & Push (Current Branch)

Commits changes and pushes to remote.

## Prerequisites

- Changed files exist
- Remote `origin` is configured

## Execution Steps (Non-Interactive)

1. Run quality checks as needed (lint / test / build, etc.)
2. Stage changes (`git add -A`)
3. Commit (use message from argument or environment variable)
4. Push (`git push -u origin <current-branch>`)

## Usage

### A) Safe Batch Execution (Message Argument Version)

```bash
MSG="<Prefix>: <Summary (imperative/concise)>" \
BRANCH=$(git branch --show-current) && \
# Optional quality checks (if needed)
# ./scripts/lint.sh && ./scripts/test.sh && ./scripts/build.sh || exit 1
git add -A && \
git commit -m "$MSG" && \
git push -u origin "$BRANCH"
```

Example:

```bash
MSG="fix: Remove unnecessary debug log output" \
BRANCH=$(git branch --show-current) && \
git add -A && git commit -m "$MSG" && git push -u origin "$BRANCH"
```

### B) Step Execution (Readability Focused)

```bash
# 1) Get current branch
BRANCH=$(git branch --show-current)

# 2) Optional local quality checks (add as needed)
# echo "Running quality checks..."
# ./scripts/lint.sh && ./scripts/test.sh && ./scripts/build.sh || exit 1

# 3) Stage changes
git add -A

# 4) Commit (edit message)
git commit -m "<Prefix>: <Summary (imperative/concise)>"

# 5) Push
git push -u origin "$BRANCH"
```

## Notes

- Follow the commit message format and message generation principles in `.continue/rules/commit-message-format.md`.
- Recommended to run `git status` or `git diff` to review diffs before execution.