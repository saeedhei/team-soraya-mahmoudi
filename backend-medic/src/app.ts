import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware  } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport  from "./config/passport";
import resetPasswordRouter from './routes/resetPassword';
import verifyAccountRouter from './routes/verifyAccount';

import './config/passport'

import { userTypeDefs as typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import {verifyAccountHandler} from './domain/users/controllers/verifyAccountHandler'
dotenv.config({path: '.env.development'});

async function startServer() {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('✅ Connected to MongoDB');

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(passport.initialize());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use('/graphql', 
  expressMiddleware(server,{
    context: async ({ req }) => {
        const user=await new Promise<any>((resolve) => {
        passport.authenticate('jwt', { session: false }, (_err:any, user:any) => {
          resolve({ user });
        })(req);
      });
      return {user};
    },
  }));
  
  app.use('/', verifyAccountRouter);
  app.use('/', resetPasswordRouter);

  app.get('/verify-account', verifyAccountHandler);

  app.get('/', (_req, res) => {
    res.send('🚀 Server is running! Visit /graphql');
  });

  const port = process.env.PORT || 3333;
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

startServer();