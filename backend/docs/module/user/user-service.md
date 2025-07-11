# User Service

**What is it?**  
A helper service for simple user operations.

**Why separate?**  
It keeps basic database operations like **fetching by ID** or **updating status** out of the main Auth logic — better separation of concerns.

**What does it use?**  
Uses **Typegoose/Mongoose** to query MongoDB.
