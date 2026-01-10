# 📧 Free Gmail Notification Setup Guide

Yes, this **WILL WORK** perfectly for your barber shop.

**Cost:** $0.00 (Free)
**Limit:** 500 emails per day (More than enough for a shop!)

---

## 🛑 Step 1: Get Your Secret App Password
You cannot use your normal Gmail password. You need a special "App Password" for security.

1.  Log in to your **[Google Account](https://myaccount.google.com/)**.
2.  On the left, click **Security**.
3.  Under "How you sign in to Google", ensure **2-Step Verification** is turned **ON**.
    *   *(If it is off, turn it on now. You need a phone number for this.)*
4.  Once 2-Step Verification is ON, search for **"App passwords"** in the search bar at the top of the settings page.
    *   *Direct Link:* [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
5.  Create a new app password:
    *   **App name:** Type `BarberShop`
    *   Click **Create**.
6.  Google will show you a **16-character code** (like `abcd efgh ijkl mnop`).
    *   **COPY THIS CODE.** You won't see it again.

---

## 📝 Step 2: Connect it to Your App
I have created a file named `.env.local` in your project folder. You need to paste your email and that code there.

**Open the file `.env.local` and fill it like this:**

```env
GMAIL_USER=your-actual-email@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```
*(Remove any spaces in the password if you want, but it usually works with them too)*

---

## 🧪 Step 3: Test It
1.  **Restart your server** (Press `Ctrl+C` in terminal, then run `npm run dev` again) to load the new settings.
2.  Go to **http://localhost:3000/book**.
3.  Book an appointment and **enter your own email**.
4.  Check your inbox! You should receive a "Booking Confirmed" email instantly.

---

## ✅ Will it work?
**YES.**
- It is the standard way developers send emails for small apps.
- It is reliable as long as you don't send spam.
- It works for both **Confirmation** (when they book) and **"Your Turn"** alerts (when you click Next Customer).
