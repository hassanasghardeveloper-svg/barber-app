import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        const updated = await prisma.appointment.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Error updating appointment" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.appointment.delete({
            where: { id: parseInt(id) }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting appointment" }, { status: 500 });
    }
}
