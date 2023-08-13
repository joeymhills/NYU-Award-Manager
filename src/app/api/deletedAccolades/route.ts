import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client"

export async function GET(request: Request) {
console.log(request.url)
        try {
            const accolades = await prisma.accoladeBackup.findMany()

            return new NextResponse(JSON.stringify(accolades))}
        catch (error) {
            
            return new NextResponse("error")}
    }
    
