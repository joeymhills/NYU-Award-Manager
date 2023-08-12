import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../prisma/client"


export async function POST(req:NextRequest, res:NextResponse) {
    
    const payload = await req.json()   
    const response = await prisma.accolade.findUnique({
        where: {
            id: payload
        }})
        const {id, name, institution, outcome, extSource, intSource, messaging, frequency, notifDate, 
            cmcontact, sourceatr, wherepubint, promotionlim,comments, imgurl1, imgurl2,imgurl3,imgurl4} = response
            
            try{
                await prisma.accoladeBackup.create({
                    data: {
                        institution, name, comments, outcome, extSource,
                        intSource, messaging, frequency, notifDate, cmcontact,
                        sourceatr, wherepubint, promotionlim, imgurl1, imgurl2,
                        imgurl3, imgurl4
                }})}
            catch(e) {
                return NextResponse.json({message: e},{status:500})
            }
        
            try {
                await prisma.accolade.delete({
                    where: {
                        id: payload
                }})}
            catch(e) {
                return NextResponse.json({message: e},{status:500})
            }
        
            
            return NextResponse.json({message:"success!"},{status:200})

        } 
    