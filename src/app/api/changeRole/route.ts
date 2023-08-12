import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../prisma/client"

export async function POST(req:NextRequest, res:NextResponse) {

    // const id = req.body.roleId
    // const role = req.body.role

    const response = await req.json()

    const { id, role} = response

    try {
        await prisma.user.update({
            where: {
                id: id.id
            },
            
            data: {
            role
            }})
            return NextResponse.json({ message: 'Success!!' }, { status: 200 })
        } catch (error) {
            return NextResponse.json({ message: id }, { status: 500 })
    }
}