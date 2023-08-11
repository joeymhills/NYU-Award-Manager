import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    if (req.method === "GET") {
        try {
            const userList = await prisma.user.findMany({
                where: {
                  role: 'unassigned'
                },
              })

            return NextResponse.json({ userList })
        }
        catch (error) {
          console.log("error in get user")
    }
    }
}