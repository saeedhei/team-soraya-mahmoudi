// src/server.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });
import { validateEnv } from './utils/validateEnv';
validateEnv();

import { connectToMongoDB } from './infrastructure/database/connection';
import { app, initApollo } from './app';

const port = process.env.PORT;

async function startServer() {
  try {
    await connectToMongoDB();
    await initApollo();

    app.listen(port, () => {
      console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
