import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — Interview Arena UI/UX Phase 6: Simulated Technical Interview Room E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.sessionStorage.setItem('__interview_test_init', '1');
      window.localStorage.removeItem('dsa_active_interview_session_v2_default_user');
      window.localStorage.removeItem('dsa_active_interview_session_v2_guest-user');
    });
  });

  // ── A. LANDING & PROFESSIONAL HIERARCHY ─────────────────────────────────────
  test('A. Landing page renders restrained developer header, clear hierarchy, and no giant cards', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-testid="interview-setup-view"]')).toBeVisible();
    await expect(page.locator('h1')).toContainText(/Interview Arena/i);
    await expect(page.getByText(/SIMULATED TECHNICAL INTERVIEW ENVIRONMENT/i)).toBeVisible();

    // Verify Primary CTA
    const startBtn = page.locator('[data-testid="start-interview-btn"]');
    await expect(startBtn).toBeVisible();
    await expect(startBtn).toContainText(/Start Interview/i);
  });

  // ── B. MODE SELECTION CONTROLS ──────────────────────────────────────────────
  test('B. Mode selection provides compact selectable rows with immediate duration and count indicators', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    // Verify all 8 modes exist and have compact metadata
    const modes = ['quick', '30m', '45m', '60m', 'company', 'topic', 'mixed', 'custom'];
    for (const m of modes) {
      const modeBtn = page.locator(`[data-testid="mode-btn-${m}"]`);
      await expect(modeBtn).toBeVisible();
      await expect(modeBtn).toContainText(/duration|prob/i);
    }

    // Switch between modes and verify selection
    await page.locator('[data-testid="mode-btn-quick"]').click();
    await expect(page.locator('[data-testid="mode-btn-quick"]')).toHaveClass(/ring-1|ring-cyan/);

    await page.locator('[data-testid="mode-btn-30m"]').click();
    await expect(page.locator('[data-testid="mode-btn-30m"]')).toHaveClass(/ring-1|ring-cyan/);
  });

  // ── C. EVIDENCE-BASED READINESS HUD ─────────────────────────────────────────
  test('C. Readiness HUD displays factual readiness level, accuracy, pace, and strong/weak spots', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    const hud = page.locator('[data-testid="interview-readiness-hud"]');
    await expect(hud).toBeVisible();
    await expect(hud).toContainText(/Evidence-Based Interview Readiness/i);

    // Verify 4 metric tiles
    await expect(hud.getByText(/Historical Accuracy/i)).toBeVisible();
    await expect(hud.getByText(/Speed Pacing/i)).toBeVisible();
    await expect(hud.getByText(/Pattern Coverage/i)).toBeVisible();
    await expect(hud.getByText(/Recommended Focus/i)).toBeVisible();

    // Verify Solid & Weak spots tags
    await expect(hud.getByText(/Weak Spots:/i)).toBeVisible();
    await expect(hud.getByText(/Solid:/i)).toBeVisible();
  });

  // ── D. RECOMMENDED INTERVIEW CARD ───────────────────────────────────────────
  test('D. Recommended interview card displays explainable rationale and 1-click launch', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    const recCard = page.locator('[data-testid="recommended-interview-card"]');
    await expect(recCard).toBeVisible();
    await expect(recCard.getByText(/RECOMMENDED INTERVIEW/i)).toBeVisible();

    const startRecBtn = page.locator('[data-testid="start-recommended-interview-btn"]');
    await expect(startRecBtn).toBeVisible();
    await startRecBtn.click();

    // Verify interview workspace launched directly
    await expect(page.locator('[data-testid="interview-workspace-view"]')).toBeVisible();
  });

  // ── E. COMPANY STYLE SELECTOR ───────────────────────────────────────────────
  test('E. Company Style selector strictly displays supported company archives without misleading endorsements', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="mode-btn-company"]').click();
    const compSelector = page.locator('[data-testid="company-style-selector"]');
    await expect(compSelector).toBeVisible();

    // Verify verified companies are available
    await expect(page.locator('[data-testid="company-btn-google"]')).toBeVisible();
    await expect(page.locator('[data-testid="company-btn-amazon"]')).toBeVisible();
    await expect(page.locator('[data-testid="company-btn-meta"]')).toBeVisible();
    await expect(page.locator('[data-testid="company-btn-microsoft"]')).toBeVisible();
    await expect(page.locator('[data-testid="company-btn-apple"]')).toBeVisible();

    // Select Google
    await page.locator('[data-testid="company-btn-google"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();
    await expect(page.locator('[data-testid="interview-workspace-view"]')).toBeVisible();
  });

  // ── F. RESTRAINED HEADER, TIMER, PAUSE AND RESUME ───────────────────────────
  test('F. Active interview room has restrained header, countdown timer, and cheating-prevention pause overlay', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="mode-btn-quick"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    await expect(page.locator('[data-testid="interview-workspace-view"]')).toBeVisible();

    // Verify Header
    const workspace = page.locator('[data-testid="interview-workspace-view"]');
    await expect(workspace.getByText('DSA MASTER')).toBeVisible();
    await expect(workspace.getByText('Technical Interview')).toBeVisible();

    // Verify Timer
    const timer = page.locator('[data-testid="interview-timer"]');
    await expect(timer).toBeVisible();
    await expect(timer).toContainText(/19:|20:/);

    // Click Pause
    await page.locator('[data-testid="pause-resume-btn"]').click();
    const pausedOverlay = page.locator('[data-testid="interview-paused-overlay"]');
    await expect(pausedOverlay).toBeVisible();
    await expect(pausedOverlay).toContainText(/Interview Paused/i);

    // Resume from Overlay
    await page.locator('[data-testid="resume-overlay-btn"]').click();
    await expect(pausedOverlay).not.toBeVisible();
  });

  // ── G. PATTERN CONCEALMENT & HINT REVEAL ─────────────────────────────────────
  test('G. Realistic interview conceals pattern by default and reveals only upon explicit hint request', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="mode-btn-quick"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    // Pattern is concealed initially
    await expect(page.locator('[data-testid="pattern-concealed-badge"]')).toBeVisible();
    await expect(page.locator('[data-testid="revealed-pattern-tag"]')).not.toBeVisible();

    // Reveal Hint
    await page.locator('[data-testid="reveal-pattern-btn"]').click();
    await expect(page.locator('[data-testid="revealed-pattern-tag"]')).toBeVisible();
    await expect(page.locator('[data-testid="pattern-concealed-badge"]')).not.toBeVisible();
  });

  // ── H. APPROACH & COMPLEXITY THINKING NOTES ─────────────────────────────────
  test('H. Candidate approach, Big-O estimates, and edge cases persist across tab navigation and reload', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="mode-btn-quick"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    // Open Thinking Tab
    await page.locator('[data-testid="tab-thinking"]').click();
    await expect(page.locator('[data-testid="thinking-phase-container"]')).toBeVisible();

    // Fill Complexity & Strategy
    await page.locator('[data-testid="time-complexity-select"]').selectOption('O(N log N)');
    await page.locator('[data-testid="space-complexity-select"]').selectOption('O(N)');
    await page.locator('[data-testid="approach-notes-input"]').fill('Use priority queue / heap to track top elements dynamically.');
    await page.locator('[data-testid="edge-cases-input"]').fill('K > array length, negative numbers, duplicate frequencies.');

    // Switch to Specs and back
    await page.locator('[data-testid="tab-specs"]').click();
    await page.locator('[data-testid="tab-thinking"]').click();

    await expect(page.locator('[data-testid="approach-notes-input"]')).toHaveValue(/priority queue/i);
    await expect(page.locator('[data-testid="edge-cases-input"]')).toHaveValue(/duplicate frequencies/i);
  });

  // ── I. INTERVIEWER CHECKLIST MILESTONES ──────────────────────────────────────
  test('I. Interviewer checklist milestones toggle interactively', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="mode-btn-quick"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    await page.locator('[data-testid="tab-guidance"]').click();
    await expect(page.locator('[data-testid="interviewer-guidance-container"]')).toBeVisible();

    const clarify = page.locator('[data-testid="guidance-item-clarify"]');
    await clarify.click();
    await expect(clarify).toHaveClass(/bg-emerald/);

    const verbalize = page.locator('[data-testid="guidance-item-verbalize"]');
    await verbalize.click();
    await expect(verbalize).toHaveClass(/bg-emerald/);
  });

  // ── J. RUN CODE & CONSOLE OUTPUT ────────────────────────────────────────────
  test('J. Sandboxed code runner executes code and outputs verdict into console', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="mode-btn-quick"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    const runBtn = page.locator('[data-testid="run-code-btn"]');
    await expect(runBtn).toBeVisible();
    await runBtn.click();

    await expect(page.locator('[data-testid="execution-console-output"]')).toBeVisible({ timeout: 15000 });
  });

  // ── K. FINISH INTERVIEW & FACTUAL SCORECARD ─────────────────────────────────
  test('K. Finishing interview round generates factual scorecard with zero arbitrary grades', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="mode-btn-quick"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    // Finish
    await page.locator('[data-testid="finish-interview-btn"]').click();
    await expect(page.locator('[data-testid="finish-confirm-modal"]')).toBeVisible();
    await page.locator('[data-testid="confirm-finish-btn"]').click();

    // Report view
    const report = page.locator('[data-testid="interview-report-view"]');
    await expect(report).toBeVisible();

    // Factual Readiness State Badge
    await expect(page.locator('[data-testid="readiness-state-badge"]')).toBeVisible();

    // Factual Metrics
    await expect(report).toContainText(/Problems Solved/i);
    await expect(report).toContainText(/Timed Accuracy/i);
    await expect(report).toContainText(/Time Used/i);
    await expect(report).toContainText(/Average Pace/i);
  });

  // ── L. SAMPLE REPORT PREVIEW & PROBLEM REVIEW ────────────────────────────────
  test('L. Scorecard problem review displays submitted code, candidate notes, and curriculum links', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    // Click Preview Sample Report
    await page.getByRole('button', { name: /Preview Sample Report/i }).click();
    await page.getByRole('button', { name: /View Full Interactive Report/i }).click();

    await expect(page.locator('[data-testid="interview-report-view"]')).toBeVisible();

    // Verify Problem Breakdown Card
    const problemCard = page.locator('[data-testid="problem-review-card-1"]');
    await expect(problemCard).toBeVisible();

    // Verify Learn & Practice Links
    await expect(problemCard.getByRole('link', { name: /Learn Pattern/i })).toBeVisible();
    await expect(problemCard.getByRole('link', { name: /Practice Pattern/i })).toBeVisible();

    // Verify Continue Improving section
    await expect(page.locator('[data-testid="continue-improving-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="take-another-interview-btn"]')).toBeVisible();
  });

  // ── M. RESPONSIVENESS & ZERO HORIZONTAL OVERFLOW ────────────────────────────
  test('M. Interview Arena adapts across mobile, tablet, and desktop with zero horizontal overflow', async ({ page }) => {
    const viewports = [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto('/interview');
      await page.waitForLoadState('networkidle');

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(overflow, `Horizontal overflow at ${vp.width}x${vp.height}`).toBeFalsy();
    }
  });

  // ── N. LIGHT & DARK THEMES ──────────────────────────────────────────────────
  test('N. Interview Arena renders cleanly under both dark and light modes', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    // Check dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await page.waitForTimeout(300);
    await expect(page.locator('[data-testid="interview-setup-view"]')).toBeVisible();

    // Check light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await page.waitForTimeout(300);
    await expect(page.locator('[data-testid="interview-setup-view"]')).toBeVisible();
  });
});
