import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

export function getPrisma() {
  if (!hasDatabaseUrl()) return null;

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }

  return globalForPrisma.prisma;
}

