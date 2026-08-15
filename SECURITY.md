# Security Policy

## Supported Versions
Only the current version of this repository is supported.

## Reporting a Vulnerability
If you discover any security issues, please report them directly to your mentor via email.

## Security Mitigations Summary
* **Input Validation:** Strict Zod schemas with `.min()` and `.max()` limits on all tools.
* **Path Traversal Protection:** Base directory validation (`filePath.startsWith(baseDir)`) combined with `path.resolve()`.
* **Output Caps:** Search results and data responses are capped and truncated to protect model context windows.
* **Error Handling:** Safe, short, and actionable error messages without exposing raw stack traces.