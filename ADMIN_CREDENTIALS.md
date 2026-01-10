# 🔐 Admin Login Credentials

Here are the details to access your dashboard:

| Field | Value |
| :--- | :--- |
| **URL** | `/admin/login` |
| **Email** | `admin@barber.com` |
| **Password** | `admin` |

---

### 🛡️ How to change it?
If you want to create a secure, real password for production later:
1.  Go to `src/app/admin/login/page.tsx`.
2.  Change line 16:
    ```typescript
    if (email === "admin@barber.com" && password === "YOUR_NEW_PASSWORD") {
    ```
