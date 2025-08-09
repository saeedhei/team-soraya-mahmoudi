# Signup Mutation Test

This test verifies the functionality of the user registration (`register`) mutation in the GraphQL API.

---

## 🧪 Test Goal

To ensure that a new user can successfully register using their email, password, and role (`patient` or `doctor`) and receives a confirmation message. The user should not be verified until they confirm via email.

---

## 📤 Mutation Input

```graphql
mutation {
  register(data: {
    email: "soraya_test_signup@example.com",
    password: "!Test1234",
    role: "patient"
  }) {
    _id
    role
    isVerified
  }
}
✅ Expected Output
{
  "data": {
    "register": {
      "_id": "generated_id_here",
      "role": "patient",
      "isVerified": false
    }
  }
}
✅ Step-by-Step Explanation

The user submits the registration form with valid values.

The GraphQL mutation register is triggered on the backend.

The backend:

Validates input data.

Hashes the password.

Stores the user with isVerified: false.

Generates and stores a verification token.

Sends a verification email to the user.

The frontend receives the response and shows the message:

Signup successful! Please check your email to verify your account.

The user remains unverified until they click the verification link in their email.

🧪 Notes
Make sure the email is unique. If it's already in use, the mutation will return an error.

You can extend this test to check edge cases (e.g., weak passwords, missing fields, invalid roles).