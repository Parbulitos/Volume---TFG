import type { NextApiRequest, NextApiResponse } from 'next';
import { getModelsByWord } from '@/database/models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const filter = req.query.search as string;
            const modelItems = await getModelsByWord(filter);
            //console.log(modelItems);
            res.status(200).json({
                modelItems: modelItems,
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
