# System Patterns

## Coding Standards

### Adobe After Effects Scripting
- **Language**: ExtendScript/JSX for legacy compatibility
- **Python**: PyShiftAE for modern automation (Python 3.11+)
- **Naming**: camelCase for functions, PascalCase for classes
- **Documentation**: Inline comments for complex operations

### File Organization
- **Scripts**: Organized by functionality in Scripts_AE/
- **Frameworks**: Separate directories for major tools
- **Documentation**: Centralized in docs/ directory
- **Configuration**: .windsurf/ for development workflows

## Architecture Patterns

### Script Development
- Modular design with single responsibility principle
- Error handling with user-friendly messages
- Version compatibility checks for AE versions
- Resource cleanup and memory management

### Python Integration
- Bridge patterns for AE-Python communication
- Async operations for long-running tasks
- Type hints for better code documentation
- Exception handling for AE API calls

## Testing Patterns

## Deployment Patterns

## Development Workflow

---
*Last updated: 2025-02-06*
