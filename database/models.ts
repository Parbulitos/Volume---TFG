import { Models, PrismaClient, Users } from '@prisma/client';

const prisma = new PrismaClient();
export const getModelById = async (id: string) => {
    return prisma.models.findUnique({
        where: {
            id: id,
        },
    });
};

export const getAllModels = async (): Promise<Models[]> => {
    return prisma.models.findMany();
};

export const addModel = async (model: Models) => {
    return prisma.models.create({
        data: model,
    });
};

export const deleteModelById = async (id: string) => {
    return prisma.models.delete({
        where: {
            id: id,
        },
    });
};

export const getCatalogModels = async (amount: number, category?: string, filter?: string) => {
    if (filter && !category) {
        if (filter === 'semana') {
            const limitDate = new Date();
            limitDate.setDate(limitDate.getDate() - 7);
            return prisma.models.findMany({
                take: amount,
                where: {
                    uploadTime: {
                        gte: limitDate,
                    },
                },
                orderBy: {
                    views: 'desc',
                },
            });
        } else if (filter === 'mes') {
            const limitDate = new Date();
            limitDate.setDate(limitDate.getDate() - 30);
            return prisma.models.findMany({
                take: amount,
                where: {
                    uploadTime: {
                        gte: limitDate,
                    },
                },
                orderBy: {
                    views: 'desc',
                },
            });
        } else if (filter === 'año') {
            const limitDate = new Date();
            limitDate.setDate(limitDate.getDate() - 365);
            return prisma.models.findMany({
                take: amount,
                where: {
                    uploadTime: {
                        gte: limitDate,
                    },
                },
                orderBy: {
                    views: 'desc',
                },
            });
        } else if (filter === 'populares') {
            return prisma.models.findMany({
                take: amount,
                orderBy: {
                    views: 'desc',
                },
            });
        }
    }

    if (filter && category) {
        if (filter === 'semana') {
            const limitDate = new Date();
            limitDate.setDate(limitDate.getDate() - 7);
            return prisma.models.findMany({
                take: amount,
                where: {
                    uploadTime: {
                        gte: limitDate,
                    },
                    // @ts-ignore
                    category: category,
                },
                orderBy: {
                    views: 'desc',
                },
            });
        } else if (filter === 'mes') {
            const limitDate = new Date();
            limitDate.setDate(limitDate.getDate() - 30);
            return prisma.models.findMany({
                take: amount,
                where: {
                    uploadTime: {
                        gte: limitDate,
                    },
                    // @ts-ignore
                    category: category,
                },
                orderBy: {
                    views: 'desc',
                },
            });
        } else if (filter === 'año') {
            const limitDate = new Date();
            limitDate.setDate(limitDate.getDate() - 365);
            return prisma.models.findMany({
                take: amount,
                where: {
                    uploadTime: {
                        gte: limitDate,
                    },
                    // @ts-ignore
                    category: category,
                },
                orderBy: {
                    views: 'desc',
                },
            });
        } else if (filter === 'populares') {
            return prisma.models.findMany({
                take: amount,
                where: {
                    // @ts-ignore
                    category: category,
                },
                orderBy: {
                    views: 'desc',
                },
            });
        }
    }

    if (category && !filter) {
        return prisma.models.findMany({
            take: amount,
            where: {
                // @ts-ignore
                category: category,
            },
            orderBy: {
                uploadTime: 'desc',
            },
        });
    }

    return prisma.models.findMany({
        take: amount,
        orderBy: {
            uploadTime: 'desc',
        },
    });
};
