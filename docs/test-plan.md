# Manual Test Plan - NextFlows MCP Server

| id | tool | setup | input | expected | result | evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC01** | `list_documents` | Ensure `data/` directory contains markdown files. | `{}` (Empty object using examples/list_documents.json) | Returns a JSON array listing all available `.md` documents successfully. | | |
| **TC02** | `read_document` | Ensure `architecture_notes.md` exists in the data directory. | `{"fileName": "architecture_notes.md"}` (using examples/read_document.json) | Returns the exact file name and full markdown content. | | |
| **TC03** | `search_notes` | Ensure data files contain searchable text. | `{"query": "MIPS"}` (using examples/search_notes.json) | Returns matching files and relevant snippets containing the keyword. | | |
| **TC04** | `list_documents` | Test strict schema validation with invalid payload format. | `{"invalidKey": "test"}` | Fails Zod schema validation and returns an error response. | | |
| **TC05** | `read_document` | Test path traversal security protection. | `{"fileName": "../../etc/passwd"}` | Rejects the path escape attempt and returns a clean, safe error message. | | |
| **TC06** | `search_notes` | Test invalid empty string parameter. | `{"query": ""}` | Fails validation because query length cannot be empty (min 1). | | |
| **TC07** | `search_notes` | Test handling when searching a non-existent term or empty repository data. | `{"query": "nonexistentterm12345"}` | Returns an empty results array without crashing. | | |
| **TC08** | `read_document` | Simulate offline/timeout or unreadable file state by locking or removing permissions temporarily. | `{"fileName": "locked_file.md"}` | Catches the system error gracefully and returns a safe error response (`isError: true`). | | |