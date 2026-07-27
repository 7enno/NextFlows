import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listDocumentsInputSchema } from "../schemas/index.js";

export function registerListDocumentsTool(server: McpServer) {
    server.tool(
        "list_documents",
        "Lists all available text/markdown files in the knowledge base directory.",
        listDocumentsInputSchema.shape,
        async () => {
            return {
                content: [{ type: "text", text: "Stub: returning list of files..." }]
            };
        }
    );
}