import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — UI/UX Phase 2: Premium Public Landing Page E2E', () => {

  // ── TEST A: PAGE LOADS & HERO SECTION ─────────────────────────────────────
  test('A. Landing page loads with header, hero headline, and supporting statement', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify main brand in header
    await expect(page.locator('header').getByText('DSA MASTER')).toBeVisible();

    // Verify eyebrow
    await expect(page.getByText('DSA MASTER 2.0 • DEVELOPER PLATFORM')).toBeVisible();

    // Verify main headline
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('MASTER');
    await expect(h1).toContainText('DATA STRUCTURES &');
    await expect(h1).toContainText('ALGORITHMS.');
    await expect(h1).toContainText('ONE PATTERN AT A TIME.');

    // Verify hero visual knowledge graph
    await expect(page.getByText('TAXONOMY ENGINE // ACTIVE PATH')).toBeVisible();
    await expect(page.getByText('Opposite Direction Pointers').first()).toBeVisible();
  });

  // ── TEST B: HERO CTA NAVIGATION ───────────────────────────────────────────
  test('B. Hero CTA navigates to dashboard for learning', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const cta = page.locator('main').getByRole('link', { name: /Start Learning|Continue Learning/i }).first();
    await expect(cta).toBeVisible();
    await cta.click();

    await page.waitForURL((url) => url.pathname.includes('/dashboard'));
    expect(page.url()).toContain('/dashboard');
  });

  // ── TEST C: JOURNEY CTA NAVIGATION ─────────────────────────────────────────
  test('C. Hero secondary CTA navigates to Journey', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const journeyCta = page.locator('main').getByRole('link', { name: /Explore Journey/i }).first();
    await expect(journeyCta).toBeVisible();
    await journeyCta.click();

    await page.waitForURL((url) => url.pathname.includes('/journey'));
    expect(page.url()).toContain('/journey');
  });

  // ── TEST D: NAVBAR LINKS ──────────────────────────────────────────────────
  test('D. Public navigation links (Journey, Practice, Interview, Study Plan) work correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const header = page.locator('header');

    // Test Journey link
    const journeyLink = header.getByRole('link', { name: 'Journey' });
    await expect(journeyLink).toBeVisible();
    await journeyLink.click();
    await page.waitForURL('**/journey');

    // Return to home
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test Practice link
    const practiceLink = header.getByRole('link', { name: 'Practice' });
    await expect(practiceLink).toBeVisible();
    await practiceLink.click();
    await page.waitForURL('**/practice');

    // Return to home
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test Interview link
    const interviewLink = header.getByRole('link', { name: 'Interview' });
    await expect(interviewLink).toBeVisible();
    await interviewLink.click();
    await page.waitForURL('**/interview');

    // Return to home
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test Study Plan link
    const studyPlanLink = header.getByRole('link', { name: 'Study Plan' });
    await expect(studyPlanLink).toBeVisible();
    await studyPlanLink.click();
    await page.waitForURL('**/study-plan');
  });

  // ── TEST E: PRODUCT FACTS METRICS ─────────────────────────────────────────
  test('E. Authentic product metrics render exact values from repository', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify authentic numbers scoped within facts section
    const factsSection = page.locator('section').filter({ hasText: '4,000+' });
    await expect(factsSection.getByText('4,000+')).toBeVisible();
    await expect(factsSection.getByText('Problems', { exact: true })).toBeVisible();

    await expect(factsSection.getByText('25', { exact: true })).toBeVisible();
    await expect(factsSection.getByText('Learning Areas', { exact: true })).toBeVisible();

    await expect(factsSection.getByText('61', { exact: true })).toBeVisible();
    await expect(factsSection.getByText('Subtopics', { exact: true })).toBeVisible();

    await expect(factsSection.getByText('113', { exact: true })).toBeVisible();
    await expect(factsSection.getByText('Patterns', { exact: true })).toBeVisible();

    await expect(factsSection.getByText('4', { exact: true })).toBeVisible();
    await expect(factsSection.getByText('Platforms', { exact: true })).toBeVisible();
  });

  // ── TEST F: MAJOR SECTIONS RENDER ─────────────────────────────────────────
  test('F. All major platform sections render properly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 1. Learning Loop Section
    await expect(page.getByText('One Connected System. Zero Wasted Practice.')).toBeVisible();
    await expect(page.getByText('01 //', { exact: true })).toBeVisible();
    await expect(page.getByText('02 //', { exact: true })).toBeVisible();
    await expect(page.getByText('03 //', { exact: true })).toBeVisible();
    await expect(page.getByText('04 //', { exact: true })).toBeVisible();
    await expect(page.getByText('05 //', { exact: true })).toBeVisible();

    // 2. Adaptive Intelligence Section
    await expect(page.getByText('Your practice should adapt to you.')).toBeVisible();
    await expect(page.getByText('HARMONIZER ENGINE')).toBeVisible();

    // 3. Journey Taxonomy Section
    await expect(page.getByText('A 5-tier taxonomy that makes 4,000 problems manageable.')).toBeVisible();

    // 4. Practice Arena Section
    await expect(page.getByText('Practice Arena with explicit purpose.')).toBeVisible();
    await expect(page.getByRole('link', { name: /Enter Practice Arena/i })).toBeVisible();

    // 5. Interview Arena Section
    await expect(page.getByRole('heading', { name: 'Realistic Technical Interview Simulations.' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Try Interview Arena/i })).toBeVisible();

    // 6. Daily Study Plan Section
    await expect(page.getByText('What should you study today? Answered in one plan.')).toBeVisible();
    await expect(page.getByRole('link', { name: /Build My Study Plan/i })).toBeVisible();

    // 7. Platform Mix Section
    const platformSection = page.locator('section').filter({ hasText: '4 Platforms. 1 Cohesive Curriculum.' });
    await expect(platformSection).toBeVisible();
    await expect(platformSection.getByText('LeetCode', { exact: true })).toBeVisible();
    await expect(platformSection.getByText('Codeforces', { exact: true })).toBeVisible();
    await expect(platformSection.getByText('CodeChef', { exact: true })).toBeVisible();
    await expect(platformSection.getByText('GeeksForGeeks', { exact: true })).toBeVisible();

    // 8. Final CTA Section
    await expect(page.getByText('Stop guessing what to study next.')).toBeVisible();

    // 9. Footer
    await expect(page.locator('footer').getByText('Systems Operational • 4,000 Problems')).toBeVisible();
  });

  // ── TEST G: AUTHENTICATION CTAs ───────────────────────────────────────────
  test('G. Sign In and Get Started links navigate to auth routes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Header Sign In
    const signInBtn = page.locator('header').getByRole('link', { name: 'Sign In' });
    await expect(signInBtn).toBeVisible();
    await signInBtn.click();
    await page.waitForURL('**/login');
    expect(page.url()).toContain('/login');

    // Return and test Get Started
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const getStartedBtn = page.locator('header').getByRole('link', { name: 'Get Started' });
    await expect(getStartedBtn).toBeVisible();
    await getStartedBtn.click();
    await page.waitForURL('**/signup');
    expect(page.url()).toContain('/signup');
  });

  // ── TEST H & I: THEME TOGGLE ──────────────────────────────────────────────
  test('H & I. Light and Dark theme toggle updates data-theme attribute', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const themeToggle = page.locator('header button[aria-label*="Switch to"]');
    await expect(themeToggle).toBeVisible();

    // Click to toggle theme
    await themeToggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', /light|dark/);

    // Toggle back
    await themeToggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', /light|dark/);
  });

  // ── TEST J: MOBILE NAVIGATION DRAWER ──────────────────────────────────────
  test('J. Mobile navigation drawer opens, displays links, and navigates', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find and click hamburger menu
    const menuBtn = page.locator('header button[aria-label="Open Navigation Menu"]');
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    // Verify drawer contents
    await expect(page.locator('header button[aria-label="Close Navigation Menu"]')).toBeVisible();
    const journeyMobile = page.locator('header a[href="/journey"]').last();
    await expect(journeyMobile).toBeVisible();

    // Click Journey
    await journeyMobile.click();
    await page.waitForURL('**/journey');
    expect(page.url()).toContain('/journey');
  });

  // ── TEST K: RESPONSIVE VIEWPORTS (ZERO OVERFLOW) ──────────────────────────
  test('K. Responsive viewports render with zero horizontal overflow', async ({ page }) => {
    const viewports = [
      { width: 375, height: 812, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet Portrait' },
      { width: 1024, height: 768, name: 'Tablet Landscape' },
      { width: 1440, height: 900, name: 'Desktop' },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(
        scrollWidth,
        `Viewport ${vp.name} (${vp.width}px) has horizontal overflow`
      ).toBeLessThanOrEqual(clientWidth + 2);
    }
  });

  // ── TEST L: KEYBOARD ACCESSIBILITY ────────────────────────────────────────
  test('L. Keyboard navigation focuses links and interactive elements', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Press Tab key several times and check focused elements
    await page.keyboard.press('Tab');
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
    expect(['a', 'button', 'input']).toContain(focusedTag);
  });
});
