# Feature Specification: User Authentication Logic and UI

**Feature Branch**: `001-user-auth-ui`  
**Created**: February 24, 2026  
**Status**: Draft  
**Input**: User description: "I want to implement authentification logic. I already created files structure, login, sign up page. Now I need to implement logic and comprehensive UI for login and sign up form. In a background I have my custom triangles-background component in auth-shell. So I want to see just inputs and some icons, give me somve ideas what can be placed on login and sign up pages. On next phase I need to implement JWT and GOOGLE authorization. We can use mock api temporarily for that, because I don't have server for now. I don't need to implement unit tests for now."

## Clarifications

### Session 2026-02-24
- Q: Where should the mock JWT token and other user session data be stored? → A: JWT token in Cookies (for security/expiration), other data in LocalStorage.
- Q: Should the login form include a "Remember Me" checkbox? → A: Yes, add "Remember Me" checkbox.
- Q: Should the login page include a "Forgot Password" link? → A: Yes, add "Forgot Password" link.
- Q: How should success/error feedback (e.g., "Login Successful") be displayed? → A: Global SnackBar/Toast notifications (implemented in `libs/` for Nx reusability).
- Q: Should the login and sign-up pages include links to navigate between each other? → A: Yes, add cross-navigation links.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Secure Account Creation (Priority: P1)

As a new visitor, I want to create a new account using my email and password so that I can access the shop's personalized features.

**Why this priority**: Essential for onboarding new users and building a customer base. This is the foundation of user identity.

**Independent Test**: A user can fill out the sign-up form with valid details, submit it, and receive a confirmation of success (simulated via mock service).

**Acceptance Scenarios**:

1. **Given** a user is on the sign-up page, **When** they enter a valid email and matching passwords, **Then** they should see a success message and be redirected to the login page.
2. **Given** a user is on the sign-up page, **When** they enter an invalid email format, **Then** the system should display a validation error message near the email field.
3. **Given** a user is on the sign-up page, **When** they enter different passwords in the "Password" and "Confirm Password" fields, **Then** the system should display a mismatch error.
4. **Given** a user is on the sign-up page, **When** they click "Already have an account? Login", **Then** they should be redirected to the login page.

---

### User Story 2 - User Login (Priority: P1)

As a registered user, I want to log into my account using my credentials so that I can access my profile and order history.

**Why this priority**: Core functionality for returning users to access protected application areas.

**Independent Test**: A user can enter their credentials on the login page and successfully "authenticate" (mocked) to reach the main application area.

**Acceptance Scenarios**:

1. **Given** a user is on the login page, **When** they enter valid credentials, **Then** they should be redirected to the dashboard/home page.
2. **Given** a user is on the login page, **When** they enter incorrect credentials, **Then** an error message should be displayed.
3. **Given** a user is on the login page, **When** they check "Remember Me" and log in, **Then** their session should persist after browser restart (simulated).
4. **Given** a user is on the login page, **When** they click "Forgot Password", **Then** they should be directed to a placeholder recovery page.
5. **Given** a user is on the login page, **When** they click "Don't have an account? Sign Up", **Then** they should be redirected to the sign-up page.

---

### User Story 3 - Visual Enhancement & Feedback (Priority: P2)

As a user, I want a clean and modern authentication interface that provides clear visual feedback so that I feel confident and secure during the process.

**Why this priority**: Improves user experience and brand trust. High-quality UI is requested specifically for this phase.

**Independent Test**: Verify that inputs have appropriate icons (e.g., envelope for email, lock for password) and clear validation states.

**Acceptance Scenarios**:

1. **Given** the login or sign-up form, **When** a user focuses on an input, **Then** it should be visually highlighted and show its associated icon.
2. **Given** the authentication pages, **When** they load, **Then** the custom `triangles-background` should be visible in the background without obstructing the forms.

---

### Edge Cases

- **Password Visibility**: A user wants to see the password they typed to avoid errors. The password field should have a toggle visibility icon.
- **Empty Fields**: A user tries to submit the form without filling in any data. The system must prevent submission and highlight missing fields.
- **Network Errors**: A user submits the form but the "mock" service simulates a network failure. The system should show a generic retry message.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to create accounts with email and password.
- **FR-002**: System MUST allow users to log in with email and password.
- **FR-003**: System MUST validate email format and password matching on the client-side.
- **FR-004**: System MUST provide visual icons for all form inputs (e.g., Email, Password).
- **FR-005**: System MUST integrate with the existing `triangles-background` component in the `auth-shell`.
- **FR-006**: System MUST use a mock authentication service for this phase (simulating JWT responses).
- **FR-007**: System MUST support a "Toggle Password Visibility" feature in password inputs.
- **FR-008**: System MUST display a placeholder/button for Google Login (logic to be implemented in the next phase).
- **FR-009**: System MUST include a "Remember Me" checkbox on the login form to control session persistence.
- **FR-010**: System MUST include a "Forgot Password" link on the login form leading to a placeholder recovery view.
- **FR-011**: System MUST provide visual feedback for success/error events using a shared Snackbar/Toast component implemented in a library.
- **FR-012**: System MUST include links on both login and sign-up pages to allow users to navigate between them.

### Key Entities *(include if feature involves data)*

- **User Credentials**: Represents the data required for authentication (email, password).
- **Auth Token**: A mocked JWT token returned upon successful login, stored for the session.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete the sign-up process in under 1 minute.
- **SC-002**: 100% of form validation errors are clearly communicated to the user immediately upon submission or field blur.
- **SC-003**: The login page loads and is interactive within 2 seconds.
- **SC-004**: The UI remains responsive and visually consistent across standard desktop and mobile screen sizes.
