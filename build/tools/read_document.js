import { safeReadFile } from '../lib/file.js';
import { readDocumentContentInputSchema } from '../schemas/index.js';
export function registerReadDocumentTool(server) {
    server.tool("read_document", "Read the full contents of a specific markdown document from the local data directory.", readDocumentContentInputSchema.shape, async ({ fileName }) => {
        try {
            const content = await safeReadFile(fileName);
            return {
                content: [{ type: "text", text: JSON.stringify({ fileName, content }) }]
            };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `Could not read the file ${fileName}. ${error.message || "It might not exist or access is restricted."}` }],
                isError: true
            };
        }
    });
}
