import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — Settings Sidebar Information Architecture & UX', () => {
  test.beforeEach(async ({ page }) => {
    // Pre-seed local storage with active session and initial state
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('dsa-user-name', 'Alex Developer');
      localStorage.setItem('auth-user', JSON.stringify({
        id: 'test-user-1',
        email: 'alex@dsamaster.com',
        displayName: 'Alex Developer',
        user_metadata: { name: 'Alex Developer' },
      }));
      localStorage.setItem('auth_session', JSON.stringify({
        sessionId: 'test-session-1',
        user: {
          id: 'test-user-1',
          email: 'alex@dsamaster.com',
          displayName: 'Alex Developer',
          username: 'alex',
          provider: 'email',
        },
        provider: 'email',
        accessToken: 'test-token',
        expiresAt: Date.now() + 86400000,
      }));
      localStorage.setItem('journey-onboarding-complete', 'true');
      localStorage.setItem('journey-settings-active-tab', 'appearance');
    });
  });

  test('1. Settings sidebar renders target task-oriented sections and items', async ({ page }) => {
    await page.goto('/settings');
    await page.waitForLoadState('networkidle');

    const nav = page.locator('aside[aria-label="Settings Navigation"]');
    await expect(nav).toBeVisible();

    // Verify Section Headers
    await expect(nav.getByText('PROFILE', { exact: true })).toBeVisible();
    await expect(nav.getByText('PREFERENCES', { exact: true })).toBeVisible();
    await expect(nav.getByText('CONNECTED', { exact: true })).toBeVisible();
    await expect(nav.getByText('SYSTEM', { exact: true })).toBeVisible();

    // Verify Active / Target Destinations
    await expect(nav.getByTestId('settings-tab-profile')).toBeVisible();
    await expect(nav.getByTestId('settings-tab-profile')).toContainText('Developer Profile');

    await expect(nav.getByTestId('settings-tab-appearance')).toBeVisible();
    await expect(nav.getByTestId('settings-tab-appearance')).toContainText('Appearance');

    await expect(nav.getByTestId('settings-tab-learning')).toBeVisible();
    await expect(nav.getByTestId('settings-tab-learning')).toContainText('Learning Preferences');

    await expect(nav.getByTestId('settings-tab-goals')).toBeVisible();
    await expect(nav.getByTestId('settings-tab-goals')).toContainText('Goals & Targets');

    await expect(nav.getByTestId('settings-tab-integrations')).toBeVisible();
    await expect(nav.getByTestId('settings-tab-integrations')).toContainText('Platforms & Sync');

    await expect(nav.getByTestId('settings-tab-security')).toBeVisible();
    await expect(nav.getByTestId('settings-tab-security')).toContainText('Account & Security');

    // Confirm REMOVED items are NOT standalone sidebar buttons
    expect(await nav.getByText('Layout & Interface', { exact: true }).count()).toBe(0);
    expect(await nav.getByText('Practice', { exact: true }).count()).toBe(0);
    expect(await nav.getByText('Revision Center', { exact: true }).count()).toBe(0);
  });

  test('2. Navigation rows adhere to 40px desktop height and >=44px mobile touch targets', async ({ page }) => {
    // Desktop Viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/settings');
    await page.waitForLoadState('domcontentloaded');

    const desktopTab = page.locator('aside[aria-label="Settings Navigation"] button').first();
    const desktopBox = await desktopTab.boundingBox();
    expect(desktopBox).not.toBeNull();
    if (desktopBox) {
      // 40px target height (allows small subpixel variations: 38-42px)
      expect(desktopBox.height).toBeGreaterThanOrEqual(38);
      expect(desktopBox.height).toBeLessThanOrEqual(44);
    }

    // Mobile Viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/settings');
    await page.waitForLoadState('domcontentloaded');

    const mobileTab = page.locator('aside[aria-label="Settings Navigation"] button').first();
    const mobileBox = await mobileTab.boundingBox();
    expect(mobileBox).not.toBeNull();
    if (mobileBox) {
      // Standard mobile touch target >= 44px
      expect(mobileBox.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('3. Tab switching renders correct panels and active indicator', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/settings');
    await page.waitForLoadState('networkidle');

    const nav = page.locator('aside[aria-label="Settings Navigation"]');

    // 1. Appearance (Default or Selected)
    await nav.getByTestId('settings-tab-appearance').click();
    await expect(page.locator('h1')).toContainText('Settings');
    await expect(page.getByText('Theme & Accent Palette')).toBeVisible();
    await expect(page.getByText('Interface Density & Motion')).toBeVisible(); // Consolidated InterfaceCard!

    // 2. Developer Profile
    await nav.getByTestId('settings-tab-profile').click();
    await expect(page.getByRole('heading', { name: 'Developer Identity' })).toBeVisible();
    await expect(page.getByText('Competitive Coding Handles')).toBeVisible();

    // 3. Learning Preferences
    await nav.getByTestId('settings-tab-learning').click();
    await expect(page.getByText('Learning Strategy')).toBeVisible();
    await expect(page.getByText('Spaced Repetition & Memory Parameters')).toBeVisible(); // Consolidated SRS parameters!

    // 4. Goals & Targets
    await nav.getByTestId('settings-tab-goals').click();
    await expect(page.getByRole('heading', { name: 'Mastery Milestones' })).toBeVisible();

    // 5. Platforms & Sync
    await nav.getByTestId('settings-tab-integrations').click();
    await expect(page.getByRole('heading', { name: 'Connected Coding Platforms' })).toBeVisible();

    // 6. Account & Security
    await nav.getByTestId('settings-tab-security').click();
    await expect(page.getByRole('heading', { name: 'Authentication & Session' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Privacy Boundaries & Telemetry' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Data Portability & Backups' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Danger Zone' })).toBeVisible();
  });

  test('4. Backwards compatibility: legacy URL query params resolve to canonical tabs without dead ends', async ({ page }) => {
    // ?tab=interface -> should resolve to Appearance (where InterfaceCard lives)
    await page.goto('/settings?tab=interface');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Interface Density & Motion')).toBeVisible();

    // ?tab=practice -> should resolve to Learning Preferences
    await page.goto('/settings?tab=practice');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Learning Strategy')).toBeVisible();

    // ?tab=revision -> should resolve to Learning Preferences (with SRS parameters)
    await page.goto('/settings?tab=revision');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Spaced Repetition & Memory Parameters')).toBeVisible();

    // ?tab=privacy -> should resolve to Account & Security
    await page.goto('/settings?tab=privacy');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Data Portability & Backups')).toBeVisible();
  });

  test('5. Dark and light themes render cleanly with 0 horizontal overflow', async ({ page }) => {
    for (const theme of ['dark', 'light'] as const) {
      await page.addInitScript((th) => {
        document.documentElement.classList.toggle('dark', th === 'dark');
        document.documentElement.classList.toggle('light', th === 'light');
      }, theme);

      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/settings?tab=security');
      await page.waitForLoadState('networkidle');

      const isOverflowingDesktop = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(isOverflowingDesktop).toBe(false);

      // Mobile check
      await page.setViewportSize({ width: 375, height: 812 });
      await page.reload();
      await page.waitForLoadState('networkidle');

      const isOverflowingMobile = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(isOverflowingMobile).toBe(false);
    }
  });
});
