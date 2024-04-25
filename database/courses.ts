import { Courses, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()
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