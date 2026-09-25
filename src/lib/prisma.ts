import { PrismaClient } from '../generated/prisma/client.js';
import { env } from './env.js';

//global pattern
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    accelerateUrl: env.DATABASE_URL,
    log: env.NODE_ENV === 'dev' ? ['warn', 'error'] : ['error']
})

if(env.NODE_ENV !== 'prod'){
    globalForPrisma.prisma = prisma
}