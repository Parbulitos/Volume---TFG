import type { NextApiRequest, NextApiResponse } from 'next';
import { addUser, getUserById } from '@/database/users';
import { Users } from '@prisma/client';
import { userAgent } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const user = req.body as Users;
            await addUser(user);
            res.status(200).json({
                success: user,
            });
        }
        throw new Error('Method not allowed');
    } catch (e: any) {
        console.error('An error has occurred. ', e);
        res.status(500).json({
            message: 'Error: ' + e.message,
        });
    }
}
