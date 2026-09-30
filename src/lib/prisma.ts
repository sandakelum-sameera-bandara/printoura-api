import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

import { env } from "./env.js";

// Connection string used by the application at runtime
const connectionString = env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
    connectionString,
});

// Global pattern to avoid multiple Prisma clients during development
const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: env.NODE_ENV === "dev"
            ? ["warn", "error"]
            : ["error"],
    });

if (env.NODE_ENV !== "prod") {
    globalForPrisma.prisma = prisma;
}