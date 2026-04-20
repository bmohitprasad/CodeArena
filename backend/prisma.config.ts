// Prisma configuration for v6.19.3+
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not defined. Please set it in your .env file.");
}

module.exports = {
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
};
