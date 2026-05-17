import { PrismaClient } from '../../generated/prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// MongoDB uses the classic engine and reads the connection URL from the
// environment (MONGODB_URL). No adapter or accelerateUrl is needed.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prisma = globalForPrisma.prisma ?? new (PrismaClient as any)({ errorFormat: 'minimal' });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma as PrismaClient;
