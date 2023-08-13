
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

export async function PUT(req:NextRequest, res:NextResponse) {

    const {id, name, institution, outcome, extSource, intSource, messaging, frequency, notifDate, 
        cmcontact, sourceatr, wherepubint, promotionlim,comments,imgurl1,imgurl2,imgurl3,imgurl4} = await req.json()

    try {
        await prisma.accolade.update({
            where: {
                id
            },
            
            data: {
                institution, name, comments, outcome, extSource,
                intSource, messaging, frequency, notifDate, cmcontact,
                sourceatr, wherepubint, promotionlim, imgurl1, imgurl2, imgurl3, imgurl4

            }})
        return NextResponse.json({ message: 'Success!!', name }, { status: 200 })
        } catch (error) {
        return NextResponse.json({ message: 'error in update award', name }, { status: 500 })
        }
}