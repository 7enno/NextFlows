import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerSearchNotesTool } from "./tools/search_notes.js";
import { registerListDocumentsTool } from "./tools/list_documents.js";
import { registerGetFaqTool } from "./tools/get_faq.js";

import { registerReadDocumentTool } from "./tools/read_document.js";
import { registerGetMetadataTool } from "./tools/get_metadata.js";


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