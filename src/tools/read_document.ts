import { z } from 'zod';
import { safeReadFile } from '../lib/file.js';

export function registerReadDocumentTool(server: any) {
    server.tool(
        "read_document",
        "Read the full contents of a specific markdown document from the local data directory.",
        {
            
            fileName: z.string().describe("The exact name of the file to read (e.g., 'architecture_notes.md')")
        },
        async ({ fileName }: { fileName: string }) => {
            try {
                const content = await safeReadFile(fileName);

                return {
                    content: [{ type: "text", text: JSON.stringify({ fileName, content }) }]
                };

            } catch (error) {
                
                return {
                    content: [{ type: "text", text: `Could not read the file ${fileName}. It might not exist or access is restricted.` }],
                    isError: true
                };
            }
        }
    );
}