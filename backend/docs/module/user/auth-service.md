# Auth Service

**What is it?**  
Contains the core **authentication logic**.

**Why is it separate from the resolver?**  
To follow clean architecture: the resolver handles input/output, but real business logic (hashing, token generation, mail sending) lives in a service class.

**What does it handle?**  
- Hashing passwords with Bcrypt  
- Generating JWT tokens (`jsonwebtoken`)  
- Sending verification/reset emails (`Nodemailer`)  
- Managing verification & reset tokens
