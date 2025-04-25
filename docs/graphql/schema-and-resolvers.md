# GraphQL - Chapter 2: Schema and Resolvers

## What is a Schema?

A **GraphQL schema** defines the structure of data available on the server.

It includes:
- Types
- Queries
- Mutations
- Subscriptions (optional)

Example:
```graphql
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  users: [User]
  user(id: ID!): User
}
```

-----------------------------------
## What is a Resolver?

A **resolver** is a function that connects schema fields to actual data.

Example in JavaScript:
```js
const resolvers = {
  Query: {
    users: () => getAllUsers(),
    user: (_, { id }) => getUserById(id)
  }
};
```
-----------------------------------
## Key Concepts

- **Root Type:** Query, Mutation, Subscription
- **Field Resolvers:** Each field can have its own function
- **Arguments:** Used to pass dynamic values
-----------------------------------
## Minimal Example

```graphql
type Query {
  greet(name: String!): String
}
```

Resolver:
```js
const resolvers = {
  Query: {
    greet: (_, { name }) => `Hello, ${name}!`
  }
};
```

Query:
```graphql
query {
  greet(name: "Soraya")
}
```

Result:
```json
{
  "data": {
    "greet": "Hello, Soraya!"
  }
}
```