import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../prisma/client"


export default async function POST(req:NextRequest, res:NextResponse) {

    const payload = await req.json()
    try {
        await prisma.accolade.delete({
            where: {
                id: payload
            }})
        return NextResponse.json({message:"success"}, {status:200})
    } catch (error) {
        return NextResponse.json({status:500})
    }
}
