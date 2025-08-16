# Login Flow Documentation

This document describes the **end-to-end login process** of the project, including both **Frontend (FE)** and **Backend (BE)** responsibilities.  
It is written step-by-step so that the entire flow can be visualized easily, from the moment the user submits the login form until token validation in protected routes.

---

## Key Components

**Frontend (FE):**
- `pages/login/index.tsx` → Login form (React Hook Form)
- `apollo/client.ts` → Apollo Client setup with `authLink` and `httpLink`
- `contexts/AuthContext.tsx` → Stores `user` and `token`
- `components/auth/PrivateRoute.tsx` → Route guard for authentication
- `components/auth/RoleBasedRoute.tsx` → Role-based access guard
- `utils/redirectToDashboard.ts` → Role-based redirection after login

**Backend (BE):**
- `app.ts` → Express + Apollo Server v4 with Passport JWT middleware
- `core/passport/jwt.strategy.ts` → JWT validation strategy
- `modules/user/resolvers/user.resolver.ts` → `login` mutation resolver
- `modules/user/services/auth.service.ts` → Authentication logic (validate user, bcrypt, sign token)
- `core/utils/auth.ts` → `signToken(payload)` function

---

## Step-by-Step Flow

### Step 1 — [FE] User Submits Login Form
- **File:** `pages/login/index.tsx`
- User enters email & password.
- `handleSubmit(onSubmit)` triggers `LOGIN_MUTATION`.
- GraphQL mutation is sent with input credentials.

---

### Step 2 — [FE] Apollo Client Sends Request
- **File:** `apollo/client.ts`
- `ApolloClient` configured with:
  - `httpLink` → `http://localhost:3000/graphql`
  - `authLink` → attaches `Authorization: Bearer <token>` if available in `localStorage`.
- For the first login attempt, token is usually empty.

---

### Step 3 — [BE] GraphQL Endpoint & Context
- **File:** `app.ts`
- Incoming request handled by `expressMiddleware(server)` on `/graphql`.
- `passport.authenticate('jwt')` runs:
  - If no/invalid token: `ctx.user = null` (allowed for login).
  - For protected resolvers, token is required.

---

### Step 4 — [BE] Login Resolver
- **File:** `modules/user/resolvers/user.resolver.ts`
- `login(@Arg('data') data: LoginInput)` is called.
- Resolver delegates to `AuthService.login(email, password)`.

---

### Step 5 — [BE] Authentication Logic
- **File:** `modules/user/services/auth.service.ts`
1. `UserModel.findOne({ email })`
2. `bcrypt.compare(inputPassword, user.passwordHash)`
3. Optional: check `user.isVerified`

**Decision:**
- Invalid credentials → return error
- Unverified account → return error
- Valid credentials → proceed

---

### Step 6A — [BE → FE] Failed Login
- GraphQL returns an error:
  - `Invalid credentials`
  - `Please verify your email`
- **Frontend** shows error message, user remains on login page.

---

### Step 6B — [BE] Successful Login
- **File:** `core/utils/auth.ts`
- `signToken({ id: user._id })` generates a JWT.
  - Default expiration: **7 days** (`expiresIn: '7d'`)
- Response:
  ```json
  {
    "token": "<JWT>",
    "user": {
      "id": "...",
      "email": "...",
      "role": "doctor|patient",
      "isVerified": true
    }
  }

Step 7 — [FE] Store Token and User

File: contexts/AuthContext.tsx

login(user, token):

setUser(user)

setToken(token)

localStorage.setItem('token', token)

localStorage.setItem('user', JSON.stringify(user))

Reset Apollo cache with apollo.resetStore()

Step 8 — [FE] Redirect by Role

File: utils/redirectToDashboard.ts

If role === 'doctor' → /doctor-dashboard

If role === 'patient' → /patient-dashboard

Step 9 — [FE] Route Guards

File: components/auth/PrivateRoute.tsx

If no token → redirect /login

File: components/auth/RoleBasedRoute.tsx

If role mismatch → redirect to login/home

Step 10 — [FE → BE] Authenticated Requests

Apollo Client attaches token automatically in headers:

Authorization: Bearer <token>


Doctor queries (example): getAppointmentsForDoctor

Patient queries (example): getAppointmentsForPatient

Step 11 — [BE] JWT Validation on Protected Resolvers

File: core/passport/jwt.strategy.ts

Extracts token from Authorization header.

Validates JWT → fetches user from DB.

If valid: ctx.user = user

If invalid/expired: ctx.user = null

Step 12 — [BE] Protected Resolvers

Example File: modules/appointment/resolvers/appointment.resolver.ts

Methods decorated with @Authorized() require valid ctx.user.

Example: getAppointmentsForDoctor(@Ctx() ctx) → returns doctor’s appointments.

Step 13 — [FE] Logout

File: contexts/AuthContext.tsx

logout():

Clear user and token from state & localStorage

apollo.clearStore() + apollo.resetStore()

Redirect to /login

Step 14 — Token Expiration & Error Handling

Token Expiry: Default 7d, configurable via process.env.JWT_EXPIRES.

If token expired/invalid:

BE: passport-jwt → no user in context

FE: Route guards → redirect /login

Common Pitfalls & Solutions

ID vs _id mismatch

GraphQL exposes id instead of _id. Always use id on the frontend.

Logout not redirecting

Ensure Apollo cache is cleared with clearStore() + resetStore().

Doctor/Patient queries

Use ctx.user.id in resolvers instead of passing doctorId/patientId from FE.

Preflight OPTIONS requests

204 No Content is normal. Only POST response matters.

Summary

The login system is a token-based authentication flow (JWT).

Frontend handles form input, stores token in context/localStorage, and protects routes.

Backend validates credentials, issues JWTs, and secures GraphQL resolvers.

Expired/invalid tokens always force re-login.