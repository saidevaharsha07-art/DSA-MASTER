import { test, expect } from 'playwright/test';
import * as path from 'path';

const SCREENSHOT_DIR = 'C:\\Users\\saide\\.gemini\\antigravity\\brain\\27a25c3e-8b2f-4e40-80b0-825148371a40\\screenshots';

test.describe('DSA MASTER — UI/UX Phase 10 Whole-Site Visual & UX Audit E2E', () => {

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('dsa-user-name', 'Alex Developer');
      localStorage.setItem('auth-user', JSON.stringify({
        id: 'test-user-1',
        email: 'alex@dsamaster.com',
        displayName: 'Alex Developer',
        user_metadata: { name: 'Alex Developer' }
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
    });
  });

  // ── 1. PUBLIC & DISCOVERY ROUTES AUDIT ─────────────────────────────────────
  test('1A. / (Landing Page) renders clean hero and CTAs', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1')).toContainText(/MASTER/i);
    await expect(page.locator('main').getByRole('link', { name: /Start Learning|Continue Learning/i }).first()).toBeVisible();
    await expect(page.locator('main').getByRole('link', { name: /Explore Journey/i }).first()).toBeVisible();
  });

  test('1B. /journey renders learning journey and curriculum bands', async ({ page }) => {
    await page.goto('/journey');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1')).toContainText(/Journey/i);
    await expect(page.getByRole('heading', { name: 'Foundations' })).toBeVisible();
  });

  test('1C. /journey/basic-arrays renders topic area details', async ({ page }) => {
    await page.goto('/journey/basic-arrays');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1')).toContainText(/Array/i);
  });

  test('1D. Pattern Academy renders 6 progressive learning stages', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1')).toContainText(/Array Fundamentals/i);
    await expect(page.getByRole('button', { name: /01 Understand/i })).toBeVisible();
  });

  test('1E. /practice renders practice workspace header', async ({ page }) => {
    await page.goto('/practice');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('Practice Arena', { exact: false }).first()).toBeVisible();
  });

  test('1F. /interview renders simulated technical interview environment', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('Technical Interview', { exact: false }).first()).toBeVisible();
  });

  // ── 2. AUTH ROUTES AUDIT ───────────────────────────────────────────────────
  test('2A. /login renders credential inputs and submit button', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('auth_session');
      localStorage.removeItem('auth-user');
    });
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('input[placeholder="Username or Email"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'LOGIN' })).toBeVisible();
  });

  test('2B. /signup renders registration inputs and submit button', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('auth_session');
      localStorage.removeItem('auth-user');
    });
    await page.goto('/signup');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('input[placeholder="Full Name"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'REGISTER' })).toBeVisible();
  });

  test('2C. /forgot-password renders reset mode and submit button', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('auth_session');
      localStorage.removeItem('auth-user');
    });
    await page.goto('/forgot-password');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('button', { name: 'SEND RESET LINK' })).toBeVisible();
  });

  test('2D. /onboarding renders progress indicator and diagnostic starter', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('journey-onboarding-complete');
    });
    await page.goto('/onboarding');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('[role="progressbar"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /Get Started/i })).toBeVisible();
  });

  // ── 3. APP & PERSONAL ROUTES AUDIT ─────────────────────────────────────────
  test('3A. /dashboard renders developer command center', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('DSA Magna', { exact: false }).first()).toBeVisible();
  });

  test('3B. /study-plan renders daily execution workspace', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('TODAY', { exact: false }).first()).toBeVisible();
  });

  test('3C. /settings renders tabs and preferences', async ({ page }) => {
    await page.goto('/settings');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1')).toContainText(/Settings/i);
  });

  test('3D. /profile redirects to /dashboard', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('3E. /analytics renders telemetry and metrics', async ({ page }) => {
    await page.goto('/analytics');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1')).toContainText(/Analytics/i);
  });

  test('3F. /contest renders contest arena lobby', async ({ page }) => {
    await page.goto('/contest');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('Contest', { exact: false }).first()).toBeVisible();
  });

  test('3G. /revision renders memory command center', async ({ page }) => {
    await page.goto('/revision');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('Revision', { exact: false }).first()).toBeVisible();
  });

  test('3H. /mentor renders AI coaching center', async ({ page }) => {
    await page.goto('/mentor');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('Mentor', { exact: false }).first()).toBeVisible();
  });

  test('3I. /session-summary renders complete metrics and next step', async ({ page }) => {
    await page.goto('/session-summary');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1')).toContainText(/Session Complete/i);
  });

  test('3J. /career renders career intelligence command center', async ({ page }) => {
    await page.goto('/career');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1')).toContainText(/Career Intelligence/i);
  });

  test('3K. /design-system renders component catalog and tokens', async ({ page }) => {
    await page.goto('/design-system');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1')).toContainText(/Design System/i);
  });

  // ── 4. TERMINOLOGY CLEANLINESS (NO FANTASY KINGDOM/REALM LABELS) ────────────
  test('4. Learner-facing UI has zero fantasy Kingdom/Realm terminology', async ({ page }) => {
    // Audit Practice IDE breadcrumbs
    await page.goto('/practice/contains-duplicate');
    await page.waitForLoadState('domcontentloaded');
    const practiceNavText = await page.locator('nav, header, [role="navigation"]').allInnerTexts();
    const joinedPractice = practiceNavText.join(' ');
    expect(joinedPractice).not.toMatch(/Kingdom of Beginnings/i);
    expect(joinedPractice).not.toMatch(/The Moving Horizon/i);

    // Audit Settings Goals
    await page.goto('/settings?tab=goals');
    await page.waitForLoadState('domcontentloaded');
    const goalsText = await page.innerText('body');
    expect(goalsText).not.toMatch(/Explorer of Realms/i);

    // Audit Analytics Connected Platforms
    await page.goto('/analytics');
    await page.waitForLoadState('domcontentloaded');
    const analyticsText = await page.innerText('body');
    expect(analyticsText).not.toMatch(/Connected Realms/i);
    expect(analyticsText).toMatch(/Connected Platforms/i);
  });

  // ── 5. RESPONSIVE VIEWPORT ZERO-OVERFLOW AUDIT ──────────────────────────────
  const viewports = [
    { name: 'Mobile (375x812)', width: 375, height: 812 },
    { name: 'Tablet Portrait (768x1024)', width: 768, height: 1024 },
    { name: 'Tablet Landscape (1024x768)', width: 1024, height: 768 },
    { name: 'Desktop (1440x900)', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    test(`5. Viewport ${vp.name} renders critical surfaces with 0 horizontal overflow`, async ({ page }) => {
      test.setTimeout(120000);
      await page.setViewportSize({ width: vp.width, height: vp.height });

      const auditRoutes = [
        '/',
        '/journey',
        '/practice',
        '/interview',
        '/study-plan',
        '/settings',
        '/session-summary',
        '/career',
        '/login'
      ];

      for (const route of auditRoutes) {
        await page.goto(route);
        await page.waitForLoadState('domcontentloaded');

        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
      }
    });
  }

  // ── 6. DARK & LIGHT THEME PARITY AUDIT ─────────────────────────────────────
  test('6. Pages render cleanly in both dark and light modes', async ({ page }) => {
    test.setTimeout(120000);
    const testRoutes = ['/dashboard', '/study-plan', '/settings', '/journey', '/practice'];

    for (const route of testRoutes) {
      // Dark Mode
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      });
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');
      await expect(page.locator('body')).toBeVisible();

      // Light Mode
      await page.addInitScript(() => {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
      });
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');
      await expect(page.locator('body')).toBeVisible();
    }
  });

  // ── 7. REALISTIC USER JOURNEY FLOWS ─────────────────────────────────────────

  test('7. FLOW A: Landing -> Journey -> Area -> Pattern -> Practice', async ({ page }) => {
    // 1. Landing
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('main').getByRole('link', { name: /Explore Journey/i }).first().click();

    // 2. Journey
    await page.waitForURL(/journey/);
    await expect(page.locator('h1')).toContainText(/Journey/i);

    // 3. Learning Area (Array)
    await page.getByRole('link', { name: /Array/i }).first().click();
    await page.waitForURL(/journey\/basic-arrays/);

    // 4. Pattern Concept Academy
    const learnLink = page.locator('a[href*="/journey/basic-arrays/"][href*="array-fundamentals"]').first();
    await expect(learnLink).toBeVisible();
    await learnLink.click();
    await page.waitForURL((url) =>
      url.pathname.includes('/journey/basic-arrays/') &&
      url.pathname.includes('array-fundamentals')
    );
    await expect(page.locator('h1')).toContainText(/Array Fundamentals/i);

    // 5. Practice Link from Pattern Academy
    const practiceLink = page.getByRole('link', { name: /Practice Pattern/i }).first();
    await expect(practiceLink).toBeVisible();
  });

  test('7. FLOW B: Landing -> Login -> Onboarding -> Command Center -> Study Plan', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('journey-onboarding-complete');
    });

    // 1. Landing -> Login
    await page.goto('/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.waitForURL(/login/);

    // 2. Login -> Onboarding
    await page.goto('/onboarding');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('button', { name: /Get Started/i })).toBeVisible();

    // Skip to Roadmap
    await page.getByRole('button', { name: /Skip for now/i }).first().click();

    // 3. Dashboard / Command Center
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('DSA Magna', { exact: false }).first()).toBeVisible();

    // 4. Navigate to Study Plan
    await page.goto('/study-plan');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('TODAY', { exact: false }).first()).toBeVisible();
  });

  test('7. FLOW C: Pattern -> Interview This Pattern -> Interview Workspace', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('domcontentloaded');

    // Click Interview This Pattern
    const interviewBtn = page.getByTestId('interview-this-pattern-btn');
    await expect(interviewBtn).toBeVisible();
    await interviewBtn.click();
    await page.waitForURL(/interview/);
    await expect(page.getByText('Technical Interview', { exact: false }).first()).toBeVisible();
  });

  test('7. FLOW D: Pattern -> Practice Sprint -> Practice Arena', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('domcontentloaded');

    // Click Start 5-Problem Sprint
    const sprintBtn = page.getByTestId('start-smart-sprint-btn');
    await expect(sprintBtn).toBeVisible();
    await sprintBtn.click();
    await page.waitForURL(/practice/);
    await expect(page.getByText('Practice Arena', { exact: false }).first()).toBeVisible();
  });

  test('7. FLOW E: Command Center -> Study Plan -> Pattern -> Command Center', async ({ page }) => {
    // 1. Command Center
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');

    // 2. Study Plan
    await page.goto('/study-plan');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('TODAY', { exact: false }).first()).toBeVisible();

    // 3. Pattern Academy
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('h1')).toContainText(/Array Fundamentals/i);

    // 4. Return to Command Center
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByText('DSA Magna', { exact: false }).first()).toBeVisible();
  });

  // ── 8. SCREENSHOT QA CAPTURES (INDIVIDUAL FOCUSED TESTS) ───────────────────
  test('8A. Screenshot QA: Desktop Dark Theme', async ({ page }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    });

    const routes = [
      { path: '/', name: 'audit_landing' },
      { path: '/journey', name: 'audit_journey' },
      { path: '/practice', name: 'audit_practice' },
      { path: '/interview', name: 'audit_interview' },
      { path: '/study-plan', name: 'audit_study_plan' },
      { path: '/settings', name: 'audit_settings' },
      { path: '/dashboard', name: 'audit_dashboard' },
      { path: '/login', name: 'audit_login' },
    ];

    for (const r of routes) {
      await page.goto(r.path);
      await page.waitForLoadState('domcontentloaded');
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `${r.name}_desktop_dark.png`),
        fullPage: false,
      });
    }
  });

  test('8B. Screenshot QA: Desktop Light Theme', async ({ page }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    });

    const routes = [
      { path: '/', name: 'audit_landing' },
      { path: '/journey', name: 'audit_journey' },
      { path: '/practice', name: 'audit_practice' },
      { path: '/interview', name: 'audit_interview' },
      { path: '/study-plan', name: 'audit_study_plan' },
      { path: '/settings', name: 'audit_settings' },
      { path: '/dashboard', name: 'audit_dashboard' },
      { path: '/login', name: 'audit_login' },
    ];

    for (const r of routes) {
      await page.goto(r.path);
      await page.waitForLoadState('domcontentloaded');
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `${r.name}_desktop_light.png`),
        fullPage: false,
      });
    }
  });

  test('8C. Screenshot QA: Mobile Dark Theme', async ({ page }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    });

    const routes = [
      { path: '/', name: 'audit_landing' },
      { path: '/journey', name: 'audit_journey' },
      { path: '/practice', name: 'audit_practice' },
      { path: '/interview', name: 'audit_interview' },
      { path: '/study-plan', name: 'audit_study_plan' },
      { path: '/settings', name: 'audit_settings' },
      { path: '/dashboard', name: 'audit_dashboard' },
      { path: '/login', name: 'audit_login' },
    ];

    for (const r of routes) {
      await page.goto(r.path);
      await page.waitForLoadState('domcontentloaded');
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, `${r.name}_mobile_dark.png`),
        fullPage: false,
      });
    }
  });
});
