# WhatsApp Integration Master Plan 📱

To send WhatsApp messages (Booking Confirmations, "Your Turn" alerts) just like emails, we need to bridge your Vercel app with the WhatsApp network.

Since Vercel is "Serverless" (it doesn't keep a server running 24/7), we cannot use free bots like `whatsapp-web.js` directly. We must use an **API Provider**.

Here are the 3 Best Options for you:

---

## Option 1: Meta (Facebook) Cloud API (Recommended for Free Tier) ⭐️
Direct integration with WhatsApp.
*   **Cost:** First 1,000 conversations per month are **FREE**.
*   **Pros:** Official, Reliable, Free for small shops.
*   **Cons:** Requires a Facebook Developer Account, Business Verification (sometimes), and a dedicated phone number (cannot be your personal number currently in use on WhatsApp, unless you delete that account).
*   **Best for:** Professional setup with zero monthly cost.

## Option 2: Twilio for WhatsApp
The "Industry Standard" SMS/WhatsApp provider.
*   **Cost:** Pay-per-message (approx $0.005 - $0.01 per msg).
*   **Pros:** Extremely reliable, very easy developer docs.
*   **Cons:** Expensive sandbox setup. Requires submitting "Templates" to WhatsApp for approval before sending automated messages.
*   **Best for:** If you have a budget and want guaranteed uptime.

## Option 3: WhatsApp Gateway Services (e.g., UltraMsg, 2Chat)
These services run a "WhatsApp Web" instance for you. You just scan a QR code.
*   **Cost:** ~$15 - $30 USD / month (Subscription).
*   **Pros:** **Easiest Setup.** No verification, no template approval. You just scan a QR code with your EXISTING shop phone number.
*   **Cons:** Monthly cost. Not "official".
*   **Best for:** Speed. If you want to use your *existing* WhatsApp number without Facebook verification headaches.

---

## 🚀 Recommended Path: Option 3 (Gateway) 
*Why?* It allows you to use your current phone number and requires zero complex coding or Facebook hacking.

### implementation Plan (using UltraMsg as example):

### Phase 1: Preparation
1.  **Account Setup:** Sign up for a Gateway service (e.g., UltraMsg).
2.  **Connect:** Scan QR Code with your shop's WhatsApp.
3.  **Get Keys:** Get your `INSTANCE_ID` and `TOKEN`.

### Phase 2: Code Changes
1.  **Rules Update:**
    *   Change **Phone Number** from *Optional* to **REQUIRED** in the Booking Form.
    *   Enforce Country Code (e.g., must start with `+92` or auto-add it).
    
2.  **Backend Integration (`api/notify`):**
    *   Modify the `POST` handler to send a request to the WhatsApp Gateway.
    
    ```typescript
    // Example Code Logic
    await fetch(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
      method: 'POST',
      body: JSON.stringify({
        to: phoneNumber,
        body: "Hi Hassan! Your booking is confirmed. Queue #100."
      })
    })
    ```

3.  **Message Templates:**
    *   **Confirmation:** "Hi [Name], Booking Confirmed! Queue #[Num]. Wait: [Time]."
    *   **Your Turn:** "Hi [Name], It's your turn! Please come to the chair."
    *   **Cancelled:** "Hi [Name], your appointment was cancelled due to no-show."

### Phase 3: Testing
1.  Book an appt with your own phone number.
2.  Check if WhatsApp message arrives instantly.

---

## ❓ Decision Needed
Which path do you want to take?

1.  **The "Official/Free" Way (Meta):** Harder setup, verification needed, need new phone number.
2.  **The "Easy/Paid" Way (Gateway):** Instant setup, costs ~$15/mo, use existing number.
