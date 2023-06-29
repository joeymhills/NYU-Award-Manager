import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    const { id } = req.body

    try {
        await prisma.accolade.delete({
            where: {
                id
            }})
        res.status(200).json({message: 'accolade deleted'})
    } catch (error) {
        res.status(500).json({message: 'error with prisma'})
    }
}