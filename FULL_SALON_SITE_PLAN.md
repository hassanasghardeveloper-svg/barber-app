# 💈 Premium Salon Website Master Plan

This plan outlines the expansion of the current "Booking App" into a **Complete Brand Website** for a high-end salon. The existing booking system will serve as the powerful "engine" inside this beautiful new exterior.

## 🎯 Objective
Create a stunning, multi-page website that showcases the salon's brand, builds trust with professional imagery/copy, and drives users to the "Book Now" engine.

## 🗺️ Site Architecture (Sitemap)

### 1. **Home Page (`/`)** 🏠
*   **Hero Section:** Full-screen video background or high-quality slider. Big "Book Appointment" button.
*   **Why Choose Us:** 3 key selling points (e.g., "Master Barbers", "Premium Products", "Relaxing Vibe").
*   **Featured Services:** A sneak peek at top services (Haircut, Beard Trim).
*   **Testimonials:** "Best cut in the city!" – 5-star reviews carousel.
*   **CTA (Call to Action):** "Ready to look your best?" -> links to Scheduling.

### 2. **About Us (`/about`)** 📖
*   **The Story:** How the shop started.
*   **Philosophy:** "We don't just cut hair, we craft experiences."
*   **Interior Gallery:** Photos of the shop interior (stations, lounge, coffee bar).

### 3. **Services Menu (`/services`)** 📋
*   **Full Menu:** A beautiful list of all services (fetched **dynamically** from the Admin Dashboard we just built!).
*   **Details:** Descriptions of what each service includes (e.g., "Hot towel finish").
*   **Pricing:** Clear visibility on costs.

### 4. **Portfolio / Gallery (`/gallery`)** 📸
*   **Lookbook:** High-res grid of haircuts (Fades, Tapers, Beards).
*   **Filterable:** Tags like [Short Hair], [Long Hair], [Beards].
*   **Instagram Feed:** Auto-sync with the shop's Instagram.

### 5. **Meet the Team (`/team`)** 💇‍♂️
*   **Barber Profiles:** Photo, Name, and Specialization (e.g., "The Fade Master").
*   **"Book with [Name]" Button:** Direct link to the booking wizard with that barber pre-selected.

### 6. **Contact & Location (`/contact`)** 📍
*   **Interactive Map:** Google Maps embed.
*   **Info:** Phone, Email, Address.
*   **Opening Hours:** Live status (Open/Closed) based on the settings logic we already built.

---

## 🔌 Technical Integration Strategy

### **The Engine (Existing System)**
Your current code (`/book`, `/admin`, `/status`) is the **Core Engine**. We will NOT delete it. We will build the new pages *around* it.

*   **Database:** The new "Services" page will read from the same `Service` table we just created.
*   **Admin Panel:** We will add new tabs to the Admin Dashboard (e.g., "Team Manager", "Gallery Manager") so you can update the website text and images without coding.
*   **Booking:** The "Book Now" buttons on every page will link to your existing `/book` wizard.

## 📅 Execution Phases

### **Phase 1: Structure & Design (Day 1)**
*   Create the new page files (`hero.tsx`, `about.tsx`, etc.).
*   Implement a global **Navigation Bar** (Logo, Links, "Book Now" button).
*   Implement a professional **Footer** (Links, Socials, Copyright).

### **Phase 2: Content & Assets (Day 2)**
*   Fill pages with placeholder premium imagery (using AI generation).
*   Write professional copy for "About" and "Home".

### **Phase 3: Dynamic Integration (Day 3)**
*   Connect the `/services` page to the Database.
*   Connect the `/team` page to a new "Barbers" table in the database.
*   Make the "Opening Hours" display real-time status.

---

## 🚀 Immediate Next Step
**Approve this plan, and I will start Phase 1 by creating the new Landing Page (Home) structure.**
