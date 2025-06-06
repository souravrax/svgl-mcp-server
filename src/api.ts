import { Category, ISVG } from "./types.js";

const SVGL_API_BASE = "https://api.svgl.app";

export class SVGLAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = "SVGLAPIError";
  }
}

export class SVGLAPIClient {
  private baseUrl: string;

  constructor(baseUrl: string = SVGL_API_BASE) {
    this.baseUrl = baseUrl;
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new SVGLAPIError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          endpoint
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof SVGLAPIError) {
        throw error;
      }

      throw new SVGLAPIError(
        `Failed to fetch from SVGL API: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        undefined,
        endpoint
      );
    }
  }

  async getAllSVGs(limit?: number): Promise<ISVG[]> {
    const endpoint = limit ? `?limit=${limit}` : "";
    return this.makeRequest<ISVG[]>(endpoint);
  }

  async getCategories(): Promise<Category[]> {
    return this.makeRequest<Category[]>("/categories");
  }

  async getSVGsByCategory(category: string): Promise<ISVG[]> {
    const endpoint = `/category/${encodeURIComponent(category.toLowerCase())}`;
    return this.makeRequest<ISVG[]>(endpoint);
  }

  async searchSVGs(query: string): Promise<ISVG[]> {
    const endpoint = `?search=${encodeURIComponent(query)}`;
    return this.makeRequest<ISVG[]>(endpoint);
  }
}

export const apiClient = new SVGLAPIClient();
