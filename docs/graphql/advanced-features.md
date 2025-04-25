# GraphQL - Chapter 5: Advanced Features

## Fragments

Used to reuse fields in queries.

```graphql
fragment userFields on User {
  id
  name
  email
}

query {
  users {
    ...userFields
  }
}
```
 -----------------------------------
## Aliases

Fetch the same field with different parameters:
```graphql
query {
  user1: user(id: "1") { name }
  user2: user(id: "2") { name }
}
```
 -----------------------------------
## Directives

Control query execution dynamically:
```graphql
query($showEmail: Boolean!) {
  user(id: "1") {
    name
    email @include(if: $showEmail)
  }
}
```
 -----------------------------------
## Subscriptions

Used for real-time data (e.g. new messages):
```graphql
subscription {
  messageAdded {
    id
    text
  }
}
```