---
description: Implement Date and Time Slot selection in the booking flow.
---

# Booking System Upgrade Plan

The goal is to transition from a "Queue-based" system (just getting a number) to a proper "Appointment-based" system where users select a specific **Date** and **Time Slot**.

## User Requirements
1.  User selects a Date from a Calendar.
2.  User sees available Time Slots (30-minute intervals) for that date.
3.  User selects a Time Slot.
4.  User confirms details.

## Implementation Steps

### 1. Install/Setup Dependencies
- We have `date-fns` installed. We will use it for calendar logic.
- No external calendar UI library is needed; we will build a custom "Premium" styled calendar grid to match the site's aesthetic.

### 2. Create Components
#### `BookingCalendar.tsx`
- A visual calendar grid (Month View).
- Allows navigating months.
- Disables past dates.
- Highlights the selected date.
- Returns a `Date` object to the parent.

#### `TimeSlotPicker.tsx`
- Receives a `selectedDate`.
- Generates 30-minute slots (e.g., 10:00 AM to 10:00 PM).
- (Future: Filter out booked slots).
- Allows selection of one slot.

### 3. Modify `src/app/book/page.tsx`
- **Update State:** Add `bookingDate` and `bookingTime` to the state/form.
- **Update Steps:**
    - Step 1: Gender (Keep - helps categorize).
    - Step 2: Barber (Keep - helps assign).
    - **Step 3 (NEW): Date & Time Selection.**
        - Show `BookingCalendar`.
        - When Date selected -> Show `TimeSlotPicker` below/next to it.
        - Next button disabled until both Date and Time are picked.
    - Step 4: Final Details (Name, Phone, Email).
- **Update Submission:**
    - Calculate the actual `appointmentTime` string/ISO based on selection.
    - Send this data to the API.

### 4. API Updates (`src/app/api/appointments/route.ts`)
- The current API likely generates a queue number.
- We need to update the Prisma schema (if used) or the API logic to store `appointmentDate` and `appointmentTime`.
- **Note:** For this specific task, we might just be updating the *Frontend Flow* to collect this data first. If the backend doesn't support it yet, we will mock it or pass it as "metadata" in the existing fields until the DB is ready. The user's prompt focuses on the *UI interaction* ("Calendar pr me select krta hu...").

## Proposed Flow Update
1.  **Gender**: Male/Female
2.  **Barber**: Select Barber
3.  **Schedule**:
    - **Calendar**: [Grid of Days]
    - **Slots**: [12:00 - 12:30] [12:30 - 1:00] ...
4.  **Details**: Name/Email/Phone.
5.  **Success**: "Appointment Confirmed for [Date] at [Time]".

## Turbo Actions
// turbo
1. Create `src/components/booking/BookingCalendar.tsx`
// turbo
2. Create `src/components/booking/TimeSlotPicker.tsx`
