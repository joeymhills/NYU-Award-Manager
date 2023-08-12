import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client"

export async function GET(req: NextRequest) {
    if (req.method === "GET") {
        try {
            const userList = await prisma.user.findMany({
                where: {
                  role: 'manager'
                },
              })

            return NextResponse.json({ userList })
        }
        catch (error) {
          console.log("error in get user")
    }
    }
}