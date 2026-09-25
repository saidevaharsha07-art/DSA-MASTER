import { test, expect } from 'playwright/test';

test.describe('DSA Magna — Visual QA Screenshots for Brand Integration', () => {

  const screenshotDir = 'C:/Users/saide/.gemini/antigravity/brain/27a25c3e-8b2f-4e40-80b0-825148371a40/screenshots/brand';

  const setupAuthAndTheme = async (page: any, theme: 'dark' | 'light') => {
    await page.addInitScript(({ th }: { th: 'dark' | 'light' }) => {
      localStorage.setItem('theme', th);
      document.documentElement.setAttribute('data-theme', th);
      if (th === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
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
    }, { th: theme });
  };

  test('1. Desktop 1440x900 Visual QA (Dark & Light)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    for (const theme of ['dark', 'light'] as const) {
      await setupAuthAndTheme(page, theme);

      // Dashboard with expanded sidebar
      await page.goto('/dashboard');
      await page.waitForLoadState('domcontentloaded');
      const aside = page.locator('aside[aria-label="Main Navigation"]');
      await aside.hover();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `${screenshotDir}/dashboard_desktop_${theme}.png`,
        fullPage: false,
      });

      // Landing page
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `${screenshotDir}/landing_desktop_${theme}.png`,
        fullPage: false,
      });

      // Login page
      await page.goto('/login');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `${screenshotDir}/login_desktop_${theme}.png`,
        fullPage: false,
      });
    }
  });

  test('2. Tablet 1024x768 Visual QA (Dark & Light)', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });

    for (const theme of ['dark', 'light'] as const) {
      await setupAuthAndTheme(page, theme);

      // Dashboard
      await page.goto('/dashboard');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `${screenshotDir}/dashboard_tablet_${theme}.png`,
        fullPage: false,
      });

      // Landing page
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `${screenshotDir}/landing_tablet_${theme}.png`,
        fullPage: false,
      });
    }
  });

  test('3. Mobile 375x812 Visual QA (Dark & Light)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    for (const theme of ['dark', 'light'] as const) {
      await setupAuthAndTheme(page, theme);

      // Dashboard
      await page.goto('/dashboard');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `${screenshotDir}/dashboard_mobile_${theme}.png`,
        fullPage: false,
      });

      // Open drawer
      const hamburger = page.locator('#open-sidebar-btn');
      await expect(hamburger).toBeVisible();
      await hamburger.click({ force: true });
      await page.waitForTimeout(400);
      await page.screenshot({
        path: `${screenshotDir}/mobile_drawer_${theme}.png`,
        fullPage: false,
      });

      // Close drawer
      const closeBtn = page.locator('aside button[aria-label="Close navigation drawer"]');
      if (await closeBtn.isVisible()) {
        await closeBtn.click();
        await page.waitForTimeout(300);
      }

      // Landing page
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `${screenshotDir}/landing_mobile_${theme}.png`,
        fullPage: false,
      });

      // Login page
      await page.goto('/login');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `${screenshotDir}/login_mobile_${theme}.png`,
        fullPage: false,
      });
    }
  });
});
