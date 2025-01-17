import type { NextApiRequest, NextApiResponse } from 'next';
import NodeStl from 'node-stl';
import { supabaseClient } from '@/database/utils';

export const config = {
    api: {
        bodyParser: false, // Deshabilitar el analizador de cuerpo predeterminado
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const fileUrl = req.query.fileurl as string;
            const filePath = req.query.filepath as string;
            await fetch(fileUrl)
                .then((response) => {
                    return response.arrayBuffer();
                })
                .then((buffer) => {
                    const stl = new NodeStl(Buffer.from(buffer));
                    supabaseClient.storage.from('BudgetBucket').remove([filePath]);
                    res.status(200).json({
                        success: true,
                        stl: stl,
                    });
                });
        }
    } catch (e: any) {
        console.error('An error has occurred. ', e);
        res.status(500).json({
            message: 'Error: ' + e.message,
        });
    }
}
