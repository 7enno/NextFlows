import { searchNotesInputSchema } from "../schemas/index.js";

export function registerSearchNotesTool(server: any) {
    server.registerTool(
        "search_notes",
        {
            description: "Searches local files for specific text matches or keywords.",
            inputSchema: searchNotesInputSchema,
        },
        async (input: any) => {
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify({ ok: true, stub: true, tool: "search_notes" }, null, 2),
                }],
            };
        }
    );
}