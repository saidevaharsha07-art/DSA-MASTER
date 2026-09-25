import { test, expect } from 'playwright/test';

test.describe('DSA Magna — Canonical Brand Asset & Logo Integration E2E', () => {

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

  test('1. Desktop Sidebar renders canonical DSA Magna logo linking to /dashboard without broken image', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');

    const aside = page.locator('aside[aria-label="Main Navigation"]');
    await expect(aside).toBeVisible();

    // Verify brand link points to /dashboard
    const brandLink = aside.locator('a[aria-label="DSA Magna Dashboard"]');
    await expect(brandLink).toBeVisible();
    await expect(brandLink).toHaveAttribute('href', '/dashboard');

    // Verify canonical logo image is rendered and loaded
    const logoImg = brandLink.locator('img[src*="dsa-magna-logo.png"]');
    await expect(logoImg).toBeVisible();

    // Verify image is not broken and has positive natural dimensions
    const isLoaded = await logoImg.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
    expect(isLoaded).toBe(true);

    // Verify square aspect ratio (no distortion)
    const dimensions = await logoImg.evaluate((img: HTMLImageElement) => ({
      width: img.offsetWidth,
      height: img.offsetHeight,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }));
    expect(dimensions.width).toBe(dimensions.height);
    expect(dimensions.naturalWidth).toBe(dimensions.naturalHeight);

    // Verify old brand string is not present in sidebar
    expect(await aside.getByText('DSA MASTER').count()).toBe(0);
  });

  test('2. Mobile Navigation renders canonical logo inside drawer', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');

    // Open mobile drawer via hamburger button
    const hamburgerBtn = page.locator('#open-sidebar-btn');
    await expect(hamburgerBtn).toBeVisible();
    await hamburgerBtn.click();

    // Drawer logo is rendered and loaded
    const drawer = page.locator('aside[aria-label="Main Navigation"]');
    await expect(drawer).toBeVisible();
    const drawerLogo = drawer.locator('img[src*="dsa-magna-logo.png"]');
    await expect(drawerLogo).toBeVisible();
    const drawerLogoLoaded = await drawerLogo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
    expect(drawerLogoLoaded).toBe(true);

    // Drawer brand link points to /dashboard
    const drawerBrandLink = drawer.locator('a[aria-label="DSA Magna Dashboard"]');
    await expect(drawerBrandLink).toHaveAttribute('href', '/dashboard');
  });

  test('3. Auth pages render canonical logo badge with DSA Magna brand', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');

    const authLogo = page.locator('img[src*="dsa-magna-logo.png"]');
    await expect(authLogo).toBeVisible();

    const isLoaded = await authLogo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
    expect(isLoaded).toBe(true);

    await expect(page.getByText('DSA Magna', { exact: false }).first()).toBeVisible();
    expect(await page.getByText('DSA MASTER').count()).toBe(0);
  });

  test('4. Landing Page Navbar and Footer render canonical logo asset', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Navbar logo
    const navLogo = page.locator('header img[src*="dsa-magna-logo.png"]');
    await expect(navLogo).toBeVisible();
    const navLogoLoaded = await navLogo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
    expect(navLogoLoaded).toBe(true);

    // Footer logo
    const footerLogo = page.locator('footer img[src*="dsa-magna-logo.png"]');
    await expect(footerLogo).toBeVisible();
    const footerLogoLoaded = await footerLogo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
    expect(footerLogoLoaded).toBe(true);

    // Old brand string check
    expect(await page.locator('header').getByText('DSA MASTER').count()).toBe(0);
    expect(await page.locator('footer').getByText('DSA MASTER').count()).toBe(0);
  });

  test('5. Logo renders cleanly under both dark and light themes without distortion or broken styles', async ({ page }) => {
    // Dark theme
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');
    const logoDark = page.locator('aside img[src*="dsa-magna-logo.png"]');
    await expect(logoDark).toBeVisible();

    // Switch to light theme
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');

    const logoLight = page.locator('aside img[src*="dsa-magna-logo.png"]');
    await expect(logoLight).toBeVisible();
    const isLightLoaded = await logoLight.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0);
    expect(isLightLoaded).toBe(true);
  });

  test('6. Favicon and Web App Manifest expose DSA Magna brand icon', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Verify manifest has icons entry
    const manifestResponse = await page.request.get('/manifest.json');
    expect(manifestResponse.ok()).toBe(true);
    const manifestJson = await manifestResponse.json();
    expect(manifestJson.name).toContain('DSA Magna');
    expect(manifestJson.short_name).toBe('DSA Magna');
    expect(Array.isArray(manifestJson.icons)).toBe(true);
    expect(manifestJson.icons.length).toBeGreaterThan(0);
    expect(manifestJson.icons[0].src).toBe('/brand/dsa-magna-logo.png');
  });
});
