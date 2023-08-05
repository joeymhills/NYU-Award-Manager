import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === "POST") {
        const userId = req.body.userId
        const username = req.body.username
        try {
            const users = await prisma.users.findUnique({
                where: {
                  userId: userId
                },
              })

            if (users == null) {
                await prisma.users.create({
                    data: {
                      userId: userId,
                      role: 'unassigned',
                      name: username
                    },
                  })
                const user = await prisma.users.findUnique({
                    where: {
                    userId: userId
                },
              })
              res.status(200).json({ users })}

            else{
            res.status(200).json({ users })}
        }
        catch (error) {
        res.status(500).end();
    }
    }
}
