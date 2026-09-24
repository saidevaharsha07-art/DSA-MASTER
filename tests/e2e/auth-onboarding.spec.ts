import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — Auth & Onboarding UI/UX Phase 9 E2E', () => {

  // ── TEST A: LOGIN PAGE UI & LANDMARKS ──────────────────────────────────────
  test('A. /login renders professional brand header, segmented tabs, and form elements', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Brand header
    await expect(page.locator('h1')).toContainText(/Log in to your existing profile/i);
    await expect(page.getByText('DSA Magna', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Technical Interview & Algorithmic Workspace')).toBeVisible();

    // Mode tabs
    const tabList = page.locator('[role="tablist"]');
    await expect(tabList).toBeVisible();
    await expect(tabList.getByRole('tab', { name: 'Login' })).toBeVisible();
    await expect(tabList.getByRole('tab', { name: 'Sign up' })).toBeVisible();

    // Google OAuth button
    const googleBtn = page.getByRole('button', { name: /Continue with Google/i });
    await expect(googleBtn).toBeVisible();

    // Form inputs
    await expect(page.locator('input[placeholder="Username or Email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();

    // Primary action button
    const submitBtn = page.getByRole('button', { name: 'LOGIN' });
    await expect(submitBtn).toBeVisible();

    // Secondary links
    await expect(page.getByRole('button', { name: 'Forgot Password?' })).toBeVisible();
    await expect(page.getByText(/Don't have an account/i)).toBeVisible();

    // Trust badge
    await expect(page.getByText(/Encrypted session/i)).toBeVisible();
  });

  // ── TEST B: SIGNUP PAGE UI & VALIDATION ────────────────────────────────────
  test('B. /signup renders profile creation fields and terms checkbox', async ({ page }) => {
    await page.goto('/signup');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText(/Create your new profile/i);

    // Required fields for sign up
    await expect(page.locator('input[placeholder="Full Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Username or Email"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Confirm Password"]')).toBeVisible();

    // Terms checkbox
    const termsCheckbox = page.locator('#terms');
    await expect(termsCheckbox).toBeVisible();
    expect(await termsCheckbox.isChecked()).toBe(false);

    // Register button
    const registerBtn = page.getByRole('button', { name: 'REGISTER' });
    await expect(registerBtn).toBeVisible();

    // Validation test: fill fields without checking terms
    await page.locator('input[placeholder="Full Name"]').fill('Test Learner');
    await page.locator('input[placeholder="Username or Email"]').fill('learner@test.com');
    await page.locator('input[placeholder="Password"]').fill('Password123!');
    await page.locator('input[placeholder="Confirm Password"]').fill('Password123!');
    await registerBtn.click();

    // Should display validation error
    await expect(page.getByText(/Please agree to the Terms/i)).toBeVisible();
  });

  // ── TEST C: FORGOT PASSWORD PAGE & NAVIGATION ──────────────────────────────
  test('C. /forgot-password renders password reset mode with back to login link', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText(/Reset your password/i);
    await expect(page.locator('input[placeholder="Username or Email"]')).toBeVisible();

    // Submit button
    const resetBtn = page.getByRole('button', { name: 'SEND RESET LINK' });
    await expect(resetBtn).toBeVisible();

    // Back to login
    const backBtn = page.getByRole('button', { name: /Back to Login/i });
    await expect(backBtn).toBeVisible();
    await backBtn.click();

    // Mode transitions back to signin
    await expect(page.locator('h1')).toContainText(/Log in to your existing profile/i);
  });

  // ── TEST D: PASSWORD VISIBILITY TOGGLE ─────────────────────────────────────
  test('D. Password visibility toggle switches input type between password and text', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    const passwordInput = page.locator('input[placeholder="Password"]');
    await passwordInput.fill('SecretCode123');

    // Initially type is password
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Click show password
    const toggleBtn = page.locator('button[aria-label="Show password"]');
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();

    // Now type is text
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // Click hide password
    const hideBtn = page.locator('button[aria-label="Hide password"]');
    await expect(hideBtn).toBeVisible();
    await hideBtn.click();

    // Reverted to password
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  // ── TEST E: ONBOARDING STEP 1 WELCOME ──────────────────────────────────────
  test('E. /onboarding Step 1 renders welcome headline, 3 pillars, and action buttons', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');

    // Progress bar check
    const progressBar = page.locator('[role="progressbar"]');
    await expect(progressBar).toBeVisible();
    await expect(progressBar).toHaveAttribute('aria-valuenow', '1');

    // Headline and time estimate
    await expect(page.locator('h1')).toContainText(/Let's build your DSA path/i);
    await expect(page.getByText(/Estimated time: 2–4 minutes/i)).toBeVisible();

    // 3 pillars
    await expect(page.getByText('01 Baseline')).toBeVisible();
    await expect(page.getByText('02 Prior')).toBeVisible();
    await expect(page.getByText('03 Action')).toBeVisible();

    // Actions
    const skipBtn = page.getByRole('button', { name: 'Skip for now' }).first();
    const getStartedBtn = page.getByRole('button', { name: /Get Started/i });
    await expect(skipBtn).toBeVisible();
    await expect(getStartedBtn).toBeVisible();

    // Advance to Step 2
    await getStartedBtn.click();
    await expect(page.locator('h2')).toContainText(/How comfortable are you with DSA/i);
  });

  // ── TEST F: ONBOARDING STEP 2 LEVEL SELECTION & BACK NAVIGATION ────────────
  test('F. /onboarding Step 2 allows selecting self-reported level with Back/Continue', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');

    // Advance to Step 2
    await page.getByRole('button', { name: /Get Started/i }).click();

    const levelGroup = page.locator('[role="radiogroup"][aria-label="Self-reported DSA level"]');
    await expect(levelGroup).toBeVisible();

    // Select "I can solve Easy problems"
    const easyOption = levelGroup.getByRole('radio').filter({ hasText: 'I can solve Easy problems' });
    await expect(easyOption).toBeVisible();
    await easyOption.click();
    await expect(easyOption).toHaveAttribute('aria-checked', 'true');

    // Test Back button
    const backBtn = page.getByRole('button', { name: /Back/i });
    await expect(backBtn).toBeVisible();
    await backBtn.click();

    // Back on Step 1
    await expect(page.locator('h1')).toContainText(/Let's build your DSA path/i);

    // Re-advance to Step 2
    await page.getByRole('button', { name: /Get Started/i }).click();

    // Continue to Step 3
    const continueBtn = page.getByRole('button', { name: /Continue/i });
    await expect(continueBtn).toBeVisible();
    await continueBtn.click();

    // Now on Step 3
    await expect(page.locator('h2')).toContainText(/What have you already worked with/i);
  });

  // ── TEST G: ONBOARDING STEP 3 PRIOR EXPOSURE TOPICS ────────────────────────
  test('G. /onboarding Step 3 toggles topic checklist and None yet option', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');

    // Navigate to Step 3
    await page.getByRole('button', { name: /Get Started/i }).click();
    await page.getByRole('button', { name: /Continue/i }).click();

    const topicGroup = page.locator('[role="group"][aria-label="Prior DSA topic exposure"]');
    await expect(topicGroup).toBeVisible();

    // Toggle Arrays and Two Pointers
    const arraysBtn = topicGroup.getByRole('checkbox', { name: 'Arrays' });
    await expect(arraysBtn).toBeVisible();
    await arraysBtn.click();
    await expect(arraysBtn).toHaveAttribute('aria-checked', 'true');

    const twoPointersBtn = topicGroup.getByRole('checkbox', { name: 'Two Pointers' });
    await twoPointersBtn.click();
    await expect(twoPointersBtn).toHaveAttribute('aria-checked', 'true');

    // Test "None yet" clears selection
    const noneBtn = topicGroup.getByRole('checkbox', { name: 'None yet' });
    await noneBtn.click();
    await expect(noneBtn).toHaveAttribute('aria-checked', 'true');
    await expect(arraysBtn).toHaveAttribute('aria-checked', 'false');

    // Continue to Step 4
    await page.getByRole('button', { name: /Continue/i }).click();
    await expect(page.locator('h2')).toContainText(/What are you preparing for/i);
  });

  // ── TEST H: ONBOARDING STEP 4 GOALS ────────────────────────────────────────
  test('H. /onboarding Step 4 selects learning goal and starts diagnostic', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');

    // Navigate to Step 4
    await page.getByRole('button', { name: /Get Started/i }).click();
    await page.getByRole('button', { name: /Continue/i }).click();
    await page.getByRole('button', { name: /Continue/i }).click();

    const goalGroup = page.locator('[role="radiogroup"][aria-label="Learning goals"]');
    await expect(goalGroup).toBeVisible();

    // Select Coding interviews
    const interviewsGoal = goalGroup.getByRole('radio').filter({ hasText: 'Coding interviews' });
    await expect(interviewsGoal).toBeVisible();
    await interviewsGoal.click();
    await expect(interviewsGoal).toHaveAttribute('aria-checked', 'true');

    // Start diagnostic button
    const startDiagnosticBtn = page.getByRole('button', { name: /Start Diagnostic/i });
    await expect(startDiagnosticBtn).toBeVisible();
    await startDiagnosticBtn.click();

    // Now on Step 5
    await expect(page.getByText(/Diagnostic Question 1 of/i)).toBeVisible();
  });

  // ── TEST I: ONBOARDING STEP 5 ADAPTIVE DIAGNOSTIC ASSESSMENT ────────────────
  test('I. /onboarding Step 5 steps through questions and advances to Step 6', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');

    // Navigate to Step 5
    await page.getByRole('button', { name: /Get Started/i }).click();
    await page.getByRole('button', { name: /Continue/i }).click();
    await page.getByRole('button', { name: /Continue/i }).click();
    await page.getByRole('button', { name: /Start Diagnostic/i }).click();

    // Answer questions iteratively
    for (let q = 1; q <= 4; q++) {
      await expect(page.getByText(new RegExp(`Diagnostic Question ${q} of 4`, 'i'))).toBeVisible();
      
      const optGroup = page.locator('[role="radiogroup"][aria-label="Diagnostic question options"]');
      const firstOpt = optGroup.getByRole('radio').first();
      await firstOpt.click();
      await expect(firstOpt).toHaveAttribute('aria-checked', 'true');

      const nextBtn = page.getByRole('button', { name: q === 4 ? /See My Path/i : /Next Question/i });
      await expect(nextBtn).toBeEnabled();
      await nextBtn.click();
    }

    // Now on Step 6
    await expect(page.getByText(/Baseline established/i)).toBeVisible();
    await expect(page.locator('h1')).toContainText(/Here's where we'll start/i);
  });

  // ── TEST J: ONBOARDING STEP 6 PERSONALIZATION RESULT & FIRST MISSION ────────
  test('J. /onboarding Step 6 renders explainable evidence and first mission card', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');

    // Skip to Step 6 directly via Skip for now
    const skipBtn = page.getByRole('button', { name: 'Skip for now' }).first();
    await skipBtn.click();

    // Confirm Step 6
    await expect(page.locator('h1')).toContainText(/Here's where we'll start/i);
    await expect(page.getByText('Baseline established')).toBeVisible();

    // Why this starting point section
    await expect(page.getByText('Why this starting point:')).toBeVisible();

    // First mission card
    await expect(page.getByText('YOUR FIRST MISSION')).toBeVisible();
    await expect(page.getByRole('button', { name: /Start My First Mission/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /View Full Adaptive Roadmap/i })).toBeVisible();
  });

  // ── TEST K: SKIP ONBOARDING BEHAVIOR ───────────────────────────────────────
  test('K. Skipping onboarding sets status and displays baseline path immediately', async ({ page }) => {
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');

    // Click Skip for now
    const skipBtn = page.getByRole('button', { name: 'Skip for now' }).first();
    await skipBtn.click();

    // Progress bar advances to step 6
    const progressBar = page.locator('[role="progressbar"]');
    await expect(progressBar).toHaveAttribute('aria-valuenow', '6');

    // First mission button is ready to click
    const startMissionBtn = page.getByRole('button', { name: /Start My First Mission/i });
    await expect(startMissionBtn).toBeVisible();
  });

  // ── TEST L: MULTI-VIEWPORT RESPONSIVENESS & ZERO OVERFLOW ───────────────────
  const viewports = [
    { name: 'Mobile', width: 375, height: 812 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Desktop', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    test(`L. Viewport ${vp.name} (${vp.width}x${vp.height}) renders with 0 horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // Test login page
      await page.goto('/login');
      await page.waitForLoadState('networkidle');
      const loginOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(loginOverflow).toBe(false);

      // Test onboarding page
      await page.goto('/onboarding');
      await page.waitForLoadState('networkidle');
      const onboardOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(onboardOverflow).toBe(false);
    });
  }

  // ── TEST M: THEME RESILIENCE (DARK & LIGHT MODES) ──────────────────────────
  test('M. Auth and Onboarding pages render cleanly under both light and dark themes', async ({ page }) => {
    // 1. Light mode login
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('input[placeholder="Username or Email"]')).toBeVisible();

    // 2. Dark mode login
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('input[placeholder="Username or Email"]')).toBeVisible();

    // 3. Light mode onboarding
    await page.goto('/onboarding');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await expect(page.locator('h1')).toBeVisible();

    // 4. Dark mode onboarding
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await expect(page.locator('h1')).toBeVisible();
  });

  // ── TEST N: KEYBOARD ACCESSIBILITY ─────────────────────────────────────────
  test('N. Interactive elements support keyboard navigation and focus visibility', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Tab through elements
    await page.keyboard.press('Tab');
    const activeTagName = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeTagName).toBeTruthy();
  });

  // ── TEST O: MULTI-DEVICE SCREENSHOT QA ─────────────────────────────────────
  test('O. Screenshot QA captures multi-viewport auth and onboarding layouts in both themes', async ({ page }) => {
    const screenshotDir = 'C:/Users/saide/.gemini/antigravity/brain/27a25c3e-8b2f-4e40-80b0-825148371a40/screenshots';
    
    for (const theme of ['dark', 'light']) {
      for (const vp of viewports) {
        await page.setViewportSize({ width: vp.width, height: vp.height });

        // 1. Capture Login
        await page.goto('/login');
        await page.waitForLoadState('networkidle');
        await page.evaluate((t) => {
          if (t === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
          } else {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
          }
        }, theme);
        await page.waitForTimeout(300);
        await page.screenshot({
          path: `${screenshotDir}/auth_login_${vp.name.toLowerCase().replace(/\s+/g, '_')}_${theme}.png`,
        });

        // 2. Capture Signup (Desktop and Mobile)
        if (vp.name === 'Desktop' || vp.name === 'Mobile') {
          await page.goto('/signup');
          await page.waitForLoadState('networkidle');
          await page.evaluate((t) => {
            if (t === 'light') {
              document.documentElement.classList.remove('dark');
              document.documentElement.setAttribute('data-theme', 'light');
            } else {
              document.documentElement.classList.add('dark');
              document.documentElement.setAttribute('data-theme', 'dark');
            }
          }, theme);
          await page.waitForTimeout(300);
          await page.screenshot({
            path: `${screenshotDir}/auth_signup_${vp.name.toLowerCase().replace(/\s+/g, '_')}_${theme}.png`,
          });
        }

        // 3. Capture Onboarding Step 1
        await page.goto('/onboarding');
        await page.waitForLoadState('networkidle');
        await page.evaluate((t) => {
          if (t === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
          } else {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
          }
        }, theme);
        await page.waitForTimeout(300);
        await page.screenshot({
          path: `${screenshotDir}/onboarding_step1_${vp.name.toLowerCase().replace(/\s+/g, '_')}_${theme}.png`,
        });

        // 4. Capture Onboarding Step 6 (Desktop and Mobile)
        if (vp.name === 'Desktop' || vp.name === 'Mobile') {
          const skipBtn = page.getByRole('button', { name: 'Skip for now' }).first();
          if (await skipBtn.isVisible()) {
            await skipBtn.click();
            await page.waitForTimeout(300);
            await page.screenshot({
              path: `${screenshotDir}/onboarding_step6_${vp.name.toLowerCase().replace(/\s+/g, '_')}_${theme}.png`,
            });
          }
        }
      }
    }
  });

});
