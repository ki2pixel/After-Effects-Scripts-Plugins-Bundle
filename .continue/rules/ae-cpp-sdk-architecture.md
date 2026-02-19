---
name: ae-cpp-sdk-architecture
description: Use when writing C++ code for After Effects plugins (AETK), creating wrappers for AEGP Suites, or managing memory/threading in AE.
globs: ["**/*.cpp", "**/*.h", "**/*.hpp"]
alwaysApply: false
---

# After Effects C++ SDK Architecture

## Memory Management (The Suite Handle Pattern)

After Effects does not use `new/delete` for SDK objects. Always use the memory suites provided by the host.

### ❌ Dangerous C++
```cpp
// Never do this with AE handles
char* buffer = new char[1024]; 
// ...
delete[] buffer;
```

### ✅ Safe Suite Usage (RAII)
Wrap suite acquisitions in RAII classes to ensure `ReleaseSuite` is called.

```cpp
// Example of acquiring a suite safely
AEGP_SuiteHandler suites(in_data->pica_basicP);
AEGP_StreamSuite4* stream_suite = suites.EE_AppSuite4(); // Auto-released
```

## Threading Model (The Main Thread Rule)

After Effects is fundamentally single-threaded for API calls.

1.  **Rule**: Never call `AEGP_*` functions from a worker thread.
2.  **Implementation**: Use the `TaskScheduler` pattern.
    *   Worker thread prepares data (POD structs).
    *   Worker pushes a lambda to `TaskScheduler`.
    *   `TaskScheduler` executes lambda on Main Thread via Idle Hook.

## Error Handling (PF_Err)

The SDK returns `PF_Err` (short) or `A_Err` (long). Do not use C++ exceptions across the DLL boundary.

```cpp
A_Err Err = A_Err_NONE;
ERR(suites.LayerSuite5()->AEGP_GetLayerName(layerH, name));
if (Err != A_Err_NONE) {
    // Log error and return gently
    return Err;
}
```

## Handle Lifetimes

*   **AEGP_LayerH / AEGP_ItemH**: Opaque pointers. Valid only for the duration of the call unless explicitly retained (rare).
*   **AEGP_StreamRefH**: Must be explicitly disposed. Use `AEGP_DisposeStreamValue` or wrap in a smart pointer class `ScopedStreamRef`.

## String Handling

AE uses various string encodings depending on the legacy version.
*   Prefer `AEGP_MemHandle` for passing large strings.
*   Always define character encoding (UTF-8 vs OS encoding) when marshaling to Python.