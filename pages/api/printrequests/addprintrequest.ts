import type { NextApiRequest, NextApiResponse } from 'next';
import { Models, PrintRequests } from '@prisma/client';
import { addModel } from '@/database/models';
import { addPrintRequest } from '@/database/printRequests';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const printRequest = req.body as PrintRequests;
            await addPrintRequest(printRequest);
            res.status(200).json({
                success: printRequest,
            });
        }
    } catch (e: any) {
        console.error('An error has occurred. No model was added ', e);
        res.status(500).json({
            message: 'Error: ' + e.message,
        });
    }
}
