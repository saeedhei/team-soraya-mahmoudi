Login System Documentation

Overview

This document explains how the login system works in our project, both on the frontend and backend sides. It walks through each step taken during user login, the structure of the request and response, and how authentication is handled.

1. Frontend: User Action

A user fills out the login form with their email and password.

The frontend sends a GraphQL mutation to the backend:

mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      username
      email
    }
  }
}

Variables example:

{
  "email": "john@example.com",
  "password": "password123"
}

2. Backend: Handling the Login Mutation

When the server receives the login mutation:

It looks up the user by the given email in the database using Mongoose.

If no user is found, it throws an error: "Invalid credentials".

If user is found, it compares the provided password with the hashed password in the database using bcrypt.compare().

If the password is incorrect, it throws the same error: "Invalid credentials".

If everything is valid:

A JWT token is generated:

jwt.sign({ id: user.id }, SECRET, { expiresIn: '7d' });

The token and user object are returned in the response.

3. Frontend: Handling the Response

The frontend receives a response containing:

{
  "data": {
    "login": {
      "token": "<JWT-TOKEN>",
      "user": {
        "id": "...",
        "username": "...",
        "email": "..."
      }
    }
  }
}

It stores the JWT token in localStorage or cookies for future authenticated requests.

4. Authentication in Future Requests

For every authenticated request, the frontend must send the JWT token in the Authorization header:

Authorization: Bearer <JWT-TOKEN>

On the backend, we use passport-jwt middleware to extract and verify the token, attaching the authenticated user to the context.user.

5. Security Notes

Passwords are hashed using bcryptjs before being stored.

JWT tokens are signed with a server-side secret (process.env.JWT_SECRET).

Invalid login attempts return a generic error to avoid information leaks.

6. Example Error Response

{
  "errors": [
    {
      "message": "Invalid credentials",
      "path": ["login"]
    }
  ],
  "data": null
}

Summary

The login system is implemented with strong authentication principles:

Secure password hashing

JWT-based stateless auth

Error handling

Passport.js for token verification in protected routes

Users can now login securely and receive a token for accessing protected GraphQL queries like me.

