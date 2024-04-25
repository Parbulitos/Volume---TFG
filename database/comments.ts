import {Comments, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
export const getCommentById = async (id: string)=>{
    return prisma.comments.findUnique({
        where:{
            id: id
        }
    })
}

export const getAllComments = async (): Promise<Comments[]>=>{
    return prisma.comments.findMany()
}

export const addComment = async(comment: Comments)=>{
    return prisma.comments.create({
        data: comment
    });
}

export const deleteCommentById = async (id:string)=>{
    return prisma.comments.delete({
        where: {
            id: id
        }
    });
}