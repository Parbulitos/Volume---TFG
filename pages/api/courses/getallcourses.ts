import type {NextApiRequest, NextApiResponse} from 'next'
import {getAllModels} from "@/database/models";
import {getAllCourses} from "@/database/courses";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === 'GET'){
            const courses = await getAllCourses()
            res.status(200).json({
                courses: courses
            })
        }
    } catch (e: any) {
        console.error('An error has occurred. No models retrieved',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}