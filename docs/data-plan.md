# NextFlows Data Plan

| Tool | Source | Fixture Path | Auth | Rate Limits | Failure Modes | Example Response |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `get_faq` | Local JSON | `./data/faq.json` | None | N/A (Local) | File missing, invalid JSON syntax, question not found. | `{"answer": "Midterm exams are scheduled for week 8."}` |
| `list_documents` | Local Directory | `./data/` | None | N/A (Local) | Directory missing, no `.md` files present. | `{"documents": ["architecture_notes.md"]}` |
| `search_notes` | Local Markdown | `./data/*.md` | None | N/A (Local) | Target files empty, keyword not found. | `{"matches": [{"file": "architecture_notes.md", "snippet": "The five-stage MIPS pipeline..."}]}` |