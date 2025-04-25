# GraphQL - Chapter 1: Basics

## What is GraphQL?
    GraphQL is a query language for APIs and a runtime for executing those queries.  
It allows the client to request exactly the data it needs — no more, no less.

---

## REST vs GraphQL
| Feature       | REST                   | GraphQL                     |
|--------------|------------------------|-----------------------------|
| Endpoints    | Multiple               | Single `/graphql` endpoint |
| Data Shape   | Fixed per endpoint     | Defined per request         |
| Flexibility  | Less flexible          | Highly flexible             |

---

## Core Operations

### 1. **Query** (Read data)
```graphql
query {
  user(id: 1) {
    name
    email
  }
}
```

### 2. **Mutation** (Write data)
```graphql
mutation {
  addUser(name: "Soraya", email: "soraya@example.com") {
    id
    name
  }
}
```

### 3. **Subscription** (Real-time updates)
Used for features like chat or notifications.

---

## Common Data Types

- **Scalars:** `Int`, `Float`, `String`, `Boolean`, `ID`
- **Object Types:** Custom structured types
- **Enums:** A list of predefined values
- **Input Types:** Used to pass arguments into mutations

Example:
```graphql
type User {
  id: ID
  name: String
  email: String
}
```

---

## Minimal Working Example

**Schema:**
```graphql
type Query {
  hello: String
}
```

**Query:**
```graphql
query {
  hello
}
```

**Response:**
```json
{
  "data": {
    "hello": "Hello, Soraya!"
  }
}
```

---

> **GraphQL = precise, flexible, efficient.**