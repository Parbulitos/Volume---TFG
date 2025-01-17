import { ModelItems } from '@prisma/client';
import { getPrismaInstance } from '@/database/prismaClient';

const prisma = getPrismaInstance();
export const addModelItem = async (model: ModelItems) => {
    return prisma.modelItems.create({
        data: model,
    });
};

export const addMultipleModelItems = async (models: ModelItems[]) => {
    return prisma.modelItems.createMany({
        data: models,
    });
};

export const getModelItemsByParentId = async (modelParentId: string): Promise<ModelItems[]> => {
    return prisma.modelItems.findMany({
        where: {
            modelParentId: modelParentId,
        },
    });
};

export const getModelItemById = (id: string) => {
    return prisma.modelItems.findUnique({
        where: {
            id: id,
        },
    });
};
