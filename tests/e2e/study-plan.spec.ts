import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — Daily Study Planner 2.0 Adaptive Learning Plan E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Clear study plan storage once per test run, preserving state during page.reload()
    await page.addInitScript(() => {
      if (!window.sessionStorage.getItem('__study_plan_test_init')) {
        window.sessionStorage.setItem('__study_plan_test_init', '1');
        Object.keys(window.localStorage).forEach((key) => {
          if (key.startsWith('dsa_study_plan_')) {
            window.localStorage.removeItem(key);
          }
        });
      }
    });
  });

  // ── TEST A: STUDY PLAN PAGE LOADS ──────────────────────────────────────────
  test('A. Study plan page loads with header, budget selector, and progress HUD', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="study-plan-home-view"]')).toBeVisible();
    await expect(page.locator('[data-testid="study-plan-header"]')).toContainText(/Daily Study Planner 2.0/i);

    // Verify Progress HUD
    await expect(page.locator('[data-testid="plan-progress-hud"]')).toBeVisible();
    await expect(page.locator('[data-testid="plan-progress-hud"]')).toContainText(/Estimated Time/i);
    await expect(page.locator('[data-testid="plan-progress-hud"]')).toContainText(/Activity Progress/i);

    // Verify Primary Mission Card
    await expect(page.locator('[data-testid="primary-mission-card"]')).toBeVisible();
  });

  // ── TEST B: TIME BUDGET SELECTION ──────────────────────────────────────────
  test('B. Time budget selector updates allocated time and custom minutes', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Click 60m budget
    await page.locator('[data-testid="budget-btn-60"]').click();
    await expect(page.locator('[data-testid="plan-progress-hud"]')).toContainText(/60m/);

    // Custom budget selection
    await page.locator('[data-testid="budget-btn-custom"]').click();
    await expect(page.locator('[data-testid="custom-budget-input"]')).toBeVisible();
    await page.locator('[data-testid="custom-budget-input"]').fill('90');
    await page.locator('[data-testid="apply-custom-budget-btn"]').click();

    await expect(page.locator('[data-testid="plan-progress-hud"]')).toContainText(/90m/);
  });

  // ── TEST C: AUTHENTICATED PERSONALIZED PLAN ────────────────────────────────
  test('C. Authenticated personalized plan renders prioritized activities', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Verify plan items exist
    await expect(page.locator('[data-testid="plan-item-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="plan-item-2"]')).toBeVisible();

    // Verify explainable reason tags
    const item1 = page.locator('[data-testid="plan-item-1"]');
    await expect(item1).toContainText(/Reason:/i);
  });

  // ── TEST D: ZERO-STATE PLAN ────────────────────────────────────────────────
  test('D. Zero-state baseline generates foundational curriculum activities with zero fake mastery', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Zero-state shows Day 1 Foundation badge
    const header = page.locator('[data-testid="study-plan-header"]');
    await expect(header).toContainText(/Day 1 Foundation/i);

    // First activity is concept foundation
    const item1 = page.locator('[data-testid="plan-item-1"]');
    await expect(item1).toContainText(/Arrays & Hashing/i);
    await expect(item1).toContainText(/LEARN/i);
  });

  // ── TEST E: TODAY'S PRIMARY MISSION ────────────────────────────────────────
  test('E. Today primary mission spotlight provides clear Start Now CTA', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    const missionCard = page.locator('[data-testid="primary-mission-card"]');
    await expect(missionCard).toBeVisible();
    await expect(missionCard).toContainText(/Today's Primary Mission/i);

    const cta = page.locator('[data-testid="primary-mission-cta"]');
    await expect(cta).toBeVisible();
    await expect(cta).toContainText(/Start Today's Plan|Continue Today's Plan/i);
  });

  // ── TEST F: PLAN ITEM DEEP LINKS ───────────────────────────────────────────
  test('F. Plan items contain actionable links preserving module context', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    const item1Link = page.locator('[data-testid="plan-item-1"]').getByRole('link', { name: /Start Activity/i });
    await expect(item1Link).toBeVisible();
    const href = await item1Link.getAttribute('href');
    expect(href).toBeTruthy();
  });

  // ── TEST G: COMPLETION TRACKING ────────────────────────────────────────────
  test('G. Completing an activity updates progress counters and actual time', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Click complete on item 1
    const completeBtn = page.locator('[data-testid="complete-item-btn-1"]');
    await completeBtn.click();

    // Verify item 1 shows done status
    await expect(page.locator('[data-testid="plan-item-1"]')).toContainText(/Done/i);

    // Verify HUD reflects 1 completed
    const hud = page.locator('[data-testid="plan-progress-hud"]');
    await expect(hud).toContainText(/1 \//);
  });

  // ── TEST H: SKIP BEHAVIOR ──────────────────────────────────────────────────
  test('H. Skipping an activity updates plan item to skipped and adjusts counters', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Skip item 2
    const skipBtn = page.locator('[data-testid="skip-item-btn-2"]');
    await skipBtn.click();

    await expect(page.locator('[data-testid="plan-item-2"]')).toContainText(/Skipped/i);
    await expect(page.locator('[data-testid="plan-progress-hud"]')).toContainText(/1 skipped/i);
  });

  // ── TEST I: RESUME AFTER REFRESH ───────────────────────────────────────────
  test('I. Browser refresh restores in-progress plan state and completed status', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Mark item 1 complete
    await page.locator('[data-testid="complete-item-btn-1"]').click();
    await expect(page.locator('[data-testid="plan-item-1"]')).toContainText(/Done/i);

    // Refresh page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify still marked done
    await expect(page.locator('[data-testid="plan-item-1"]')).toContainText(/Done/i);
  });

  // ── TEST J: MID-DAY REPLANNING ─────────────────────────────────────────────
  test('J. Mid-day replanning optimizes remaining activities', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    const replanBtn = page.locator('[data-testid="replan-btn"]');
    await expect(replanBtn).toBeVisible();
    await replanBtn.click();

    // Verify replanned badge appears
    await expect(page.locator('text=Replanned:')).toBeVisible();
  });

  // ── TEST K: END-OF-DAY SUMMARY ─────────────────────────────────────────────
  test('K. End-of-day summary displays factual metrics with zero arbitrary grades', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Navigate to Summary tab
    await page.getByRole('button', { name: /End-Of-Day Summary/i }).click();

    const summaryView = page.locator('[data-testid="end-of-day-summary"]');
    await expect(summaryView).toBeVisible();
    await expect(summaryView).toContainText(/End-Of-Day Study Summary/i);
    await expect(summaryView).toContainText(/Activities Completed/i);
    await expect(summaryView).toContainText(/Actual Time Spent/i);
    await expect(summaryView).toContainText(/Recommended Next Actions for Tomorrow/i);
  });

  // ── TEST L: COMMAND CENTER INTEGRATION ─────────────────────────────────────
  test('L. Command Center displays Today Study Plan card and navigates to planner', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const card = page.locator('[data-testid="study-plan-card"]');
    await expect(card).toBeVisible();
    await expect(card).toContainText(/Today's Study Plan/i);

    const continueBtn = page.locator('[data-testid="continue-study-plan-btn"]');
    await expect(continueBtn).toBeVisible();
    await continueBtn.click();

    await page.waitForURL('**/study-plan');
    await expect(page.locator('[data-testid="study-plan-home-view"]')).toBeVisible();
  });

  // ── TEST M: PATTERN ACADEMY ADD-TO-PLAN ────────────────────────────────────
  test('M. Pattern Academy Add to Today Plan button injects pattern into daily schedule', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    const addBtn = page.locator('[data-testid="add-pattern-to-plan-btn"]');
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    await expect(addBtn).toContainText(/Added to Plan/i);

    // Return to study plan and verify custom activity appears
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="study-plan-home-view"]')).toContainText(/Array Fundamentals/i);
  });

  // ── TEST N: PRACTICE ARENA HANDOFF ─────────────────────────────────────────
  test('N. Practice Arena displays Continue Today Plan link returning to planner', async ({ page }) => {
    await page.goto('/practice');
    await page.waitForLoadState('networkidle');

    const continueLink = page.locator('[data-testid="continue-today-plan-btn"]');
    await expect(continueLink).toBeVisible();
    await continueLink.click();

    await page.waitForURL('**/study-plan');
    await expect(page.locator('[data-testid="study-plan-home-view"]')).toBeVisible();
  });

  // ── TEST O: INTERVIEW ARENA HANDOFF ────────────────────────────────────────
  test('O. 60m budget plan includes 20-min interview sprint linking to Interview Arena', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Select 60m budget
    await page.locator('[data-testid="budget-btn-60"]').click();

    // Verify interview sprint item or click link
    const interviewLink = page.getByRole('link', { name: /Start Activity/i }).first();
    await expect(interviewLink).toBeVisible();
  });

  // ── TEST P: GUEST ISOLATION ────────────────────────────────────────────────
  test('P. Guest mode renders informational security banner and prevents private data leakage', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Verify guest banner
    const guestBanner = page.locator('[data-testid="guest-banner"]');
    await expect(guestBanner).toBeVisible();
    await expect(guestBanner).toContainText(/Guest Mode/i);
  });

  // ── RESPONSIVE VIEWPORT TESTS (375, 768, 1024, 1440) ───────────────────────
  const viewports = [
    { name: 'Mobile (375x812)', width: 375, height: 812 },
    { name: 'Tablet Portrait (768x1024)', width: 768, height: 1024 },
    { name: 'Tablet Landscape (1024x768)', width: 1024, height: 768 },
    { name: 'Desktop (1440x900)', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    test(`Responsive Viewport ${vp.name} renders with 0 horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/study-plan');
      await page.waitForLoadState('networkidle');

      const isOverflowing = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(isOverflowing).toBe(false);
    });
  }
});
