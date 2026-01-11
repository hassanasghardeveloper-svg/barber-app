import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type, email, name, queueNumber, waitTime } = body;

        let subject = "";
        let html = "";

        if (type === "confirmation") {
            subject = `Booking Confirmation - #${queueNumber}`;
            html = `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h1 style="color: #d97706;">Booking Confirmed!</h1>
                <p>Hi ${name},</p>
                <p>You have successfully joined the queue at <strong>Premium Cuts</strong>.</p>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; font-size: 14px; color: #6b7280;">QUEUE NUMBER</p>
                    <p style="margin: 5px 0 0; font-size: 24px; font-weight: bold; color: #000;">#${queueNumber}</p>
                    <br/>
                     <p style="margin: 0; font-size: 14px; color: #6b7280;">ESTIMATED WAIT</p>
                    <p style="margin: 5px 0 0; font-size: 24px; font-weight: bold; color: #3b82f6;">${waitTime}</p>
                </div>
                <p>Please arrive 10 minutes before your turn.</p>
                <a href="https://barber-app-5hdo.vercel.app/status" style="display: inline-block; background: #d97706; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Check Live Status</a>
            </div>
        `;
        } else if (type === "notification") {
            subject = `It's Your Turn! - #${queueNumber}`;
            html = `
             <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h1 style="color: #22c55e;">You're Next!</h1>
                <p>Hi ${name},</p>
                <p>The chair is ready for you.</p>
                <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                    <p style="margin: 0; font-size: 18px;">Please come to the shop immediately!</p>
                </div>
            </div>
        `;
        } else if (type === "cancellation") {
            subject = `Missed Appointment - #${queueNumber}`;
            html = `
             <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h1 style="color: #ef4444;">You Missed Your Turn</h1>
                <p>Hi ${name},</p>
                <p>We called you but you were not present within 15 minutes.</p>
                <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
                    <p style="margin: 0; font-size: 18px;">Your appointment has been cancelled.</p>
                </div>
                <p>Please book a new appointment if you still wish to visit.</p>
                 <a href="https://barber-app-5hdo.vercel.app/" style="display: inline-block; background: #333; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Book Again</a>
            </div>
        `;
        }

        // Since we don't have a real email field in the simplified form, 
        // we would normally look up the user's email or ask for it.
        // For this 'Phone Number Only' app, we can't send email unless we ask for it.
        // But the user asked "msg him through gmail", implying we HAVE the email.

        // IF the user provided an email, we send it.
        if (email && email.includes("@")) {
            await sendEmail({ to: email, subject, html });
            return NextResponse.json({ success: true, message: "Email sent" });
        } else {
            return NextResponse.json({ success: true, message: "No email provided, skipped" });
        }

    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
    }
}
