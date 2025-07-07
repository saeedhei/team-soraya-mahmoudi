# User Types

**What is it?**  
Defines **GraphQL input types** used in mutations.

**Why InputTypes?**  
GraphQL requires explicit input schemas for mutations — `@InputType` with `@Field` defines the shape and validation at the schema level.

**What does it include?**  
- `RegisterInput` — fields for sign up  
- `LoginInput` — fields for sign in  
- `ResetPasswordInput` — fields for resetting password
