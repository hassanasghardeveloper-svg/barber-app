# FREE WhatsApp Integration Plan (Meta Cloud API) 🟢

Since flexibility is key but **cost must be zero**, the only viable professional option is the **Official Meta (Facebook) Cloud API**.

## ✅ The "Free Tier" Deal
*   **1,000 Free Conversations / Month:** This is plenty for a barber shop (approx 30 bookings/day).
*   **Reliability:** 100% Official. No risk of getting banned if rules are followed.

## ⚠️ Requirements (The "Catch")
1.  **Phone Number:** You need a phone number that is **NOT** currently registered on WhatsApp app.
    *   *Solution:* Use a cheap receiving SMS SIM card or delete the WhatsApp account on a spare number you own.
2.  **Facebook Account:** You need a standard Facebook account to access the Meta Developer Portal.
3.  **Setup Time:** Takes ~30-60 mins to configure.

---

## 🛠️ Step-by-Step Implementation Guide

### Phase 1: Meta Developer Setup (You do this)
1.  Go to [developers.facebook.com](https://developers.facebook.com).
2.  Navigate to **My Apps** -> **Create App**.
3.  Select **"Other"** -> **"Business"**.
4.  Scroll to "Add products to your app" -> Click **WhatsApp**.
5.  **API Setup:**
    *   You will see a "Temporary Access Token" and a "Test Phone Number".
    *   **Crucial Step:** Add your own phone number in the "To" field to test it.
6.  **Add Real Number:**
    *   Follow steps to "Add Phone Number".
    *   Verify via SMS code.
    *   **Note:** Once verified here, this number *cannot* be used on the standard WhatsApp mobile app simultaneously. It becomes an API-only number.

### Phase 2: Code Integration (I do this)
I will modify `src/app/api/notify/route.ts` to send messages using this API.

**We need these Environment Variables from you:**
*   `WHATSAPP_API_TOKEN` (Permanent Token, I will show you how to get it).
*   `WHATSAPP_PHONE_ID` (Found in dashboard).

### Phase 3: Message Templates (Strict Rules)
WhatsApp **does not** allow sending random text to users who haven't messaged you first (outside 24h window). You must use **Approved Templates**.

**We will create 3 templates in Facebook Dashboard:**
1.  **Name:** `booking_confirmation`
    *   *Text:* "Hi {{1}}, your booking is confirmed! Queue: #{{2}}. Wait: {{3}}."
2.  **Name:** `your_turn`
    *   *Text:* "Hi {{1}}, it is your turn! Please come to the chair."
3.  **Name:** `booking_cancelled`
    *   *Text:* "Hi {{1}}, your booking was cancelled as you did not appear."

---

## 🚀 Recommended Action Plan
1.  **Confirmation:** Confirm you have a spare number (or willing to convert shop number to API-only).
2.  **Setup:** You create the App on Facebook Developers.
3.  **Credentials:** You give me the `PHONE_ID` and `ACCESS_TOKEN`.
4.  **Code:** I update the code to use these credentials.

Shall we proceed with this "Meta Cloud API" path?
