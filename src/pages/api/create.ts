import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";


export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    const {name, institution, outcome, extSource, intSource, messaging, frequency, notifDate, 
        cmcontact, sourceatr, wherepubint, promotionlim,comments} = req.body

    try {
        await prisma.accolade.create({
            data: {
                institution, name, comments, outcome, extSource,
                intSource, messaging, frequency, notifDate, cmcontact,
                sourceatr, wherepubint, promotionlim

            }})
        res.status(200).json({message: 'accolade created'})
    } catch (error) {
        res.status(500).json({message: 'error with prisma appending'})
    }
}