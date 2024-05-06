import type {NextApiRequest, NextApiResponse} from "next";
import {Models} from "@prisma/client";
import {addModel} from "@/database/models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === 'POST'){
            const model = req.body as Models;
            await addModel(model)
            res.status(200).json({
                success: model
            })
        }
    }catch(e: any){
        console.error('An error has occurred. No model was added ',e)
        //Eliminar archivo del bucket para integridad de datos
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}