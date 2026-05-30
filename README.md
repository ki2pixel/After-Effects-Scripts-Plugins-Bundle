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
2. Use `/enhance` for context-aware development
3. Check `/test-migration` for validation

## Architecture

Hybrid 2.0 architecture: CEP panels → PyShiftBridge → PyShiftAE → AETK → AE SDK

## Documentation

- `docs/` - Complete documentation ecosystem
