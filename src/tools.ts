import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { apiClient, SVGLAPIError } from "./api.js";
import {
  GetAllSVGsParams,
  GetSVGsByCategoryParams,
  SearchSVGsParams,
} from "./types.js";
import z from "zod";

function createSuccessResponse(data: any) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

function createErrorResponse(error: SVGLAPIError) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          {
            error: error.name,
            message: error.message,
            statusCode: error.statusCode,
            endpoint: error.endpoint,
          },
          null,
          2
        ),
      },
    ],
  };
}

export function registerTools(server: McpServer) {
  // Tool: Get all SVGs
  server.tool(
    "get_all_svgs",
    "Returns all the SVGs in the repository.",
    GetAllSVGsParams,
    async ({ limit }) => {
      try {
        const data = await apiClient.getAllSVGs(limit);
        return createSuccessResponse(data);
      } catch (error) {
        if (error instanceof SVGLAPIError) {
          return createErrorResponse(error);
        }
        throw error;
      }
    }
  );

  // Tool: Get categories
  server.tool(
    "get_categories",
    "Returns only categories with the number of SVGs in each category.",
    {},
    async () => {
      try {
        const data = await apiClient.getCategories();
        return createSuccessResponse(data);
      } catch (error) {
        if (error instanceof SVGLAPIError) {
          return createErrorResponse(error);
        }
        throw error;
      }
    }
  );

  // Tool: Get SVGs by category
  server.tool(
    "get_svgs_by_category",
    "Returns all the SVGs in the repository that match the category.",
    GetSVGsByCategoryParams,
    async ({ category }) => {
      try {
        const data = await apiClient.getSVGsByCategory(category);
        return createSuccessResponse(data);
      } catch (error) {
        if (error instanceof SVGLAPIError) {
          return createErrorResponse(error);
        }
        throw error;
      }
    }
  );

  // Tool: Search SVGs
  server.tool(
    "search_svgs",
    "Returns all the SVGs in the repository that match the name.",
    SearchSVGsParams,
    async ({ query }) => {
      try {
        const data = await apiClient.searchSVGs(query);
        return createSuccessResponse(data);
      } catch (error) {
        if (error instanceof SVGLAPIError) {
          return createErrorResponse(error);
        }
        throw error;
      }
    }
  );

  server.tool(
    "save_svg_from_url",
    "Download an SVG from the URL",
    {
      url: z.string(),
    },
    async ({ url }) => {
      try {
        const response = await fetch(url);
        const svg = await response.text();
        return createSuccessResponse(svg);
      } catch (error) {
        if (error instanceof SVGLAPIError) {
          return createErrorResponse(error);
        }
        throw error;
      }
    }
  );
}
