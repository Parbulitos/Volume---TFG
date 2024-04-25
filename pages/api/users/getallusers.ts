import type {NextApiRequest, NextApiResponse} from 'next'
import {getAllUsers} from "@/database/users";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === 'GET'){
            const users = await getAllUsers()
            res.status(200).json({
                users: users
            })
        }
    } catch (e: any) {
        console.error('An error has occurred. ',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}