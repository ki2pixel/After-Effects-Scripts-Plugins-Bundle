---
name: Memory Bank Protocol
description: Protocol for managing memory bank system and context initialization
alwaysApply: true
---

# Memory Bank Protocol

## Overview

This protocol defines how the AI agent should interact with the memory bank system for maintaining context across conversations.

## System Rules

### Primary System
- **Memory Bank**: Use `memory-bank` as the primary system for context management

### Initialization Protocol

#### Trigger
- **When**: `first_interaction` 
- **Priority**: `immediate`
- **Required**: `true`

#### Actions Required
1. **Read and Internalize**: Before doing ANYTHING else, read and fully internalize ALL rules in this file.
2. **Check Directory**: Verify if `memory-bank/` directory exists in the workspace.
3. **Active State**: If memory-bank exists:
   - Read all core files: `productContext.md`, `activeContext.md`, `systemPatterns.md`, `decisionLog.md`, `progress.md`
   - Set status to `[MEMORY BANK: ACTIVE]`
   - Load context from memory-bank files
4. **Inactive State**: If memory-bank does NOT exist:
   - Inform user about missing memory bank
   - Ask to create with yes/no response choices
   - If yes: Create directory and core files with basic structure using available information
   - If no: Set status to `[MEMORY BANK: INACTIVE]`
5. **Proceed**: Continue with task execution or suggest 2-4 tasks based on memory-bank content if no specific task given

### Validation Requirements
- **Status Check**: Verify memory-bank status (ACTIVE/INACTIVE)
- **File Confirmation**: If ACTIVE, confirm all core files were successfully read
- **Context Loading**: Ensure memory-bank context is properly integrated

## System Validation

### Startup Checklist
- **Rules Loading**: Verify `.continue/rules/` are loaded and accessible
- **Memory Bank Access**: Check memory-bank directory availability if expected
- **Initialization Complete**: Confirm the entire initialization sequence completed successfully

## File Structure Standards

### Core Memory Bank Files
- `productContext.md`: Project scope, components, organization, standards
- `activeContext.md`: Current session state, goals, decisions, questions, blockers
- `systemPatterns.md`: Recurring patterns and standards (coding, architecture, testing)
- `decisionLog.md`: Technical decisions, architecture, implementation, alternatives
- `progress.md`: Work status tracking (completed, current, next, issues)

### Update Protocols

#### Memory Bank Updates
- **Frequency**: Update throughout chat session when significant changes occur
- **Decision Log**: Append new information with timestamp when architectural decisions are made
- **Progress**: Track task completion status and blockers
- **Context**: Update current focus and recent changes

#### Retention Policy
- **90-day retention**: Keep full detail for last 90 days in `decisionLog.md` and `progress.md`
- **Archive older**: Summarize older entries in active files and move to `memory-bank/archives/*.md`
- **Traceability**: Preserve complete traceability while keeping primary files concise

## Usage Guidelines

### When to Update Memory Bank
- **Significant Changes**: Architecture decisions, major refactors, technology choices
- **Context Changes**: When current focus changes or significant progress is made
- **Decision Recording**: When making important technical decisions with alternatives considered
- **Progress Tracking**: When tasks begin, complete, or change status

### Quality Standards
- **Timestamp Format**: `[YYYY-MM-DD HH:MM:SS] - [Summary]`
- **Concise Entries**: Keep descriptions focused and actionable
- **Cross-References**: Link related entries across files when relevant
- **Consistent Structure**: Maintain established file organization and formatting

### Status Prefix Requirement
- **Response Format**: Begin EVERY response with either `[MEMORY BANK: ACTIVE]` or `[MEMORY BANK: INACTIVE]`, according to the current state of the Memory Bank.

## Integration with Continue

### Automatic Application
- This rule is automatically applied due to `alwaysApply: true`
- Context from memory bank files is available during all AI interactions
- Protocol ensures consistent context management across sessions

### Manual Invocation
- Can be referenced explicitly: "Check memory bank for current project status"
- Useful for context refresh or when switching between different project aspects
- Supports targeted queries about specific memory bank sections

## Special Commands

### Update Memory Bank Command (UMB)
- **Trigger**: When user inputs `^(Update Memory Bank|UMB)$`
- **Instructions**:
  - **Halt Current Task**: Stop current activity
  - **Acknowledge Command**: Respond with `[MEMORY BANK: UPDATING]`
  - **Review Chat History**: Analyze the complete current chat session
- **Core Update Process**:
  1. **Current Session Review**: Analyze chat history for relevant decisions, context changes, progress updates, clarifications etc.
  2. **Comprehensive Updates**: Update relevant memory bank files based on the review, following the rules defined in memory bank updates section
  3. **Memory Bank Synchronization**: Ensure consistency across updated files
- **Task Focus**: During UMB, focus ONLY on capturing information explicitly present in the current chat session (clarifications, decisions, progress). Do NOT summarize the entire project or perform actions outside this scope.
- **Cross Mode Updates**: Capture relevant information from the chat session irrespective of conceptual modes mentioned, adding it to the appropriate Memory Bank files.
- **Post UMB Actions**:
  - State: Memory Bank fully synchronized based on current chat session
  - State: Session context preserved for continuation

## Context-Specific Rules

### Documentation Context
- **Trigger**: When the user's prompt explicitly asks a question about the project's 'documentation', 'docs', 'doc', 'guide', 'guidelines', 'API reference', or how a specific feature is documented
- **Instructions**:
  - Acknowledge that the user is asking a question specifically about the project's own documentation
  - Before answering, state clearly: "I will consult the project's internal documentation to answer your question."
  - Prioritize reading and analyzing the content of all files located in the `docs/` and root-level markdown files of the workspace. Pay special attention to `ARCHITECTURE_COMPLETE_FR.md`, `GUIDE_DEMARRAGE_RAPIDE.md`, and `REFERENCE_RAPIDE_DEVELOPPEURS.md`.
  - Formulate your answer based primarily on the information found in these documentation files.
  - If the documentation and the code seem to conflict, mention the conflict and ask the user for clarification, citing both sources.

### Coding and Architecture Context
- **Trigger**: When the user's prompt asks to generate, modify, refactor, or create code, or asks an architectural question. Keywords: create, write, implement, change, update, fix, debug, refactor, class, function, script, service, route, component, style, test, architecture, créer, crée, écrire, écris, implémenter, implémente, changer, change, modifier, modifie, mettre à jour, mets à jour, actualiser, actualise, corriger, corrige, réparer, répare, résoudre, résous, déboguer, débogue, refactoriser, refactorise, classe, fonction, composant, tester, teste
- **Instructions**:
  - Acknowledge that the user's request involves writing or changing code or discussing architecture
  - Before generating any code, state clearly: "I will adhere to the project's mandatory architectural and coding standards."
  - Prioritize reading and fully internalizing the content of the `.continue/rules/codingstandards.md` file. This file contains MANDATORY rules.
  - Formulate your code, explanation, and implementation plan based strictly on the principles found in `codingstandards.md`.
  - If the user's request seems to conflict with a rule in `codingstandards`, you MUST state the conflict, explain the rule from the document, and ask for clarification before proceeding.

---

**Note**: This protocol replaces the complex YAML structure with standard Continue rules format while maintaining all functionality and adding improved documentation clarity.
