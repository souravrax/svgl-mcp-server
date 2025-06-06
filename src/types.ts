import { z } from "zod";

// TypeScript interfaces from SVGL API documentation
export interface Category {
  category: string;
  total: number;
}

export interface ThemeOptions {
  dark: string;
  light: string;
}

export interface ISVG {
  id?: number;
  title: string;
  category: string | string[];
  route: string | ThemeOptions;
  wordmark?: string | ThemeOptions;
  brandUrl?: string;
  url: string;
}

// Validation schemas
export const CategorySchema = {
  category: z.string(),
  total: z.number(),
};

export const SVGSchema = {
  id: z.number().optional(),
  title: z.string(),
  category: z.union([z.string(), z.array(z.string())]),
  route: z.union([
    z.string(),
    z.object({
      dark: z.string(),
      light: z.string(),
    }),
  ]),
  wordmark: z
    .union([
      z.string(),
      z.object({
        dark: z.string(),
        light: z.string(),
      }),
    ])
    .optional(),
  brandUrl: z.string().optional(),
  url: z.string(),
};

// Tool parameter schemas
export const GetAllSVGsParams = {
  limit: z
    .number()
    .optional()
    .describe("Maximum number of SVGs to return (optional)"),
};

export const GetSVGsByCategoryParams = {
  category: z
    .string()
    .describe(
      "The category name to filter by (e.g., 'software', 'framework', 'library')"
    ),
};

export const SearchSVGsParams = {
  query: z.string().describe("The search term to look for in SVG titles"),
};
