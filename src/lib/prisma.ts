import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
  return new PrismaClient({ adapter });
}

// Singleton: reuse existing client or create one
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// In development, cache on globalThis to survive hot reloads without leaking connections
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
