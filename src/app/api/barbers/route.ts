import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const barbers = await prisma.barber.findMany({
            where: { isActive: true },
            orderBy: { id: 'asc' }
        });
        return NextResponse.json(barbers);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching barbers" }, { status: 500 });
    }
}
