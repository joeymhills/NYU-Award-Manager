
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

interface create {
    institution: string,
    name: string,
    comments: string
    outcome: string
    intSource: string
    extSource: string
    messaging: string
    frequency: string
    notifDate: string
    cmcontact: string
    sourceatr: string
    wherepubint: string
    promotionlim: string
    imgurl:string
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    const {id, name, institution, outcome, extSource, intSource, messaging, frequency, notifDate, 
        cmcontact, sourceatr, wherepubint, promotionlim,comments,imgurl} = req.body

    try {
        await prisma.accolade.update({
            where: {
                id
            },
            
            data: {
                institution, name, comments, outcome, extSource,
                intSource, messaging, frequency, notifDate, cmcontact,
                sourceatr, wherepubint, promotionlim,imgurl

            }})
        res.status(200).json({message: 'accolade updated'})
    } catch (error) {
        res.status(500).json({message: 'error with prisma'})
    }
}