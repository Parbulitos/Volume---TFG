import type { NextApiRequest, NextApiResponse } from 'next';
import { ModelItems } from '@prisma/client';
import { addModelItem, addMultipleModelItems } from '@/database/modelItems';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const modelItems = req.body as ModelItems[];
            const modelItemsUploaded = await addMultipleModelItems(modelItems);
            res.status(200).json({
                success: true,
            });
        }
    } catch (e: any) {
        console.error('An error has occurred. No models were added ', e);
        //Eliminar archivo del bucket para integridad de datos
        res.status(500).json({
            message: 'Error: ' + e.message,
        });
    }
}
