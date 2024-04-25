import {Collections, Comments, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export const getCollectionById = async (id: string)=>{
    return prisma.collections.findUnique({
        where:{
            id: id
        }
    })
}

export const getAllCollections = async (): Promise<Collections[]>=>{
    return prisma.collections.findMany()
}

export const addCollection = async(collection: Collections)=>{
    return prisma.collections.create({
        data: collection
    });
}

export const deleteCollectionById = async (id:string)=>{
    return prisma.collections.delete({
        where: {
            id: id
        }
    });
}