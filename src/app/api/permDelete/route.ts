import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../prisma/client"

export async function POST(req:NextRequest, res:NextResponse) {
        const id = await req.json()
            try {
                await prisma.accoladeBackup.delete({
                    where: {
                        id
                }})
                const acc = await prisma.accoladeBackup.findUnique({
                    where: {
                        id
                }})
                return NextResponse.json({message:"success!", acc}, {status:200})

            } catch {
                return NextResponse.json({message:"permDelete failed", id}, {status:500})
            }
    }