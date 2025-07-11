# Verify Route

**What is it?**  
A simple **Express route** that handles email verification when the user clicks a link in their email.

**Why use Express Route instead of GraphQL?**  
For actions like clicking a link directly in the browser, a minimal Express route is simpler than a GraphQL mutation.  
It just finds the user by token, verifies them, and shows a success/failure response.

**How does it work?**  
Receives `email` and `token` as query params → validates → updates `isVerified` → clears the token.
