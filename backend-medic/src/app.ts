import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware  } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { userTypeDefs as typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

dotenv.config({path: '.env.development'});

async function startServer() {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('✅ Connected to MongoDB');

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use('/graphql', expressMiddleware(server));

  app.get('/', (_req, res) => {
    res.send('🚀 Server is running! Visit /graphql');
  });

  const port = process.env.PORT || 3333;
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

startServer();