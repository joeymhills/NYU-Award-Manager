import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === "GET") {
        try {
            const userList = await prisma.users.findMany({
                where: {
                  role: 'manager'
                },
              })

            res.status(200).json({ userList })
        }
        catch (error) {
        res.status(500).end();
    }
    }
}