import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — GeeksForGeeks Curriculum Drilldown & Integration E2E', () => {

  // ── 1. Journey -> Array -> GeeksForGeeks -> Practice ───────────────────────
  test('1. Journey -> Array -> GeeksForGeeks -> Practice', async ({ page }) => {
    await page.goto('/journey/basic-arrays');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText(/Array/i);

    const gfgCard = page.locator('[data-platform="geeksforgeeks"]');
    await expect(gfgCard).toBeVisible();
    await expect(gfgCard).toContainText('GeeksForGeeks');
    await expect(gfgCard).toContainText('80'); // 80 mapped GFG problems

    const cta = gfgCard.locator('a');
    await expect(cta).toHaveAttribute('href', '/practice?area=basic-arrays&platform=geeksforgeeks');
    await cta.click();

    await page.waitForURL((url) =>
      url.pathname.includes('/practice') &&
      url.searchParams.get('platform') === 'geeksforgeeks' &&
      url.searchParams.get('area') === 'basic-arrays'
    );
    expect(page.url()).toContain('area=basic-arrays');
    expect(page.url()).toContain('platform=geeksforgeeks');

    // Verify GFG problem rows rendered
    await expect(page.locator('text=GeeksForGeeks').first()).toBeVisible();

    // Verify subtopic filter
    const subtopicSelect = page.locator('select[aria-label="Filter by subtopic"]');
    if (await subtopicSelect.isVisible()) {
      await subtopicSelect.selectOption({ index: 1 });
      await page.waitForTimeout(300);
      expect(page.url()).toContain('subtopic=');
    }

    // Refresh preserves URL state
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('area=basic-arrays');
    expect(page.url()).toContain('platform=geeksforgeeks');

    // Back / Forward preserves URL state
    await page.goBack();
    await page.waitForTimeout(300);
    await page.goForward();
    await page.waitForTimeout(300);
    expect(page.url()).toContain('area=basic-arrays');
    expect(page.url()).toContain('platform=geeksforgeeks');
  });

  // ── 2. Journey -> Prefix Sum -> GeeksForGeeks -> Practice ──────────────────
  test('2. Journey -> Prefix Sum -> GeeksForGeeks -> Practice', async ({ page }) => {
    await page.goto('/journey/prefix-sum');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText(/Prefix Sum/i);

    const gfgCard = page.locator('[data-platform="geeksforgeeks"]');
    await expect(gfgCard).toBeVisible();
    await expect(gfgCard).toContainText('25'); // 25 mapped GFG problems

    const cta = gfgCard.locator('a');
    await expect(cta).toHaveAttribute('href', '/practice?area=prefix-sum&platform=geeksforgeeks');
    await cta.click();

    await page.waitForURL((url) =>
      url.pathname.includes('/practice') &&
      url.searchParams.get('platform') === 'geeksforgeeks' &&
      url.searchParams.get('area') === 'prefix-sum'
    );
    expect(page.url()).toContain('area=prefix-sum');
    expect(page.url()).toContain('platform=geeksforgeeks');

    await expect(page.locator('text=GeeksForGeeks').first()).toBeVisible();

    // Refresh preserves state
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('area=prefix-sum');
    expect(page.url()).toContain('platform=geeksforgeeks');
  });

  // ── 3. Journey -> Binary Search -> GeeksForGeeks -> Practice ───────────────
  test('3. Journey -> Binary Search -> GeeksForGeeks -> Practice', async ({ page }) => {
    await page.goto('/journey/binary-search');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText(/Binary Search/i);

    const gfgCard = page.locator('[data-platform="geeksforgeeks"]');
    await expect(gfgCard).toBeVisible();
    await expect(gfgCard).toContainText('50'); // 50 mapped GFG problems

    const cta = gfgCard.locator('a');
    await expect(cta).toHaveAttribute('href', '/practice?area=binary-search&platform=geeksforgeeks');
    await cta.click();

    await page.waitForURL((url) =>
      url.pathname.includes('/practice') &&
      url.searchParams.get('platform') === 'geeksforgeeks' &&
      url.searchParams.get('area') === 'binary-search'
    );
    expect(page.url()).toContain('area=binary-search');
    expect(page.url()).toContain('platform=geeksforgeeks');

    await expect(page.locator('text=GeeksForGeeks').first()).toBeVisible();

    // Refresh preserves state
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('area=binary-search');
    expect(page.url()).toContain('platform=geeksforgeeks');
  });

  // ── 4. Journey -> Dynamic Programming -> GeeksForGeeks -> Practice ──────────
  test('4. Journey -> Dynamic Programming -> GeeksForGeeks -> Practice', async ({ page }) => {
    await page.goto('/journey/dynamic-programming');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText(/Dynamic Programming/i);

    const gfgCard = page.locator('[data-platform="geeksforgeeks"]');
    await expect(gfgCard).toBeVisible();
    await expect(gfgCard).toContainText('72'); // 72 mapped GFG problems

    const cta = gfgCard.locator('a');
    await expect(cta).toHaveAttribute('href', '/practice?area=dynamic-programming&platform=geeksforgeeks');
    await cta.click();

    await page.waitForURL((url) =>
      url.pathname.includes('/practice') &&
      url.searchParams.get('platform') === 'geeksforgeeks' &&
      url.searchParams.get('area') === 'dynamic-programming'
    );
    expect(page.url()).toContain('area=dynamic-programming');
    expect(page.url()).toContain('platform=geeksforgeeks');

    await expect(page.locator('text=GeeksForGeeks').first()).toBeVisible();

    // Refresh preserves state
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('area=dynamic-programming');
    expect(page.url()).toContain('platform=geeksforgeeks');
  });

});
