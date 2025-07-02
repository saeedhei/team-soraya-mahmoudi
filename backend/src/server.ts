// src/server.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });
import { validateEnv } from './core/utils/validateEnv';
validateEnv();
import { connectToMongoDB } from './core/database/mongo';
import { setupApollo } from './app';

const PORT = process.env.PORT;

async function startServer() {
  try {
    await connectToMongoDB();
    const app = await setupApollo();

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
      console.log(`🚀 Server ready at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
