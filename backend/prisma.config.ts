// Prisma configuration - Prisma automatically reads from prisma/schema.prisma
// This file is not needed for standard Prisma setup but kept for reference
// DATABASE_URL should be set in environment variables
import { defineConfig } from '@prisma/config'

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

export default defineConfig({
  // Add the engine property here
  engine: 'classic', 
  datasource: {
    url: databaseUrl,
  },
})