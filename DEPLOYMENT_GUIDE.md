# 🚀 Vercel Deployment Instructions (Match Your Screen)

You are on the correct screen! Here is exactly what to fill in:

## 1. Framework Preset
*   Check the dropdown box that says **"Other"**.
*   **Change it to "Next.js"**.
    *   *(Vercel usually detects this automatically, but if it says "Other", force it to "Next.js" just to be safe).*

## 2. Environment Variables (Critical!)
You **MUST** add your secrets here, or emails will NOT work.
Click the **"Environment Variables"** section to expand it (like in your screenshot).

**Add these 3 variables one by one:**

| Key (Name) | Value (What to put) |
| :--- | :--- |
| `GMAIL_USER` | `your-real-email@gmail.com` |
| `GMAIL_APP_PASSWORD` | `xxxx xxxx xxxx xxxx` (Your 16-char code) |
| `NEXT_PUBLIC_APP_URL` | `https://barber-app.vercel.app` |

*   *Tip: For the URL, just use `https://barber-app.vercel.app` for now. Vercel will likely give you this URL.*

## 3. Finsh Line
*   Leave **Root Directory** as `./` (Don't touch it).
*   Click the big black **Deploy** button.

---

## ⏳ What happens next?
*   Vercel will build your website (takes ~1 minute).
*   You will see confetti 🎉.
*   Click **"Visit"** to see your live barber shop!
*   **Test it:** Go to `/book`, book an appointment, and check if you get an email.
