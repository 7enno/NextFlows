import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";
import fs from 'fs/promises';
import path from 'path';
function createServer() {
    const server = new McpServer({
        name: "NextFlows",
        version: "0.2.0",
    });
    server.server.onerror = (error) => console.error("[MCP Error]:", error);
    const dataDir = path.resolve(process.cwd(), 'data');
    // 1. P0 Tool: list_documents
    server.registerTool("list_documents", {
        description: "List all available markdown documents in the local data directory.",
        inputSchema: z.object({})
    }, async () => {
        try {
            const files = await fs.readdir(dataDir);
            const markdownFiles = files.filter((f) => f.endsWith('.md'));
            return { content: [{ type: "text", text: JSON.stringify({ documents: markdownFiles }) }] };
        }
        catch (error) {
            return { content: [{ type: "text", text: "Failed to read directory." }], isError: true };
        }
    });
    // 2. P0 Tool: read_document
    server.registerTool("read_document", {
        description: "Read the full contents of a specific markdown document.",
        inputSchema: z.object({
            fileName: z.string().describe("The exact name of the file to read")
        })
    }, async (input) => {
        try {
            const filePath = path.join(dataDir, input.fileName);
            const content = await fs.readFile(filePath, 'utf-8');
            return { content: [{ type: "text", text: JSON.stringify({ fileName: input.fileName, content }) }] };
        }
        catch (error) {
            return { content: [{ type: "text", text: `Could not read file ${input.fileName}.` }], isError: true };
        }
    });
    // 3. P0 Tool: search_notes
    server.registerTool("search_notes", {
        description: "Searches local markdown files for specific keywords or phrases.",
        inputSchema: z.object({
            query: z.string().describe("The keyword or phrase to search for.")
        })
    }, async (input) => {
        try {
            const files = await fs.readdir(dataDir);
            const markdownFiles = files.filter((f) => f.endsWith('.md'));
            const results = [];
            for (const file of markdownFiles) {
                const filePath = path.join(dataDir, file);
                const content = await fs.readFile(filePath, 'utf-8');
                if (content.toLowerCase().includes(input.query.toLowerCase())) {
                    results.push({ fileName: file, snippet: content.substring(0, 150) + "..." });
                }
            }
            return { content: [{ type: "text", text: JSON.stringify({ query: input.query, results }) }] };
        }
        catch (error) {
            return { content: [{ type: "text", text: "Search failed." }], isError: true };
        }
    });
    // 4. New Tool: add_note
    server.registerTool("add_note", {
        description: "Create and save a new markdown note in the data directory.",
        inputSchema: z.object({
            fileName: z.string().describe("The filename for the new note (e.g., note.md)"),
            content: z.string().describe("The markdown content of the note")
        })
    }, async (input) => {
        try {
            const fileName = input.fileName.endsWith('.md') ? input.fileName : `${input.fileName}.md`;
            const filePath = path.join(dataDir, fileName);
            await fs.writeFile(filePath, input.content, 'utf-8');
            return { content: [{ type: "text", text: JSON.stringify({ success: true, fileName, message: "Note created successfully." }) }] };
        }
        catch (error) {
            return { content: [{ type: "text", text: "Failed to create note." }], isError: true };
        }
    });
    // 5. New Tool: delete_note
    server.registerTool("delete_note", {
        description: "Delete an existing markdown note from the data directory.",
        inputSchema: z.object({
            fileName: z.string().describe("The exact name of the markdown file to delete")
        })
    }, async (input) => {
        try {
            const filePath = path.join(dataDir, input.fileName);
            await fs.unlink(filePath);
            return { content: [{ type: "text", text: JSON.stringify({ success: true, fileName: input.fileName, message: "Note deleted successfully." }) }] };
        }
        catch (error) {
            return { content: [{ type: "text", text: `Could not delete file ${input.fileName}.` }], isError: true };
        }
    });
    // P1 Stubs
    server.registerTool("get_faq", { description: "Retrieve an answer from FAQ", inputSchema: z.object({ questionKey: z.string() }) }, async (input) => {
        const faqPath = path.join(dataDir, 'faq.json');
        const rawData = await fs.readFile(faqPath, 'utf-8');
        const faqData = JSON.parse(rawData);
        return { content: [{ type: "text", text: JSON.stringify({ answer: faqData[input.questionKey] || "Not found" }) }] };
    });
    server.registerTool("get_metadata", { description: "Retrieve metadata for a document", inputSchema: z.object({ fileName: z.string() }) }, async (input) => {
        const metaPath = path.join(dataDir, 'metadata.json');
        const rawData = await fs.readFile(metaPath, 'utf-8');
        const metaData = JSON.parse(rawData);
        return { content: [{ type: "text", text: JSON.stringify({ metadata: metaData[input.fileName] || "Not found" }) }] };
    });
    return server;
}
void serveStdio(createServer);
