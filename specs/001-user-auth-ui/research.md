# Research Findings: User Authentication Logic and UI

## Decision: Cookie Management in Angular
- **Decision**: Use `ngx-cookie-service` for managing JWT tokens.
- **Rationale**: Provides a clean, Angular-idiomatic API for cookie operations and handles security flags (SameSite, Secure) more easily than native `document.cookie`.
- **Alternatives Considered**: 
  - Native `document.cookie`: Too low-level, requires manual string parsing and management.
  - `LocalStorage`: Rejected for JWT due to susceptibility to XSS attacks.

## Decision: Placeholder Google Login
- **Decision**: Implement as a standard `mat-stroked-button` with a Google icon.
- **Rationale**: Meets the requirement of "displaying a placeholder" without introducing complex OAuth flows in this phase.
- **Alternatives Considered**: 
  - Full Firebase Auth: Too much overhead for this phase.
  - Custom SVG icon vs Material Icon: Use a custom SVG for the Google "G" logo to maintain brand consistency.

## Decision: Shared Notification Service
- **Decision**: Create `libs/shared/notifications` as a standalone Angular library.
- **Rationale**: Aligns with Nx architectural guidelines for reusability. Wrapping `MatSnackBar` allows for consistent styling and behavior across all apps in the monorepo.
- **Alternatives Considered**: 
  - Inline Snackbar calls in `apps/shop`: Violates reusability goals and makes global styling harder.
