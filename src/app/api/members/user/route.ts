import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client"

export async function GET(request: Request) {
  console.log(request.url)
  try {
            const userList = await prisma.user.findMany({
                where: {
                  role: 'user'
                },
              })

            return NextResponse.json({ userList })
        }
        catch (error) {
          console.log("error in get user")
    }
  }