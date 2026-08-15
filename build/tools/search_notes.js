import fs from 'fs/promises';
import path from 'path';
import { safeReadFile } from '../lib/file.js';
import { searchNotesInputSchema } from '../schemas/index.js';
export function registerSearchNotesTool(server) {
    server.tool("search_notes", "Searches local markdown files for specific text matches.", searchNotesInputSchema.shape, async ({ query, limit = 5 }) => {
        const queryLower = query.toLowerCase();
        try {
            const dataDir = path.resolve(process.cwd(), 'data');
            const files = await fs.readdir(dataDir);
            const markdownFiles = files.filter((file) => file.endsWith('.md'));
            if (markdownFiles.length === 0) {
                return {
                    content: [{ type: "text", text: JSON.stringify({ matches: [], message: "No markdown notes found to search." }) }]
                };
            }
            const matches = [];
            for (const file of markdownFiles) {
                const content = await safeReadFile(file);
                const contentLower = content.toLowerCase();
                if (contentLower.includes(queryLower)) {
                    const matchIndex = contentLower.indexOf(queryLower);
                    const snippetStartIndex = Math.max(0, matchIndex - 20);
                    const snippet = content.substring(snippetStartIndex, snippetStartIndex + 100).replace(/\n/g, ' ') + '...';
                    matches.push({ file, snippet });
                    if (matches.length >= limit) {
                        break;
                    }
                }
            }
            if (matches.length === 0) {
                return {
                    content: [{ type: "text", text: JSON.stringify({ matches: [], message: `No matches found for keyword: ${query}` }) }]
                };
            }
            return {
                content: [{ type: "text", text: JSON.stringify({ matches, truncated: matches.length >= limit }) }]
            };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `An error occurred while searching: ${error.message || "Unknown error"}` }],
                isError: true
            };
        }
    });
}
