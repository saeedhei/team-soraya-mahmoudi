// src/app.ts
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from './config/passport';
import { resolvers, typeDefs } from './graphql';

import verifyAccountRouter from './routes/verifyAccount';
import doctorRoutes from './routes/doctorRoutes';
import appointmentsRoutes from './routes/appointments';
import forgotPasswordRouter from './routes/forgotPassword';
import resetPasswordRouter from './routes/resetPassword';
import { verifyAccountHandler } from './modules/user/controllers/verifyAccountHandler';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(passport.initialize());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function initApollo() {
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = await new Promise<any>((resolve) => {
          passport.authenticate('jwt', { session: false }, (_err: any, user: any) => {
            resolve({ user });
          })(req);
        });
        return user;
      },
    }),
  );
}

app.use('/', verifyAccountRouter);
app.use('/', forgotPasswordRouter);
app.use('/', resetPasswordRouter);

app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentsRoutes);

app.get('/verify-account', verifyAccountHandler);

app.get('/', (_req, res) => {
  res.send('🚀 Server is running! Visit /graphql');
});

export { app, initApollo };
