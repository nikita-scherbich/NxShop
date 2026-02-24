# Tasks: User Authentication Logic and UI

**Input**: Design documents from `/specs/001-user-auth-ui/`
**Prerequisites**: plan.md, spec.md

## Phase 1: Setup

**Purpose**: Install necessary dependencies.

- [ ] T001 Install `ngx-cookie-service` dependency by running `npm install ngx-cookie-service`.
- [ ] T002 Configure Angular Material by importing `MatFormFieldModule`, `MatInputModule`, `MatIconModule` into the relevant NgModule (e.g., `app.module.ts`), and ensure theming is set up in `apps/shop/src/styles.css`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create shared libraries and mock services required for all user stories.

- [ ] T003 [P] Implement mock API endpoints for login (`/api/auth/login`) and signup (`/api/auth/signup`) in `apps/api/src/main.ts`.
- [ ] T004 Create a new shared library `libs/shared/notifications` for global notifications.
- [ ] T005 [P] Implement `NotificationsService` within `libs/shared/notifications/src/lib/notifications.service.ts` to wrap `MatSnackBar`.
- [ ] T006 [P] Create and export `NotificationsComponent` from `libs/shared/notifications/src/lib/notifications.component.ts` and import it into the `shop` app.

---

## Phase 3: User Story 1 - Secure Account Creation (Priority: P1) 🎯 MVP

**Goal**: A new user can create an account.
**Independent Test**: Navigate to `/signup`, fill out the form, and see a success notification.

### Implementation for User Story 1

- [ ] T007 [US1] Build the sign-up form UI in `apps/shop/src/app/auth/components/sign-up/sign-up.component.html` using Angular Material form fields (`mat-form-field`, `mat-input`).
- [ ] T008 [US1] Implement the reactive form logic in `apps/shop/src/app/auth/components/sign-up/sign-up.component.ts` with validators for email and password matching.
- [ ] T009 [US1] Implement the `signUp` method in `apps/shop/src/app/auth/auth.service.ts` to make an HTTP POST request to the mock API.
- [ ] T010 [US1] Connect the sign-up form submission to the `auth.service.ts` and use the `NotificationsService` to display success or error notifications.

---

## Phase 4: User Story 2 - User Login (Priority: P1)

**Goal**: An existing user can log into their account.
**Independent Test**: Navigate to `/login`, enter credentials, and see a success notification.

### Implementation for User Story 2

- [ ] T011 [US2] Build the login form UI in `apps/shop/src/app/auth/components/login/login.component.html` including a "Remember Me" checkbox and "Forgot Password" link.
- [ ] T012 [US2] Implement the reactive form logic in `apps/shop/src/app/auth/components/login/login.component.ts`.
- [ ] T013 [US2] Implement the `login` method in `apps/shop/src/app/auth/auth.service.ts` to call the mock API and store the JWT in a cookie using `ngx-cookie-service`.
- [ ] T014 [US2] Connect the login form submission to the `auth.service.ts` and use `NotificationsService` for feedback.

---

## Phase 5: User Story 3 - Visual Enhancement & Navigation (Priority: P2)

**Goal**: Improve the user experience with visual cues and easier navigation.
**Independent Test**: Verify that all visual elements from the spec are present and functional.

### Implementation for User Story 3

- [ ] T015 [P] [US3] Add `mat-icon` to form fields in `login.component.html` and `sign-up.component.html`.
- [ ] T016 [P] [US3] Implement password visibility toggle functionality in both the login and sign-up password fields.
- [ ] T017 [US3] Add a navigation link to the sign-up page from `login.component.html`.
- [ ] T018 [US3] Add a navigation link to the login page from `sign-up.component.html`.
- [ ] T019 [P] [US3] Verify the `triangles-background` component renders correctly as the background for the authentication shell.
- [ ] T020 [P] [US3] Add Google Login placeholder button to `apps/shop/src/app/auth/components/login/login.component.html` and `apps/shop/src/app/auth/components/sign-up/sign-up.component.html`.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T021 Review form validation and error handling for consistency.
- [ ] T022 Validate UI responsiveness on standard mobile and desktop screen sizes.
- [ ] T023 Perform basic performance check for login/signup page load and interaction responsiveness.
- [ ] T024 Conduct a basic security review of authentication forms (e.g., input sanitization, client-side validation).
- [ ] T025 Update `quickstart.md` with final instructions if anything has changed.

---

## Dependencies & Execution Order

- **Setup (Phase 1)** must complete before all other phases.
- **Foundational (Phase 2)** depends on Setup and blocks all User Story phases.
- **User Stories (Phases 3-5)** can begin after Phase 2 is complete. They can be worked on in parallel.
