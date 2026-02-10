# After Effects Scripts & Plugins Bundle

Collection of Adobe After Effects automation tools and scripts with modern development workflows.

## Project Overview

- **Scripts_AE/**: Main collection of AE scripts (405+ items)
- **PyShiftAE/**: Python automation framework
- **PyShiftBridge/**: Bridge for Python-AE integration
- **AETK-main/**: After Effects Toolkit
- **GridCloner-CEP/**: CEP panel for grid cloning
- **docs/**: Documentation and guides

## Tech Stack

- **Runtimes**: PyShiftAE (Python 3.11+), ExtendScript/JSX (ES3)
- **Bridges**: CEP ↔ PyInterface or Mailbox JSON fallback
- **SDKs**: After Effects SDK via AETK wrappers
- **Testing**: pytest for Python, manual testing for AE integration

## Quick Start

1. Install Sixth environment
2. Follow migration guide in `docs/sixth-integration.md`
3. Use `/enhance` for context-aware development
4. Check `/test-migration` for validation

## Architecture

Hybrid 2.0 architecture: CEP panels → PyShiftBridge → PyShiftAE → AETK → AE SDK

## Documentation

- `docs/` - Complete documentation ecosystem
- `docs/sixth-integration.md` - Migration and setup guide
- `.sixthskills/*/SKILL.md` - Specialized expertise guides
