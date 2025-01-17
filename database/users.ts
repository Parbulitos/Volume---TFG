import {PrismaClient, Users} from '@prisma/client'
import {getPrismaInstance} from "@/database/prismaClient";
import { createClient } from '@supabase/supabase-js'

const prisma = getPrismaInstance();
export const getUserById = async (uid: string)=>{
    return prisma.users.findUnique({
        where:{
            id: uid
        }
    })
}

export const getAllUsers = async (): Promise<Users[]>=>{
    return prisma.users.findMany()
}

export const addUser = async(user: Users)=>{
    const res = await prisma.users.create({
        data: user
    })
}

