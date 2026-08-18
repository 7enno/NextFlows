# NextFlows MCP Server

A Model Context Protocol (MCP) server designed to seamlessly integrate local documentation, workspace notes, and FAQs into AI models via standard input/output (stdio).

---

## What It Does
NextFlows provides a secure and structured bridge between your local workspace and AI clients (like Claude Desktop or the MCP Inspector). It enables AI models to search local technical notes, retrieve common project FAQs, and read specific documentation files dynamically.

---

## Requirements
* **Node.js**: Version 18 or higher installed on your system.
* **npm**: Comes packaged with Node.js.
* **Claude Desktop** (optional for production testing) or the **MCP Inspector** (for development).

---

## Install
Clone the repository and install the required dependencies:

```bash
git clone [https://github.com/7enno/NextFlows.git](https://github.com/7enno/NextFlows.git)
cd NextFlows
npm install 
```
---
## To build and run the server locally:
```bash
npm run build
npm start
```

## The Inspector Command
To test and debug your tools interactively using the official MCP Inspector, run:
```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts

## Tools Overview
| Tool Name | Description | Key Arguments |
| :--- | :--- | :--- |
| `search_notes` | Searches through local workspace notes for matching queries. | `query` (string) |
| `get_faq` | Retrieves answers to common project questions and FAQs. | `topic` (string) |
| `read_document` | Reads and returns the contents of specific project documentation paths. | `path` (string) |

## Example Prompts
You can use these plain-language prompts when interacting with the server:
* "Can you search my notes for anything related to authentication setup?"
* "How do I reset my API key according to the project documentation?"
* "Can you read the contents of the deployment guidelines document for me?"

## Troubleshooting (Common Errors)
1. **Error: `npx: command not found` (Windows)**
   * *Fix:* Make sure Node.js is added to your system PATH, or use `npx.cmd` instead of plain npx in your configuration.
2. **Error: Server crashes on startup with path issues**
   * *Fix:* Ensure you are running commands from the root directory of the repository, and check that absolute paths in configurations use double backslashes (`\\`) on Windows.
3. **Error: Tool calls return empty or file not found**
   * *Fix:* Verify that your local workspace fixture files or data directories exist in the repository root and are accessible.
