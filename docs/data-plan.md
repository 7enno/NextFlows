# NextFlows Data Plan

| Tool | Source | Fixture Path | Auth | Failure Modes | Example Response |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `get_faq` | Local JSON | `./data/faq.json` | None | File missing, invalid JSON syntax, question key not found. | `{"answer": "Midterm exams are scheduled for week 8."}` |
| `list_documents` | Local Directory | `./data/` | None | Directory missing, no `.md` files present, read permissions denied. | `{"documents": ["architecture_notes.md"]}` |
| `search_notes` | Local Markdown | `./data/*.md` | None | Target files empty, keyword not found, unsupported file type. | `{"matches": [{"file": "architecture_notes.md", "snippet": "The five-stage MIPS pipeline consists of Instruction Fetch..."}]}` |