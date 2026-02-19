---
name: memorybankprotocol
description: Memory Bank Protocol (Version Fast-Filesystem MCP-Optimized)
alwaysApply: true
---

# Memory Bank Protocol (Version Fast-Filesystem MCP-Optimized)

## Overview
This protocol defines the mandatory cycle of life for project context. It uses the `fast-filesystem` MCP server to minimize token noise while maintaining surgical precision in documentation.

**Windsurf is now in 'Token-Saver' mode. Minimize context usage by using tools instead of pre-loading.**

## 1. Selective Initialization Protocol
### Trigger: `first_interaction` | Priority: `immediate` | Required: `true`

**Actions Required:**
1. **Start with MCP Pull:** Call `mcp0_fast_read_file(path="/home/kidpixel/kimi-proxy/memory-bank/activeContext.md")`.
2. **Internalize Status:** Verify blockers, current focus, and next steps.
3. **Strict Constraint:** Do NOT load `productContext.md` or `systemPatterns.md` unless the task specifically requires architectural or strategic depth.
4. **Prefix Requirement:** Begin the response with `[MEMORY BANK: ACTIVE (MCP-PULL)]`.
5. **Fault Tolerance (Fallback):** If `mcp0_fast_read_file` fails ("server not found"), state that the fast-filesystem MCP is unavailable and proceed without context.
6. **Prohibition:** Never load more than one file at a time.
7. **Locking Instruction:** ALWAYS use absolute paths for memory-bank files in `/home/kidpixel/kimi-proxy/memory-bank/`. Use EXCLUSIVELY the fast-filesystem MCP tools (mcp0_fast_*). Do NOT attempt to read memory-bank files via regular filesystem tools (read_file).

---

## 2. File Structure & Responsibilities
Access these via `mcp0_fast_read_file`, `mcp0_fast_edit_block`, or `mcp0_fast_list_directory` using absolute paths in `/home/kidpixel/kimi-proxy/memory-bank/`.

-   **`productContext.md`**: Project scope, goals, and standards.
-   **`activeContext.md`**: Current session state, active decisions, and blockers.
-   **`systemPatterns.md`**: Recurring patterns (coding, architecture, testing).
-   **`decisionLog.md`**: Technical decisions, implementations, and alternatives.
-   **`progress.md`**: Work status tracking (completed, current, next, issues).

---

## 3. Update & Quality Standards (Mandatory)

### Update Protocol
-   **Frequency:** Update at the end of a task or via the `UMB` command.
-   **Timestamp Format:** `[YYYY-MM-DD HH:MM:SS] - [Summary]` (Required for every log entry).
-   **Conciseness:** Keep entries focused and actionable.
-   **Cross-References:** Link related entries across files to maintain a logical web.

### Retention Policy
-   **90-day Detail:** Keep full details for the last 90 days in `decisionLog.md` and `progress.md`.
-   **Archiving:** Summarize older entries and move them to `memory-bank/archives/*.md`.
-   **Archiving Tool:** Use `mcp0_fast_write_file(path="/home/kidpixel/kimi-proxy/memory-bank/archives/...")` to archive old entries. Never delete data without archiving via this tool first.
-   **Creation Restriction:** `mcp0_fast_write_file` is only for initialization (creation of the 5 base files) or archiving. Interdiction de créer de nouveaux types de fichiers à la racine de `memory-bank/` sans autorisation.
-   **Traceability:** Ensure the archive path is mentioned in the active file.

---

## 4. Context-Specific Rules

### A. Documentation Context
-   **Trigger:** Questions about 'docs', 'guides', 'guidelines', or 'API reference'.
-   **Instruction:** Before answering, state: *"I will consult the project's internal documentation."*
-   **Priority Pull:** Read `docs/` and root markdown files (e.g., `README.md`).
-   **Conflict Resolution:** If code and docs conflict, cite both and ask for clarification.

### B. Coding & Architecture Context
-   **Trigger:** Requests to generate, modify, refactor code, or architectural questions.
-   **Instruction:** State: *"I will adhere to the project's mandatory architectural and coding standards."*
-   **Selective Pull:** Immediately call `read_file` for `.windsurf/rules/codingstandards.md`.
-   **Constraint:** Formulate the plan based **strictly** on the principles found in the standards.

---

## 5. Special Command: Update Memory Bank (UMB)
-   **Trigger:** User inputs `^(Update Memory Bank|UMB)$`.
-   **Process:**
    1.  **Halt:** Stop current activity.
    2.  **Acknowledge:** Respond with `[MEMORY BANK: UPDATING]`.
    3.  **Audit:** Review current chat for decisions, changes, or clarifications.
    4.  **Sync:** Call `mcp0_fast_edit_block` on relevant files (usually `progress.md` and `activeContext.md`).
    5.  **Clean:** Do NOT summarize the entire project history, only the *current session's* deltas.

---

## 6. Observability & Dashboard Triggers
To assist the Kimi Proxy monitoring, explicitly state your intent during pulls:
-   *"Initiating Pre-Flight Validation (Pulling activeContext)..."*
-   *"Pulling architectural patterns for coding task..."*
-   *"Synchronizing memory bank (UMB mode)..."*