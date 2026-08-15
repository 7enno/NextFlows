# Manual Test Plan - NextFlows MCP Server

| id | tool | setup | input | expected | result | evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC01** | `list_documents` | Ensure `data/` directory contains markdown files. | `{}` | Returns a JSON array listing all available `.md` documents successfully. | **PASS** | [View Screenshot](screenshots/1.png) |
| **TC02** | `read_document` | Ensure `architecture_notes.md` exists in the data directory. | `{"fileName": "architecture_notes.md"}` | Returns the exact file name and full markdown content. | **PASS** | [View Screenshot](screenshots/2.png)|
| **TC03** | `search_notes` | Ensure data files contain searchable text. | `{"query": "MIPS"}` | Returns matching files and relevant snippets containing the keyword. | **PASS** | [View Screenshot](screenshots/3.png) |
| **TC04** | `read_document` |Test strict schema validation with invalid payload parameters or missing required fields.| `{"wrongField": 123}` | Fails Zod schema validation and returns an error response.| **PASS** | [View Screenshot](screenshots/4.png)|
| **TC05** | `read_document` | Test path traversal security protection. | `{"fileName": "../../etc/passwd"}` | Rejects the path escape attempt and returns a clean, safe error message. | **PASS** | [View Screenshot](screenshots/5.png) |
| **TC06** | `search_notes` | Test invalid empty string parameter. | `{"query": ""}` | Fails validation because query length cannot be empty (min 1). | **PASS** |[View Screenshot](screenshots/6.png)|
| **TC07** | `search_notes` | Test handling when searching a non-existent term. | `{"query": "nonexistentterm12345"}` | Returns an empty results array without crashing. | **PASS** | [View Screenshot](screenshots/7.png) |
| **TC08** | `read_document` | Simulate offline/timeout or unreadable file state. | `{"fileName": "locked_file.md"}` | Catches the system error gracefully and returns a safe error response. | **PASS** | [View Screenshot](screenshots/8.png)|
