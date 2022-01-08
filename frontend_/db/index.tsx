import { PrismaClient } from '@prisma/client';

// Sets prisma as part of NodeJS Global type
interface CustomNodeJSGlobal extends NodeJS.Global {
	prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in dev
declare const global: CustomNodeJSGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
	global.prisma = prisma;
}

export default prisma;
