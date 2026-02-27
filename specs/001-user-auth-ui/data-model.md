# Data Model: User Authentication

## Entities

### UserCredentials
| Field | Type | Validation | Description |
|---|---|---|---|
| email | string | email, required | User email address |
| password | string | minLength(8), required | User password |
| rememberMe | boolean | optional | If true, session persists via cookies |

### SignUpDetails
| Field | Type | Validation | Description |
|---|---|---|---|
| email | string | email, required | User email address |
| password | string | minLength(8), required | New user password |
| confirmPassword | string | required, matches(password) | Confirmation of password |

### AuthSession
| Field | Type | Storage | Description |
|---|---|---|---|
| token | JWT string | Cookie | Secure session token |
| userEmail | string | LocalStorage | Cached user identifier |
| lastLogin | ISO8601 string | LocalStorage | Timestamp of last activity |

## State Transitions
- **Anonymous** → **Authenticated**: via `/login` or `/signup` success.
- **Authenticated** → **Anonymous**: via logout or token expiration.
