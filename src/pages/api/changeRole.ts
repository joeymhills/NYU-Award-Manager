import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    const id = req.body.roleId
    const role = req.body.role

    try {
        await prisma.users.update({
            where: {
                userId: id.userId
            },
            
            data: {
            role
            }})
        res.status(200).json({message: 'accolade updated'})
    } catch (error) {
        res.status(500).json({message: 'error with prisma'})
    }
}