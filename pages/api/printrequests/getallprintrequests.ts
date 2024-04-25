import type {NextApiRequest, NextApiResponse} from 'next'
import {getAllModels} from "@/database/models";
import {getAllPrintRequests} from "@/database/printrequests";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === 'GET'){
            const printRequests = await getAllPrintRequests()
            res.status(200).json({
                printRequests: printRequests
            })
        }
    } catch (e: any) {
        console.error('An error has occurred. No models retrieved',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}