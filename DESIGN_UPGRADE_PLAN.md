# 🎨 Visual & Mobile Experience Upgrade Plan

**Goal:** Elevate the aesthetics to a sleek, premium level, optimize specifically for mobile users, and secure the admin entry point.

---

## 🔒 1. Security Update (Immediate)
**Objective:** Remove visible "Admin" links from the public interface.
*   **Action:** Edit `src/components/Navbar.tsx`.
*   **Detail:** Remove the specific `<Link href="/admin/login">` block.
*   **Result:** General users will not see any "Admin" button. You can still access it by manually typing `/admin/login` in your browser address bar.

---

## 📱 2. Mobile-First Experience
**Objective:** Make the app feel like a native mobile app.
*   **Bottom Navigation Bar (Mobile Only):** Instead of a hamburger menu, add a sticky bottom navigation bar with icons for "Home", "Book", and "Status". This is standard for modern mobile layouts.
*   **Touch Targets:** Increase padding on all buttons and form inputs (min height 48px).
*   **No Zooming:** Ensure font sizes are at least 16px on inputs to prevent iOS automatic zooming.

---

## ✨ 3. Premium Aesthetics (Glassmorphism & Glow)
**Objective:** Create a rich, high-end feel fitting for "Premium Cuts".
*   **Glassmorphism Cards:** Update the booking form and status cards to use a translucent background (`bg-slate-900/40 backdrop-blur-xl`) with a subtle white border.
*   **Dynamic Backgrounds:** Add slow-moving distinct gradient orbs in the background (using CSS animations) to make the page feel "alive".
*   **Typography:** Increase contrast. Use `Outfit` (your connected font) for all headings to give a modern, geometric look.
*   **Golden Hierarchy:** Use the Amber/Gold color strictly for primary actions (Book Now) and active states. Use cooler Slate greys for secondary info.

---

## 🚀 4. Interaction Improvements
*   **Page Transitions:** Add `framer-motion` for smooth fade-ins when switching between pages.
*   **Micro-interactions:** Add a "shimmer" effect to the "Book Now" button.
*   **Success Confetti:** triggering a small confetti explosion when a booking is confirmed.

---

### Execution Steps
1.  **Refactor Navbar:** Clean up desktop view, remove Admin link.
2.  **Create MobileNav Component:** New component that only shows on screens smaller than `md`.
3.  **Enhance `globals.css`:** Add new animation keyframes for background blobs.
4.  **Polish `BookingPage`:** Redesign form fields to be "floating label" style or just cleaner "ghost" inputs styles.
