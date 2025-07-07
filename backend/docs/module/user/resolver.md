# User Resolver

**What is it?**  
Acts as the main **GraphQL controller** — all Mutations and Queries for the user module are defined here.

**Why GraphQL?**  
GraphQL is used to make the API flexible: the client can request exactly what it needs — no overfetching.  
Decorators like `@Resolver`, `@Mutation`, `@Query` make it declarative and type-safe.

**What does it do?**  
- Register a new user  
- Log in an existing user  
- Send forgot password email  
- Handle password reset  
- Return current user profile (`me` query)
