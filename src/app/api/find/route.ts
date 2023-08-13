import prisma from "../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

        try {
            const { id } = await req.json();
            const accolade = await prisma.accolade.findUnique({
                where: {
                  id
                },
              })
    
        return NextResponse.json({ accolade })  
            }  
    catch (error) {
        return NextResponse.json({}, {status: 500})
    }
}
