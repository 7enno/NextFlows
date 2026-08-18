# NextFlows MCP Server

A Model Context Protocol (MCP) server designed to seamlessly integrate local documentation, workspace notes, and FAQs into AI models via standard input/output (stdio).

---

## What It Does
NextFlows provides a secure and structured bridge between your local workspace and AI clients (like Claude Desktop or the MCP Inspector). It enables AI models to search local technical notes, retrieve common project FAQs, and read specific documentation files dynamically.

---

## Requirements
* **Node.js**: Version 18 or higher installed on your system.
* **npm**: Comes packaged with Node.js.
* **Claude Desktop** (optional for production testing) or the **MCP Inspector** (for development).

---

## Install
Clone the repository and install the required dependencies:

```bash
git clone [https://github.com/7enno/NextFlows.git](https://github.com/7enno/NextFlows.git)
cd NextFlows
npm install

## Run
To build and run the server locally:
```bash
npm run build
npm start

