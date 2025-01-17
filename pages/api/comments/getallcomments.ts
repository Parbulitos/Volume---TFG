import type {NextApiRequest, NextApiResponse} from 'next'
import {getAllComments} from "@/database/comments";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === 'GET'){
            const comments = await getAllComments()
            res.status(200).json({
                comments: comments
            })
        }
    } catch (e: any) {
        console.error('An error has occurred. No models retrieved',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}