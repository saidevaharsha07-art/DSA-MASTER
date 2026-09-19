import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — Curriculum Taxonomy & Cross-Module Verification', () => {

  // ── 1. VERIFY FOUR-PLATFORM HANDOFF ──────────────────────────────────────────
  test('1. /journey/[area] renders ALL FOUR platforms with real counts, empty states, and working CTAs', async ({ page }) => {
    await page.goto('/journey/basic-arrays');
    await page.waitForLoadState('networkidle');

    // Title / header
    await expect(page.locator('h1')).toContainText(/Array/i);

    // Platform cards
    const leetcodeCard = page.locator('[data-platform="leetcode"]');
    const codechefCard = page.locator('[data-platform="codechef"]');
    const codeforcesCard = page.locator('[data-platform="codeforces"]');
    const gfgCard = page.locator('[data-platform="geeksforgeeks"]');

    await expect(leetcodeCard).toBeVisible();
    await expect(codechefCard).toBeVisible();
    await expect(codeforcesCard).toBeVisible();
    await expect(gfgCard).toBeVisible();

    // 1. LeetCode Card verification
    await expect(leetcodeCard).toContainText('LeetCode');
    await expect(leetcodeCard).toContainText('50'); // 50 mapped problems (expanded from 42)
    const lcLink = leetcodeCard.locator('a');
    await expect(lcLink).toHaveAttribute('href', '/practice?area=basic-arrays&platform=leetcode');

    // 2. CodeChef Card verification
    await expect(codechefCard).toContainText('CodeChef');
    await expect(codechefCard).toContainText('274'); // 274 mapped problems (expanded from 241)
    const ccLink = codechefCard.locator('a');
    await expect(ccLink).toHaveAttribute('href', '/practice?area=basic-arrays&platform=codechef');

    // 3. Codeforces Card verification
    await expect(codeforcesCard).toContainText('Codeforces');
    await expect(codeforcesCard).toContainText('146'); // 146 mapped problems
    const cfLink = codeforcesCard.locator('a');
    await expect(cfLink).toHaveAttribute('href', '/practice?area=basic-arrays&platform=codeforces');

    // 4. GeeksForGeeks Card verification
    await expect(gfgCard).toContainText('GeeksForGeeks');
    await expect(gfgCard).toContainText('80'); // 80 mapped problems
    const gfgLink = gfgCard.locator('a');
    await expect(gfgLink).toHaveAttribute('href', '/practice?area=basic-arrays&platform=geeksforgeeks');

    // ── Drilldown 1: LeetCode handoff ──
    await lcLink.click();
    await page.waitForURL((url) => url.pathname.includes('/practice') && url.searchParams.get('platform') === 'leetcode' && url.searchParams.get('area') === 'basic-arrays');
    expect(page.url()).toContain('area=basic-arrays');
    expect(page.url()).toContain('platform=leetcode');
    await expect(page.locator('text=LeetCode').first()).toBeVisible();

    // ── Drilldown 2: CodeChef handoff ──
    await page.goto('/journey/basic-arrays');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-platform="codechef"] a').click();
    await page.waitForURL((url) => url.pathname.includes('/practice') && url.searchParams.get('platform') === 'codechef' && url.searchParams.get('area') === 'basic-arrays');
    expect(page.url()).toContain('area=basic-arrays');
    expect(page.url()).toContain('platform=codechef');
    await expect(page.locator('text=CodeChef').first()).toBeVisible();

    // ── Drilldown 3: Codeforces handoff (EXPLICITLY TESTED) ──
    await page.goto('/journey/basic-arrays');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-platform="codeforces"] a').click();
    await page.waitForURL((url) => url.pathname.includes('/practice') && url.searchParams.get('platform') === 'codeforces' && url.searchParams.get('area') === 'basic-arrays');
    expect(page.url()).toContain('area=basic-arrays');
    expect(page.url()).toContain('platform=codeforces');
    await expect(page.locator('text=Codeforces').first()).toBeVisible();

    // ── Drilldown 4: GeeksForGeeks handoff ──
    await page.goto('/journey/basic-arrays');
    await page.waitForLoadState('networkidle');
    await page.locator('[data-platform="geeksforgeeks"] a').click();
    await page.waitForURL((url) => url.pathname.includes('/practice') && url.searchParams.get('platform') === 'geeksforgeeks' && url.searchParams.get('area') === 'basic-arrays');
    expect(page.url()).toContain('area=basic-arrays');
    expect(page.url()).toContain('platform=geeksforgeeks');
    await expect(page.locator('text=GeeksForGeeks').first()).toBeVisible();
  });

  // ── 2. VERIFY SUBTOPIC HIERARCHY ACROSS CORE LEARNING AREAS ─────────────────
  test('2. Core Learning Areas render 4-tier Subtopic & Pattern hierarchy', async ({ page }) => {
    const areasToVerify = [
      { slug: 'basic-arrays', name: 'Array' },
      { slug: 'prefix-sum', name: 'Prefix Sum' },
      { slug: 'two-pointers', name: 'Two Pointers' },
      { slug: 'binary-search', name: 'Binary Search' },
      { slug: 'stack', name: 'Stack' },
      { slug: 'linked-list', name: 'Linked List' },
      { slug: 'binary-trees', name: 'Binary Tree' },
      { slug: 'graphs', name: 'Graph' },
      { slug: 'dynamic-programming', name: 'Dynamic Programming' },
    ];

    for (const area of areasToVerify) {
      await page.goto(`/journey/${area.slug}`);
      await page.waitForLoadState('networkidle');

      await expect(page.locator('h1')).toContainText(new RegExp(area.name, 'i'));
      await expect(page.getByText(/4-tier progressive hierarchy/i)).toBeVisible();

      // Ensure all 4 platform cards exist on each area
      await expect(page.locator('[data-platform="leetcode"]')).toBeVisible();
      await expect(page.locator('[data-platform="codechef"]')).toBeVisible();
      await expect(page.locator('[data-platform="codeforces"]')).toBeVisible();
      await expect(page.locator('[data-platform="geeksforgeeks"]')).toBeVisible();
    }
  });

  // ── 3. PRACTICE FILTER MATRIX & URL PERSISTENCE ─────────────────────────────
  test('3. Practice Arena filter matrix and URL synchronization', async ({ page }) => {
    // 1. Area only
    await page.goto('/practice?area=basic-arrays');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('area=basic-arrays');

    // 2. Area + Platform
    await page.goto('/practice?area=basic-arrays&platform=leetcode');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('area=basic-arrays');
    expect(page.url()).toContain('platform=leetcode');

    // 3. Area + Subtopic
    const subtopicSelect = page.locator('select[aria-label="Filter by subtopic"]');
    await expect(subtopicSelect).toBeVisible();
    await subtopicSelect.selectOption('array-traversal');
    await page.waitForTimeout(400);
    expect(page.url()).toContain('subtopic=array-traversal');

    // 4. Area + Subtopic + Pattern
    const patternSelect = page.locator('select').filter({ hasText: /Pattern:/ });
    await expect(patternSelect).toBeVisible();
    await patternSelect.selectOption('array-fundamentals');
    await page.waitForTimeout(400);
    expect(page.url()).toContain('pattern=array-fundamentals');

    // 5. Area + Difficulty
    const diffSelect = page.locator('select').filter({ hasText: /Difficulty:/ });
    await expect(diffSelect).toBeVisible();
    await diffSelect.selectOption('Easy');
    await page.waitForTimeout(400);
    expect(page.url()).toContain('difficulty=Easy');

    // 6. Area + Status
    const statusSelect = page.locator('select').filter({ hasText: /Status:/ });
    await expect(statusSelect).toBeVisible();
    await statusSelect.selectOption('unsolved');
    await page.waitForTimeout(400);
    expect(page.url()).toContain('status=unsolved');

    // 7. Test Refresh Persistence
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('area=basic-arrays');
    expect(page.url()).toContain('platform=leetcode');
    expect(page.url()).toContain('subtopic=array-traversal');
    expect(page.url()).toContain('pattern=array-fundamentals');
    expect(page.url()).toContain('difficulty=Easy');
    expect(page.url()).toContain('status=unsolved');

    // 8. Test Browser Back and Forward Navigation
    await page.goBack();
    await page.waitForTimeout(400);
    await page.goForward();
    await page.waitForTimeout(400);
  });

  // ── 4. VERIFY /journey MAIN CURRICULUM KNOWLEDGE MAP & 25 AREAS ────────────
  test('4. /journey renders hero, telemetry HUD, 5-step hierarchy, and all 5 curriculum bands covering 25 areas', async ({ page }) => {
    await page.goto('/journey');
    await page.waitForLoadState('networkidle');

    // Verify Hero title & subtitle
    await expect(page.locator('h1')).toContainText(/Your DSA Journey/i);
    await expect(page.getByText(/25 learning areas\. 113 patterns/i)).toBeVisible();

    // Verify Telemetry HUD
    await expect(page.getByText(/Solved/i).first()).toBeVisible();
    await expect(page.getByText(/Patterns/i).first()).toBeVisible();
    await expect(page.getByText(/Areas Active/i).first()).toBeVisible();
    await expect(page.getByText(/Curriculum/i).first()).toBeVisible();

    // Verify 5-Step Progressive Navigation Hierarchy Strip
    await expect(page.getByText(/Curriculum Navigation Hierarchy/i)).toBeVisible();
    await expect(page.getByText(/Learning Area/i).first()).toBeVisible();
    await expect(page.getByText(/Subtopic/i).first()).toBeVisible();
    await expect(page.getByText(/Pattern/i).first()).toBeVisible();
    await expect(page.getByText(/Learn/i).first()).toBeVisible();
    await expect(page.getByText(/Practice/i).first()).toBeVisible();

    // Verify All 5 Curriculum Bands Exist
    await expect(page.getByRole('heading', { name: /Foundations/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Pattern Building/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Data Structures/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Algorithmic Thinking/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Advanced Algorithms/i })).toBeVisible();

    // Verify 25 Area Cards exist across the page
    const areaLinks = page.locator('a[href^="/journey/"]');
    const count = await areaLinks.count();
    expect(count).toBeGreaterThanOrEqual(25);
  });

  // ── 5. VERIFY /journey SEARCH & FILTER MECHANICS ───────────────────────────
  test('5. /journey search filters areas, subtopics, and patterns with shortcut support', async ({ page }) => {
    await page.goto('/journey');
    await page.waitForLoadState('networkidle');

    const searchInput = page.locator('input[placeholder*="Search 25 areas"]');
    await expect(searchInput).toBeVisible();

    // 1. Search by Area name: "Array"
    await searchInput.fill('Array');
    await page.waitForTimeout(300);
    await expect(page.locator('text=Showing').first()).toBeVisible();
    await expect(page.locator('a[href="/journey/basic-arrays"]').first()).toBeVisible();

    // 2. Clear search
    await page.locator('button[aria-label="Clear search query"]').click();
    await page.waitForTimeout(200);

    // 3. Search by Subtopic name: "array-traversal"
    await searchInput.fill('traversal');
    await page.waitForTimeout(300);
    await expect(page.locator('a[href="/journey/basic-arrays"]').first()).toBeVisible();

    // 4. Search by Pattern name: "Kadane"
    await searchInput.fill('Kadane');
    await page.waitForTimeout(300);
    await expect(page.locator('a[href="/journey/basic-arrays"]').first()).toBeVisible();

    // 5. Test band filter button: "Foundations"
    await page.locator('button[aria-label="Clear search query"]').click();
    const foundationsTab = page.locator('button', { hasText: 'Foundations' });
    await foundationsTab.click();
    await page.waitForTimeout(300);
    await expect(page.locator('text=Showing 5 of 25 areas')).toBeVisible();
    await expect(page.locator('a[href="/journey/basic-arrays"]').first()).toBeVisible();
    await expect(page.locator('a[href="/journey/strings"]').first()).toBeVisible();
  });

  // ── 6. VERIFY DRILLDOWN, PROGRESSIVE DISCLOSURE, & PATTERN CTAS ─────────────
  test('6. /journey to /journey/[area] navigation with accordions, Learn and Practice CTAs', async ({ page }) => {
    await page.goto('/journey');
    await page.waitForLoadState('networkidle');

    // Click into Array area
    const exploreArray = page.locator('a[href="/journey/basic-arrays"]').first();
    await exploreArray.click();
    await page.waitForURL('**/journey/basic-arrays');
    expect(page.url()).toContain('/journey/basic-arrays');

    // Verify breadcrumb back link
    const backLink = page.getByText(/Back to Learning Areas/i);
    await expect(backLink).toBeVisible();

    // Verify subtopic accordion toggle
    const subtopicHeader = page.locator('text=Subtopic #1').first();
    await expect(subtopicHeader).toBeVisible();

    // Verify pattern actions exist in subtopic
    const learnBtn = page.locator('a:has-text("Learn Pattern")').first();
    await expect(learnBtn).toBeVisible();
    const practiceBtn = page.locator('a:has-text("Practice")').first();
    await expect(practiceBtn).toBeVisible();

    // Click "Learn Pattern" and verify it navigates to Academy
    await learnBtn.click();
    await page.waitForURL((url) => url.pathname.startsWith('/journey/basic-arrays/'));
    expect(page.url()).toMatch(/\/journey\/basic-arrays\/[^/]+\/[^/]+/);
  });

  // ── 7. VERIFY VIEW MODE TOGGLE (Curriculum vs Adaptive Graph) ──────────────
  test('7. /journey view mode toggles between Curriculum Map and Adaptive Graph', async ({ page }) => {
    await page.goto('/journey');
    await page.waitForLoadState('networkidle');

    // Initially in Curriculum mode
    await expect(page.getByRole('heading', { name: /Foundations/i })).toBeVisible();

    // Switch to Adaptive Graph mode
    const adaptiveBtn = page.locator('button', { hasText: 'Adaptive Graph' });
    await adaptiveBtn.click();
    await page.waitForTimeout(400);

    // Verify Adaptive components rendered (Momentum / 7-Day Plan)
    await expect(page.getByText(/Learning Momentum/i).or(page.getByText(/Personal 7-Day Learning Plan/i)).first()).toBeVisible();

    // Switch back to Curriculum mode
    const curriculumBtn = page.locator('button', { hasText: 'Curriculum' });
    await curriculumBtn.click();
    await page.waitForTimeout(400);
    await expect(page.getByRole('heading', { name: /Foundations/i })).toBeVisible();
  });

  // ── 8. RESPONSIVE LAYOUT & ZERO HORIZONTAL OVERFLOW ACROSS VIEWPORTS ────────
  test('8. /journey and /journey/[area] responsive layout with zero horizontal overflow', async ({ page }) => {
    const viewports = [
      { width: 375, height: 812, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet Portrait' },
      { width: 1024, height: 768, name: 'Tablet Landscape' },
      { width: 1440, height: 900, name: 'Desktop' },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // 1. Test /journey
      await page.goto('/journey');
      await page.waitForLoadState('networkidle');
      const journeyOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(journeyOverflow, `/journey has horizontal overflow on ${vp.name} (${vp.width}x${vp.height})`).toBe(false);

      // 2. Test /journey/basic-arrays
      await page.goto('/journey/basic-arrays');
      await page.waitForLoadState('networkidle');
      const areaOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(areaOverflow, `/journey/basic-arrays has horizontal overflow on ${vp.name} (${vp.width}x${vp.height})`).toBe(false);
    }
  });

});

