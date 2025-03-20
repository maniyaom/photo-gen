import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Set cache duration in seconds (10 minutes = 600 seconds)
const CACHE_DURATION = 600;

export async function GET() {
    const images = await prisma.image.findMany(
        {
            where: {
                isPublic: true
            },
            select: {
                id: true,
                url: true,
                title: true,
                imageTags: {
                    select: {
                        tag: {
                            select: {
                                tagName: true
                            }
                        }
                    }
                }
            }
        }
    );
    const imageData = images.map(({ id, url, title, imageTags }) => ({
        id,
        url,
        title,
        tags: imageTags.map(({ tag }) => tag.tagName)
    }));

    return NextResponse.json(
        { success: true, message: imageData },
        {
            status: 200,
            headers: {
                // Set Cache-Control header for 10 minutes
                "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=30`,
            },
        }
    );
}

// Route segment config for Next.js
export const dynamic = "force-dynamic";
export const revalidate = CACHE_DURATION;