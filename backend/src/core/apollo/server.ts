// src/core/apollo/server.ts
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { Container } from 'typedi';

// resolvers
import { UserResolver } from '../../modules/user/resolvers/user.resolver';
import { AppointmentResolver } from '../../modules/appointment/resolvers/appointment.resolver';

export async function createApolloServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver,AppointmentResolver],
    container: Container,
    authChecker: ({ context }) => {
      return !!context.user;
    }
  });
  return new ApolloServer({ schema });
}
