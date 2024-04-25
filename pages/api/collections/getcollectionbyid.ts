import type { NextApiRequest, NextApiResponse } from 'next'
import {getCollectionById} from "@/database/collections";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === 'GET'){
            const id = req.query.id as string
            const collection = await getCollectionById(id)
            res.status(200).json({
                collection: collection
            })
        }
    }catch(e: any){
        console.error('An error has occurred. No model retrieved',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}