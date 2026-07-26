import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    listDocumentsInputSchema,
    searchNotesInputSchema,
    getFaqInputSchema
} from "./schemas/index.js";

// 1. Initialize the MCP Server
const server = new McpServer({
    name: "notes-faq-search",
    version: "1.0.0"
});

// 2. Register P0 Tools with Stubs
server.registerTool(
    "list_documents",
    {
        title: "List Documents",
        description: "Lists all available text/markdown files in the knowledge base directory.",
        inputSchema: listDocumentsInputSchema
    },
    async (args) => {
        return { content: [{ type: "text", text: "Stub: returning list of files..." }] };
    }
);

server.registerTool(
    "search_notes",
    {
        title: "Search Notes",
        description: "Searches local files for specific text matches or keywords.",
        inputSchema: searchNotesInputSchema
    },
    async ({ query, limit }) => {
        return { content: [{ type: "text", text: `Stub: searching for "${query}" with limit ${limit || 5}...` }] };
    }
);

server.registerTool(
    "get_faq",
    {
        title: "Get FAQ",
        description: "Retrieves the exact answer for a predefined, frequently asked question.",
        inputSchema: getFaqInputSchema
    },
    async ({ topic }) => {
        return { content: [{ type: "text", text: `Stub: fetching FAQ for topic "${topic}"...` }] };
    }
);

// 3. Start the Server using stdio transport
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("Notes & FAQ Search MCP Server running on stdio");
}

main().catch(console.error);