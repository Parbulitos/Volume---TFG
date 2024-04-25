import type { NextApiRequest, NextApiResponse } from 'next'
import {getUserById} from "@/database/users";
import { Users } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === 'GET'){
            const uid = req.query.id as string
            const user = await getUserById(uid)
            res.status(200).json({
                user: user
            })
        }
    }catch(e: any){
        console.error('An error has occurred. ',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}