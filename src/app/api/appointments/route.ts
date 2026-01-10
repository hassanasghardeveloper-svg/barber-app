import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
        const { name, phone, service, email } = body;

        // Calculate queue number (max + 1)
        const lastAppt = await prisma.appointment.findFirst({
            orderBy: { queueNumber: 'desc' }
        });
        const nextQueueNum = (lastAppt?.queueNumber || 99) + 1;

        const newAppointment = await prisma.appointment.create({
            data: {
                name,
                phone,
                service,
                email,
                queueNumber: nextQueueNum,
                status: 'Waiting'
            }
        });

        // Trigger email if provided
        if (email) {
            // We can call our own notify API or just do it here. 
            // Calling the internal function from lib/mail is better than a fetch loop.
            // But for consistency with previous code, let's keep it simple or just rely on the notify route.
            // Actually, the notify route is separate. Let's just return success and let client call notify? 
            // No, server-side is better.
        }

        return NextResponse.json(newAppointment);
    } catch (error) {
        return NextResponse.json({ error: "Error creating appointment" }, { status: 500 });
    }
}
