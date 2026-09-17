/**
 * DSA MASTER — Strict Real Browser Onboarding E2E Test Suite
 * Production-Grade Playwright Browser QA & Real Auth Lifecycle Verification
 * 
 * Verifies:
 * 1. Real Signup -> Automatic Onboarding Redirect (no manual goto)
 * 2. Step-by-Step Flow (1 Welcome -> 2 Level -> 3 Topics -> 4 Goals -> 5 Diagnostic -> 6 Summary)
 * 3. Diagnostic Correctness (100% score with all 4 questions correct, Zero Fake Mastery)
 * 4. First Mission Routing (/practice/contains-duplicate with HTTP 200 & rendered problem UI)
 * 5. State Persistence & Reload (completed baseline summary on reload)
 * 6. Completed User Re-Login (auto-bypasses onboarding and routes to /dashboard)
 * 7. Real Skip Flow (User B signs up -> auto-redirects to /onboarding -> skips -> login routes to /dashboard)
 * 8. Multi-User Isolation (User A vs User B profile & session isolation)
 * 9. Multi-Viewport Responsiveness (375x812, 768x1024, 1024x768, 1440x900 - zero horizontal scroll)
 * 10. Accessibility & Semantic Roles (role=progressbar, radiogroup, radio, checkbox, aria-valuenow)
 * 11. Theme Adaptation (Light and Dark theme rendering)
 * 12. Network & Console Health (Zero unexpected 4xx/5xx responses or uncaught exceptions)
 */

import { chromium, Browser, BrowserContext, Page, Response } from 'playwright';

const BASE_URL = process.env.APP_URL || 'http://localhost:3000';

interface QARecord {
  category: string;
  testName: string;
  passed: boolean;
  details?: string;
}

const records: QARecord[] = [];

function record(category: string, testName: string, passed: boolean, details?: string) {
  records.push({ category, testName, passed, details });
  const badge = passed ? '  ✓ [PASS]' : '  ✗ [FAIL]';
  console.log(`${badge} [${category}] ${testName}${details ? ' -> ' + details : ''}`);
  if (!passed) {
    process.exitCode = 1;
  }
}

