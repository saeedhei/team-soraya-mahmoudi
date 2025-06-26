// src/utils/validateEnv.ts
export function validateEnv() {
  const requiredVars = ['MONGODB_URI', 'JWT_SECRET', 'SMTP_HOST'];
  const missing = requiredVars.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
