import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        let settings = await prisma.settings.findFirst();

        if (!settings) {
            // Create default if not exists
            settings = await prisma.settings.create({
                data: {
                    openTime: "10:00",
                    closeTime: "22:00",
                    isQueueOpen: true,
                    shopName: "Premium Cuts",
                    phone: ""
                }
            });
        }
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching settings" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { openTime, closeTime, isQueueOpen, shopName, phone } = body;

        let settings = await prisma.settings.findFirst();

        if (settings) {
            settings = await prisma.settings.update({
                where: { id: settings.id },
                data: { openTime, closeTime, isQueueOpen, shopName, phone }
            });
        } else {
            settings = await prisma.settings.create({
                data: { openTime, closeTime, isQueueOpen, shopName, phone }
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Settings update error:", error);
        return NextResponse.json({ error: "Error updating settings" }, { status: 500 });
    }
}
