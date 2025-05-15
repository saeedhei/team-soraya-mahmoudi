import {ApolloClient,InMemoryCache,createHttpLink } from "@apollo/client";

const httoLink= createHttpLink({
    uri:"http://localhost:3000/graphql",
    credentials:"include",
});

const client= new ApolloClient({
    link:httoLink,
    cache:new InMemoryCache(),
});

export default client