import type {NextApiRequest, NextApiResponse} from "next";
import {Models} from "@prisma/client";
import {addModel, deleteModelById} from "@/database/models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === 'DELETE'){
            const id = req.query.id as string;
            const model = await deleteModelById(id)
            res.status(200).json({
                success: model
            })
        }
    }catch(e: any){
        console.error('An error has occurred. No model was deleted ',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}