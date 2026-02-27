# Implementation Plan: User Authentication Logic and UI

**Branch**: `001-user-auth-ui` | **Date**: February 24, 2026 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-user-auth-ui/spec.md`

## Summary
Implement a secure and modern user authentication interface for NxShop. This includes Login and Sign-up forms using Angular Material, client-side validation, and a mock authentication service. JWT tokens will be stored in secure cookies, while other session data resides in LocalStorage. A shared notification service will be implemented in a library to provide global feedback.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Angular 21, Angular Material, Express (for mock API), `ngx-cookie-service`  
**Storage**: Cookies (JWT), LocalStorage (Session data)  
**Testing**: Vitest (Unit), Playwright (E2E) [NEEDS CLARIFICATION: User requested skipping unit tests for now, but constitution mandates 80% coverage]  
**Target Platform**: Web (Modern Browsers)
**Project Type**: Web application (Nx Monorepo)  
**Performance Goals**: Login page interactive < 2s (SC-003), Sign-up process < 1m (SC-001)  
**Constraints**: Secure cookie storage, responsive UI, Material Design consistency  
**Scale/Scope**: Auth feature shell, Login/Sign-up components, shared notification library

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Code Quality**: PASS - Project uses ESLint and Prettier.
- **II. Testing Standards**: WARN - User requested skipping unit tests
- **III. User Experience Consistency**: PASS - Using Angular Material ensures design system compliance.
- **IV. Performance Requirements**: PASS - Clear measurable goals (SC-001, SC-003) defined.
- **V. Security Best Practices**: PASS - Using secure cookies for JWT and proper validation.

## Project Structure

### Documentation (this feature)

```text
specs/001-user-auth-ui/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── checklists/          # Requirement and validation checklists
    └── requirements.md
```

### Source Code (repository root)

```text
apps/
├── shop/
│   └── src/app/auth/
│       ├── components/
│       │   ├── login/
│       │   └── sign-up/
|       ├── routes/
|       ├── auth-shell.component.ts
│       └── auth.service.ts
└── api/
    └── src/main.ts (mock endpoints)

libs/
├── shared/
│   └── notifications/ (New: shared notification library)
└── shared/models/
    └── src/lib/auth/ (Existing models)
```

**Structure Decision**: Angular application with feature-specific components in `apps/shop` and a reusable notifications library in `libs/shared`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Skipping unit tests | Rapid prototyping requested by user for this phase | Delaying test implementation may lead to technical debt, but prioritizes visual delivery |
