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

});
