import type { NextApiRequest, NextApiResponse } from 'next';
import { getModelById } from '@/database/models';
import { getPrintRequestById } from '@/database/printRequests';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const id = req.query.id as string;
            const printRequest = await getPrintRequestById(id);
            res.status(200).json({
                printRequest: printRequest,
            });
        }
    } catch (e: any) {
        console.error('An error has occurred. No model retrieved', e);
        res.status(500).json({
            message: 'Error: ' + e.message,
        });
    }
}
