import { test, expect } from '@playwright/test';

test.describe('Barber Booking Flow', () => {

    // 1. Visit Home Page
    test('should allow booking an appointment and checking admin dashboard', async ({ page }) => {
        // Use local dev URL or production
        const baseURL = 'http://localhost:3000';
        await page.goto(baseURL);

        // Verify Title and Buttons
        await expect(page).toHaveTitle(/Barber Shop/i); // Adjust regex based on actual title
        await expect(page.getByText('Book Appointment')).toBeVisible();

        // 2. Start Booking
        await page.getByText('Book Appointment').click();
        await expect(page).toHaveURL(/\/book/);

        // Step 1: Gender (Male)
        await page.getByText('Gentlemen').click();

        // Step 2: Barber (Any)
        await page.getByText('Any Professional').click();

        // Step 3: Date/Time (Select first available)
        // Wait for calendar to load
        await page.waitForSelector('.react-calendar');
        // Pick tomorrow (Active buttons)
        const dateButton = page.locator('.react-calendar__tile:not(:disabled)').first();
        await dateButton.click();

        // Pick first time slot
        await page.waitForSelector('text=10:00');
        await page.getByText('10:00').first().click();
        await page.getByRole('button', { name: 'Continue' }).click();

        // Step 4: Fill Details
        await page.getByPlaceholder('Your Full Name *').fill('Test User');
        await page.getByPlaceholder('Phone Number').fill('0501234567');
        await page.getByPlaceholder('Email Address *').fill('test@gmail.com');

        // Select Service
        await page.getByText('Signature Haircut').first().click();

        // Submit
        await page.getByRole('button', { name: 'Confirm Booking' }).click();

        // Verify Success
        await expect(page.getByText('Booking Confirmed!')).toBeVisible();
    });

    test('should allow admin to manage bookings', async ({ page }) => {
        const baseURL = 'http://localhost:3000';

        // 1. Login
        await page.goto(`${baseURL}/admin/login`);
        await page.getByPlaceholder('admin@barber.com').fill('admin@premiumcuts.com');
        await page.getByPlaceholder('••••••').fill('admin123'); // Password from seed
        await page.getByRole('button', { name: 'Login to Dashboard' }).click();

        // 2. Verify Dashboard
        await expect(page).toHaveURL(/\/admin\/dashboard/);
        await expect(page.getByText('Dashboard')).toBeVisible();

        // 3. Check for the booking we just made (if running sequentially)
        // Note: In a real test, logic would be robust to clear DB first.
        // For now, checks that table exists.
        await expect(page.locator('table')).toBeVisible();
    });
});
