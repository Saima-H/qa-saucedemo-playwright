import { test, expect } from '@playwright/test';

// Note: To run this test, your Next.js frontend (port 3000) 
// and FastAPI backend (port 8000) MUST be running locally.

test('Idea Vault: Complete User Flow (Login, Add, Logout)', async ({ page }) => {
  // 1. Go to your local frontend
  await page.goto('http://localhost:3000/');

  // 2. Log in using the Supabase test user we created
  await page.fill('input[type="email"]', 'saima@test.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');

  // 3. Wait for the redirect to the dashboard
  await page.waitForURL('http://localhost:3000/dashboard');
  // 4. Assert the user is logged in and the header shows their email
  await expect(page.locator('text=Logged in as: saima@test.com')).toBeVisible();

  // 5. Add a new idea
  // We generate a unique string so we know exactly which idea to look for
  const uniqueIdea = `Playwright Test Idea - ${Date.now()}`; 
  
  await page.fill('textarea', uniqueIdea);
  await page.click('button:has-text("Save Idea")');

  // 6. Assert the idea appears in the list
  // Wait for the text to appear on the screen (since there is a network request)
  await expect(page.locator(`text=${uniqueIdea}`)).toBeVisible();

  // 7. Test the Log Out button
  await page.click('button:has-text("Log Out")');
  
  // 8. Assert we are back on the login page
  await expect(page.locator('h1:has-text("Login to Idea Vault")')).toBeVisible();
});