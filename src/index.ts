import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Import your P0 tools
import { registerSearchNotesTool } from "./tools/search-notes.js";
import { registerListDocumentsTool } from "./tools/list-documents.js";
import { registerGetFaqTool } from "./tools/get-faq.js";

const server = new McpServer({
    name: "Notes-FAQ-Search",
    version: "1.0.0",
});

// Register your multi-tool skeleton
registerSearchNotesTool(server);
registerListDocumentsTool(server);
registerGetFaqTool(server);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Notes & FAQ Search MCP Server running on stdio");
}

main().catch(console.error);