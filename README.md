# claude-code-viewer

This project is a web server for viewing code projects and their sessions. It is built with [Bun](https://bun.sh/), [Vite](https://vitejs.dev/), and [itty-router](https://itty.dev/).

## Installation

To install the dependencies, run the following command:

```bash
bun install
```

### Run the API

To start the development server, run:

```bash
bun run dev
```

The server will start on `http://localhost:3001` by default.

# API Endpoints

The server exposes the following API endpoints:

### `GET /projects`

Returns a list of all available code projects.

### `GET /projects/:projectid/sessions`

Returns a list of all sessions for a given project.

**Parameters:**

-   `projectid` (string): The ID of the project.

### `GET /projects/:projectid/sessions/:sessionid`

Returns the content of a specific session for a given project.

**Parameters:**

-   `projectid` (string): The ID of the project.
-   `sessionid` (string): The ID of the session.
