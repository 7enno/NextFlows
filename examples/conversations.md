# NextFlows MCP Server - Example Conversations

This document demonstrates how users can interact with the NextFlows MCP server through an AI client across three distinct scenarios, utilizing our core tools (`search_notes`, `get_faq`, and `read_document`).

---

## Conversation A: Searching Technical Notes

* **User Prompt:** 
  > "Can you search my notes for anything related to authentication setup?"

* **Expected Tool Calls (in order):**
  1. `search_notes`
     * `query`: "authentication setup"

* **Expected Final Answer:**
  "I found a relevant note in your workspace titled `auth-config.md`. It outlines the steps for setting up token-based authentication, including configuring your environment variables and initializing the security middleware."

---

## Conversation B: Resolving FAQs

* **User Prompt:** 
  > "How do I reset my API key according to the project documentation?"

* **Expected Tool Calls (in order):**
  1. `get_faq`
     * `topic`: "api key reset"

* **Expected Final Answer:**
  "According to the project FAQ, you can reset your API key by navigating to your account settings dashboard, selecting the 'Security' tab, and clicking 'Regenerate API Key'. Make sure to update your local `.env` file immediately afterwards."

---

## Conversation C: Specific Documentation Reading

* **User Prompt:** 
  > "Can you read the contents of the deployment guidelines document for me?"

* **Expected Tool Calls (in order):**
  1. `read_document`
     * `path`: "docs/deployment.md"

* **Expected Final Answer:**
  "Here is a summary of the deployment guidelines: The application requires a Node.js v18+ environment, builds using `npm run build`, and is configured to run via `npm start` behind a reverse proxy with SSL enabled."