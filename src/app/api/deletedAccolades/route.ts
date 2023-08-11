import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    
        try {
            const accolades = await prisma.accoladeBackup.findMany()

            return new NextResponse(JSON.stringify(accolades))}
        catch (error) {
            
            return new NextResponse("error")}
    }
    
