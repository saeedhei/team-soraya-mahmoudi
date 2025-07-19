# Forgot Password – GraphQL Test Documentation

## 🔁 Flow Overview

1. A user initiates a password reset via the `forgotPassword` mutation.
2. A reset link is sent to the user's email (viewable in MailDev).
3. The user clicks the link and is redirected to the reset password page with a `token` and `email` as URL params.
4. The user submits a new password using the `resetPassword` mutation.
5. The system validates the token and updates the user's password.

---

## 🧩 Files Involved

- `src/modules/user/entities/user.entity.ts`
- `src/modules/user/types/user.types.ts`
- `src/modules/user/services/auth.service.ts`
- `src/modules/user/resolvers/user.resolver.ts`

---

## 🚀 Test Instructions

### 1. Step 1 – Forgot Password

```graphql
mutation {
  forgotPassword(email: "soraya2@example.com")
}
-----------------------------------------
Expected response:

{
  "data": {
    "forgotPassword": true
  }
}
📬 Check the MailDev inbox at http://localhost:1080
Copy the reset link from the email (it contains the token and email).
--------------------------------------
2. Step 2 – Reset Password
graphql
mutation {
  resetPassword(data: {
    email: "soraya2@example.com"
    token: "PASTE_YOUR_TOKEN_HERE"
    newPassword: "newpass5678"
  })
}
-------------------
Expected response:

json

{
  "data": {
    "resetPassword": true
  }
}
------------------------------------------
3. Step 3 – Login with New Password
graphql

mutation {
  login(data: {
    email: "soraya2@example.com"
    password: "newpass5678"
  })
}
-----------------
Expected response (JWT Token):

json

{
  "data": {
    "login": "JWT_TOKEN_HERE"
  }
}
📝 Notes
MailDev must be running locally at http://localhost:1080.

Reset links follow this format:

bash

http://localhost:5173/reset-password?token=...&email=...
Tokens expire after 1 hour.

You can test the login again to verify success.