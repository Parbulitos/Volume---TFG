import type { NextApiRequest, NextApiResponse } from 'next';
import { ModelItems } from '@prisma/client';
import { addModelItem, getModelItemsByParentId } from '@/database/modelItems';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const modelparentId = req.query.modelparentid as string;
            const modelItems = await getModelItemsByParentId(modelparentId);
            //console.log(modelItems);
            res.status(200).json({
                modelItems: modelItems,
            });
        }
    } catch (e: any) {
        console.error('An error has occurred. No model was added ', e);
        //Eliminar archivo del bucket para integridad de datos
        res.status(500).json({
            message: 'Error: ' + e.message,
        });
    }
}
