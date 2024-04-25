import type {NextApiRequest, NextApiResponse} from "next";
import {Collections, Courses, Models} from "@prisma/client";
import {addModel} from "@/database/models";
import {addCourse} from "@/database/courses";
import {addCollection} from "@/database/collections";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === 'POST'){
            const collection = req.body as Collections;
            await addCollection(collection)
            res.status(200).json({
                collection: collection
            })
        }
    }catch(e: any){
        console.error('An error has occurred. No model was added ',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}