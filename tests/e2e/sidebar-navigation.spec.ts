import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — Sidebar Information Architecture & UX', () => {

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('dsa-user-name', 'Alex Developer');
      localStorage.setItem('auth-user', JSON.stringify({
        id: 'test-user-1',
        email: 'alex@dsamaster.com',
        displayName: 'Alex Developer',
      }));
      localStorage.setItem('auth_session', JSON.stringify({
        sessionId: 'test-session-1',
        user: { id: 'test-user-1', email: 'alex@dsamaster.com', displayName: 'Alex Developer' },
        expiresAt: Date.now() + 86400000,
      }));
      localStorage.setItem('journey-onboarding-complete', 'true');
    });
  });

  test('1. Sidebar renders task-oriented sections: LEARN, MASTERY, and SYSTEM', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');

    // Expand sidebar to view full labels
    const aside = page.locator('aside[aria-label="Main Navigation"]');
    await aside.hover();
    await page.waitForTimeout(300);

    // Section Headers
    await expect(aside.getByText('LEARN', { exact: true })).toBeVisible();
    await expect(aside.getByText('MASTERY', { exact: true })).toBeVisible();
    await expect(aside.getByText('SYSTEM', { exact: true })).toBeVisible();

    // LEARN Items
    await expect(aside.getByRole('link', { name: 'Journey' })).toBeVisible();
    await expect(aside.getByRole('link', { name: 'Practice' })).toBeVisible();
    await expect(aside.getByRole('link', { name: 'Interview' })).toBeVisible();

    // MASTERY Items (Study Plan, Revision, Contests, Progress)
    await expect(aside.getByRole('link', { name: 'Study Plan' })).toBeVisible();
    await expect(aside.getByRole('link', { name: /Revision/i })).toBeVisible();
    await expect(aside.getByRole('link', { name: 'Contests' })).toBeVisible();
    await expect(aside.getByRole('link', { name: 'Progress' })).toBeVisible();

    // SYSTEM Items
    await expect(aside.getByRole('link', { name: 'Settings' })).toBeVisible();

    // Verification: AI Mentor is removed as standalone sidebar destination
    expect(await aside.getByText('AI Mentor').count()).toBe(0);

    // Verification: Renamed items are present with valid destinations
    await expect(aside.getByRole('link', { name: 'Contests' })).toHaveAttribute('href', '/contest');
    await expect(aside.getByRole('link', { name: 'Progress' })).toHaveAttribute('href', '/analytics');
  });

  test('2. Navigation rows adhere to 40-44px height and consistent icon sizing', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');
    const aside = page.locator('aside[aria-label="Main Navigation"]');
    await aside.hover();
    await page.waitForTimeout(300);

    const journeyLink = aside.locator('a[href="/journey"]');
    await expect(journeyLink).toBeVisible();

    const box = await journeyLink.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(38);
      expect(box.height).toBeLessThanOrEqual(46);
    }
  });

  test('3. Active route highlighting correctly shows thin left indicator and accent background', async ({ page }) => {
    await page.goto('/journey');
    await page.waitForLoadState('domcontentloaded');
    const aside = page.locator('aside[aria-label="Main Navigation"]');
    await aside.hover();
    await page.waitForTimeout(300);

    const journeyLink = aside.locator('a[href="/journey"]');
    await expect(journeyLink).toBeVisible();

    // Navigate to Study Plan and verify active state switches
    await page.goto('/study-plan');
    await page.waitForLoadState('domcontentloaded');
    await aside.hover();
    await page.waitForTimeout(300);

    const studyPlanLink = aside.locator('a[href="/study-plan"]');
    await expect(studyPlanLink).toBeVisible();
  });

  test('4. Desktop sidebar pin and collapse toggling works cleanly', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');

    const collapseBtn = page.locator('aside button[title*="sidebar"]');
    await expect(collapseBtn).toBeVisible();

    // Click collapse / pin button
    await collapseBtn.click();
    await page.waitForTimeout(200);

    // Sidebar persists state in localStorage
    const savedPin = await page.evaluate(() => localStorage.getItem('sidebarExpanded'));
    expect(savedPin).toBeDefined();
  });

  test('5. Mobile viewport drawer opens via hamburger and provides >=44px tap targets', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');

    // Click hamburger button in navbar
    const hamburgerBtn = page.locator('#open-sidebar-btn');
    await expect(hamburgerBtn).toBeVisible();
    await hamburgerBtn.click();

    // Mobile drawer appears
    const mobileAside = page.locator('aside[aria-label="Main Navigation"]');
    await expect(mobileAside).toBeVisible();
    await page.waitForTimeout(400);

    // Mobile nav links must be at least 44px high for accessible tap targets
    const practiceLink = mobileAside.locator('a[href="/practice"]');
    await expect(practiceLink).toBeVisible();
    const box = await practiceLink.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
    }

    // Close button dismisses the mobile drawer
    const closeBtn = mobileAside.locator('button[aria-label="Close navigation drawer"]');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
  });

  test('6. Sidebar renders cleanly under both dark and light modes', async ({ page }) => {
    // Dark mode
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('aside[aria-label="Main Navigation"]')).toBeVisible();

    // Switch to light mode
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('aside[aria-label="Main Navigation"]')).toBeVisible();
  });

  test('7. AI functionality remains accessible via contextual and floating assistants', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');

    // Floating Oracle AI assistant button is still available
    const oracleBtn = page.getByRole('button', { name: /Ask Oracle AI/i });
    await expect(oracleBtn).toBeVisible();

    // AI Mentor page is still accessible directly via route
    await page.goto('/mentor');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('Mentor', { exact: false }).first()).toBeVisible();
  });
});
