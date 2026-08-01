import fs from 'fs/promises';
import path from 'path';
import { safeReadFile } from '../lib/file.js';

export function registerSearchNotesTool(server: any) {
    server.registerTool(
        "search_notes",
        {
            description: "Searches local markdown files for specific text matches.",
            inputSchema: {
                type: "object",
                properties: {
                    query: {
                        type: "string",
                        description: "The keyword or phrase to search for inside the notes."
                    }
                },
                required: ["query"]
            }
        },
        async (input: any) => {
            const query = input.query.toLowerCase();

            try {
                
                const dataDir = path.resolve(process.cwd(), 'data');
                const files = await fs.readdir(dataDir);
                const markdownFiles = files.filter(file => file.endsWith('.md'));

                if (markdownFiles.length === 0) {
                    return {
                        content: [{ type: "text", text: JSON.stringify({ matches: [], message: "No markdown notes found to search." }) }]
                    };
                }

                const matches = [];

                for (const file of markdownFiles) {
                    const content = await safeReadFile(file);

                    if (content.toLowerCase().includes(query)) {
                        const matchIndex = content.toLowerCase().indexOf(query);
                        const snippetStartIndex = Math.max(0, matchIndex - 20);
                        const snippet = content.substring(snippetStartIndex, snippetStartIndex + 100).replace(/\n/g, ' ') + '...';

                        matches.push({ file, snippet });
                    }
                }
                if (matches.length === 0) {
                    return {
                        content: [{ type: "text", text: JSON.stringify({ matches: [], message: `No matches found for keyword: ${input.query}` }) }]
                    };
                }

                return {
                    content: [{ type: "text", text: JSON.stringify({ matches }) }]
                };

            } catch (error) {
                console.error(`[search_notes tool failed]:`, error instanceof Error ? error.message : String(error));
                return {
                    content: [{ type: "text", text: "An error occurred while searching the local notes." }],
                    isError: true
                };
            }
        }
    );
}