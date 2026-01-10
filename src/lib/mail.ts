import nodemailer from "nodemailer";

// Create a transporter using Gmail
// NOTE: You need to generate an 'App Password' from your Google Account settings
// Go to: Security -> 2-Step Verification -> App Passwords
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER, // Your email
        pass: process.env.GMAIL_APP_PASSWORD, // Your App Password
    },
});

export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    try {
        // If we are in development and no creds are set, just log it.
        if (!process.env.GMAIL_USER) {
            console.log("========================================");
            console.log("📧 [MOCK EMAIL SENT]");
            console.log(`To: ${to}`);
            console.log(`Subject: ${subject}`);
            console.log("========================================");
            return { success: true };
        }

        const info = await transporter.sendMail({
            from: `"Premium Cuts" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("Message sent: %s", info.messageId);
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}
