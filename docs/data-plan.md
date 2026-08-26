# NextFlows Data Plan

| Tool | Source | Fixture Path | Auth | Rate Limits | Failure Modes | Example Response |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `add_note` | Local Markdown | `./data/` | None | N/A (Local) | Directory missing, write permission denied, invalid filename. | `{"success": true, "fileName": "note.md", "message": "Note created successfully."}` |
| `list_documents` | Local Directory | `./data/` | None | N/A (Local) | Directory missing, no `.md` files present. | `{"documents": ["architecture_notes.md"]}` |
| `search_notes` | Local Markdown | `./data/*.md` | None | N/A (Local) | Target files empty, keyword not found. | `{"matches": [{"file": "architecture_notes.md", "snippet": "The five-stage MIPS pipeline..."}]}` |
