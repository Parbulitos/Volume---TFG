import type { NextApiRequest, NextApiResponse } from 'next';
import { ModelItems } from '@prisma/client';
import { addModelItem, getModelItemById, getModelItemsByParentId } from '@/database/modelItems';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const modelItemId = req.query.modelitemid as string;
            const modelItem = await getModelItemById(modelItemId);
            //console.log(modelItems);
            res.status(200).json({
                modelItem: modelItem,
            });
        }
    } catch (e: any) {
        console.error('An error has occurred. No model was found ', e);
        //Eliminar archivo del bucket para integridad de datos
        res.status(500).json({
            message: 'Error: ' + e.message,
        });
    }
}
