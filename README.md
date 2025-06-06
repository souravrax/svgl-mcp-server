# SVGL MCP Server

A clean, modular MCP (Model Context Protocol) server for the SVGL API that provides access to a beautiful library of SVG logos.

## 🚀 Features

- **4 Tools**: Get all SVGs, search SVGs, filter by category, get categories
- **2 Resources**: API documentation and dynamic categories overview
- **Type-safe**: Full TypeScript support with Zod validation
- **Error handling**: Comprehensive error handling with custom error types
- **Modular architecture**: Clean separation of concerns

## 📁 Project Structure

```
src/
├── index.ts      # Main server entry point
├── api.ts        # SVGL API client with error handling
├── tools.ts      # MCP tools registration
├── resources.ts  # MCP resources registration
└── types.ts      # TypeScript interfaces and Zod schemas
```

## 🛠️ Available Tools

### `get_all_svgs`

Get all SVGs from the repository

- **Parameters**: `limit` (optional) - Maximum number of SVGs to return

### `get_categories`

Get all available categories with counts

- **Parameters**: None

### `get_svgs_by_category`

Filter SVGs by category

- **Parameters**: `category` (required) - Category name to filter by

### `search_svgs`

Search SVGs by title

- **Parameters**: `query` (required) - Search term

## 📚 Resources

### `svgl://api-info`

Static API documentation and usage information

### `svgl://categories-overview`

Dynamic overview of all categories with live data from the API

## 🔧 Installation

```bash
npm install
npm run build
```

## 🏃‍♂️ Running

```bash
npm start
```

## 🏗️ Architecture

- **API Client**: Centralized HTTP client with custom error handling
- **Type Safety**: Zod schemas for runtime validation
- **Error Handling**: Custom `SVGLAPIError` class with status codes
- **Modular Design**: Clean separation between tools, resources, and API logic
- **Graceful Shutdown**: Proper signal handling for clean exits

## 📄 License

MIT
