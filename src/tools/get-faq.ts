import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getFaqInputSchema } from "../schemas/index.js";

export function registerGetFaqTool(server: McpServer) {
    server.tool(
        "get_faq",
        "Retrieves the exact answer for a predefined, frequently asked question.",
        getFaqInputSchema.shape,
        async ({ topic }) => {
            return {
                content: [{ type: "text", text: `Stub: retrieving FAQ for topic "${topic}"...` }]
            };
        }
    );
}