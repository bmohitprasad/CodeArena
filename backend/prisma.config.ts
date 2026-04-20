// Prisma configuration for v6.19.3+
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Validate DATABASE_URL is set
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not defined. Please set it in your .env file.");
}

// Export configuration object for Prisma
export const config = {
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
};

export default config;
