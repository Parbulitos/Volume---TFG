import type {NextApiRequest, NextApiResponse} from "next";
import {Courses, Models} from "@prisma/client";
import {addModel} from "@/database/models";
import {addCourse} from "@/database/courses";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === 'POST'){
            const course = req.body as Courses;
            await addCourse(course)
            res.status(200).json({
                success: course
            })
        }
    }catch(e: any){
        console.error('An error has occurred. No model was added ',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}