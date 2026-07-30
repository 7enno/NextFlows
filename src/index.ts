import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

// Import your P0 tools
import { registerSearchNotesTool } from "./tools/search-notes.js";
import { registerListDocumentsTool } from "./tools/list-documents.js";
import { registerGetFaqTool } from "./tools/get-faq.js";

// Import your P1 tools
import { registerReadDocumentTool } from "./tools/read-document.js";
import { registerGetMetadataTool } from "./tools/get-metadata.js";

function createServer(): McpServer {
    const server = new McpServer({
        name: "NextFlows",
        version: "0.2.0",
    });

    registerSearchNotesTool(server);
    registerListDocumentsTool(server);
    registerGetFaqTool(server);
    registerReadDocumentTool(server);
    registerGetMetadataTool(server);

    return server;
}

void serveStdio(createServer);
console.error("NextFlows MCP server running on stdio");