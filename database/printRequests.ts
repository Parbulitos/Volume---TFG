import {Models, PrintRequests, PrismaClient, Users} from "@prisma/client";

const prisma = new PrismaClient()
export const getPrintRequestById = async (id: string)=>{
    return prisma.printRequests.findUnique({
        where:{
            id: id
        }
    })
}

export const getAllPrintRequests = async (): Promise<PrintRequests[]>=>{
    return prisma.printRequests.findMany()
}

export const addPrintRequest = async(printRequest: PrintRequests)=>{
    return prisma.printRequests.create({
        data: printRequest
    });
}

export const deletePrintRequestById = async (id:string)=>{
    return prisma.printRequests.delete({
        where: {
            id: id
        }
    });
}