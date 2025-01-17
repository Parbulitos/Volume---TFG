import type { NextApiRequest, NextApiResponse } from 'next';
import { ModelItems } from '@prisma/client';
import { addModelItem } from '@/database/modelItems';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const modelItem = req.body as ModelItems;
            const modelItemUploaded = await addModelItem(modelItem);
            res.status(200).json({
                modelItem: modelItemUploaded,
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
