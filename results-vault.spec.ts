import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Listen for alerts and log them
  page.on('dialog', async dialog => {
    console.log('🚨 ALERT POPUP:', dialog.message());
    await dialog.dismiss();
  });
});

test('Student 1 cannot view Student 2 result via URL tampering', async ({ page }) => {
  // Log in as Student 1
  await page.goto('http://localhost:3000/');
  await page.fill('input[type="email"]', 'student1@test.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/student');

  // Verify they CAN see their own result
  await page.goto('http://localhost:3000/results/1');
  
  // Take a screenshot to see what is on the screen if it fails
  await page.screenshot({ path: 'student1-result.png' });
  
  await expect(page.locator('text=Script ID:')).toBeVisible();

  // THE HACK
  await page.goto('http://localhost:3000/results/2');
  await expect(page.locator('text=Error:')).toBeVisible();
  await expect(page.locator('text=You are not allowed to view this result')).toBeVisible();
});

test('Student 10 cannot view result if it is Pending (unpublished)', async ({ page }) => {
  // Log in as Student 10
  await page.goto('http://localhost:3000/');
  await page.fill('input[type="email"]', 'student10@test.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/student');

  // Wait for the page to load the result
  await page.waitForTimeout(2000); // Give it 2 seconds to fetch from DB

  // Take a screenshot
  await page.screenshot({ path: 'student10-result.png' });

  // Verify it says waiting
  await expect(page.locator('text=Waiting for teacher to publish.')).toBeVisible();
});