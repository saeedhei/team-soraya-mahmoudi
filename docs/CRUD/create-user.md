 🧾 Create User – Medic Backend

This document describes how to create a new user in the Medic Backend system, both using GraphQL and (optionally) REST.

---

## ✅ Method 1: GraphQL

### 🔗 Endpoint
--------------------------
POST http://localhost:3000/graphql


### 📦 Sample GraphQL Mutation

graphql
mutation {
  signup(
    username: "soraya123"
    email: "soraya@example.com"
    password: "StrongPassw0rd!"
    role: "patient"
  ) {
    token
    user {
      id
      username
      email
    }
  }
}
✅ Method 2: REST API (Optional / for future)
⚠️ Currently, the main user creation flow is implemented via GraphQL.
If needed, you may implement a POST endpoint (e.g., /api/users) to support REST.

🛡️ Password Validation Rules
The password must meet the following requirements:

Minimum 6 characters

At least one uppercase letter

At least one number

At least one special character (!@#$%^&*, etc.)

If validation fails, the server will respond with an error.

📧 Email Verification
After a user is successfully created, a verification email is automatically sent to their registered address with a verification token valid for 1 hour.

🧪 Quick Test Using cURL

curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { signup(username: \"soraya123\", email: \"soraya@example.com\", password: \"StrongPassw0rd!\", role: \"patient\") { token user { id username email } } }"
  }'



## ♻️ Update User – GraphQL

### 🔗 Endpoint
POST http://localhost:3000/graphql

### 📦 Sample Mutation

```graphql
mutation {
  updateUser(
    id: "USER_ID_HERE"
    username: "soraya_updated"
    email: "newemail@example.com"
  ) {
    id
    username
    email
  }
}
📌 This mutation updates a user's profile. You can update the username, email, or other editable fields.
Make sure the user is authenticated and authorized.

❌ Delete User – GraphQL
🔗 Endpoint
POST http://localhost:3000/graphql

📦 Sample Mutation
graphql
Copy code
mutation {
  deleteUser(id: "USER_ID_HERE") {
    message
  }
}
🗑️ This mutation deletes the user account with the given id.

⚠️ Deletion is irreversible. Use with caution. Make sure only authorized users (like admins or the owner) can perform this action.

