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
                const [openH, openM] = settings.openTime.split(':').map(Number);
                const [closeH, closeM] = settings.closeTime.split(':').map(Number);
                const openTimeVal = openH * 60 + openM;
                const closeTimeVal = closeH * 60 + closeM;

                let checkTimeVal = 0;

                if (body.appointmentTime) {
                    // FIX: Parsing logic for "hh:mm AA" format (e.g. "02:00 PM - 02:30 PM")
                    // Previously this failed and treated PM times as AM (e.g. 2 PM became 2 AM, which is closed)
                    try {
                        const slotStart = body.appointmentTime.split(' - ')[0]; // "02:00 PM"
                        const parts = slotStart.split(' '); // ["02:00", "PM"]

                        if (parts.length >= 2) {
                            const [hStr, mStr] = parts[0].split(':');
                            const modifier = parts[1];

                            let h = Number(hStr);
                            let m = Number(mStr);

                            // Convert 12h to 24h
                            if (modifier === 'PM' && h < 12) h += 12;
                            if (modifier === 'AM' && h === 12) h = 0;

                            checkTimeVal = h * 60 + m;
                            console.log(`Parsed Time: ${h}:${m} (Val: ${checkTimeVal}) from ${body.appointmentTime}`);
                        } else {
                            // Fallback if format is unexpected
                            console.warn("Unexpected time format:", body.appointmentTime);
                            // Allow it to pass if we can't parse it, rather than blocking the user
                            checkTimeVal = openTimeVal + 1;
                        }
                    } catch (e) {
                        console.error("Time parse error, allowing:", e);
                        checkTimeVal = openTimeVal + 1; // Fail open
                    }
                } else {
                    // Check vs Current Time (Legacy Queue Mode)
                    const now = new Date();
                    const pkTime = new Date(now.getTime() + (5 * 60 * 60 * 1000));
                    const currentHour = pkTime.getUTCHours();
                    const currentMin = pkTime.getUTCMinutes();
                    checkTimeVal = currentHour * 60 + currentMin;
                }

                if (checkTimeVal < openTimeVal || checkTimeVal >= closeTimeVal) {
                    console.log(`Shop Closed Rejection: ${checkTimeVal} is not between ${openTimeVal} and ${closeTimeVal}`);
                    return NextResponse.json({
                        error: `Shop is closed. Hours: ${settings.openTime} - ${settings.closeTime}`
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
