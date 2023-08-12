import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../prisma/client"


export async function POST(req:NextRequest, res:NextResponse) {

            try {
                const payload = await req.json()
                const response = await prisma.accolade.findUnique({
                where: {
                    id: payload
                }})
                const {id, name, institution, outcome, extSource, intSource, messaging, frequency, notifDate, 
                cmcontact, sourceatr, wherepubint, promotionlim,comments, imgurl1, imgurl2,imgurl3,imgurl4} = response

                
                await prisma.accoladeBackup.create({
                    data: {
                        institution, name, comments, outcome, extSource,
                        intSource, messaging, frequency, notifDate, cmcontact,
                        sourceatr, wherepubint, promotionlim, imgurl1, imgurl2,
                        imgurl3, imgurl4
                }})

                await prisma.accolade.delete({
                    where: {
                        id: payload
                }})
            return NextResponse.json({message:"success!"}, {status:200})

            } catch {
                
            return NextResponse.json({message:"error in /api/delete"}, {status:500})
            }

    }