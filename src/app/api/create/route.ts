
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { NextApiRequest } from "next";
// @ts-nocheck

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

export async function POST(req:NextRequest) {

    const {name, institution, outcome, extSource, intSource, messaging, frequency, notifDate, 
        cmcontact, sourceatr, wherepubint, promotionlim,comments, imgurl1, imgurl2,imgurl3,imgurl4} = req.json()

    try {
        await prisma.accolade.create({
            data: {
                institution, name, comments, outcome, extSource,
                intSource, messaging, frequency, notifDate, cmcontact,
                sourceatr, wherepubint, promotionlim, imgurl1, imgurl2,
                imgurl3, imgurl4

            }})
    return NextResponse.json({ message: 'Success!!' }, { status: 200 })
        } catch (error) {
       return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}