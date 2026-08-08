# Threat Model & Risk Assessment (Week 4)

## Core Rule
Treat all tool arguments coming from the model as untrusted input, exactly like a public web form.

## Tool Risk Mapping
1. **`list_documents` (Disk Access):**
   * *Threat:* Path Traversal.
   * *Risk:* If path validation is missing, it could read files outside the designated `data/` directory.

2. **`get_faq` & `search_notes` (Untrusted Strings & Data Processing):**
   * *Threat:* Untrusted Inputs & Runaway Responses.
   * *Risk:* Raw string queries from the model need strict validation (via Zod), and output sizes must be bounded to prevent exhausting the model's context window.