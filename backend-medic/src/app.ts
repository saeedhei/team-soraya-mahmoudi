import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
};

async function startServer() {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('✅ Connected to MongoDB');

  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  app.use(cors());
  app.use(bodyParser.json());

  app.use('/graphql', async (req, res, next) => {
    const middleware = expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization || '';
        let user = null;
        if (token) {
          try {
            user = jwt.verify(token, process.env.JWT_SECRET as string);
          } catch (err) {
            console.error('Invalid token');
          }
        }
        return { user };
      }
    });
    await middleware(req, res, next);
  });

  app.get('/', (_req, res) => {
    res.send('🚀 Server is running! Visit /graphql');
  });

  const port = process.env.PORT || 3333;
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

startServer();
