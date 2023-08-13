import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../prisma/client"

export async function POST(req:NextRequest, res:NextResponse) {
        const id = await req.json()
            try {
                await prisma.accoladeBackup.delete({
                    where: {
                        id
                }})
                return NextResponse.json({message:"success!"}, {status:200})

            } catch {
                return NextResponse.json({message:"permDelete failed", id}, {status:500})
            }
    }