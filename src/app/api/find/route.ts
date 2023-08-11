import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const payload = req.body.id

            const accolade = await prisma.accolade.findUnique({
                where: {
                  id: payload
                },
              })
    
    res.status(200).json({ accolade })}
    
    catch (error) {
        res.status(500).end();
    }
    }
}
