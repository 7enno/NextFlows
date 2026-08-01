import fs from 'fs/promises';
import path from 'path';

export function registerListDocumentsTool(server: any) {
    server.registerTool(
        "list_documents",
        {
            description: "List all available markdown documents in the local data directory.",
            inputSchema: {
                type: "object",
                properties: {} 
            }
        },
        async () => {
            try {
                const dataDir = path.resolve(process.cwd(), 'data');

                const files = await fs.readdir(dataDir);
                const markdownFiles = files.filter(file => file.endsWith('.md'));

                if (markdownFiles.length === 0) {
                    return {
                        content: [{
                            type: "text",
                            text: JSON.stringify({ items: [], message: "No markdown documents found in the data directory." })
                        }]
                    };
                }
                return {
                    content: [{ type: "text", text: JSON.stringify({ documents: markdownFiles }) }]
                };

            } catch (error) {
                console.error(`[list_documents tool failed]:`, error instanceof Error ? error.message : String(error));
                return {
                    content: [{ type: "text", text: "Failed to read the local data directory." }],
                    isError: true
                };
            }
        }
    );
}