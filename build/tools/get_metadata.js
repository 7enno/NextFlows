import { safeReadFile } from '../lib/file.js';
import { getDocumentMetadataInputSchema } from '../schemas/index.js';
import { z } from 'zod';
const metadataSchema = z.record(z.string(), z.any());
export function registerGetMetadataTool(server) {
    server.tool("get_metadata", "Retrieve metadata (like author, date, tags) for a specific document.", getDocumentMetadataInputSchema.shape, async ({ fileName }) => {
        try {
            const rawData = await safeReadFile('metadata.json');
            const parsedJson = JSON.parse(rawData);
            const validMetadataData = metadataSchema.parse(parsedJson);
            const metadata = validMetadataData[fileName];
            if (!metadata) {
                return {
                    content: [{ type: "text", text: JSON.stringify({ items: [], message: `No metadata found for file: ${fileName}` }) }]
                };
            }
            return {
                content: [{ type: "text", text: JSON.stringify({ fileName, metadata }) }]
            };
        }
        catch (error) {
            return {
                content: [{ type: "text", text: `The metadata file could not be accessed or parsed correctly: ${error.message || ""}` }],
                isError: true
            };
        }
    });
}
