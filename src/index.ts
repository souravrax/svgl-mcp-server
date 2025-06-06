import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools.js";
import { registerResources } from "./resources.js";

const SERVER_INFO = {
  name: "svgl-api",
  version: "1.0.0",
} as const;

function createServer(): McpServer {
  const server = new McpServer(SERVER_INFO);

  // Register all tools and resources
  registerTools(server);
  registerResources(server);

  return server;
}

async function main(): Promise<void> {
  try {
    const server = createServer();
    const transport = new StdioServerTransport();

    await server.connect(transport);
    console.error(
      `${SERVER_INFO.name} v${SERVER_INFO.version} running on stdio`
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.error("Received SIGINT, shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.error("Received SIGTERM, shutting down gracefully...");
  process.exit(0);
});

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
