import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiClient, SVGLAPIError } from "./api.js";

const API_INFO_CONTENT = `SVGL API Information

The SVGL API is a RESTful API that provides access to a beautiful library of SVG logos.

Base URL: https://api.svgl.app

Available endpoints:
1. GET / - Returns all SVGs in the repository
2. GET /?limit=N - Returns a limited number of SVGs
3. GET /category/{category} - Returns SVGs filtered by category
4. GET /categories - Returns all categories with counts
5. GET /?search={query} - Returns SVGs matching the search query

The API is open and does not require authentication, but usage should be reasonable to prevent abuse.

Data formats:
- All endpoints return JSON
- SVG data includes title, category, route (URL to SVG), and optional wordmark/brand URLs
- Categories include name and total count of SVGs in each category
- Routes can be simple strings or objects with light/dark theme options

Rate limiting: Please use responsibly. The API is intended for extensions, plugins, and tools that help the community.`;

export function registerResources(server: McpServer) {
  // Resource: API Information
  server.resource("api-info", "svgl://api-info", async () => ({
    contents: [
      {
        uri: "svgl://api-info",
        mimeType: "text/plain",
        text: API_INFO_CONTENT,
      },
    ],
  }));

  // Resource: Categories Overview (dynamic)
  server.resource(
    "categories-overview",
    "svgl://categories-overview",
    async () => {
      try {
        const categories = await apiClient.getCategories();
        return {
          contents: [
            {
              uri: "svgl://categories-overview",
              mimeType: "application/json",
              text: JSON.stringify(
                {
                  description: "All available categories in the SVGL library",
                  totalCategories: categories.length,
                  categories: categories,
                  lastUpdated: new Date().toISOString(),
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        const errorResponse = {
          error: "Failed to fetch categories",
          message:
            error instanceof SVGLAPIError
              ? error.message
              : error instanceof Error
              ? error.message
              : "Unknown error",
          statusCode:
            error instanceof SVGLAPIError ? error.statusCode : undefined,
        };

        return {
          contents: [
            {
              uri: "svgl://categories-overview",
              mimeType: "application/json",
              text: JSON.stringify(errorResponse, null, 2),
            },
          ],
        };
      }
    }
  );
}
