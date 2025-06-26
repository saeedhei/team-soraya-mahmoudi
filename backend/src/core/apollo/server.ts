// src/core/apollo/server.ts
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { UserResolver } from '../../modules/user/resolvers/user.resolver';
import { Container } from 'typedi';

export async function createApolloServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    container: Container,
  });
  return new ApolloServer({ schema });
}
