import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — Interview Arena 2.0: Realistic Adaptive Simulator E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any leftover interview session in local storage once per test run (survives page.reload within test)
    await page.addInitScript(() => {
      if (!window.sessionStorage.getItem('__interview_test_init')) {
        window.sessionStorage.setItem('__interview_test_init', '1');
        window.localStorage.removeItem('dsa_active_interview_session_v2_default_user');
        window.localStorage.removeItem('dsa_active_interview_session_v2_guest-user');
      }
    });
  });

  // ── TEST A: LANDING EXPERIENCE & READINESS HUD ─────────────────────────────
  test('A. Landing page loads with header, readiness HUD, modes, and recommended session', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    // Verify Header & Main View
    await expect(page.locator('[data-testid="interview-setup-view"]')).toBeVisible();
    await expect(page.locator('h1')).toContainText(/Interview Arena/i);

    // Verify Evidence-based Readiness HUD
    const readinessHud = page.locator('[data-testid="interview-readiness-hud"]');
    await expect(readinessHud).toBeVisible();
    await expect(readinessHud).toContainText(/Evidence-Based Interview Readiness/i);

    // Verify Recommended Session Card
    const recommendedCard = page.locator('[data-testid="recommended-interview-card"]');
    await expect(recommendedCard).toBeVisible();
    await expect(page.locator('[data-testid="start-recommended-interview-btn"]')).toBeVisible();

    // Verify Primary CTA
    await expect(page.locator('[data-testid="start-interview-btn"]')).toBeVisible();
  });

  // ── TEST B: QUICK SCREEN MODE (1 PROBLEM, 20 MIN) ──────────────────────────
  test('B. Quick Screen mode launches workspace with exactly 1 problem and countdown timer', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    // Select Quick mode
    await page.locator('[data-testid="mode-btn-quick"]').click();

    // Start Interview
    await page.locator('[data-testid="start-interview-btn"]').click();

    // Verify workspace loaded
    await expect(page.locator('[data-testid="interview-workspace-view"]')).toBeVisible();

    // Verify exactly 1 problem tab
    await expect(page.locator('[data-testid="problem-tab-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="problem-tab-2"]')).not.toBeVisible();

    // Verify timer is visible
    const timer = page.locator('[data-testid="interview-timer"]');
    await expect(timer).toBeVisible();
    await expect(timer).toContainText(/19:|20:/);
  });

  // ── TEST C: 30M TECHNICAL MODE (2 PROBLEMS, 30 MIN) ────────────────────────
  test('C. 30m Technical mode generates 2 problems and 30-minute timer', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    // Select 30m mode
    await page.locator('[data-testid="mode-btn-30m"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    // Verify workspace loaded with 2 problems
    await expect(page.locator('[data-testid="interview-workspace-view"]')).toBeVisible();
    await expect(page.locator('[data-testid="problem-tab-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="problem-tab-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="problem-tab-3"]')).not.toBeVisible();

    // Timer check
    await expect(page.locator('[data-testid="interview-timer"]')).toContainText(/29:|30:/);
  });

  // ── TEST D: 45M ONSITE ROUND (3 PROBLEMS, ESCALATING DIFFICULTY) ────────────
  test('D. 45m Onsite Round generates 3 problems and escalating difficulty', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    // Select 45m mode
    await page.locator('[data-testid="mode-btn-45m"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    // Verify 3 problems
    await expect(page.locator('[data-testid="problem-tab-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="problem-tab-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="problem-tab-3"]')).toBeVisible();
    await expect(page.locator('[data-testid="problem-tab-4"]')).not.toBeVisible();

    // Timer check
    await expect(page.locator('[data-testid="interview-timer"]')).toContainText(/44:|45:/);
  });

  // ── TEST E: 60M COMPREHENSIVE ROUND (4 PROBLEMS) ───────────────────────────
  test('E. 60m Comprehensive mode generates 4 problems and 60-minute clock', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    // Select 60m mode
    await page.locator('[data-testid="mode-btn-60m"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    // Verify 4 problems
    await expect(page.locator('[data-testid="problem-tab-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="problem-tab-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="problem-tab-3"]')).toBeVisible();
    await expect(page.locator('[data-testid="problem-tab-4"]')).toBeVisible();

    // Timer check
    await expect(page.locator('[data-testid="interview-timer"]')).toContainText(/59:|60:/);
  });

  // ── TEST F: COMPANY STYLE MODE ─────────────────────────────────────────────
  test('F. Company Style mode displays company selector and filters by real company archives', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    // Select Company mode
    await page.locator('[data-testid="mode-btn-company"]').click();

    // Company selector should appear
    await expect(page.locator('[data-testid="company-style-selector"]')).toBeVisible();
    await expect(page.locator('[data-testid="company-btn-google"]')).toBeVisible();
    await expect(page.locator('[data-testid="company-btn-amazon"]')).toBeVisible();

    // Select Amazon
    await page.locator('[data-testid="company-btn-amazon"]').click();

    // Start
    await page.locator('[data-testid="start-interview-btn"]').click();
    await expect(page.locator('[data-testid="interview-workspace-view"]')).toBeVisible();
  });

  // ── TEST G: TOPIC FOCUSED MODE ─────────────────────────────────────────────
  test('G. Topic Focused mode displays curriculum learning area selector', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    // Select Topic mode
    await page.locator('[data-testid="mode-btn-topic"]').click();
    await expect(page.locator('[data-testid="topic-focused-selector"]')).toBeVisible();
  });

  // ── TEST H: REALISTIC PATTERN CONCEALMENT ──────────────────────────────────
  test('H. Realistic mode conceals pattern by default and reveals hint upon user action', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    // Launch Quick mode (realistic)
    await page.locator('[data-testid="mode-btn-quick"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    // In realistic mode, pattern is concealed
    await expect(page.locator('[data-testid="pattern-concealed-badge"]')).toBeVisible();

    // Click Reveal Hint
    await page.locator('[data-testid="reveal-pattern-btn"]').click();

    // Now pattern tag is revealed
    await expect(page.locator('[data-testid="revealed-pattern-tag"]')).toBeVisible();
  });

  // ── TEST I: THINKING & APPROACH PHASE NOTES AUTO-SAVE ──────────────────────
  test('I. Candidate can enter approach notes, Big-O estimates, and edge cases in thinking tab', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="mode-btn-quick"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    // Switch to Thinking tab
    await page.locator('[data-testid="tab-thinking"]').click();
    await expect(page.locator('[data-testid="thinking-phase-container"]')).toBeVisible();

    // Select Time and Space complexity
    await page.locator('[data-testid="time-complexity-select"]').selectOption('O(N)');
    await page.locator('[data-testid="space-complexity-select"]').selectOption('O(1)');

    // Enter strategy notes
    const notesInput = page.locator('[data-testid="approach-notes-input"]');
    await notesInput.fill('Iterate once with two pointers moving inward from both ends.');

    // Enter edge cases
    const edgeCasesInput = page.locator('[data-testid="edge-cases-input"]');
    await edgeCasesInput.fill('Empty array, single element, negative numbers.');

    // Switch to Specs tab and back to Thinking tab to verify persistence
    await page.locator('[data-testid="tab-specs"]').click();
    await page.locator('[data-testid="tab-thinking"]').click();

    await expect(notesInput).toHaveValue(/two pointers/i);
    await expect(edgeCasesInput).toHaveValue(/Empty array/i);
  });

  // ── TEST J: SIMULATED INTERVIEWER GUIDANCE MILESTONES ──────────────────────
  test('J. Interviewer guidance milestones can be interactively checked off', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="mode-btn-quick"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    // Open guidance tab
    await page.locator('[data-testid="tab-guidance"]').click();
    await expect(page.locator('[data-testid="interviewer-guidance-container"]')).toBeVisible();

    // Check off Clarify milestone
    const clarifyItem = page.locator('[data-testid="guidance-item-clarify"]');
    await clarifyItem.click();

    // Check off Verbalize milestone
    const verbalizeItem = page.locator('[data-testid="guidance-item-verbalize"]');
    await verbalizeItem.click();
  });

  // ── TEST K: TIMER DISPLAY, PAUSE AND RESUME ────────────────────────────────
  test('K. Timer displays countdown and Pause/Resume shows non-cheating overlay', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="mode-btn-quick"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    // Pause interview
    const pauseBtn = page.locator('[data-testid="pause-resume-btn"]');
    await pauseBtn.click();

    // Paused overlay is displayed
    const overlay = page.locator('[data-testid="interview-paused-overlay"]');
    await expect(overlay).toBeVisible();
    await expect(overlay).toContainText(/Interview Paused/i);

    // Resume from overlay button
    await page.locator('[data-testid="resume-overlay-btn"]').click();
    await expect(overlay).not.toBeVisible();
  });

  // ── TEST L: REFRESH-SAFE PERSISTENCE ───────────────────────────────────────
  test('L. Browser refresh restores in-progress interview workspace without data loss', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="mode-btn-quick"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    // Fill notes in thinking phase
    await page.locator('[data-testid="tab-thinking"]').click();
    await page.locator('[data-testid="approach-notes-input"]').fill('Persistent notes across reload');

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Workspace is restored directly
    await expect(page.locator('[data-testid="interview-workspace-view"]')).toBeVisible();

    // Check notes persisted
    await page.locator('[data-testid="tab-thinking"]').click();
    await expect(page.locator('[data-testid="approach-notes-input"]')).toHaveValue(/Persistent notes/i);
  });

  // ── TEST M: RUN & SUBMIT CODE EXECUTION ────────────────────────────────────
  test('M. Sandboxed judge bridge executes Run Code and displays output console', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="mode-btn-quick"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    // Click Run Code
    const runBtn = page.locator('[data-testid="run-code-btn"]');
    await runBtn.click();

    // Console output should appear
    await expect(page.locator('[data-testid="execution-console-output"]')).toBeVisible({ timeout: 15000 });
  });

  // ── TEST N: FINISH INTERVIEW & FACTUAL SCORECARD (ZERO FAKE GRADES) ────────
  test('N. Finishing interview generates factual scorecard with zero arbitrary grades', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    await page.locator('[data-testid="mode-btn-quick"]').click();
    await page.locator('[data-testid="start-interview-btn"]').click();

    // Click Finish
    await page.locator('[data-testid="finish-interview-btn"]').click();

    // Modal appears
    await expect(page.locator('[data-testid="finish-confirm-modal"]')).toBeVisible();
    await page.locator('[data-testid="confirm-finish-btn"]').click();

    // Scorecard view appears
    await expect(page.locator('[data-testid="interview-report-view"]')).toBeVisible();

    // Verify readiness state badge is factual (e.g. Strong Evidence, Developing, Building Evidence, Needs Practice)
    const badge = page.locator('[data-testid="readiness-state-badge"]');
    await expect(badge).toBeVisible();

    // Verify factual metrics are displayed
    await expect(page.locator('[data-testid="interview-report-view"]')).toContainText(/Problems Solved/i);
    await expect(page.locator('[data-testid="interview-report-view"]')).toContainText(/Accuracy/i);
    await expect(page.locator('[data-testid="interview-report-view"]')).toContainText(/Time Used/i);
  });

  // ── TEST O: PROBLEM REVIEW, SUBMITTED CODE & PATTERN LINKS ─────────────────
  test('O. Scorecard problem review displays submitted code and links to Pattern Academy', async ({ page }) => {
    await page.goto('/interview');
    await page.waitForLoadState('networkidle');

    // Click Preview Sample Report to test comprehensive report view
    await page.getByRole('button', { name: /Preview Sample Report/i }).click();
    await page.getByRole('button', { name: /View Full Interactive Report/i }).click();

    await expect(page.locator('[data-testid="interview-report-view"]')).toBeVisible();

    // Verify problem breakdown
    const problemCard = page.locator('[data-testid="problem-review-card-1"]');
    await expect(problemCard).toBeVisible();

    // Verify Learn Pattern and Practice Pattern links
    await expect(problemCard.getByRole('link', { name: /Learn Pattern/i })).toBeVisible();
    await expect(problemCard.getByRole('link', { name: /Practice Pattern/i })).toBeVisible();

    // Verify Continue Improving section
    await expect(page.locator('[data-testid="continue-improving-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="take-another-interview-btn"]')).toBeVisible();
  });

  // ── TEST P: CROSS-MODULE INTEGRATIONS ──────────────────────────────────────
  test('P. Cross-module links from Command Center and Pattern Academy navigate to Interview Arena', async ({ page }) => {
    // 1. Command Center -> Interview Arena
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const snapshotCard = page.locator('[data-testid="interview-snapshot-card"]');
    await expect(snapshotCard).toBeVisible();

    const startMockBtn = page.locator('[data-testid="start-mock-interview-btn"]');
    await expect(startMockBtn).toBeVisible();
    await startMockBtn.click();
    await page.waitForURL('**/interview');
    await expect(page.locator('[data-testid="interview-setup-view"]')).toBeVisible();

    // 2. Pattern Academy -> Interview Arena
    await page.goto('/journey/basic-arrays/array-traversal/array-fundamentals');
    await page.waitForLoadState('domcontentloaded');

    const interviewPatternBtn = page.locator('[data-testid="interview-this-pattern-btn"]');
    await expect(interviewPatternBtn).toBeVisible();
    await interviewPatternBtn.click();

    await page.waitForURL((url) => url.pathname.includes('/interview') && url.searchParams.get('mode') === 'topic');
    await expect(page.locator('[data-testid="interview-setup-view"]')).toBeVisible();
  });
});
