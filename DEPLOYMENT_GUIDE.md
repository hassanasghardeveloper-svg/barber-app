# 🚀 Deployment Guide (How to put it online)

The easiest way to deploy a Next.js app is using **Vercel** (it is free and extremely fast).

## Step 1: Push Code to GitHub
1.  Go to [GitHub.com](https://github.com) and create a new repository called `barber-app`.
2.  Open your terminal in VS Code and run these commands one by one:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/barber-app.git
    git push -u origin main
    ```
    *(Replace `YOUR_USERNAME` with your actual GitHub username)*

## Step 2: Deploy on Vercel
1.  Go to [Vercel.com](https://vercel.com) and sign up (login with GitHub).
2.  Click **"Add New..."** -> **"Project"**.
3.  You will see your `barber-app` repository. Click **Import**.
4.  **IMPORTANT:** Configure Environment Variables.
    *   Click the **"Environment Variables"** section.
    *   Add the same keys you have in your `.env.local`:
        *   `GMAIL_USER` = your-email@gmail.com
        *   `GMAIL_APP_PASSWORD` = (your 16-character code)
        *   `NEXT_PUBLIC_APP_URL` = https://your-vercel-project-name.vercel.app
5.  Click **Deploy**.

🎉 **Done!** You will get a link like `https://barber-app.vercel.app` to share with customers.

---

# 📧 How the "Your Turn" Email Works

You asked: *"how system send her mail to come it your turn"*

Here is the logic inside the code:

1.  **The Trigger 🖱️**:
    *   On the **Admin Dashboard**, you see the "Next Customer" button.
    *   When you click it, the code inside `src/app/admin/dashboard/page.tsx` runs.

2.  **The Logic 🧠**:
    *   The system looks at the **Waiting List**.
    *   It finds the *top person* in the queue (e.g., Sarah).
    *   It checks if Sarah has an email on file.

3.  **The Action 📨**:
    *   The browser sends a SECRET signal (API call) to your server (`/api/notify`).
    *   The server uses **Nodemailer** (the postman) to log into your Gmail account.
    *   It sends a pre-written email: *"Hi Sarah, You're Next! Please come to the shop immediately."*

### See the code yourself:
Look at file: `src/app/admin/dashboard/page.tsx` (Lines 55-68)
```typescript
 // Trigger "Your Turn" Email
 const customer = newApps[nextIdx];
 if (customer.name !== "Walk-in") {
      fetch('/api/notify', {
        method: 'POST', // <-- This sends the command
        body: JSON.stringify({
            type: 'notification', // <-- Tells server to send "Your Turn" email
            email: customer.email, // <-- Uses customer's email
            // ...
        })
    });
 }
```
