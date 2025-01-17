import type {NextApiRequest, NextApiResponse} from "next";
import {Comments} from "@prisma/client";
import {addComment} from "@/database/comments";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === 'POST'){
            const comment = req.body as Comments;
            await addComment(comment)
            res.status(200).json({
                success: comment
            })
        }
    }catch(e: any){
        console.error('An error has occurred. No comment was added ',e)
        res.status(500).json({
            message: 'Error: ' + e.message,
        })
    }
}