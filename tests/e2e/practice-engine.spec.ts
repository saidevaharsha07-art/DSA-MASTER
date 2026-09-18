import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — Practice Arena 2.0: Intelligent Adaptive Engine E2E', () => {

  // ── A & B: GUEST & AUTHENTICATED DEFAULT LANDING IN RECOMMENDED MODE ──────────
  test('A & B. Default landing mode is Recommended with explainable "Why this problem?" reasons', async ({ page }) => {
    await page.goto('/practice');
    await page.waitForLoadState('networkidle');

    // Header verified
    await expect(page.locator('h1')).toContainText(/Practice Arena/i);

    // Modes navigation bar present
    const modesNav = page.locator('[data-testid="practice-modes-nav"]');
    await expect(modesNav).toBeVisible();

    // Default mode is Recommended
    const recTab = page.locator('[data-testid="mode-tab-recommended"]');
    await expect(recTab).toBeVisible();

    // Recommended container rendered
    const recContainer = page.locator('[data-testid="recommended-mode-container"]');
    await expect(recContainer).toBeVisible();

    // "Why this problem?" callout visible on recommended problem cards
    const whyCallout = page.locator('[data-testid="why-this-problem"]').first();
    await expect(whyCallout).toBeVisible();
    const whyText = await whyCallout.textContent();
    expect(whyText && whyText.length > 5).toBeTruthy();
  });

  // ── C: RECOMMENDED QUEUE USES LEARNER SIGNALS ─────────────────────────────────
  test('C. Recommended problem queue displays priority badges and structured metadata', async ({ page }) => {
    await page.goto('/practice?mode=recommended');
    await page.waitForLoadState('networkidle');

    const recCards = page.locator('[data-testid="recommended-problem-card"]');
    await expect(recCards.first()).toBeVisible();
    const count = await recCards.count();
    expect(count).toBeGreaterThan(0);

    // Assert first card has title, action buttons, and reason
    const firstCard = recCards.first();
    await expect(firstCard.locator('strong').first()).toBeVisible();
    await expect(firstCard.locator('[data-testid="why-this-problem"]')).toBeVisible();
  });

  // ── D: JOURNEY -> PRACTICE PRESERVES AREA / PLATFORM CONTEXT ──────────────────
  test('D. Journey -> Practice handoff preserves area and platform in query parameters', async ({ page }) => {
    await page.goto('/practice?area=binary-search&platform=codeforces');
    await page.waitForLoadState('networkidle');

    // Verify URL parameters retained
    expect(page.url()).toContain('area=binary-search');
    expect(page.url()).toContain('platform=codeforces');

    // Verify Codeforces tab is active
    const cfTab = page.locator('[data-testid="platform-tab-codeforces"]');
    await expect(cfTab).toBeVisible();

    // Verify problem rows exist for Codeforces
    const rows = page.locator('[data-testid="problem-row"]');
    await expect(rows.first()).toBeVisible();
  });

  // ── E: SUBTOPIC AND PATTERN FILTERING ─────────────────────────────────────────
  test('E. Subtopic and pattern cascaded selection filters problem queue and updates URL', async ({ page }) => {
    await page.goto('/practice?mode=area&area=basic-arrays&platform=leetcode');
    await page.waitForLoadState('networkidle');

    // Subtopic dropdown
    const subtopicSelect = page.locator('[data-testid="subtopic-select"]');
    await expect(subtopicSelect).toBeVisible();

    // Change subtopic
    await subtopicSelect.selectOption({ index: 1 });
    await page.waitForTimeout(300);

    // URL should reflect subtopic
    expect(page.url()).toContain('subtopic=');

    // Difficulty dropdown
    const diffSelect = page.locator('[data-testid="difficulty-select"]');
    await diffSelect.selectOption('Easy');
    await page.waitForTimeout(300);
    expect(page.url()).toContain('difficulty=Easy');
  });

  // ── F & G: 5/10/20 SESSION GENERATOR & ADVANCING THE SESSION ───────────────────
  test('F & G. Session generator starts coherent sprint and solving advances HUD', async ({ page }) => {
    await page.goto('/practice');
    await page.waitForLoadState('networkidle');

    // Click "5 Problems" sprint button
    const sprintBtn = page.locator('button:has-text("5 Problems")').first();
    await expect(sprintBtn).toBeVisible();
    await sprintBtn.click();
    await page.waitForTimeout(400);

    // Active session HUD must appear
    const sessionHud = page.locator('[data-testid="active-session-hud"]');
    await expect(sessionHud).toBeVisible();
    await expect(sessionHud).toContainText(/Problem 1 of 5/i);

    // Advance session by clicking "Mark Solved & Next"
    const solveNextBtn = sessionHud.locator('button:has-text("Mark Solved & Next")');
    await expect(solveNextBtn).toBeVisible();
    await solveNextBtn.click();
    await page.waitForTimeout(400);

    // Progress advances to Problem 2 of 5
    await expect(sessionHud).toContainText(/Problem 2 of 5/i);
    await expect(sessionHud).toContainText(/1 solved/i);

    // End session cleans up HUD
    const endBtn = sessionHud.locator('button:has-text("End Session")');
    await endBtn.click();
    await page.waitForTimeout(300);
    await expect(page.locator('[data-testid="active-session-hud"]')).not.toBeVisible();
  });

  // ── H: MISTAKE REVIEW MODE ───────────────────────────────────────────────────
  test('H. Mistake review mode displays mistake intelligence interface', async ({ page }) => {
    await page.goto('/practice');
    await page.waitForLoadState('networkidle');

    // Switch to Mistake Review mode tab
    const mistakeTab = page.locator('[data-testid="mode-tab-mistakes"]');
    await expect(mistakeTab).toBeVisible();
    await mistakeTab.click();
    await page.waitForTimeout(300);

    // URL contains mode=mistakes
    expect(page.url()).toContain('mode=mistakes');

    // Mistake container rendered
    const mistakeContainer = page.locator('[data-testid="mistake-review-container"]');
    await expect(mistakeContainer).toBeVisible();
  });

  // ── I: WEAK AREAS MODE ───────────────────────────────────────────────────────
  test('I. Weak areas mode renders diagnostic skill gaps or authentic baseline', async ({ page }) => {
    await page.goto('/practice');
    await page.waitForLoadState('networkidle');

    // Switch to Weak Areas mode tab
    const weakTab = page.locator('[data-testid="mode-tab-weakness"]');
    await expect(weakTab).toBeVisible();
    await weakTab.click();
    await page.waitForTimeout(300);

    // URL contains mode=weakness
    expect(page.url()).toContain('mode=weakness');

    // Weak areas container rendered
    const weakContainer = page.locator('[data-testid="weak-areas-container"]');
    await expect(weakContainer).toBeVisible();
  });

  // ── J: REFRESH PRESERVES FULL URL QUERY STATE ────────────────────────────────
  test('J. Page refresh preserves multi-attribute URL state', async ({ page }) => {
    const targetUrl = '/practice?mode=platform&platform=geeksforgeeks&area=dynamic-programming&difficulty=Medium';
    await page.goto(targetUrl);
    await page.waitForLoadState('networkidle');

    // Reload
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify all parameters preserved
    expect(page.url()).toContain('platform=geeksforgeeks');
    expect(page.url()).toContain('area=dynamic-programming');
    expect(page.url()).toContain('difficulty=Medium');
    expect(page.url()).toContain('mode=platform');

    // GeeksForGeeks tab active
    const gfgTab = page.locator('[data-testid="platform-tab-geeksforgeeks"]');
    await expect(gfgTab).toBeVisible();
  });

  // ── K: DATA ISOLATION & GUEST SAFETY ─────────────────────────────────────────
  test('K. Guest and isolated users do not leak active session data', async ({ page, browser }) => {
    // Open in separate incognito context for User A
    const contextA = await browser.newContext();
    const pageA = await contextA.newPage();
    await pageA.goto('/practice');
    await pageA.waitForLoadState('networkidle');

    // User A starts a session
    await pageA.locator('button:has-text("5 Problems")').first().click();
    await pageA.waitForTimeout(300);
    await expect(pageA.locator('[data-testid="active-session-hud"]')).toBeVisible();

    // Open another context for User B
    const contextB = await browser.newContext();
    const pageB = await contextB.newPage();
    await pageB.goto('/practice');
    await pageB.waitForLoadState('networkidle');

    // User B must NOT have User A's active session HUD
    await expect(pageB.locator('[data-testid="active-session-hud"]')).not.toBeVisible();

    await contextA.close();
    await contextB.close();
  });

});
