import type { NextApiRequest, NextApiResponse } from 'next'
import {getCourseById} from "@/database/courses";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === 'GET'){
            const id = req.query.id as string
            const course = await getCourseById(id)
            res.status(200).json({
                course: course
            })
        }
    }catch(e: any){
        console.error('An error has occurred. No model retrieved',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}