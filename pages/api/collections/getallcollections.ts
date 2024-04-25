import type {NextApiRequest, NextApiResponse} from 'next'
import {getAllCollections} from "@/database/collections";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === 'GET'){
            const collections = await getAllCollections()
            res.status(200).json({
                collections: collections
            })
        }
    } catch (e: any) {
        console.error('An error has occurred. No models retrieved',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}