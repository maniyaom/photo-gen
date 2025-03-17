import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req: NextRequest, res: NextResponse) {
    const images = await prisma.image.findMany(
        {
            where: {
                isPublic: true
            },
            select: {
                url: true
            }
        }
    );

    let imageList = []
    for(let i=0; i<images.length; i++) {
        imageList.push(images[i].url);
    }
    return NextResponse.json({ success: true, message: imageList }, { status: 200 });
}