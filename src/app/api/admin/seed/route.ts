import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const report = [];

        // 1. Seed Settings
        const settings = await prisma.settings.findFirst();
        if (!settings) {
            await prisma.settings.create({
                data: {
                    shopName: "Premium Cuts",
                    openTime: "10:00",
                    closeTime: "22:00",
                    isQueueOpen: true,
                    heroTitle: "Premium Cuts Sialkot",
                    heroSubtitle: "Experience the art of grooming.",
                }
            });
            report.push("Created Default Settings");
        } else {
            report.push("Settings already exist");
        }

        // 2. Seed Admin
        const adminCount = await prisma.adminUser.count();
        if (adminCount === 0) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            await prisma.adminUser.create({
                data: {
                    email: "admin@premiumcuts.com",
                    password: hashedPassword,
                    role: "SUPER_ADMIN"
                }
            });
            report.push("Created Super Admin (admin@premiumcuts.com / admin123)");
        }

        // 3. Seed Barbers
        const barberCount = await prisma.barber.count();
        if (barberCount === 0) {
            await prisma.barber.createMany({
                data: [
                    { name: "Any Professional", specialty: "General", image: "/avatars/any.png" },
                    { name: "Ali", specialty: "Fade Master", image: "/avatars/ali.png" },
                    { name: "Hassan", specialty: "Beard Specialist", image: "/avatars/hassan.png" },
                    { name: "Ahmed", specialty: "Classic Cuts", image: "/avatars/ahmed.png" },
                ]
            });
            report.push("Created 4 Default Barbers");
        }

        // 4. Seed Services
        const serviceCount = await prisma.service.count();
        if (serviceCount === 0) {
            await prisma.service.createMany({
                data: [
                    // Male
                    { name: "Signature Haircut", price: 30, duration: 30, category: "Male" },
                    { name: "Skin Fade", price: 35, duration: 45, category: "Male" },
                    { name: "Beard Sculpt & Shape", price: 25, duration: 20, category: "Male" },
                    // Female
                    { name: "Style Cut & Finish", price: 45, duration: 60, category: "Female" },
                    { name: "Dry Cut", price: 35, duration: 30, category: "Female" },
                ]
            });
            report.push("Created Default Services");
        }

        return NextResponse.json({ success: true, report });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
