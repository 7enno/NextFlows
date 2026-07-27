import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getDocumentMetadataInputSchema } from "../schemas/index.js";

export function registerGetMetadataTool(server: McpServer) {
    server.tool(
        "get_document_metadata",
        "Provides file information such as size and last modified date.",
        getDocumentMetadataInputSchema.shape,
        async ({ filename }) => {
            return {
                content: [{ type: "text", text: `Stub: retrieving metadata (size, date) for "${filename}"...` }]
            };
        }
    );
}