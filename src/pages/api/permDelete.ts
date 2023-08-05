import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    if (req.method === "POST") {
        const id = req.body
        
            try {
                await prisma.accoladeBackup.delete({
                    where: {
                        id: id
                }})
                res.status(200).json({message: 'successful deleted'})

            } catch {
                res.status(500).json({message: 'error in findUnique'})        
            }

    }}