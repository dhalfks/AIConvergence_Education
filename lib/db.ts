import { PrismaClient } from "@prisma/client";

const ensureDatabaseUrl = () => {
  if (process.env.DATABASE_URL) return;
  process.env.DATABASE_URL =
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    "";
};

const globalForPrisma = global as typeof globalThis & {
  prisma?: PrismaClient;
};

ensureDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
