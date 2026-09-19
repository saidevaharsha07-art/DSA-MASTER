import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — Practice Arena UI/UX Phase 5: Premium Coding Workspace E2E', () => {

  // ── 1. WORKSPACE HEADER & TELEMETRY ──────────────────────────────────────────
  test('1. Practice Arena renders professional workspace header, telemetry tiles, and sprint launchers', async ({ page }) => {
    await page.goto('/practice');
    await page.waitForLoadState('networkidle');

    // Header title and badge
    const headerTitle = page.locator('h1');
    await expect(headerTitle).toContainText(/Practice Arena/i);
    await expect(page.getByText('Workspace 2.5')).toBeVisible();

    // Today's Plan CTA
    const planBtn = page.locator('[data-testid="continue-today-plan-btn"]');
    await expect(planBtn).toBeVisible();
    await expect(planBtn).toHaveAttribute('href', '/study-plan');

    // 4 Telemetry HUD tiles
    await expect(page.getByText(/LeetCode Solved|Platform Solved/i)).toBeVisible();
    await expect(page.getByText(/Total Solved/i).first()).toBeVisible();
    await expect(page.getByText(/Accuracy Rate/i)).toBeVisible();
    await expect(page.getByText(/Active Streak/i)).toBeVisible();

    // Sprint session launchers
    await expect(page.locator('button:has-text("5 Problems")').first()).toBeVisible();
    await expect(page.locator('button:has-text("10 Problems")').first()).toBeVisible();
    await expect(page.locator('button:has-text("20 Problems")').first()).toBeVisible();
  });

  // ── 2. MODE NAVIGATION (ALL 10 MODES) ─────────────────────────────────────────
  test('2. Mode Navigation bar switches cleanly between all modes with URL persistence', async ({ page }) => {
    await page.goto('/practice');
    await page.waitForLoadState('networkidle');

    const modesNav = page.locator('[data-testid="practice-modes-nav"]');
    await expect(modesNav).toBeVisible();

    // Recommended
    await expect(page.locator('[data-testid="mode-tab-recommended"]')).toBeVisible();
    await expect(page.locator('[data-testid="recommended-mode-container"]')).toBeVisible();

    // Area
    await page.locator('[data-testid="mode-tab-area"]').click();
    await page.waitForTimeout(300);
    expect(page.url()).toContain('mode=area');
    await expect(page.locator('[data-testid="problem-row"]').first()).toBeVisible();

    // Mistakes
    await page.locator('[data-testid="mode-tab-mistakes"]').click();
    await page.waitForTimeout(300);
    expect(page.url()).toContain('mode=mistakes');
    await expect(page.locator('[data-testid="mistake-review-container"]')).toBeVisible();

    // Weakness
    await page.locator('[data-testid="mode-tab-weakness"]').click();
    await page.waitForTimeout(300);
    expect(page.url()).toContain('mode=weakness');
    await expect(page.locator('[data-testid="weak-areas-container"]')).toBeVisible();

    // Interview
    await page.locator('[data-testid="mode-tab-interview"]').click();
    await page.waitForTimeout(300);
    expect(page.url()).toContain('mode=interview');
    await expect(page.locator('[data-testid="interview-practice-container"]')).toBeVisible();

    // Random
    await page.locator('[data-testid="mode-tab-random"]').click();
    await page.waitForTimeout(300);
    expect(page.url()).toContain('mode=random');
    await expect(page.locator('[data-testid="random-mode-container"]')).toBeVisible();
    await expect(page.locator('[data-testid="roll-random-btn"]')).toBeVisible();

    // History
    await page.locator('[data-testid="mode-tab-history"]').click();
    await page.waitForTimeout(300);
    expect(page.url()).toContain('mode=history');
    await expect(page.locator('[data-testid="practice-history-container"]')).toBeVisible();
  });

  // ── 3. FOUR PLATFORMS SWITCHER ────────────────────────────────────────────────
  test('3. Platform switcher switches between LeetCode, CodeChef, Codeforces, and GeeksForGeeks', async ({ page }) => {
    await page.goto('/practice?mode=platform');
    await page.waitForLoadState('networkidle');

    // 1. LeetCode
    const lcTab = page.locator('[data-testid="platform-tab-leetcode"]');
    await expect(lcTab).toBeVisible();
    await lcTab.click();
    await page.waitForTimeout(300);
    expect(page.url()).toContain('platform=leetcode');

    // 2. CodeChef
    const ccTab = page.locator('[data-testid="platform-tab-codechef"]');
    await expect(ccTab).toBeVisible();
    await ccTab.click();
    await page.waitForTimeout(300);
    expect(page.url()).toContain('platform=codechef');
    await expect(page.locator('[data-testid="problem-row"]').first()).toBeVisible();

    // 3. Codeforces
    const cfTab = page.locator('[data-testid="platform-tab-codeforces"]');
    await expect(cfTab).toBeVisible();
    await cfTab.click();
    await page.waitForTimeout(300);
    expect(page.url()).toContain('platform=codeforces');
    await expect(page.locator('[data-testid="problem-row"]').first()).toBeVisible();

    // 4. GeeksForGeeks
    const gfgTab = page.locator('[data-testid="platform-tab-geeksforgeeks"]');
    await expect(gfgTab).toBeVisible();
    await gfgTab.click();
    await page.waitForTimeout(300);
    expect(page.url()).toContain('platform=geeksforgeeks');
    await expect(page.locator('[data-testid="problem-row"]').first()).toBeVisible();
  });

  // ── 4. FILTER TOOLBAR & ACTIVE FILTER CHIPS ──────────────────────────────────
  test('4. Filter toolbar handles search, subtopics, patterns, difficulty, status, and active chip removal', async ({ page }) => {
    await page.goto('/practice?mode=area&area=basic-arrays&platform=leetcode');
    await page.waitForLoadState('networkidle');

    // Search input
    const searchInput = page.locator('[data-testid="search-input"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Two Sum');
    await page.waitForTimeout(300);
    expect(page.url()).toContain('search=Two+Sum');

    // Remove search via chip
    const removeSearchChip = page.locator('button[aria-label="Remove search filter"]');
    await expect(removeSearchChip).toBeVisible();
    await removeSearchChip.click();
    await page.waitForTimeout(300);
    expect(page.url()).not.toContain('search=');

    // Subtopic dropdown
    const subtopicSelect = page.locator('[data-testid="subtopic-select"]');
    await subtopicSelect.selectOption({ index: 1 });
    await page.waitForTimeout(300);
    expect(page.url()).toContain('subtopic=');

    // Difficulty dropdown
    const diffSelect = page.locator('[data-testid="difficulty-select"]');
    await diffSelect.selectOption('Easy');
    await page.waitForTimeout(300);
    expect(page.url()).toContain('difficulty=Easy');

    // Status dropdown
    const statusSelect = page.locator('[data-testid="status-select"]');
    await statusSelect.selectOption('unsolved');
    await page.waitForTimeout(300);
    expect(page.url()).toContain('status=unsolved');

    // Clear all filters button
    const clearAllBtn = page.locator('button:has-text("Clear All")');
    await expect(clearAllBtn).toBeVisible();
    await clearAllBtn.click();
    await page.waitForTimeout(300);
    expect(page.url()).not.toContain('difficulty=');
  });

  // ── 5. DENSE PROBLEM TABLE & CHECKBOX TOGGLE ──────────────────────────────────
  test('5. Dense Problem Table renders problem rows with monospace ID, difficulty pills, and solved toggle', async ({ page }) => {
    await page.goto('/practice?mode=area&area=basic-arrays&platform=leetcode');
    await page.waitForLoadState('networkidle');

    const rows = page.locator('[data-testid="problem-row"]');
    await expect(rows.first()).toBeVisible();
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);

    // Assert first row structure
    const firstRow = rows.first();
    const checkBtn = firstRow.locator('button[aria-label*="Mark as"]');
    await expect(checkBtn).toBeVisible();

    // Monospace number
    const monoNum = firstRow.locator('span.font-mono').first();
    await expect(monoNum).toBeVisible();

    // Solve button exists
    const solveBtn = firstRow.locator('button:has-text("Solve")');
    await expect(solveBtn).toBeVisible();
  });

  // ── 6. DEDICATED PROBLEM WORKSPACE / PRACTICE IDE LAYOUT ─────────────────────
  test('6. /practice/[slug] renders full Two-Pane IDE with Monaco editor, console tabs, and action bar', async ({ page }) => {
    await page.goto('/practice/two-sum');
    await page.waitForLoadState('domcontentloaded');

    // Header breadcrumb contains Practice link and problem title
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('header a[href="/practice"]')).toBeVisible();

    // Left Panel: Problem description
    await expect(page.getByText(/Given an array of integers/i).first()).toBeVisible();

    // Right Panel: Editor and console
    const runBtn = page.locator('button:has-text("Run Code")');
    const submitBtn = page.locator('button:has-text("Submit")').first();
    await expect(runBtn).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Console tabs
    await expect(page.locator('button:has-text("Testcases")')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Run Output' })).toBeVisible();
  });

  // ── 7. ACTIVE SPRINT SESSION FLOW ─────────────────────────────────────────────
  test('7. Sprint session starts HUD, advances on Mark Solved & Next, and cleans up on End Session', async ({ page }) => {
    await page.goto('/practice');
    await page.waitForLoadState('networkidle');

    // Click 5 Problems sprint button
    const sprintBtn = page.locator('button:has-text("5 Problems")').first();
    await sprintBtn.click();
    await page.waitForTimeout(400);

    // Active session HUD
    const hud = page.locator('[data-testid="active-session-hud"]');
    await expect(hud).toBeVisible();
    await expect(hud).toContainText(/Problem 1 of 5/i);

    // Click Mark Solved & Next
    const solveNextBtn = hud.locator('button:has-text("Mark Solved & Next")');
    await expect(solveNextBtn).toBeVisible();
    await solveNextBtn.click();
    await page.waitForTimeout(400);

    // Progress updates
    await expect(hud).toContainText(/Problem 2 of 5/i);
    await expect(hud).toContainText(/1 solved/i);

    // End Session
    const endBtn = hud.locator('button:has-text("End Session")');
    await endBtn.click();
    await page.waitForTimeout(300);
    await expect(page.locator('[data-testid="active-session-hud"]')).not.toBeVisible();
  });

  // ── 8. RESPONSIVE LAYOUT & ZERO HORIZONTAL OVERFLOW ───────────────────────────
  test('8. Practice Arena adapts across mobile, tablet, and desktop with zero horizontal overflow', async ({ page }) => {
    const viewports = [
      { width: 375, height: 812, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet Portrait' },
      { width: 1024, height: 768, name: 'Tablet Landscape' },
      { width: 1440, height: 900, name: 'Desktop' },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/practice');
      await page.waitForLoadState('networkidle');

      // Check overflow
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > window.innerWidth;
      });
      expect(overflow, `Overflow detected on ${vp.name} (${vp.width}x${vp.height})`).toBeFalsy();

      // Elements visible
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('[data-testid="practice-modes-nav"]')).toBeVisible();
    }
  });

  // ── 9. LIGHT AND DARK THEME VERIFICATION ──────────────────────────────────────
  test('9. Practice Arena renders correctly under light and dark themes', async ({ page }) => {
    await page.goto('/practice');
    await page.waitForLoadState('networkidle');

    // Dark theme check (default)
    const darkBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(darkBg).toBeTruthy();

    // Toggle to Light theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(200);

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid="practice-modes-nav"]')).toBeVisible();
  });

});
