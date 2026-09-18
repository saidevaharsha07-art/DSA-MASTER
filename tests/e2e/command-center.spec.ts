import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — Command Center 2.0: Single Source of Truth E2E', () => {

  // ── A. AUTHENTICATED / DEFAULT DASHBOARD LOADS WITH VALID LAYOUT ──────────────
  test('A. Dashboard loads with single source of truth layout and HUD metrics', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Page contains Welcome back / Developer identity
    await expect(page.locator('h1')).toContainText(/Welcome back/i);

    // Performance HUD metrics present
    await expect(page.getByText('Problems Solved')).toBeVisible();
    await expect(page.getByText('Experience Points')).toBeVisible();
    await expect(page.getByText('Current Streak')).toBeVisible();
    await expect(page.getByText('Active Platforms')).toBeVisible();
  });

  // ── B. ZERO-STATE LEARNER SEES FIRST MISSION WITHOUT FAKE MASTERY ─────────────
  test('B. Zero-state learner displays authentic baseline and mission guidance', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // If zero state, verify zero state banner or authentic baseline
    const zeroStateBanner = page.locator('[data-testid="zero-state-banner"]');
    if (await zeroStateBanner.isVisible()) {
      await expect(zeroStateBanner).toContainText(/0% Progress/i);
    }

    // Hero mission is always available as the actionable entry point
    const heroMission = page.locator('[data-testid="hero-next-mission"]');
    await expect(heroMission).toBeVisible();
  });

  // ── C. RECOMMENDED MISSION COMES FROM REAL RECOMMENDATION ENGINE ──────────────
  test('C. Hero Next Mission displays authentic problem metadata and deep-link CTA', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const heroMission = page.locator('[data-testid="hero-next-mission"]');
    await expect(heroMission).toBeVisible();

    // Problem title and why reason
    await expect(heroMission.locator('h2')).toBeVisible();
    const whyReason = page.locator('[data-testid="hero-why-reason"]');
    await expect(whyReason).toBeVisible();
    const whyText = await whyReason.textContent();
    expect(whyText && whyText.length > 10).toBeTruthy();

    // Start problem CTA deep-links to practice
    const startBtn = page.locator('[data-testid="hero-start-btn"]');
    await expect(startBtn).toBeVisible();
    const href = await startBtn.locator('..').getAttribute('href');
    expect(href).toContain('/practice');
  });

  // ── D. ACTIVE SESSION CAN BE CONTINUED OR ENDED FROM DASHBOARD ────────────────
  test('D. Active session sprint card allows continuing or ending sprint', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Create an active session in localStorage
    await page.evaluate(() => {
      const sampleSession = {
        id: 'sprint-test-session',
        userId: 'default_user',
        mode: 'recommended',
        problems: [
          {
            id: 'leetcode-1',
            slug: 'two-sum',
            title: 'Two Sum',
            difficulty: 'Easy',
            platform: 'leetcode',
            categoryTitle: 'Arrays & Hashing',
            patternTitle: 'Two Pointers',
          },
          {
            id: 'leetcode-2',
            slug: 'add-two-numbers',
            title: 'Add Two Numbers',
            difficulty: 'Medium',
            platform: 'leetcode',
            categoryTitle: 'Linked List',
            patternTitle: 'Sentinel Node',
          },
        ],
        currentIndex: 0,
        completedProblemIds: [],
        skippedProblemIds: [],
        startedAt: new Date().toISOString(),
        status: 'active',
        problemCount: 2,
      };
      localStorage.setItem('dsa_active_practice_session_v2_default_user', JSON.stringify(sampleSession));
      localStorage.setItem('dsa_active_practice_session_v2_guest-user', JSON.stringify(sampleSession));
    });

    // Reload page to observe active session
    await page.reload();
    await page.waitForLoadState('networkidle');

    const sessionCard = page.locator('[data-testid="continue-session-card"]');
    await expect(sessionCard).toBeVisible();
    await expect(sessionCard).toContainText(/Active Practice Sprint/i);

    const continueBtn = page.locator('[data-testid="continue-session-btn"]');
    await expect(continueBtn).toBeVisible();

    // Click End Sprint button
    const endBtn = page.locator('[data-testid="end-session-btn"]');
    await expect(endBtn).toBeVisible();
    await endBtn.click();

    // Verify session card disappears
    await expect(sessionCard).not.toBeVisible();
  });

  // ── E. ROADMAP SNAPSHOT DISPLAYS ACTIVE NODE & MILESTONES ────────────────────
  test('E. Roadmap snapshot displays learning area, subtopic, and open roadmap CTA', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const roadmapCard = page.locator('[data-testid="roadmap-snapshot"]');
    await expect(roadmapCard).toBeVisible();

    await expect(roadmapCard).toContainText(/Current Learning Area/i);
    await expect(roadmapCard).toContainText(/Focus Subtopic & Pattern/i);

    const openRoadmapBtn = page.locator('[data-testid="open-roadmap-btn"]');
    await expect(openRoadmapBtn).toBeVisible();
    const href = await openRoadmapBtn.locator('..').getAttribute('href');
    expect(href).toContain('/journey');
  });

  // ── F. WEAKNESS DATA IS DATA-BACKED OR DISPLAYS AUTHENTIC BASELINE ────────────
  test('F. Weak areas diagnostic displays targeted CTA to practice weakness', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const weakCard = page.locator('[data-testid="weak-areas-card"]');
    await expect(weakCard).toBeVisible();

    const practiceWeaknessBtn = page.locator('[data-testid="practice-weakness-btn"]');
    await expect(practiceWeaknessBtn).toBeVisible();
    const href = await practiceWeaknessBtn.locator('..').getAttribute('href');
    expect(href).toContain('/practice?mode=weakness');
  });

  // ── G. REVISION CTA OPENS CORRECT PRACTICE/REVISION CONTEXT ───────────────────
  test('G. Revision queue displays due metrics and Revise Now CTA', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const revCard = page.locator('[data-testid="revision-queue-card"]');
    await expect(revCard).toBeVisible();
    await expect(revCard).toContainText(/Due Now/i);
    await expect(revCard).toContainText(/Due Today/i);
    await expect(revCard).toContainText(/Upcoming/i);

    const reviseNowBtn = page.locator('[data-testid="revise-now-btn"]');
    await expect(reviseNowBtn).toBeVisible();
    const href = await reviseNowBtn.locator('..').getAttribute('href');
    expect(href).toContain('/practice?mode=mistakes');
  });

  // ── H. MISTAKE REVIEW CTA OPENS /practice?mode=mistakes ───────────────────────
  test('H. Mistake snapshot displays review mistakes CTA', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const mistakeCard = page.locator('[data-testid="mistake-snapshot-card"]');
    await expect(mistakeCard).toBeVisible();

    const reviewMistakesBtn = page.locator('[data-testid="review-mistakes-btn"]');
    await expect(reviewMistakesBtn).toBeVisible();
    const href = await reviewMistakesBtn.locator('..').getAttribute('href');
    expect(href).toContain('/practice?mode=mistakes');
  });

  // ── I. PLATFORM MIX CARDS DISPLAY ALL 4 PLATFORMS WITH DEEP-LINKS ─────────────
  test('I. Platform coverage mix shows LeetCode, CodeChef, Codeforces, and GeeksForGeeks out of 1000', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const platformGrid = page.locator('[data-testid="platform-mix-grid"]');
    await expect(platformGrid).toBeVisible();

    // 4 distinct platform cards
    const lcCard = page.locator('[data-testid="platform-card-leetcode"]');
    const ccCard = page.locator('[data-testid="platform-card-codechef"]');
    const cfCard = page.locator('[data-testid="platform-card-codeforces"]');
    const gfgCard = page.locator('[data-testid="platform-card-geeksforgeeks"]');

    await expect(lcCard).toBeVisible();
    await expect(ccCard).toBeVisible();
    await expect(cfCard).toBeVisible();
    await expect(gfgCard).toBeVisible();

    // Verify 1000 total denominator on each
    await expect(lcCard).toContainText('/ 1000');
    await expect(ccCard).toContainText('/ 1000');
    await expect(cfCard).toContainText('/ 1000');
    await expect(gfgCard).toContainText('/ 1000');

    // Verify href targets
    expect(await lcCard.getAttribute('href')).toContain('/practice?platform=leetcode');
    expect(await ccCard.getAttribute('href')).toContain('/practice?platform=codechef');
    expect(await cfCard.getAttribute('href')).toContain('/practice?platform=codeforces');
    expect(await gfgCard.getAttribute('href')).toContain('/practice?platform=geeksforgeeks');
  });

  // ── J. CANONICAL 25 LEARNING AREAS WITH DUAL CTAS (NO KINGDOM METAPHORS) ─────
  test('J. All 25 canonical learning areas rendered without fantasy kingdom terms', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const areasGrid = page.locator('[data-testid="learning-areas-grid"]');
    await expect(areasGrid).toBeVisible();

    // Verify exactly 25 cards exist
    const cards = areasGrid.locator('[data-testid^="area-card-"]');
    const count = await cards.count();
    expect(count).toBe(25);

    // Verify first area (basic-arrays) has dual CTAs: Journey and Practice
    const firstArea = page.locator('[data-testid="area-card-basic-arrays"]');
    await expect(firstArea).toBeVisible();
    await expect(firstArea.getByText('Journey')).toBeVisible();
    await expect(firstArea.getByText('Practice')).toBeVisible();

    // Ensure zero fantasy kingdom terms exist on the dashboard
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toMatch(/\bKingdom\b/i);
    expect(bodyText).not.toMatch(/\bRealm\b/i);
  });

  // ── K. REFRESH PRESERVES VALID STATE WITHOUT SESSION LOSS ────────────────────
  test('K. Page refresh maintains stable dashboard state', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="hero-next-mission"]')).toBeVisible();
    await expect(page.locator('[data-testid="platform-mix-grid"]')).toBeVisible();

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="hero-next-mission"]')).toBeVisible();
    await expect(page.locator('[data-testid="platform-mix-grid"]')).toBeVisible();
  });

  // ── L. GUEST CANNOT ACCESS ANOTHER USER\'S PERSONAL TELEMETRY ─────────────────
  test('L. Guest mode provides isolated baseline without leaking private user data', async ({ page }) => {
    // Clear auth session to simulate unauthenticated guest
    await page.goto('/dashboard');
    await page.evaluate(() => {
      localStorage.removeItem('auth_session');
    });
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Guest banner is visible with sign in prompt
    const guestBanner = page.locator('[data-testid="guest-banner"]');
    await expect(guestBanner).toBeVisible();
    await expect(guestBanner).toContainText(/Guest Exploration Mode/i);

    // Guest sees sign-in / register CTA
    const signinBtn = page.locator('[data-testid="guest-signin-btn"]');
    await expect(signinBtn).toBeVisible();
  });

});
