# NxShop Project: Gemini CLI Instructional Context

## Project Overview

This is an Nx monorepo project named "NxShop," designed as a production-ready e-commerce application. It leverages Nx to manage two main applications and several shared libraries, promoting modularity, code reusability, and efficient development.

**Key Technologies:**

- **Nx**: Monorepo management tool.
- **Angular**: Frontend framework for the `shop` application.
- **Node.js/Express.js**: Backend for the `api` application.
- **TypeScript**: Primary programming language across the monorepo.
- **Docker**: For containerizing the `api` backend.
- **Playwright**: For end-to-end testing.
- **Vitest**: For fast unit testing of Angular libraries.

**Architecture:**
The project is structured into `apps/` for the main applications and `libs/` for shared, reusable libraries. This separation ensures clear responsibilities and enforces architectural constraints using Nx module boundaries.

## Building and Running

### Quick Start

To set up and run the project locally:

```bash
# Clone the repository
git clone <your-fork-url> # Replace with actual fork URL
cd NxShop # Or your repository name

# Install dependencies
npm install

# Serve the Angular shop application (simultaneously serves the API backend)
npx nx serve shop

# You can also serve the API separately
npx nx serve api
```

### Common Commands

- **Build all projects:**

    ```bash
    npx nx run-many -t build
    ```

- **Run all tests:**

    ```bash
    npx nx run-many -t test
    ```

- **Lint all projects:**

    ```bash
    npx nx run-many -t lint
    ```

- **Run e2e tests:**

    ```bash
    npx nx e2e shop-e2e
    ```

- **Run tasks in parallel (e.g., lint, test, build, e2e):**

    ```bash
    npx nx run-many -t lint test build e2e --parallel=3
    ```

- **Visualize the project graph:**

    ```bash
    npx nx graph
    ```

- **Build Docker image for API:**

    ```bash
    npx nx docker:build api
    ```

- **Run Docker container for API:**

    ```bash
    npx nx docker:run api
    ```

- **Build only affected projects (useful for CI):**

    ```bash
    npx nx affected -t build
    ```

## Development Conventions and Best Practices

- answer short, simple, easy to understand

### Module Boundaries

Nx enforces architectural constraints using tags, defining what each project can import. This ensures a clean and maintainable architecture.

- `scope:shared`: Can be used by all projects.
- `scope:shop`: Shop-specific libraries.
- `scope:api`: API-specific libraries.
- `type:feature`: Feature libraries.
- `type:data`: Data access libraries.
- `type:ui`: UI component libraries.

### E2E Testing

End-to-end tests are implemented using Playwright in the `shop-e2e` project.

### Unit Testing

Unit tests are written using Vitest, providing fast test execution for Angular libraries.

### Docker Integration

The `api` project has built-in Docker support for building and running containers, integrated with Nx Release for versioning.

### Self-Healing CI

The CI pipeline incorporates `nx fix-ci` to automatically identify and suggest fixes for common CI issues, improving pipeline stability.

## Project Structure

```
├── apps/
│   ├── shop/           - Angular e-commerce application
│   ├── shop-e2e/       - Playwright E2E tests for shop
│   └── api/            - Node.js/Express.js Backend API with Docker support
├── libs/
│   ├── shop/
│   │   ├── feature-products/        - Product listing feature (Angular)
│   │   ├── feature-product-detail/  - Product detail feature (Angular)
│   │   ├── data/                    - Data access layer for shop features
│   │   └── shared-ui/               - Shared UI components (Angular)
│   ├── api/
│   │   └── products/                - API product service library (Node.js)
│   └── shared/
│       └── models/                  - Shared data models (TypeScript)
├── nx.json             - Nx workspace configuration
├── tsconfig.base.json  - Base TypeScript configuration
└── eslint.config.mjs   - ESLint configuration with module boundary rules
```

## Active Technologies
- TypeScript 5.x, Node.js 18+ + Angular 21, Angular Material, Express (for mock API), `ngx-cookie-service` (001-user-auth-ui)
- Cookies (JWT), LocalStorage (Session data) (001-user-auth-ui)

## Recent Changes
- 001-user-auth-ui: Added TypeScript 5.x, Node.js 18+ + Angular 21, Angular Material, Express (for mock API), `ngx-cookie-service`
