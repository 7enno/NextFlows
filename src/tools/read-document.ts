import { readDocumentContentInputSchema } from "../schemas/index.js";

export function registerReadDocumentTool(server: any) {
    server.registerTool(
        "read_document_content",
        {
            description: "Retrieves the full text content of a specific file.",
            inputSchema: readDocumentContentInputSchema,
        },
        async (input: any) => {
            return {
                content: [{ type: "text", text: "not implemented yet" }],
            };
        }
    );
}