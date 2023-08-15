import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(req: NextRequest) {
        
    const { search } = await req.json();
    console.log(search)
    try {
        const accolade = await prisma.accolade.findMany({
            where: {
                OR: [
                {
                    name: {
                        contains: search,
                    },
                },
                {
                    institution: {
                        contains: search,
                    },
                },
                {
                    serviceLine: {
                        contains: search,
                    },
                },
                {
                    outcome: {
                        contains: search,
                    },
                },                {
                    messaging: {
                        contains: search,
                    },
                },
                {
                    comments: {
                        contains: search,
                    },
                },
                {
                    extSource: {
                        contains: search,
                    },
                },
                {
                    intSource: {
                        contains: search,
                    },
                },
                {
                    sourceatr: {
                        contains: search,
                    },
                },
                {
                    wherepubint: {
                        contains: search,
                    },
                },

            ],
        },
    });
    
    return NextResponse.json({ accolade })
    }   
    catch (error) {}
    return NextResponse.json({search}, {status: 500})
    }


