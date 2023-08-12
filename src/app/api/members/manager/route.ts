import { prisma } from "lib/prisma"
import { NextRequest, NextResponse } from "next/server";

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