// Prisma configuration - Prisma automatically reads from prisma/schema.prisma
// This file is not needed for standard Prisma setup but kept for reference
// DATABASE_URL should be set in environment variables
import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
