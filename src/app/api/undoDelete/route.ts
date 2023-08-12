import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../prisma/client"

export async function POST(req:NextRequest) {

    try {
        const { undoId } = await req.json()

        const response = await prisma.accoladeBackup.findUnique({
        where: {
            id: undoId
        }})

        const {id, name, institution, outcome, extSource, intSource, messaging, frequency, notifDate, 
        cmcontact, sourceatr, wherepubint, promotionlim,comments, imgurl1, imgurl2,imgurl3,imgurl4} = response

                
        await prisma.accolade.create({
            
            data: {
            institution, name, comments, outcome, extSource,
            intSource, messaging, frequency, notifDate, cmcontact,
            sourceatr, wherepubint, promotionlim, imgurl1, imgurl2,
            imgurl3, imgurl4
            }})

            await prisma.accoladeBackup.delete({
                where: {
                    id: undoId
            }})

                return NextResponse.json({message:"success"}, {status:200})
            } 
            
            catch(error) {
            return NextResponse.json({status:500})
            }

    }
