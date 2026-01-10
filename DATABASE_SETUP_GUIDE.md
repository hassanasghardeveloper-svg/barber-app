# 🗄️ Step 1: Create the Cloud Database

To sync data between phones, we need a Vercel Database.

1.  **Go to your Vercel Dashboard** for this project.
2.  Click the **"Storage"** tab (top menu).
3.  Click **"Create Database"**.
4.  Choose **"Postgres"**.
5.  Click **"Continue"** -> Accept Defaults -> **"Create"**.

---

# 🔑 Step 2: Get the Keys

1.  Once created, look at the **".env.local"** tab (left side menu of the database page) or the **"Quickstart"** section.
2.  Click **"Show Secret"**.
3.  **Copy** the huge block of text (It will contain `POSTGRES_URL`, etc.).
4.  Paste it into your project's `.env.local` file.

**Tell me when you have pasted the keys!**
