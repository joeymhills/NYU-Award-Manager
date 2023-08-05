import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === "GET") {
        try {
            const accolades = await prisma.accoladeBackup.findMany()

            res.status(200).json({ accolades })
        }
        catch (error) {
            
        res.status(500).end();
    }
    }
}