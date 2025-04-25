# GraphQL - Chapter 4: Apollo Client with React

## Setup

Install Apollo Client:
```bash
npm install @apollo/client graphql
```

---

## Apollo Provider

Wrap your app:
```tsx
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

<ApolloProvider client={client}>
  <App />
</ApolloProvider>
```

---

## Basic Query in Component

```tsx
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

const Users = () => {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

---

## Basic Mutation in Component

```tsx
import { useMutation, gql } from "@apollo/client";

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
    }
  }
`;

const AddUserForm = () => {
  const [addUser] = useMutation(ADD_USER);

  const handleAdd = () => {
    addUser({ variables: { name: "Soraya", email: "s@example.com" } });
  };

  return <button onClick={handleAdd}>Add User</button>;
};
```