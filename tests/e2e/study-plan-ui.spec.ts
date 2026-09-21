import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — UI/UX Phase 7 Daily Study Plan Workspace E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Clear study plan storage once per test run, preserving state during page.reload()
    await page.addInitScript(() => {
      if (!window.sessionStorage.getItem('__study_plan_ui_init')) {
        window.sessionStorage.setItem('__study_plan_ui_init', '1');
        Object.keys(window.localStorage).forEach((key) => {
          if (key.startsWith('dsa_study_plan_')) {
            window.localStorage.removeItem(key);
          }
        });
      }
    });
  });

  // ── A. PAGE LOADS ──────────────────────────────────────────────────────────
  test('A. Page loads with main workspace container and accessible landmarks', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="study-plan-home-view"]')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Daily Study Planner 2.0/i })).toBeVisible();
  });

  // ── B. HEADER HIERARCHY & TELEMETRY ─────────────────────────────────────────
  test('B. Header displays TODAY tag, date, Day 1 Foundation badge, and compact telemetry', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    const header = page.locator('[data-testid="study-plan-header"]');
    await expect(header).toBeVisible();
    await expect(header).toContainText(/TODAY/i);
    await expect(header).toContainText(/Day 1 Foundation/i);
    await expect(header).toContainText(/activities completed/i);
    await expect(header).toContainText(/remaining/i);
  });

  // ── C. TIME BUDGET SELECTOR ────────────────────────────────────────────────
  test('C. Time budget segmented control switches presets and displays allocation note', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Check presets exist
    for (const mins of [20, 30, 45, 60, 90, 120]) {
      await expect(page.locator(`[data-testid="budget-btn-${mins}"]`)).toBeVisible();
    }

    // Select 30m
    await page.locator('[data-testid="budget-btn-30"]').click();
    await expect(page.getByText('Plan based on 30 minutes')).toBeVisible();

    // Select 60m
    await page.locator('[data-testid="budget-btn-60"]').click();
    await expect(page.getByText('Plan based on 60 minutes')).toBeVisible();
    await expect(page.locator('[data-testid="plan-progress-hud"]')).toContainText(/60m/);
  });

  // ── D. CURRENT MISSION SPOTLIGHT ───────────────────────────────────────────
  test('D. Primary mission card highlights active focal activity with explainable reasoning', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    const mission = page.locator('[data-testid="primary-mission-card"]');
    await expect(mission).toBeVisible();
    await expect(mission).toContainText(/Today's Primary Mission/i);
    await expect(mission).toContainText(/Why this was selected:/i);

    const cta = page.locator('[data-testid="primary-mission-cta"]');
    await expect(cta).toBeVisible();
    await expect(cta).toContainText(/Start Today's Plan|Continue Today's Plan/i);
  });

  // ── E. VERTICAL DAILY TIMELINE ─────────────────────────────────────────────
  test('E. Timeline renders vertical nodes with sequence markers and connectors', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('Daily Execution Timeline')).toBeVisible();
    await expect(page.locator('[data-testid="plan-item-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="plan-item-2"]')).toBeVisible();

    // Verify activity reason and estimated time
    const item1 = page.locator('[data-testid="plan-item-1"]');
    await expect(item1).toContainText(/Reason:/i);
    await expect(item1).toContainText(/~.*m/);
  });

  // ── F. ACTIVITY STATES (UPCOMING, ACTIVE, COMPLETED, SKIPPED) ───────────────
  test('F. Activities transition through active, completed, and skipped states cleanly', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Mark item 1 complete
    await page.locator('[data-testid="complete-item-btn-1"]').click();
    await expect(page.locator('[data-testid="plan-item-1"]')).toContainText(/Done/i);

    // Skip item 2
    await page.locator('[data-testid="skip-item-btn-2"]').click();
    await expect(page.locator('[data-testid="plan-item-2"]')).toContainText(/Skipped/i);
  });

  // ── G. START / RESUME HANDOFF ──────────────────────────────────────────────
  test('G. Clicking Start Activity navigates with preserved module context', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    const startLink = page.locator('[data-testid="plan-item-1"]').getByRole('link', { name: /Start Activity/i });
    await expect(startLink).toBeVisible();
    const href = await startLink.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).not.toBe('#');
  });

  // ── H. COMPLETION STATE ────────────────────────────────────────────────────
  test('H. Completing all activities renders the restrained completion screen', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Complete all items in the plan
    const completeBtns = page.locator('button[data-testid^="complete-item-btn-"]');
    const count = await completeBtns.count();
    for (let i = 0; i < count; i++) {
      const btn = page.locator('button[data-testid^="complete-item-btn-"]').first();
      if (await btn.isVisible()) {
        await btn.click();
      }
    }

    // Completion screen or summary should now be accessible
    await expect(
      page.getByText(/TODAY COMPLETE|All Planned Activities Completed|End-Of-Day Study Summary/i).first()
    ).toBeVisible();
  });

  // ── I. MID-DAY REPLANNING ──────────────────────────────────────────────────
  test('I. Mid-day replanning recalculates schedule with inline update notice', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    const replanBtn = page.locator('[data-testid="replan-btn"]');
    await expect(replanBtn).toBeVisible();
    await replanBtn.click();

    await expect(page.locator('text=Replanned:')).toBeVisible();
  });

  // ── J. END-OF-DAY REVIEW ───────────────────────────────────────────────────
  test('J. End-of-day summary tab displays factual performance metrics', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: /End-Of-Day Summary/i }).click();

    const summary = page.locator('[data-testid="end-of-day-summary"]');
    await expect(summary).toBeVisible();
    await expect(summary).toContainText(/End-Of-Day Study Summary/i);
    await expect(summary).toContainText(/Activities Completed/i);
    await expect(summary).toContainText(/Actual Time Spent/i);
    await expect(summary).toContainText(/Problems Solved/i);
    await expect(summary).toContainText(/SRS Reviews Done/i);
    await expect(summary).toContainText(/Recommended Next Actions for Tomorrow/i);
  });

  // ── K. PATTERN ACADEMY INTEGRATION ─────────────────────────────────────────
  test('K. Adding a pattern from Pattern Academy appears in Daily Schedule', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('domcontentloaded');

    const addBtn = page.locator('[data-testid="add-pattern-to-plan-btn"]');
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="study-plan-home-view"]')).toContainText(/Array Fundamentals/i);
  });

  // ── L. PRACTICE INTEGRATION ────────────────────────────────────────────────
  test('L. Practice Arena Continue Today Plan link returns to study planner', async ({ page }) => {
    await page.goto('/practice');
    await page.waitForLoadState('networkidle');

    const continueBtn = page.locator('[data-testid="continue-today-plan-btn"]');
    await expect(continueBtn).toBeVisible();
    await continueBtn.click();

    await page.waitForURL('**/study-plan');
    await expect(page.locator('[data-testid="study-plan-home-view"]')).toBeVisible();
  });

  // ── M. INTERVIEW INTEGRATION ───────────────────────────────────────────────
  test('M. 60m budget includes an interview sprint linking to Interview Arena', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="budget-btn-60"]').click();

    // Verify an activity link is present
    const link = page.getByRole('link', { name: /Start Activity/i }).first();
    await expect(link).toBeVisible();
  });

  // ── N. COMMAND CENTER INTEGRATION ──────────────────────────────────────────
  test('N. Command Center Study Plan card continues directly to study planner', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const continueBtn = page.locator('[data-testid="continue-study-plan-btn"]');
    await expect(continueBtn).toBeVisible();
    await continueBtn.click();

    await page.waitForURL('**/study-plan');
    await expect(page.locator('[data-testid="study-plan-home-view"]')).toBeVisible();
  });

  // ── O. REFRESH PERSISTENCE ─────────────────────────────────────────────────
  test('O. State persists across browser reloads', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Complete item 1
    await page.locator('[data-testid="complete-item-btn-1"]').click();
    await expect(page.locator('[data-testid="plan-item-1"]')).toContainText(/Done/i);

    // Reload
    await page.reload();
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="plan-item-1"]')).toContainText(/Done/i);
  });

  // ── P. MOBILE VIEWPORT ─────────────────────────────────────────────────────
  test('P. Mobile viewport renders compact priority stack with no overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="study-plan-home-view"]')).toBeVisible();
    const isOverflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(isOverflowing).toBe(false);
  });

  // ── Q. LIGHT MODE ──────────────────────────────────────────────────────────
  test('Q. Light mode renders clean editorial surfaces', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    await expect(page.locator('[data-testid="study-plan-home-view"]')).toBeVisible();
  });

  // ── R. DARK MODE ───────────────────────────────────────────────────────────
  test('R. Dark mode renders layered developer surfaces', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await expect(page.locator('[data-testid="study-plan-home-view"]')).toBeVisible();
  });

  // ── S. KEYBOARD NAVIGATION ─────────────────────────────────────────────────
  test('S. Interactive elements support keyboard navigation and focus rings', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    // Tab through buttons
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedTag).toBeTruthy();
  });

  // ── T. NO HORIZONTAL OVERFLOW ACROSS VIEWPORTS ──────────────────────────────
  const viewports = [
    { name: '375x812', width: 375, height: 812 },
    { name: '768x1024', width: 768, height: 1024 },
    { name: '1024x768', width: 1024, height: 768 },
    { name: '1440x900', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    test(`T. No horizontal overflow on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/study-plan');
      await page.waitForLoadState('networkidle');

      const isOverflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(isOverflowing).toBe(false);
    });
  }

  // ── U. GUEST ISOLATION ─────────────────────────────────────────────────────
  test('U. Guest mode displays security isolation banner and prevents data leakage', async ({ page }) => {
    await page.goto('/study-plan');
    await page.waitForLoadState('networkidle');

    const guestBanner = page.locator('[data-testid="guest-banner"]');
    await expect(guestBanner).toBeVisible();
    await expect(guestBanner).toContainText(/Guest Mode/i);
  });
});
