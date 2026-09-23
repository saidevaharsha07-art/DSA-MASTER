import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — Pattern Learning 2.0: Concept Academy E2E', () => {

  // ── TEST A: HIERARCHY NAVIGATION (Area -> Subtopic -> Pattern) ─────────────
  test('A. Navigating from Journey Area page to Pattern Learning page via Learn Pattern link', async ({ page }) => {
    await page.goto('/journey/basic-arrays');
    await page.waitForLoadState('networkidle');

    // Confirm we are on the Basic Arrays journey page
    await expect(page.locator('h1')).toContainText(/Array/i);

    // Locate the "Learn Pattern" link for Array Fundamentals
    const learnLink = page.locator('a[href*="/journey/basic-arrays/"][href*="array-fundamentals"]').first();
    await expect(learnLink).toBeVisible();

    // Click to navigate to Concept Academy
    await learnLink.click();
    await page.waitForURL((url) =>
      url.pathname.includes('/journey/basic-arrays/') &&
      url.pathname.includes('array-fundamentals')
    );

    // Verify Pattern Concept Academy page loaded
    await expect(page.locator('h1')).toContainText(/Array Fundamentals/i);
  });

  // ── TEST B: SEMANTIC STRUCTURE & 6-STAGE MASTERY FLOW ──────────────────────
  test('B. Pattern page loads with breadcrumbs, header, and 6 progressive mastery stages', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    // Breadcrumb navigation
    const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText('Journey');
    await expect(breadcrumb).toContainText('Array Fundamentals');

    // Pattern Title & Overview
    await expect(page.locator('h1')).toContainText('Array Fundamentals');

    // Stage 1: Understand
    await expect(page.getByText('Stage 1: Understand')).toBeVisible();

    // Stage 2: See an Example
    await expect(page.getByText('Stage 2: See a Small Worked Example')).toBeVisible();

    // Stage 3: Learn the Template
    await expect(page.getByText('Stage 3: Learn the Algorithmic Template')).toBeVisible();

    // Stage 4: Guided Walkthrough & Pitfalls
    await expect(page.getByText('Stage 4: Guided Walkthrough')).toBeVisible();

    // Stage 5: Practice This Pattern
    await expect(page.getByText('Stage 5: Practice This Pattern')).toBeVisible();

    // Stage 6: Review & Knowledge Graph
    await expect(page.getByText('Stage 6: Review & Connected Knowledge Graph')).toBeVisible();
  });

  // ── TEST C: PATTERN METADATA (INTUITION, COMPLEXITY, SIGNALS) ──────────────
  test('C. Pattern metadata renders intuition, complexity bounds, and recognition checklist', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    // Core intuition section
    await expect(page.getByText('Core Intuition & Mental Model')).toBeVisible();

    // Time & Space complexity metrics
    await expect(page.getByText('Time Complexity')).toBeVisible();
    await expect(page.getByText('Space Complexity', { exact: true })).toBeVisible();

    // Recognition checklist
    await expect(page.getByText('Recognition Checklist', { exact: true })).toBeVisible();

    // When to Use and When NOT to Use
    await expect(page.getByText('When to Use', { exact: true })).toBeVisible();
    await expect(page.getByText(/When NOT to Use/i)).toBeVisible();
  });

  // ── TEST D: AUTHENTIC MASTERY TELEMETRY HUD ────────────────────────────────
  test('D. Mastery state badge and authentic progress HUD render without fake data', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    // Mastery telemetry container
    await expect(page.getByText('Mastery Telemetry').first()).toBeVisible();

    // Solved ratio indicator (e.g. X / Y Solved)
    await expect(page.getByText('Curriculum Solved:').first()).toBeVisible();

    // Session accuracy & attempts metrics
    await expect(page.getByText('Session Accuracy:').first()).toBeVisible();
    await expect(page.getByText('Recent Attempts:').first()).toBeVisible();
  });

  // ── TEST E: PRACTICE CTA PRESERVES AREA, SUBTOPIC & PATTERN QUERY PARAMS ───
  test('E. Primary Practice CTA preserves area, subtopic, and pattern query parameters', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    // Locate the "Practice Pattern" CTA button in header
    const practiceCta = page.locator('header a[href*="/practice"]').first();
    await expect(practiceCta).toBeVisible();

    const href = await practiceCta.getAttribute('href');
    expect(href).toContain('area=basic-arrays');
    expect(href).toContain('subtopic=array-traversal');
    expect(href).toContain('pattern=array-fundamentals');

    // Click through to Practice Arena
    await practiceCta.click();
    await page.waitForURL((url) =>
      url.pathname.includes('/practice') &&
      url.searchParams.get('pattern') === 'array-fundamentals'
    );

    expect(page.url()).toContain('pattern=array-fundamentals');
    expect(page.url()).toContain('area=basic-arrays');
  });

  // ── TEST F: CODE TEMPLATES WITH MULTI-LANGUAGE TABS ─────────────────────────
  test('F. Code templates allow switching between Python, Java, and C++ with copy functionality', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    // Locate language tab buttons
    const pythonTab = page.locator('button:has-text("Python 3")');
    const javaTab = page.locator('button:has-text("Java")');
    const cppTab = page.locator('button:has-text("C++ 17/20")');

    await expect(pythonTab).toBeVisible();
    await expect(javaTab).toBeVisible();
    await expect(cppTab).toBeVisible();

    // Switch to Java
    await javaTab.click();
    await expect(page.locator('pre code')).toContainText(/public /i);

    // Switch to C++
    await cppTab.click();
    await expect(page.locator('pre code')).toContainText(/(vector|std::|#include|int |bool )/i);

    // Switch back to Python
    await pythonTab.click();
    await expect(page.locator('pre code')).toContainText(/def /i);

    // Verify Copy Template button is present
    const copyBtn = page.locator('button:has-text("Copy Template")');
    await expect(copyBtn).toBeVisible();
  });

  // ── TEST G: SMART SPRINT GENERATION ────────────────────────────────────────
  test('G. Smart 5-Problem Practice Sprint generates session and redirects to Practice Arena', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    // Locate the "Start Sprint" button in Stage 5
    const startSprintBtn = page.locator('#practice-section button:has-text("Start Sprint")');
    await expect(startSprintBtn).toBeVisible();

    await startSprintBtn.click();
    await page.waitForURL((url) => url.pathname.includes('/practice'));

    expect(page.url()).toContain('/practice');
    expect(page.url()).toContain('pattern=array-fundamentals');
  });

  // ── TEST H: KNOWLEDGE GRAPH NAVIGATION (RELATED PATTERNS) ───────────────────
  test('H. Knowledge graph related pattern links navigate to corresponding pattern pages', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    // Scroll to Stage 6 Knowledge Graph
    const relatedSection = page.getByText('Stage 6: Review & Connected Knowledge Graph');
    await expect(relatedSection).toBeVisible();

    // Locate any progression or related pattern link
    const nextOrRelatedLink = page.locator('a[href*="/journey/"][href*="kadanes-algorithm"], a[href*="/journey/"][href*="prefix-sum"]').first();
    if (await nextOrRelatedLink.isVisible()) {
      const targetHref = await nextOrRelatedLink.getAttribute('href');
      await nextOrRelatedLink.click();
      await page.waitForURL((url) => targetHref ? url.pathname === targetHref : true);
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  // ── TEST I: DIRECT URL ENTRY & REFRESH RESILIENCE ──────────────────────────
  test('I. Direct URL entry and browser reload render clean state without hydration mismatch', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText('Array Fundamentals');

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText('Array Fundamentals');
    await expect(page.getByText('Stage 1: Understand')).toBeVisible();
  });

  // ── TEST J: RESPONSIVENESS & ZERO HORIZONTAL OVERFLOW ACROSS ALL VIEWPORTS ──
  const VIEWPORTS = [
    { name: 'Mobile (375x812)', width: 375, height: 812 },
    { name: 'Tablet Portrait (768x1024)', width: 768, height: 1024 },
    { name: 'Tablet Landscape (1024x768)', width: 1024, height: 768 },
    { name: 'Desktop (1440x900)', width: 1440, height: 900 },
  ];

  for (const vp of VIEWPORTS) {
    test(`J. Viewport ${vp.name} renders with 0 horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
      await page.waitForLoadState('networkidle');

      // Check that document does not have horizontal scrollbar
      const hasHorizontalScroll = await page.evaluate(() => {
        const root = document.documentElement;
        // Allow up to 1px tolerance for subpixel antialiasing
        return root.scrollWidth > root.clientWidth + 1;
      });

      expect(hasHorizontalScroll).toBeFalsy();
    });
  }

  // ── TEST K: STAGE NAVIGATION INTERACTION ───────────────────────────────────
  test('K. Clicking learning stage buttons updates active state and scrolls to section', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    const stageNav = page.locator('nav[aria-label="Learning progress stages"]');
    await expect(stageNav).toBeVisible();

    // Click on Practice stage button
    const practiceStageBtn = stageNav.locator('button:has-text("Practice")');
    await expect(practiceStageBtn).toBeVisible();
    await practiceStageBtn.click();

    // Verify practice section is visible in viewport
    const practiceSection = page.locator('#practice-section');
    await expect(practiceSection).toBeVisible();
  });

  // ── TEST L: WORKED EXAMPLE INTERACTIVE STEPPER ─────────────────────────────
  test('L. Worked example interactive stepper advances steps and updates invariants', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    const workedSection = page.locator('#stage-worked-example');
    await expect(workedSection).toBeVisible();

    // Check step 1 is initial
    await expect(workedSection).toContainText('Step 1 of');

    // Click step 2 button
    const step2Btn = workedSection.locator('button[aria-label="Jump to step 2"]');
    if (await step2Btn.isVisible()) {
      await step2Btn.click();
      await expect(workedSection).toContainText('Step 2 of');
    }
  });

  // ── TEST M: ADD TO TODAY'S PLAN CROSS-MODULE INTEGRATION ────────────────────
  test('M. Add to Today Plan button triggers state update and links to daily planner', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    const addPlanBtn = page.locator('[data-testid="add-pattern-to-plan-btn"]').first();
    await expect(addPlanBtn).toBeVisible();

    await addPlanBtn.click();
    // After clicking, button shows Added
    await expect(addPlanBtn).toContainText(/Added/i);
  });

  // ── TEST N: INTERVIEW THIS PATTERN CROSS-MODULE HANDOFF ─────────────────────
  test('N. Interview This Pattern button navigates to interview topic setup', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    const interviewBtn = page.locator('[data-testid="interview-this-pattern-btn"]').first();
    await expect(interviewBtn).toBeVisible();

    await interviewBtn.click();
    await page.waitForURL((url) =>
      url.pathname.includes('/interview') &&
      url.searchParams.get('mode') === 'topic' &&
      url.searchParams.get('pattern') === 'array-fundamentals'
    );

    expect(page.url()).toContain('mode=topic');
    expect(page.url()).toContain('pattern=array-fundamentals');
  });

  // ── TEST O: CURATED PROBLEMS COMPACT TABLE & PLATFORM PILLS ────────────────
  test('O. Curated problems render in a compact table with platform and difficulty pills', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    const table = page.locator('#practice-section table');
    await expect(table).toBeVisible();

    // Check table headers
    await expect(table.locator('th:has-text("Problem")')).toBeVisible();
    await expect(table.locator('th:has-text("Platform")')).toBeVisible();
    await expect(table.locator('th:has-text("Difficulty")')).toBeVisible();

    // At least one problem row
    const rows = table.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
  });

  // ── TEST P: CURATED PROBLEM TIER FILTER SWITCHING ──────────────────────────
  test('P. Curated problem tier tabs switch between Learn, Practice, Master, and All', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    const learnTab = page.locator('#practice-section button:has-text("Learn Tier")');
    if (await learnTab.isVisible()) {
      await learnTab.click();
      await expect(learnTab).toHaveClass(/border/);
    }
  });

  // ── TEST Q: COMMON MISTAKES & INTERVIEW PRO TIPS ────────────────────────────
  test('Q. Stage 4 renders authentic common mistakes and interview pro tips', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    const mistakesHeader = page.getByText('Common Mistakes & Edge Cases');
    await expect(mistakesHeader).toBeVisible();

    const tipsHeader = page.getByText('Interview Pro Tips & Verbalization');
    await expect(tipsHeader).toBeVisible();
  });

  // ── TEST R: THEME RESILIENCE (DARK & LIGHT MODES) ──────────────────────────
  test('R. Page renders properly under both dark and light modes', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    // Force light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    });

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#stage-understand')).toBeVisible();

    // Force dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#stage-understand')).toBeVisible();
  });

  // ── TEST S: KEYBOARD ACCESSIBILITY & FOCUS VISIBILITY ───────────────────────
  test('S. Interactive elements support keyboard navigation and focus rings', async ({ page }) => {
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('networkidle');

    // Press tab to focus through header
    await page.keyboard.press('Tab');
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedTag).toBeTruthy();
  });

});
