import { getFaqInputSchema } from "../schemas/index.js";

export function registerGetFaqTool(server: any) {
    server.registerTool(
        "get_faq",
        {
            description: "Retrieves the exact answer for a predefined, frequently asked question.",
            inputSchema: getFaqInputSchema,
        },
        async (input: any) => {
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify({ ok: true, stub: true, tool: "get_faq" }, null, 2),
                }],
            };
        }
    );
}