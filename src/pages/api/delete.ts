import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../prisma/client"

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    const id = req.body

    try {
        await prisma.accolade.delete({
            where: {
                id
            }})
        res.status(200).json({message: 'successfully deleted: ', id})
        console.log('successfully deleted: ', id)
    } catch (error) {
        res.status(500).json({message: 'could not delete: ', id})
        console.log('error with id: ', id)
    }
}