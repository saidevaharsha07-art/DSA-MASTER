import { test, expect } from 'playwright/test';

test.describe('DSA Magna — Production Readiness Smoke Suite', () => {

  const setupAuth = async (page: any, theme: 'dark' | 'light' = 'dark') => {
    await page.addInitScript(({ th }: { th: 'dark' | 'light' }) => {
      localStorage.setItem('theme', th);
      localStorage.setItem('journey-settings', JSON.stringify({ appearance: { theme: th } }));
      document.documentElement.setAttribute('data-theme', th);
      if (th === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
      localStorage.setItem('dsa-user-name', 'Production Tester');
      localStorage.setItem('auth-user', JSON.stringify({
        id: 'prod-test-user-1',
        email: 'tester@dsamagna.dev',
        displayName: 'Production Tester',
      }));
      localStorage.setItem('auth_session', JSON.stringify({
        sessionId: 'prod-session-1',
        user: { id: 'prod-test-user-1', email: 'tester@dsamagna.dev', displayName: 'Production Tester' },
        expiresAt: Date.now() + 86400000,
      }));
      localStorage.setItem('journey-onboarding-complete', 'true');
    }, { th: theme });
  };

  // ── 1. PUBLIC ROUTES & BRANDING ────────────────────────────────────────────
  test('1. Public landing page renders with DSA Magna branding, hero CTA, and public nav links', async ({ page }) => {
    const res = await page.goto('/');
    expect(res?.status()).toBe(200);
    await page.waitForLoadState('domcontentloaded');

    // Title & Meta
    await expect(page).toHaveTitle(/DSA Magna/i);

    // Header Brand Text & Eyebrow
    await expect(page.locator('header').getByText('DSA Magna')).toBeVisible();
    await expect(page.getByText(/DEVELOPER PLATFORM/i).first()).toBeVisible();

    // Hero Action CTAs
    const startCta = page.getByRole('link', { name: /Start Learning/i }).first();
    await expect(startCta).toBeVisible();

    // Verify Public Navigation Destinations in Header
    await expect(page.locator('header').getByRole('link', { name: 'Journey' })).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'Practice' })).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'Interview' })).toBeVisible();
    await expect(page.locator('header').getByRole('link', { name: 'Study Plan' })).toBeVisible();
  });

  test('2. Public curriculum routes (Journey, Practice, Interview) load successfully', async ({ page }) => {
    // Journey
    const journeyRes = await page.goto('/journey');
    expect(journeyRes?.status()).toBe(200);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Practice
    const practiceRes = await page.goto('/practice');
    expect(practiceRes?.status()).toBe(200);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByPlaceholder(/search/i).first()).toBeVisible();

    // Interview
    const interviewRes = await page.goto('/interview');
    expect(interviewRes?.status()).toBe(200);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  // ── 2. AUTHENTICATION UI & FLOWS ───────────────────────────────────────────
  test('3. Authentication routes (/login, /signup, /forgot-password, /auth/callback) render clean forms', async ({ page }) => {
    // /login
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('input[placeholder="Username or Email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /Continue with Google/i })).toBeVisible();

    // /signup
    await page.goto('/signup');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('input[placeholder="Username or Email"]')).toBeVisible();

    // /forgot-password
    await page.goto('/forgot-password');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('input[type="email"], input[placeholder*="email" i]')).toBeVisible();

    // /auth/callback
    const callbackRes = await page.goto('/auth/callback');
    expect(callbackRes?.status()).toBe(200);
  });

  // ── 3. CORE LEARNING & DRILL-DOWN FLOW ──────────────────────────────────────
  test('4. Core learning drill-down: /journey/[area] renders platforms and links to practice', async ({ page }) => {
    await setupAuth(page, 'dark');
    await page.goto('/journey/basic-arrays');
    await page.waitForLoadState('domcontentloaded');

    // Title / header
    await expect(page.locator('h1')).toContainText(/Array/i);

    // Platform card links exist and point to practice
    const leetcodeLink = page.locator('a[href*="/practice?area=basic-arrays&platform=leetcode"]').first();
    await expect(leetcodeLink).toBeVisible();
  });

  // ── 4. RESPONSIVE VIEWPORTS ────────────────────────────────────────────────
  test('5. Multi-viewport verification: 375x812 Mobile and 1440x900 Desktop render with zero horizontal overflow', async ({ page }) => {
    // Mobile Viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(mobileOverflow).toBe(false);

    // Desktop Viewport
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');
    const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(desktopOverflow).toBe(false);
  });

  // ── 5. THEME RENDERING ─────────────────────────────────────────────────────
  test('6. Dark and Light themes apply data-theme attributes correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const themeToggle = page.locator('header button[aria-label*="Switch to"]');
    await expect(themeToggle).toBeVisible();

    // Verify initial theme attribute is valid
    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(['dark', 'light']).toContain(initialTheme);

    // Toggle theme
    await themeToggle.click();
    await page.waitForTimeout(200);
    const toggledTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(['dark', 'light']).toContain(toggledTheme);
    expect(toggledTheme).not.toBe(initialTheme);

    // Toggle back
    await themeToggle.click();
    await page.waitForTimeout(200);
    const restoredTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(restoredTheme).toBe(initialTheme);
  });

  // ── 6. SECURITY HEADERS & API AUTHORIZATION ────────────────────────────────
  test('7. Security headers and API authorization: verifies nosniff, sameorigin, and 401 on unauthenticated sync', async ({ page }) => {
    const res = await page.goto('/');
    expect(res).not.toBeNull();
    const headers = res?.headers() || {};

    // Verify Security Headers configured in next.config.ts
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('SAMEORIGIN');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');

    // Test API authorization on /api/db/sync without credentials (must return 401)
    const unauthorizedSync = await page.request.get('/api/db/sync?userId=victim_user_123');
    expect(unauthorizedSync.status()).toBe(401);
    const errJson = await unauthorizedSync.json();
    expect(errJson.error).toContain('Unauthorized');

    // Test /api/ai/generate rejects empty prompt (must return 400)
    const badAiReq = await page.request.post('/api/ai/generate', {
      data: { prompt: '' },
    });
    expect(badAiReq.status()).toBe(400);
  });
});
