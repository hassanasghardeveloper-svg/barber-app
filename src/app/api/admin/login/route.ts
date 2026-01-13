import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { login } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        console.log("Login Attempt:", email);

        if (!email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const admin = await prisma.adminUser.findUnique({
            where: { email },
        });

        if (!admin) {
            console.log("Admin not found");
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            console.log("Password mismatch");
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Create Session
        await login({ id: admin.id, email: admin.email, role: admin.role });

        return NextResponse.json({ success: true, redirect: "/admin/dashboard" });
    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "System error" }, { status: 500 });
    }
}
