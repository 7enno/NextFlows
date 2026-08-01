import { z } from "zod";
import { safeReadFile } from "../lib/file.js";

const faqSchema = z.record(z.string(), z.string());

export function registerGetFaqTool(server: any) {
    server.registerTool(
        "get_faq",
        {
            description: "Retrieve an answer from the FAQ database.",
            inputSchema: {
                type: "object",
                properties: {
                    questionKey: {
                        type: "string",
                        description: "The specific keyword or topic to look up in the FAQ (e.g., 'midterms')."
                    }
                },
                required: ["questionKey"]
            }
        },
        async (input: any) => {
            const questionKey = input.questionKey;

            try {
                const rawData = await safeReadFile('faq.json');
                const parsedJson = JSON.parse(rawData);

                const validFaqData = faqSchema.parse(parsedJson);

                const answer = validFaqData[questionKey];

                if (!answer) {
                    return {
                        content: [{ type: "text", text: JSON.stringify({ items: [], message: `No FAQ found for keyword: ${questionKey}` }) }]
                    };
                }

                return {
                    content: [{ type: "text", text: JSON.stringify({ answer }) }]
                };

            } catch (error) {
                console.error(`[get_faq tool failed]:`, error instanceof Error ? error.message : String(error));

                return {
                    content: [{ type: "text", text: "The FAQ file could not be accessed or parsed correctly." }],
                    isError: true
                };
            }
        }
    );
}