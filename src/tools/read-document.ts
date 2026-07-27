import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { readDocumentContentInputSchema } from "../schemas/index.js";

export function registerReadDocumentTool(server: McpServer) {
    server.tool(
        "read_document_content",
        "Retrieves the full text content of a specific file.",
        readDocumentContentInputSchema.shape,
        async ({ filename }) => {
            return {
                content: [{ type: "text", text: `Stub: retrieving full content for "${filename}"...` }]
            };
        }
    );
}