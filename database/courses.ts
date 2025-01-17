import { Courses } from "@prisma/client";
import { getPrismaInstance } from "./prismaClient";

const prisma = getPrismaInstance();
export const getCourseById = async (id: string)=>{
    return prisma.courses.findUnique({
        where:{
            id: id
        }
    })
}

export const getAllCourses = async (): Promise<Courses[]>=>{
    return prisma.courses.findMany()
}

export const addCourse = async(course: Courses)=>{
    return prisma.courses.create({
        data: course
    });
}

export const deleteCourseById = async (id: string)=>{
    return prisma.courses.delete({
        where: {
            id: id
        }
    });
}