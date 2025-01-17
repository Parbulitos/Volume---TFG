import type {NextApiRequest, NextApiResponse} from 'next'
import {getAllModels} from "@/database/models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === 'GET'){
            const models = await getAllModels()
            res.status(200).json({
                models: models
            })
        }
    } catch (e: any) {
        console.error('An error has occurred. No models retrieved',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}