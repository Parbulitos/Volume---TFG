import type { NextApiRequest, NextApiResponse } from 'next';
import { getModelItemById } from '@/database/modelItems';
import { supabaseClient } from '@/database/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const modelItemId = req.query.modelitemid as string;
            const modelItem = await getModelItemById(modelItemId);

            const modelItemUrl = supabaseClient.storage
                .from('ModelsBucket')
                .getPublicUrl(modelItem?.modelUrl || '');

            res.status(200).json({
                url: modelItemUrl.data.publicUrl,
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