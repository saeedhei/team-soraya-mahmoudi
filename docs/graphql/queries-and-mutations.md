# GraphQL - Chapter 3: Queries and Mutations

## Queries

Used to **fetch data**.

Example:
```graphql
query {
  users {
    id
    name
  }
}
```
-----------------------------------
## Mutations

Used to **modify data** (create, update, delete).

Example:
```graphql
mutation {
  addUser(name: "Soraya", email: "soraya@example.com") {
    id
    name
  }
}
```
-----------------------------------
## Passing Variables

Query with variables:
```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    name
  }
}
```
-----------------------------------
## Query Response Shape

The response matches the structure of your query.

```json
{
  "data": {
    "user": {
      "name": "Soraya"
    }
  }
}
```