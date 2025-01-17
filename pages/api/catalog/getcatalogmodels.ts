import type { NextApiRequest, NextApiResponse } from 'next';
import { ModelItems } from '@prisma/client';
import { addModelItem, addMultipleModelItems } from '@/database/modelItems';
import { getCatalogModels } from '@/database/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const amount = req.query.amount as string;
            const category = req.query.category as string;
            const filter = req.query.filter as string;
            const models = await getCatalogModels(parseInt(amount), category, filter);
            res.status(200).json({
                models: models,
            });
        }
    } catch (e: any) {
        console.error('An error has occurred. No models were found ', e);
        //Eliminar archivo del bucket para integridad de datos
        res.status(500).json({
            message: 'Error: ' + e.message,
        });
    }
}
