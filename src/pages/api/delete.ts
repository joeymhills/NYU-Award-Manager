import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../prisma/client"


export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    console.log("req is: ", req.body)
    const payload = req.body

    try {
        await prisma.accolade.delete({
            where: {
                id: payload
            }})
        res.status(200).json({message: 'successfully deleted: '})
        console.log('successfully deleted: ')
    } catch (error) {
        res.status(500).json({message: 'unable to delete: '})
        console.log('error with id:', payload)
    }
}