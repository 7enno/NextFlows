# Manual Test Plan - NextFlows MCP Server

| id | tool | setup | input | expected | result | evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC01** | `list_documents` | Ensure `data/` directory contains markdown files. | `{}` | Returns a JSON array listing all available `.md` documents successfully. | **PASS** | `docs/screenshots/happy-path.png` |
| **TC02** | `read_document` | Ensure `architecture_notes.md` exists in the data directory. | `{"fileName": "architecture_notes.md"}` | Returns the exact file name and full markdown content. | **PASS** | `docs/screenshots/happy-path.png` |
| **TC03** | `search_notes` | Ensure data files contain searchable text. | `{"query": "MIPS"}` | Returns matching files and relevant snippets containing the keyword. | **PASS** | Verified via Inspector |
| **TC04** | `list_documents` | Test strict schema validation with invalid payload format. | `{"invalidKey": "test"}` | Fails Zod schema validation and returns an error response. | **PASS** | `docs/screenshots/validation-rejection.png` |
| **TC05** | `read_document` | Test path traversal security protection. | `{"fileName": "../../etc/passwd"}` | Rejects the path escape attempt and returns a clean, safe error message. | **PASS** | `docs/screenshots/validation-rejection.png` |
| **TC06** | `search_notes` | Test invalid empty string parameter. | `{"query": ""}` | Fails validation because query length cannot be empty (min 1). | **PASS** | Verified via Inspector |
| **TC07** | `search_notes` | Test handling when searching a non-existent term. | `{"query": "nonexistentterm12345"}` | Returns an empty results array without crashing. | **PASS** | `docs/screenshots/empty-error.png` |
| **TC08** | `read_document` | Simulate offline/timeout or unreadable file state. | `{"fileName": "locked_file.md"}` | Catches the system error gracefully and returns a safe error response. | **PASS** | `docs/screenshots/empty-error.png` |
