import type { NextApiRequest, NextApiResponse } from 'next';
import ImageKit from 'imagekit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const imagekit = new ImageKit({
                publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
                privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || '',
                urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL || '',
            });
            const authenticationParameters = imagekit.getAuthenticationParameters();
            res.status(200).json({
                params: authenticationParameters,
            });
        }
    } catch (e: any) {
        console.error('An error has occurred. No model was added ', e);
        res.status(500).json({
            message: 'Error: ' + e.message,
        });
    }
}
