import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { searchNotesInputSchema } from "../schemas/index.js";

export function registerSearchNotesTool(server: McpServer) {
    server.tool(
        "search_notes",
        "Searches local files for specific text matches or keywords.",
        searchNotesInputSchema.shape,
        async ({ query, limit }) => {
            return {
                content: [{ type: "text", text: `Stub: searching for "${query}" with limit ${limit || 5}...` }]
            };
        }
    );
}