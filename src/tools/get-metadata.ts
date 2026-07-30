import { getDocumentMetadataInputSchema } from "../schemas/index.js";

export function registerGetMetadataTool(server: any) {
    server.registerTool(
        "get_document_metadata",
        {
            description: "Retrieves file metadata, including size and last modified date.",
            inputSchema: getDocumentMetadataInputSchema,
        },
        async (input: any) => {
            return {
                content: [{ type: "text", text: "not implemented yet" }],
            };
        }
    );
}