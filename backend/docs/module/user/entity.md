# User Entity

**What is it?**  
This file defines the **User** database model.

**Why Mongoose/Typegoose?**  
We use **Mongoose** because it’s the standard ODM for MongoDB: flexible and document-oriented.  
We wrap it with **Typegoose** to define the model as a TypeScript class — so we get type safety and better DX.

**What does it store?**  
- `email`: unique user email  
- `password`: securely hashed password  
- `isVerified`: email verification status  
- `verifyToken` + `verifyTokenExpiry`: email verification flow  
- `resetToken` + `resetTokenExpiry`: password reset flow
