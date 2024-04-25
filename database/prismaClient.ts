import { PrismaClient } from '@prisma/client';

let prismaInstance: PrismaClient;

const getPrismaInstance = (): PrismaClient => {
    if (!prismaInstance) {
        prismaInstance = new PrismaClient();
    }
    return prismaInstance;
};

export { getPrismaInstance };
