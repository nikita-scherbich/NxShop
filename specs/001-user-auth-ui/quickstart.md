# Quickstart: User Authentication UI

This guide provides instructions for setting up and running the new authentication components.

## Prerequisites
- Node.js 18+ and npm
- Angular CLI

## Installation
1. Install project dependencies:
   ```bash
   npm install
   ```
2. Install the new cookie service dependency:
   ```bash
   npm install ngx-cookie-service
   ```

## Running the Mock API
A mock API using Express will simulate the backend.

1. **Start the API**:
   ```bash
   npx nx serve api
   ```
   This will start a server on `http://localhost:3000`.

## Running the Frontend
1. **Serve the Shop**:
   ```bash
   npx nx serve shop
   ```
   The application will be available at `http://localhost:4200`. Navigate to `/login` or `/signup` to see the new forms.

## Key Components
- **Login**: `apps/shop/src/app/auth/components/login/`
- **Sign-Up**: `apps/shop/src/app/auth/components/sign-up/`
- **Shared Messaging**: `libs/shared/notifications/`
