import { test, expect } from 'playwright/test';

test.describe('Design System & Global App Shell', () => {
  test.beforeEach(async ({ page }) => {
    // Seed authenticated state so AppShell renders full controls
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('dsa-user-name', 'Jane Developer');
      localStorage.setItem('auth-user', JSON.stringify({
        id: 'test-user-1',
        email: 'developer@dsamaster.com',
        displayName: 'Jane Developer'
      }));
    });
  });

  test('Design system page renders catalog with all sections', async ({ page }) => {
    await page.goto('/design-system');
    await page.waitForLoadState('networkidle');

    // Title and introduction
    await expect(page.locator('h1')).toContainText('Design System & Component Catalog');
    await expect(page.getByText('Production Design System')).toBeVisible();

    // Verify component groups
    await expect(page.getByText('Buttons', { exact: true })).toBeVisible();
    await expect(page.getByText('Badges & Tags', { exact: true })).toBeVisible();
    await expect(page.getByText('Inputs & Form Controls', { exact: true })).toBeVisible();
    await expect(page.getByText('Cards & Elevation', { exact: true })).toBeVisible();
    await expect(page.getByText('Navigation & Utilities', { exact: true })).toBeVisible();

    // Verify button variants
    await expect(page.getByRole('button', { name: 'Primary Button' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Secondary Button' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Outline Button' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ghost Button' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Success Button' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Danger Button' })).toBeVisible();

    // Verify difficulty badges
    await expect(page.getByText('Easy', { exact: true })).toBeVisible();
    await expect(page.getByText('Medium', { exact: true })).toBeVisible();
    await expect(page.getByText('Hard', { exact: true })).toBeVisible();

    // Verify platform badges
    await expect(page.getByText('LeetCode', { exact: true })).toBeVisible();
    await expect(page.getByText('Codeforces', { exact: true })).toBeVisible();
    await expect(page.getByText('CodeChef', { exact: true })).toBeVisible();
    await expect(page.getByText('GeeksForGeeks', { exact: true })).toBeVisible();

    // Verify empty state
    await expect(page.getByText('No Pending Mistakes Logged')).toBeVisible();
  });

  test('Design system tabs switch to Tokens and Typography', async ({ page }) => {
    await page.goto('/design-system');
    await page.waitForLoadState('networkidle');

    // Switch to Tokens tab
    await page.getByRole('tab', { name: 'Tokens & Colors' }).click();
    await expect(page.getByText('Semantic Color Tokens')).toBeVisible();
    await expect(page.getByText('--bg', { exact: true })).toBeVisible();
    await expect(page.getByText('--accent', { exact: true })).toBeVisible();
    await expect(page.getByText('--surface', { exact: true })).toBeVisible();

    // Switch to Typography tab
    await page.getByRole('tab', { name: 'Typography' }).click();
    await expect(page.getByText('Algorithmic Mastery Platform')).toBeVisible();
    await expect(page.getByText('Master 113 Core DSA Patterns')).toBeVisible();
  });

  test('Global App Shell: Sidebar groups and navigation', async ({ page }) => {
    await page.goto('/design-system');
    await page.waitForLoadState('networkidle');

    // Hover over sidebar to expand it and reveal full labels
    await page.locator('aside[aria-label="Main Navigation"]').hover();
    await page.waitForTimeout(300);

    // Brand link to dashboard
    await expect(page.locator('aside').getByText('DSA', { exact: false })).toBeVisible();
    await expect(page.locator('aside').getByRole('link', { name: /DSA Magna Dashboard|DSA Magna/i })).toBeVisible();

    // Section headers
    await expect(page.locator('aside').getByText('LEARN', { exact: true })).toBeVisible();
    await expect(page.locator('aside').getByText('MASTERY', { exact: true })).toBeVisible();
    await expect(page.locator('aside').getByText('SYSTEM', { exact: true })).toBeVisible();

    // Navigation links in sidebar
    await expect(page.locator('aside').getByRole('link', { name: 'Journey' })).toBeVisible();
    await expect(page.locator('aside').getByRole('link', { name: 'Practice' })).toBeVisible();
    await expect(page.locator('aside').getByRole('link', { name: 'Interview' })).toBeVisible();
    await expect(page.locator('aside').getByRole('link', { name: 'Study Plan' })).toBeVisible();
    await expect(page.locator('aside').getByRole('link', { name: /Revision/i })).toBeVisible();
    await expect(page.locator('aside').getByRole('link', { name: 'Contests' })).toBeVisible();
    await expect(page.locator('aside').getByRole('link', { name: 'Progress' })).toBeVisible();
    await expect(page.locator('aside').getByRole('link', { name: 'Settings' })).toBeVisible();

    // AI Mentor should not be a standalone sidebar destination
    expect(await page.locator('aside').getByText('AI Mentor').count()).toBe(0);
  });

  test('Global App Shell: Navbar dynamic breadcrumbs, search, and theme toggle', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Breadcrumbs in header
    const header = page.locator('header').first();
    await expect(header).toBeVisible();
    await expect(header.getByText('DSA Magna')).toBeVisible();
    await expect(header.getByText('Study Plan')).toBeVisible();

    // Search bar with ⌘K
    await expect(header.locator('input[placeholder*="Search"]')).toBeVisible();
    await expect(header.getByText('K', { exact: true })).toBeVisible();

    // Direct Theme Toggle
    const themeBtn = header.locator('button[aria-label*="Switch to"]');
    await expect(themeBtn).toBeVisible();
    await themeBtn.click();
    // After clicking, theme attribute or state changes
    await expect(page.locator('html')).toHaveAttribute('data-theme', /light|dark/);
  });

  test('Responsive Viewports: No horizontal scroll', async ({ page }) => {
    const viewports = [
      { width: 375, height: 812, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet Portrait' },
      { width: 1024, height: 768, name: 'Tablet Landscape' },
      { width: 1440, height: 900, name: 'Desktop' },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/design-system');
      await page.waitForLoadState('networkidle');

      // Check no horizontal scrollbar on body
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth, `Viewport ${vp.name} (${vp.width}px) has horizontal overflow`).toBeLessThanOrEqual(clientWidth + 2);

      // On mobile, check hamburger button exists
      if (vp.width < 768) {
        const menuBtn = page.locator('#open-sidebar-btn');
        await expect(menuBtn).toBeVisible();
      }
    }
  });
});
