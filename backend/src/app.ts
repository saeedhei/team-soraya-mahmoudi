// src/app.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { createApolloServer } from './core/apollo/server';

import passport from 'passport';
import './core/passport/jwt.strategy';

import { User } from './modules/user/entity/user.entity';

import { transporter } from './core/utils/mailer';

import verifyRoute from './modules/user/routes/verify.route';
// import verifyAccountRouter from './routes/verifyAccount';
// import doctorRoutes from './routes/doctorRoutes';
// import appointmentsRoutes from './routes/appointments';
// import forgotPasswordRouter from './routes/forgotPassword';
// import resetPasswordRouter from './routes/resetPassword';
// import { verifyAccountHandler } from './modules/user/controllers/verifyAccountHandler';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/auth', verifyRoute);
// app.use('/', verifyAccountRouter);
// app.use('/', forgotPasswordRouter);
// app.use('/', resetPasswordRouter);

// app.use('/doctors', doctorRoutes);
// app.use('/appointments', appointmentsRoutes);

// app.get('/verify-account', verifyAccountHandler);
app.get('/maildev', async (_req, res) => {
  try {
    await transporter.verify();
    res.status(200).send('✅ OK - Mail server is reachable');
  } catch {
    res.status(500).send('Mail server is NOT reachable');
  }
});
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export async function setupApollo() {
  const server = await createApolloServer();
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }: { req: Request; res: Response }) =>
        new Promise((resolve, reject) => {
          passport.authenticate('jwt', { session: false }, (err: unknown, user: User | false) => {
            console.log('🟡 Incoming Authorization header:', req.headers.authorization);
            console.log('🟢 Decoded user from JWT:', user);
            if (err) {
              console.error('🔴 Passport error:', err);
              return reject(err);
            }
            resolve({ user: user || null, req, res });
          })(req, res);
        }),
    }),
  );

  return app;
}
