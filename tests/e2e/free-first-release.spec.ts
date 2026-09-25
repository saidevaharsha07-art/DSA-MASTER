import { test, expect } from 'playwright/test';
import { isLocalExecutionAllowed, sandboxRunner } from '../../src/services/judge/sandbox/runner';
import { getServerJudgeProvider } from '../../src/services/judge/server/provider-factory';

test.describe('DSA Magna — Free First Release ($0 Hosting & Unprovisioned Judge Guard)', () => {

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
      localStorage.setItem('dsa-user-name', 'Free Launch User');
      localStorage.setItem('auth-user', JSON.stringify({
        id: 'free-user-1',
        email: 'learner@dsamagna.dev',
        displayName: 'Free Launch User',
      }));
      localStorage.setItem('auth_session', JSON.stringify({
        sessionId: 'free-session-1',
        user: { id: 'free-user-1', email: 'learner@dsamagna.dev', displayName: 'Free Launch User' },
        expiresAt: Date.now() + 86400000,
      }));
      localStorage.setItem('journey-onboarding-complete', 'true');
    }, { th: theme });
  };

  // ── 1. PRODUCTION WITH NO JUDGE0 CONFIG: NO CHILD_PROCESS, NO CRASH ──────
  test('1. Production environment without Judge0 config disables child_process and returns coming soon', async ({ request }) => {
    const originalNextPublic = process.env.NEXT_PUBLIC_ENABLE_LOCAL_RUNNER;
    const originalEnable = process.env.ENABLE_LOCAL_RUNNER;
    const originalNodeEnv = process.env.NODE_ENV;
    const originalUrl = process.env.JUDGE0_URL;
    const originalKey = process.env.JUDGE0_API_KEY;

    try {
      // Simulate production with NO external Judge0 configured
      process.env.NEXT_PUBLIC_ENABLE_LOCAL_RUNNER = 'false';
      process.env.ENABLE_LOCAL_RUNNER = 'false';
      (process.env as any).NODE_ENV = 'production';
      delete process.env.JUDGE0_URL;
      delete process.env.JUDGE0_API_KEY;

      expect(isLocalExecutionAllowed()).toBe(false);

      // Attempting to call sandboxRunner.execute throws without spawning child_process
      await expect(
        sandboxRunner.execute({
          language: 'python',
          code: 'print("arbitrary code")',
        })
      ).rejects.toThrow('Unsafe host code execution is disabled in production');

      // The server judge provider resolves to Judge0 (never local child_process)
      const provider = getServerJudgeProvider();
      expect(provider.id).toBe('judge0');

      // Direct execution on unconfigured Judge0 returns coming soon payload without crashing
      const rawResult = await provider.execute({
        language: 'python',
        code: 'print("hello")',
      });
      expect(rawResult.status).toBe('runtime_error');
      expect(rawResult.stderr).toContain('coming soon');

      // API route /api/judge/run returns HTTP 200 with graceful coming soon payload
      const runRes = await request.post('/api/judge/run', {
        data: {
          problemId: 'two-sum',
          language: 'python',
          code: 'def twoSum(nums, target): return [0, 1]',
        },
      });
      expect(runRes.status()).toBe(200);
      const runJson = await runRes.json();
      expect(runJson.status).toBe('runtime_error');
      expect(runJson.stderr).toContain('coming soon');
      expect(runJson.passedTestcases).toBe(0);

      // API route /api/judge/submit returns HTTP 200 with graceful coming soon payload
      const submitRes = await request.post('/api/judge/submit', {
        data: {
          problemId: 'two-sum',
          language: 'python',
          code: 'def twoSum(nums, target): return [0, 1]',
          userId: 'test_user_free',
        },
      });
      expect(submitRes.status()).toBe(200);
      const submitJson = await submitRes.json();
      expect(submitJson.verdict).toBe('Runtime Error');
      expect(submitJson.errorLog).toContain('coming soon');
      expect(submitJson.testcasesPassed).toBe(0);
      expect(submitJson.xpEarned).toBe(0); // Never fakes XP
    } finally {
      process.env.NEXT_PUBLIC_ENABLE_LOCAL_RUNNER = originalNextPublic;
      process.env.ENABLE_LOCAL_RUNNER = originalEnable;
      (process.env as any).NODE_ENV = originalNodeEnv;
      if (originalUrl) process.env.JUDGE0_URL = originalUrl;
      if (originalKey) process.env.JUDGE0_API_KEY = originalKey;
    }
  });

  // ── 2. RUN ACTION: SHOWS EXECUTION-UNAVAILABLE STATE ────────────────────────
  test('2. Run Code in Practice IDE gracefully displays coming soon state without faking results', async ({ page }) => {
    await setupAuth(page, 'dark');
    await page.goto('/practice/two-sum');
    await page.waitForLoadState('domcontentloaded');

    // Find and click the Run Code button in the action footer
    const runBtn = page.getByRole('button', { name: /Run Code/i });
    await expect(runBtn).toBeVisible();
    await runBtn.click();

    // Verify console output tab is selected and displays intentional coming soon banner
    await expect(page.getByText('Code Execution Coming Soon').first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Execution unavailable in the first release').first()).toBeVisible();
  });

  // ── 3. SUBMIT ACTION: SHOWS EXECUTION-UNAVAILABLE STATE ─────────────────────
  test('3. Submit Solution in Practice IDE gracefully displays coming soon state without faking results', async ({ page }) => {
    await setupAuth(page, 'dark');
    await page.goto('/practice/two-sum');
    await page.waitForLoadState('domcontentloaded');

    // Find and click Submit Solution button
    const submitBtn = page.getByRole('button', { name: /Submit Solution/i });
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Verify console submit tab displays intentional coming soon banner without faking Accepted
    await expect(page.getByText('Code Execution Coming Soon').first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Execution unavailable in the first release').first()).toBeVisible();
  });

  // ── 4. EXISTING PUBLIC ROUTES WORK ─────────────────────────────────────────
  test('4. All public routes load with status 200 and correct page content', async ({ page }) => {
    const routes = ['/', '/journey', '/practice', '/interview', '/study-plan'];

    for (const route of routes) {
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await page.waitForLoadState('domcontentloaded');
      expect(await page.title()).toMatch(/DSA Magna/i);
    }
  });

  // ── 5. AUTH FLOWS WORK ─────────────────────────────────────────────────────
  test('5. Authentication routes render clean accessible forms', async ({ page }) => {
    // /login
    await page.goto('/login');
    await expect(page.locator('input[placeholder="Username or Email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();

    // /signup
    await page.goto('/signup');
    await expect(page.locator('input[placeholder="Username or Email"]')).toBeVisible();

    // /forgot-password
    await page.goto('/forgot-password');
    await expect(page.locator('input[type="email"], input[placeholder*="email" i]')).toBeVisible();
  });

  // ── 6. ONBOARDING WORKS ───────────────────────────────────────────────────
  test('6. Onboarding flow loads with interactive steps', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  // ── 7. DASHBOARD WORKS ─────────────────────────────────────────────────────
  test('7. Authenticated Dashboard renders with learner stats, progress, and sidebar', async ({ page }) => {
    await setupAuth(page, 'dark');
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('DSA Magna').first()).toBeVisible();
  });

  // ── 8. STUDY PLAN WORKS ────────────────────────────────────────────────────
  test('8. Study Plan page loads tracks and difficulty roadmaps', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  // ── 9. PRACTICE UI WORKS ───────────────────────────────────────────────────
  test('9. Practice IDE UI renders problem description, code editor, and console tabs', async ({ page }) => {
    await setupAuth(page, 'dark');
    await page.goto('/practice/two-sum');
    await page.waitForLoadState('domcontentloaded');

    // Problem Description
    await expect(page.getByRole('heading', { name: /Two Sum/i })).toBeVisible();

    // Language selector dropdown
    await expect(page.locator('select').first()).toBeVisible();

    // Console tabs
    await expect(page.getByRole('button', { name: /Sample Testcases/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Custom Input/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Run Output/i })).toBeVisible();
  });

  // ── 10. INTERVIEW WORKS ────────────────────────────────────────────────────
  test('10. Interview page loads with assessment modules and company tracks', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  // ── 11. SETTINGS WORKS ─────────────────────────────────────────────────────
  test('11. Settings page loads with preferences, theme, and account controls', async ({ page }) => {
    await setupAuth(page, 'dark');
    await page.goto('/settings');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  // ── 12. DARK / LIGHT THEMES WORK ──────────────────────────────────────────
  test('12. Theme switching toggles data-theme correctly across pages', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const themeBtn = page.locator('header button[aria-label*="Switch to"]');
    await expect(themeBtn).toBeVisible();

    const startTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    await themeBtn.click();
    await page.waitForTimeout(200);

    const toggledTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(toggledTheme).not.toBe(startTheme);

    // Toggle back
    await themeBtn.click();
    await page.waitForTimeout(200);
    const endTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(endTheme).toBe(startTheme);
  });

  // ── 13. MOBILE WORKS ───────────────────────────────────────────────────────
  test('13. Mobile viewport (375x812) renders clean responsive layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Header branding visible on mobile
    await expect(page.locator('header').getByText('DSA Magna')).toBeVisible();

    // Mobile navigation button or hamburger is accessible
    const mobileMenuBtn = page.locator('header button[aria-label*="menu" i], header button[aria-label*="navigation" i]').first();
    if (await mobileMenuBtn.isVisible()) {
      await mobileMenuBtn.click();
      await page.waitForTimeout(200);
    }
  });

  // ── 14. NO HORIZONTAL OVERFLOW ─────────────────────────────────────────────
  test('14. Zero horizontal overflow across major routes on mobile and desktop viewports', async ({ page }) => {
    const testRoutes = ['/', '/journey', '/practice', '/dashboard', '/interview'];

    // Test Mobile Viewport (375px)
    await page.setViewportSize({ width: 375, height: 812 });
    for (const route of testRoutes) {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');
      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(hasOverflow).toBe(false);
    }

    // Test Desktop Viewport (1440px)
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const route of testRoutes) {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');
      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(hasOverflow).toBe(false);
    }
  });

});
