import { listDocumentsInputSchema } from "../schemas/index.js";

export function registerListDocumentsTool(server: any) {
    server.registerTool(
        "list_documents",
        {
            description: "Lists all available text/markdown files in the knowledge base directory.",
            inputSchema: listDocumentsInputSchema,
        },
        async (input: any) => {
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify({ ok: true, stub: true, tool: "list_documents" }, null, 2),
                }],
            };
        }
    );
}