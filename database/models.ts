import {Models, PrismaClient, Users} from "@prisma/client";

const prisma = new PrismaClient()
export const getModelById = async (id: string)=>{
    return prisma.models.findUnique({
        where:{
            id: id
        }
    })
}

export const getAllModels = async (): Promise<Models[]>=>{
    return prisma.models.findMany()
}

export const addModel = async(model: Models)=>{
    return prisma.models.create({
        data: model
    });
}

export const deleteModelById = async (id:string)=>{
    return prisma.models.delete({
        where: {
            id: id
        }
    });
}