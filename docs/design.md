# Design Document: Notes & FAQ Search MCP

## Pitch
Computer Engineering students generate a massive volume of dense, technical documentation—from code snippets to lab reports—that becomes difficult to navigate over time. This Notes & FAQ Search server is designed for students and developers who need instant, context-aware answers directly from their local study materials. The MCP exposes standard directory reading, exact-match FAQ retrieval, and keyword-based text search tools, allowing an AI engine to act as a highly specialized academic assistant without relying on external web searches.

## User & Demo Story
**User:** "How do forwarding rules eliminate data stalls in our MIPS pipeline lab?"
**AI Action:** The AI first calls `list_documents` to locate the relevant hardware project notes, finding `mips_pipeline_lab.md`. It then calls `search_notes` with the query "forwarding rules data stalls" against that specific file. 
**AI Response:** The AI synthesizes the returned snippets, explaining that even if a branch is in the ID stage, the ALU will calculate the answer and forward it for comparing, effectively eliminating the specific data stall. 

## Tool Inventory

| tool_name | description | inputs | output (shape) | priority |
| :--- | :--- | :--- | :--- | :--- |
| `list_documents` | Lists all available text/markdown files in the knowledge base directory. | `None` | `Array<string>` (file paths) | P0 |
| `search_notes` | Searches local files for specific text matches or keywords. | `query` (string) | `Array<Object>` (file path, matching snippet) | P0 |
| `add_note` | Creates and saves a new markdown note in the data directory. | `fileName` (string), `content` (string) | `Object` (success, fileName, message) | P1 |
| `delete_note` | Deletes an existing markdown note from the data directory. | `fileName` (string) | `Object` (success, fileName, message) | P1 |
| `read_document_content` | Reads and returns the entire contents of a specific file. | `file_path` (string) | `string` (entire file content) | P1 |

## Out of Scope
*   **Authentication/Logins:** The server will run entirely locally on the host machine; no user management or API keys will be required.
*   **Vector/Semantic Search:** For Demo Day, search will rely on standard string matching and n-gram/keyword overlaps rather than complex embedding models or vector databases.
*   **Mobile UI/Frontend:** There will be no dedicated frontend application; all interactions will happen through standard MCP-compatible AI chat interfaces.

## Success Criteria
*   [ ] The server successfully initializes and connects to a standard MCP client (like the inspector).
*   [ ] The `list_documents` tool correctly outputs the names of dummy files placed in a test directory.
*   [ ] The `search_notes` tool returns a direct hit from a fixture file (e.g., retrieving A5/1 stream cipher execution steps from a test note).

## Risks
1.  **Risk:** The AI model hallucinates answers instead of strictly relying on the file contents returned by the tools.
    *   **Mitigation:** Write strict system prompts within the tool descriptions explicitly commanding the model to state "I don't know" if the context isn't found in the tool output.
2.  **Risk:** Large text files exceed the token context window when returned by the search tool.
    *   **Mitigation:** Implement a character limit on the returned snippets in the `search_notes` tool, forcing it to return surrounding context lines rather than whole documents.



## Notes from reading the official GitHub MCP Server
*   **Naming Patterns:** Tool names strictly follow a `verb_noun` snake_case convention (e.g., `get_issue`, `search_repositories`), making the exact action instantly predictable.
*   **Description Length:** Descriptions are incredibly concise, usually restricted to a single, direct sentence that starts with an active verb (e.g., "Creates a new issue in a GitHub repository").
*   **Parameter Detail:** Input schema descriptions are highly specific about formatting, often including exact examples of what the string should look like to prevent LLM hallucinations (e.g., "The repository name in owner/repo format").
*   **Error Phrasing:** While not always in the tool description, standard MCP error handling focuses on actionable fixes rather than generic failures, explicitly stating which field was malformed.
*   **Scope Isolation:** Tools are narrowly scoped to perform exactly one task well, rather than bundling multiple capabilities (e.g., reading a file and searching a file are two distinct tools).
