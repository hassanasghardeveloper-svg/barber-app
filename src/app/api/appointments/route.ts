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
        const { name, phone, service, email } = body;

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
                queueNumber: nextQueueNum,
                status: 'Waiting'
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
