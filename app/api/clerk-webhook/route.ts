import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    const payload = await req.json();
    const headers = req.headers;
    const svixHeaders = {
        "svix-id": headers.get("svix-id") ?? "",
        "svix-timestamp": headers.get("svix-timestamp") ?? "",
        "svix-signature": headers.get("svix-signature") ?? "",
    };

    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    const wh = new Webhook(webhookSecret!);

    try {
        // Verify webhook
        const evt = wh.verify(JSON.stringify(payload), svixHeaders) as any;
        
        if (evt.type === "user.created") {
            const { id, first_name, last_name, email_addresses, created_at, updated_at } = evt.data;
            const userData = await prisma.user.findUnique({ where: {
                userId: id
            }});
            if (userData) {
                return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
            }
            await prisma.user.create({data : {
                userId: id,
                name: first_name + " " + last_name,
                email: email_addresses[0].email_address,
                createdAt: new Date(created_at),
                updatedAt: new Date(updated_at),
                lastSignedIn: new Date(created_at)
            }})
        } else if (evt.type === "user.deleted") {
            const { id, deleted } = evt.data;
            const userdata = await prisma.user.findFirst({ where: { userId: id } });
            if (userdata && deleted) {
                await prisma.user.delete({ where: { userId: id } });
            }
        } else if (evt.type === "session.created") {
            const { user_id, created_at } = evt.data;
            // console.log("Updating session for user with userId:", user_id);
            // console.log(evt.data);
            const userdata = await prisma.user.findUnique({ where: { userId: user_id } });
            if (userdata){
                await prisma.user.update({ where: { userId: user_id }, data: { lastSignedIn: new Date(created_at) } });

            }
        } else if (evt.type === "user.updated") {
            const { id, updated_at } = evt.data;
            // console.log(updated_at);
            const userdata = await prisma.user.findUnique({ where: { userId: id } });
            if (userdata){
                await prisma.user.update({ where: { userId: id }, data: { updatedAt: new Date(updated_at) } });
            }
        }
        return NextResponse.json({ message: "Last sign-in updated" });
    } catch (err) {
        // console.log(err);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}