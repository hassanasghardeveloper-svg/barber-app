import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure Transport (Use environment variables in production)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type, email, name, queueNumber, waitTime } = body;

        console.log(`[Notification System] Processing '${type}' for ${email}`);

        // If no credentials, just mock the send
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn("[Notification System] SMTP credentials missing. Skipping actual email send.");
            console.warn(`Simulated Email Content: Access Code/Queue: ${queueNumber} for ${name}`);
            return NextResponse.json({ success: true, mocked: true });
        }

        let subject = "";
        let html = "";

        if (type === 'confirmation') {
            subject = "Booking Confirmed - Premium Cuts";
            html = `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h1 style="color: #d97706;">Booking Confirmed!</h1>
                    <p>Hi <b>${name}</b>,</p>
                    <p>Your appointment has been successfully booked.</p>
                    <div style="background: #f3f4f6; padding: 15px; border-radius: 10px; margin: 20px 0;">
                        <p style="margin: 0; font-size: 14px; color: #666;">YOUR TICKET NUMBER</p>
                        <p style="margin: 5px 0 0 0; font-size: 32px; font-weight: bold; color: #000;">#${queueNumber}</p>
                        <p style="margin: 10px 0 0 0; font-size: 16px;">Time: <b>${waitTime || 'Check Status'}</b></p>
                    </div>
                    <p>Please arrive 5 minutes early.</p>
                    <p>Regards,<br/>Premium Cuts Team</p>
                </div>
            `;
        } else if (type === 'notification') {
            // "You are next" or similar
            subject = "It's Your Turn! - Premium Cuts";
            html = `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h1 style="color: #16a34a;">You're Up Next!</h1>
                    <p>Hi <b>${name}</b>,</p>
                    <p>The barber is ready for you. Please head to the shop immediately.</p>
                    <div style="background: #f3f4f6; padding: 15px; border-radius: 10px; margin: 20px 0;">
                        <p style="margin: 0; font-size: 14px; color: #666;">TICKET NUMBER</p>
                        <p style="margin: 5px 0 0 0; font-size: 32px; font-weight: bold; color: #000;">#${queueNumber}</p>
                    </div>
                </div>
            `;
        } else if (type === 'cancellation') {
            subject = "Appointment Canceled - Premium Cuts";
            html = `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h1 style="color: #dc2626;">Booking Canceled</h1>
                    <p>Hi <b>${name}</b>,</p>
                    <p>Your appointment (Ticket #${queueNumber}) has been marked as cancelled or No-Show.</p>
                    <p>If this was a mistake, please contact us.</p>
                </div>
             `;
        }

        const info = await transporter.sendMail({
            from: '"Premium Cuts" <no-reply@premiumcuts.com>',
            to: email,
            subject: subject,
            html: html,
        });

        console.log(`[Notification System] Email sent: ${info.messageId}`);
        return NextResponse.json({ success: true, messageId: info.messageId });

    } catch (error: any) {
        console.error("[Notification System] Error:", error);
        // Fail gracefully so frontend doesn't break
        return NextResponse.json({ error: "Failed to send email", details: error.message }, { status: 200 });
    }
}
