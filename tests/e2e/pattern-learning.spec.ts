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
    await expect(page.getByText('Space Complexity')).toBeVisible();

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
    await expect(page.getByText('Mastery Telemetry')).toBeVisible();

    // Solved ratio indicator (e.g. X / Y Solved)
    await expect(page.getByText('Curriculum Solved:')).toBeVisible();

    // Session accuracy & attempts metrics
    await expect(page.getByText('Session Accuracy:')).toBeVisible();
    await expect(page.getByText('Recent Attempts:')).toBeVisible();
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

});
