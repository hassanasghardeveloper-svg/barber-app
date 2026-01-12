import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const appointments = await prisma.appointment.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(appointments);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching appointments" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Appointment POST received:", body);
        const { name, phone, service, email, gender, barber } = body;

        // 1. Check Settings
        const settings = await prisma.settings.findFirst();
        if (settings) {
            // Manual Switch Check
            if (!settings.isQueueOpen) {
                return NextResponse.json({ error: "The queue is currently closed by the admin." }, { status: 403 });
            }

            // Automatic Time Check
            if (settings.openTime && settings.closeTime) {
                // Get current time in UTC+5 (Pakistan Standard Time)
                // In production, we should probably make timezone a setting, but hardcoding for user's context now.
                const now = new Date();
                const pkTime = new Date(now.getTime() + (5 * 60 * 60 * 1000));
                const currentHour = pkTime.getUTCHours();
                const currentMin = pkTime.getUTCMinutes();

                const currentTimeVal = currentHour * 60 + currentMin;

                const [openH, openM] = settings.openTime.split(':').map(Number);
                const [closeH, closeM] = settings.closeTime.split(':').map(Number);

                const openTimeVal = openH * 60 + openM;
                const closeTimeVal = closeH * 60 + closeM;

                if (currentTimeVal < openTimeVal || currentTimeVal >= closeTimeVal) {
                    return NextResponse.json({
                        error: `We are closed. Hours: ${settings.openTime} - ${settings.closeTime}`
                    }, { status: 403 });
                }
            }
        }

        // Calculate queue number (max + 1)
        const lastAppt = await prisma.appointment.findFirst({
            orderBy: { queueNumber: 'desc' }
        });
        const nextQueueNum = (lastAppt?.queueNumber || 99) + 1;
        console.log("Calculated queue number:", nextQueueNum);

        const newAppointment = await prisma.appointment.create({
            data: {
                name,
                phone,
                service,
                email,
                gender,
                barber,
                appointmentDate: body.appointmentDate,
                appointmentTime: body.appointmentTime,
                queueNumber: nextQueueNum,
                status: 'Scheduled'
            }
        });
        console.log("Appointment created in DB:", newAppointment);

        // Trigger email if provided (This comment was here before, logic is separate)

        return NextResponse.json(newAppointment);
    } catch (error: any) {
        console.error("Error creating appointment:", error);
        return NextResponse.json({ error: "Error creating appointment", details: error.message }, { status: 500 });
    }
}
