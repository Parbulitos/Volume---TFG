import type {NextApiRequest, NextApiResponse} from "next";
import {Models} from "@prisma/client";
import {addModel, deleteModelById} from "@/database/models";
import {deleteCourseById} from "@/database/courses";
import {deleteCollectionById} from "@/database/collections";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === 'DELETE'){
            const id = req.query.id as string;
            const collection = await deleteCollectionById(id)
            res.status(200).json({
                collection: collection
            })
        }
    }catch(e: any){
        console.error('An error has occurred. No model was deleted ',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}