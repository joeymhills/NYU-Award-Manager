
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
    imgurl1:string
    imgurl2:string
    imgurl3:string
    imgurl4:string
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    const {name, institution, outcome, extSource, intSource, messaging, frequency, notifDate, 
        cmcontact, sourceatr, wherepubint, promotionlim,comments, imgurl1, imgurl2,imgurl3,imgurl4} = req.body

    try {
        await prisma.accolade.create({
            data: {
                institution, name, comments, outcome, extSource,
                intSource, messaging, frequency, notifDate, cmcontact,
                sourceatr, wherepubint, promotionlim, imgurl1, imgurl2,
                imgurl3, imgurl4

            }})
        res.status(200).json({message: 'accolade created'})
    } catch (error) {
        res.status(500).json({message: 'error with prisma appending'})
    }
}