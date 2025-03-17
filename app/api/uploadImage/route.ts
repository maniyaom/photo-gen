import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from '@clerk/nextjs/server'

const prisma = new PrismaClient();

export function GET(req: NextRequest) {
    return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
}

export async function POST(req: NextRequest, res: NextResponse) {
    const { prompt, image_base64 } = await req.json();
    const { userId } = await auth();

    const userdata = await prisma.user.findUnique({
        where: {
            userId
        }
    })
    console.log(userdata);

    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!prompt || !image_base64) {
        return NextResponse.json({ success: false, message: "Prompt and image in base64 are required" }, { status: 400 });
    }

    const uploadResponse = await uploadToCloudinary(image_base64);
    if (!uploadResponse.success) {
        return NextResponse.json({ success: false, message: "Failed to upload image" }, { status: 500 });
    }

    await prisma.image.create({
        data: {
            userId: userId,
            filename: uploadResponse.message.display_name,
            url: uploadResponse.message.url,
            format: uploadResponse.message.format,
            prompt: prompt,
            isPublic: true
        }
    });
    return NextResponse.json({ success: true, message: "Image uploaded successfully" }, { status: 200 });
}

// TODO: Add try catch block
async function uploadToCloudinary(image_base64: string) {
    cloudinary.config({
        cloud_name: 'dowkx2c16',
        api_key: '251451237441947',
        api_secret: 'DzyG4KvbY9NDi9yuFHp4_U7b21U'
    })
    const uploadResult = await cloudinary.uploader
        .upload(
            image_base64, {
            resource_type: 'auto'
        }
        )
        .catch((error) => {
            console.log(error);
        });

    return { success: true, message: uploadResult };

    // // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });

    // console.log(optimizeUrl);

    // // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });

    // console.log(autoCropUrl);
}