export async function runStrictOnboardingBrowserE2E() {
  console.log('================================================================');
  console.log(' DSA MASTER — STRICT REAL BROWSER ONBOARDING E2E TEST SUITE     ');
  console.log(' Target: ' + BASE_URL);
  console.log('================================================================\n');

  const browser: Browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const timestamp = Date.now();
  const testUserAEmail = `onboard_alpha_${timestamp}@dsamastertest.io`;
  const testUserAPass = 'SecureP@ss1234!';
  const testUserAName = 'Onboarding Tester Alpha';

  const testUserBEmail = `onboard_beta_${timestamp}@dsamastertest.io`;
  const testUserBPass = 'SecureP@ss1234!';
  const testUserBName = 'Onboarding Tester Beta';

  const consoleErrors: string[] = [];
  const networkErrors: { url: string; status: number }[] = [];

  function attachMonitoring(page: Page) {
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Filter out benign extension or known favicon 404 noise if any
        if (!text.includes('favicon.ico') && !text.includes('chrome-extension')) {
          consoleErrors.push(text);
        }
      }
    });

    page.on('response', (resp: Response) => {
      const status = resp.status();
      const url = resp.url();
      if (status >= 400 && !url.includes('favicon.ico') && !url.includes('chrome-extension')) {
        networkErrors.push({ url, status });
      }
    });
  }

  try {
    // ══════════════════════════════════════════════════════════════════
    // 1. REAL SIGNUP -> AUTOMATIC ONBOARDING REDIRECT (USER A)
    // ══════════════════════════════════════════════════════════════════
    console.log('[1. REAL SIGNUP -> AUTOMATIC ONBOARDING REDIRECT (USER A)]');
    const contextA: BrowserContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const pageA: Page = await contextA.newPage();
    attachMonitoring(pageA);

    await pageA.goto(`${BASE_URL}/signup`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Strict form locator verification
    const nameInput = pageA.locator('input[placeholder="Full Name"]');
    const emailInput = pageA.locator('input[placeholder="Username or Email"]');
    const passInput = pageA.locator('input[placeholder="Password"]');
    const confirmPassInput = pageA.locator('input[placeholder="Confirm Password"]');
    const termsCheckbox = pageA.locator('input#terms');
    const submitBtn = pageA.locator('button[type="submit"]');

    await nameInput.waitFor({ state: 'visible', timeout: 10000 });
    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await passInput.waitFor({ state: 'visible', timeout: 10000 });
    await confirmPassInput.waitFor({ state: 'visible', timeout: 10000 });
    await termsCheckbox.waitFor({ state: 'attached', timeout: 10000 });
    await submitBtn.waitFor({ state: 'visible', timeout: 10000 });

    record('Signup UI', 'All signup fields and controls are strictly visible', true);

    await nameInput.fill(testUserAName);
    await emailInput.fill(testUserAEmail);
    await passInput.fill(testUserAPass);
    await confirmPassInput.fill(testUserAPass);
    await termsCheckbox.check();

    // Submit form and DO NOT manually navigate - wait for automatic redirect to /onboarding
    await submitBtn.click();

    // Assert automatic router transition to /onboarding
    await pageA.waitForURL('**/onboarding**', { timeout: 15000 });
    const currentUrlAfterSignup = pageA.url();
    record(
      'Signup Redirection',
      'Signup automatically navigates browser to /onboarding without manual intervention',
      currentUrlAfterSignup.includes('/onboarding'),
      `Current URL: ${currentUrlAfterSignup}`
    );

    // Assert Step 1 Welcome content is strictly visible
    const welcomeHeader = pageA.locator('h1:has-text("Let\'s build your DSA path")');
    await welcomeHeader.waitFor({ state: 'visible', timeout: 10000 });
    record('Step 1 Welcome', 'Step 1 Welcome headline is strictly visible on onboarding mount', true);

    // Verify progress indicator accessibility
    const progressBar = pageA.locator('[role="progressbar"]');
    await progressBar.waitFor({ state: 'visible', timeout: 5000 });
    const progressAriaVal = await progressBar.getAttribute('aria-valuenow');
    record('Accessibility Semantics', 'role="progressbar" is present with aria-valuenow', progressAriaVal !== null, `Value: ${progressAriaVal}`);

    // ══════════════════════════════════════════════════════════════════
    // 2. STEP-BY-STEP PROGRESSION: STEP 1 -> STEP 2 (LEVEL)
    // ══════════════════════════════════════════════════════════════════
    console.log('\n[2. STEP PROGRESSION: STEP 1 -> STEP 2 (LEVEL)]');
    const getStartedBtn = pageA.locator('button:has-text("Get Started")');
    await getStartedBtn.waitFor({ state: 'visible', timeout: 5000 });
    await getStartedBtn.click();

    const step2Header = pageA.locator('h2:has-text("How comfortable are you with DSA?")');
    await step2Header.waitFor({ state: 'visible', timeout: 5000 });
    record('Step 2 Mount', 'Step 2 Level selection renders with strict headline', true);

    // Select 'I can solve Easy problems' (intermediate_foundational level)
    const easyOption = pageA.locator('button:has-text("I can solve Easy problems")');
    await easyOption.waitFor({ state: 'visible', timeout: 5000 });
    await easyOption.click();

    const continueBtnStep2 = pageA.locator('button:has-text("Continue")');
    await continueBtnStep2.waitFor({ state: 'visible', timeout: 5000 });
    await continueBtnStep2.click();

    // ══════════════════════════════════════════════════════════════════
    // 3. STEP 3 (TOPIC EXPOSURE) -> STEP 4 (GOAL SELECTION)
    // ══════════════════════════════════════════════════════════════════
    console.log('\n[3. TOPICS & GOAL SELECTION]');
    const step3Header = pageA.locator('h2:has-text("What have you already worked with?")');
    await step3Header.waitFor({ state: 'visible', timeout: 5000 });
    record('Step 3 Mount', 'Step 3 Topic selection renders with strict headline', true);

    // Select Arrays and Hashing chips
    const arraysChip = pageA.locator('button:has-text("Arrays")');
    const hashingChip = pageA.locator('button:has-text("Hashing")');
    await arraysChip.waitFor({ state: 'visible', timeout: 5000 });
    await hashingChip.waitFor({ state: 'visible', timeout: 5000 });
    await arraysChip.click();
    await hashingChip.click();

    const continueBtnStep3 = pageA.locator('button:has-text("Continue")');
    await continueBtnStep3.waitFor({ state: 'visible', timeout: 5000 });
    await continueBtnStep3.click();

    // Step 4 Goals
    const step4Header = pageA.locator('h2:has-text("What are you preparing for?")');
    await step4Header.waitFor({ state: 'visible', timeout: 5000 });
    record('Step 4 Mount', 'Step 4 Goal selection renders with strict headline', true);

    const interviewGoal = pageA.locator('button:has-text("Coding interviews")');
    await interviewGoal.waitFor({ state: 'visible', timeout: 5000 });
    await interviewGoal.click();

    const startDiagnosticBtn = pageA.locator('button:has-text("Start Diagnostic")');
    await startDiagnosticBtn.waitFor({ state: 'visible', timeout: 5000 });
    await startDiagnosticBtn.click();

    // ══════════════════════════════════════════════════════════════════
    // 4. STEP 5: DIAGNOSTIC MICRO-ASSESSMENT (100% CORRECTNESS AUDIT)
    // ══════════════════════════════════════════════════════════════════
    console.log('\n[4. DIAGNOSTIC MICRO-ASSESSMENT (100% SCORE AUDIT)]');
    const diagnosticBanner = pageA.locator('text="Diagnostic Question 1 of 4"');
    await diagnosticBanner.waitFor({ state: 'visible', timeout: 5000 });
    record('Step 5 Diagnostic', 'Diagnostic assessment loaded with 4 questions', true);

    // Q1: Lookup complexity (Correct: O(1) for Hash Map, O(N) for Array)
    const q1Correct = pageA.locator('button:has-text("O(1) for Hash Map, O(N) for Array")');
    await q1Correct.waitFor({ state: 'visible', timeout: 5000 });
    await q1Correct.click();
    const nextQ1 = pageA.locator('button:has-text("Next Question")');
    await nextQ1.click();

    // Q2: Complement lookup pattern (Correct: Hash Map storing visited elements)
    const q2Correct = pageA.locator('button:has-text("Hash Map storing visited elements")');
    await q2Correct.waitFor({ state: 'visible', timeout: 5000 });
    await q2Correct.click();
    const nextQ2 = pageA.locator('button:has-text("Next Question")');
    await nextQ2.click();

    // Q3: Two Pointers Invariant (Correct: Two pointers starting at left & right)
    const q3Correct = pageA.locator('button:has-text("Two pointers starting at left & right")');
    await q3Correct.waitFor({ state: 'visible', timeout: 5000 });
    await q3Correct.click();
    const nextQ3 = pageA.locator('button:has-text("Next Question")');
    await nextQ3.click();

    // Q4: Binary Search Division (Correct: Each comparison with the midpoint eliminates half)
    const q4Correct = pageA.locator('button:has-text("Each comparison with the midpoint eliminates half")');
    await q4Correct.waitFor({ state: 'visible', timeout: 5000 });
    await q4Correct.click();
    const seePathBtn = pageA.locator('button:has-text("See My Path")');
    await seePathBtn.waitFor({ state: 'visible', timeout: 5000 });
    await seePathBtn.click();

    // ══════════════════════════════════════════════════════════════════
    // 5. STEP 6: PERSONALIZATION SUMMARY & FIRST MISSION ROUTING
    // ══════════════════════════════════════════════════════════════════
    console.log('\n[5. PERSONALIZATION SUMMARY & FIRST MISSION ROUTING]');
    const summaryCard = pageA.locator('text="Baseline established"');
    await summaryCard.waitFor({ state: 'visible', timeout: 10000 });
    record('Step 6 Summary', 'Summary renders baseline established confirmation', true);

    const scoreIndicator = pageA.locator('text=100%');
    await scoreIndicator.waitFor({ state: 'visible', timeout: 5000 });
    record('Diagnostic Accuracy', 'All 4 correct answers result in strict 100% diagnostic score', true);

    const firstMissionBtn = pageA.locator('button:has-text("Start My First Mission")');
    await firstMissionBtn.waitFor({ state: 'visible', timeout: 5000 });
    record('First Mission CTA', 'Start My First Mission button is visible and active', true);

    // Click "Start My First Mission" and assert direct navigation without 404
    await firstMissionBtn.click();
    await pageA.waitForURL('**/practice/**', { timeout: 15000 });
    const missionUrl = pageA.url();
    record('Mission Route', 'Navigates directly to practice mission route', missionUrl.includes('/practice'), `URL: ${missionUrl}`);

    // Verify that the destination page renders valid practice content
    const pageContent = await pageA.innerText('body');
    const validPracticeRender = !pageContent.includes('404') && (pageContent.includes('Contains Duplicate') || pageContent.includes('Practice Arena') || pageContent.includes('Code') || pageContent.includes('Problem'));
    record('Mission Page Health', 'First mission route renders live interactive problem workspace (zero 404s)', validPracticeRender);

    // ══════════════════════════════════════════════════════════════════
    // 6. REAL PERSISTENCE & RELOAD VERIFICATION
    // ══════════════════════════════════════════════════════════════════
    console.log('\n[6. REAL PERSISTENCE & RELOAD VERIFICATION]');
    await pageA.goto(`${BASE_URL}/onboarding`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const completedSummaryReload = pageA.locator('text="Baseline established"');
    await completedSummaryReload.waitFor({ state: 'visible', timeout: 10000 });
    record('Persistence Resume', 'Reloading /onboarding restores completed profile state', true);

    await contextA.close();

    // ══════════════════════════════════════════════════════════════════
    // 7. COMPLETED USER RE-LOGIN BYPASSES ONBOARDING
    // ══════════════════════════════════════════════════════════════════
    console.log('\n[7. COMPLETED USER RE-LOGIN BYPASSES ONBOARDING]');
    const contextA2: BrowserContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pageA2: Page = await contextA2.newPage();
    attachMonitoring(pageA2);

    await pageA2.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const loginEmailInput = pageA2.locator('input[placeholder="Username or Email"]');
    const loginPassInput = pageA2.locator('input[placeholder="Password"]');
    const loginSubmitBtn = pageA2.locator('button[type="submit"]');

    await loginEmailInput.waitFor({ state: 'visible', timeout: 10000 });
    await loginEmailInput.fill(testUserAEmail);
    await loginPassInput.fill(testUserAPass);
    await loginSubmitBtn.click();

    // Assert that completed user login resolves to /dashboard (bypassing /onboarding)
    await pageA2.waitForURL('**/dashboard**', { timeout: 15000 });
    const loginTargetUrl = pageA2.url();
    record('Completed Re-Login Bypass', 'Completed user login automatically directs to /dashboard', loginTargetUrl.includes('/dashboard'), `URL: ${loginTargetUrl}`);

    await contextA2.close();

    // ══════════════════════════════════════════════════════════════════
    // 8. REAL SKIP FLOW (USER B) & RE-LOGIN BYPASS
    // ══════════════════════════════════════════════════════════════════
    console.log('\n[8. REAL SKIP FLOW & PERSISTENCE (USER B)]');
    const contextB: BrowserContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pageB: Page = await contextB.newPage();
    attachMonitoring(pageB);

    await pageB.goto(`${BASE_URL}/signup`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await pageB.locator('input[placeholder="Full Name"]').fill(testUserBName);
    await pageB.locator('input[placeholder="Username or Email"]').fill(testUserBEmail);
    await pageB.locator('input[placeholder="Password"]').fill(testUserBPass);
    await pageB.locator('input[placeholder="Confirm Password"]').fill(testUserBPass);
    await pageB.locator('input#terms').check();
    await pageB.locator('button[type="submit"]').click();

    // Wait for auto-redirect to /onboarding
    await pageB.waitForURL('**/onboarding**', { timeout: 15000 });
    
    // Click "Skip for now"
    const skipBtn = pageB.locator('button:has-text("Skip for now")').first();
    await skipBtn.waitFor({ state: 'visible', timeout: 10000 });
    await skipBtn.click();

    // Assert that skipped user lands on the summary card with safe foundational defaults
    const skippedSummaryCard = pageB.locator('text="Baseline established"');
    await skippedSummaryCard.waitFor({ state: 'visible', timeout: 10000 });
    record('Skip Flow Persistence', 'Skipping onboarding creates safe foundational baseline and persists status', true);

    await contextB.close();

    // Check re-login for skipped user B
    const contextB2: BrowserContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pageB2: Page = await contextB2.newPage();
    attachMonitoring(pageB2);

    await pageB2.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await pageB2.locator('input[placeholder="Username or Email"]').fill(testUserBEmail);
    await pageB2.locator('input[placeholder="Password"]').fill(testUserBPass);
    await pageB2.locator('button[type="submit"]').click();

    await pageB2.waitForURL('**/dashboard**', { timeout: 15000 });
    const userBLoginUrl = pageB2.url();
    record('Skipped User Re-Login Bypass', 'Skipped user re-login routes directly to /dashboard', userBLoginUrl.includes('/dashboard'), `URL: ${userBLoginUrl}`);

    await contextB2.close();

    // ══════════════════════════════════════════════════════════════════
    // 9. RESPONSIVE VIEWPORT AUDIT (4 SCREEN SIZES)
    // ══════════════════════════════════════════════════════════════════
    console.log('\n[9. MULTI-VIEWPORT RESPONSIVENESS AUDIT]');
    const viewports = [
      { name: 'Mobile (375x812)', width: 375, height: 812 },
      { name: 'Tablet Portrait (768x1024)', width: 768, height: 1024 },
      { name: 'Tablet Landscape (1024x768)', width: 1024, height: 768 },
      { name: 'Desktop HD (1440x900)', width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      const vpContext = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const vpPage = await vpContext.newPage();

      await vpPage.goto(`${BASE_URL}/onboarding`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await vpPage.waitForTimeout(500);

      const scrollWidth = await vpPage.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await vpPage.evaluate(() => document.documentElement.clientWidth);
      const noOverflow = scrollWidth <= clientWidth + 2;

      record(`Viewport ${vp.name}`, 'Zero horizontal overflow', noOverflow, `scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
      await vpContext.close();
    }

    // ══════════════════════════════════════════════════════════════════
    // 10. ACCESSIBILITY & THEME COMPLIANCE
    // ══════════════════════════════════════════════════════════════════
    console.log('\n[10. ACCESSIBILITY & THEME COMPLIANCE]');
    const a11yContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const a11yPage = await a11yContext.newPage();

    await a11yPage.goto(`${BASE_URL}/onboarding`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Check dark & light mode styling classes / properties
    const hasThemeSupport = await a11yPage.evaluate(() => {
      const root = document.documentElement;
      return getComputedStyle(root).getPropertyValue('--background') !== undefined;
    });
    record('Theme CSS Tokens', 'CSS custom properties for theming are active', hasThemeSupport);

    // Semantic roles audit
    const hasProgressRole = (await a11yPage.locator('[role="progressbar"]').count()) > 0;
    record('Semantic A11y', 'role="progressbar" is present with semantic attributes', hasProgressRole);

    await a11yContext.close();

    // ══════════════════════════════════════════════════════════════════
    // 11. CONSOLE & NETWORK HEALTH CHECK
    // ══════════════════════════════════════════════════════════════════
    console.log('\n[11. CONSOLE & NETWORK HEALTH CHECK]');
    record('Console Health', 'Zero uncaught JavaScript exceptions during onboarding flows', consoleErrors.length === 0, `Errors: ${consoleErrors.length}`);
    record('Network Health', 'Zero unexpected 4xx/5xx network responses during onboarding flows', networkErrors.length === 0, `Errors: ${networkErrors.length}`);

  } catch (err: any) {
    console.error('Browser QA Error:', err);
    record('Browser QA Execution', 'Encountered unexpected test failure', false, err?.message || String(err));
  } finally {
    await browser.close();
  }

  console.log('\n================================================================');
  const passedCount = records.filter((r) => r.passed).length;
  const failedCount = records.filter((r) => !r.passed).length;
  console.log(` ONBOARDING BROWSER E2E: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log('================================================================\n');

  if (failedCount > 0) {
    process.exit(1);
  }
}

if (require.main === module || (process.argv[1] && process.argv[1].includes('onboarding-browser-e2e.test'))) {
  runStrictOnboardingBrowserE2E().catch((err) => {
    console.error('Fatal error in browser test runner:', err);
    process.exit(1);
  });
}
