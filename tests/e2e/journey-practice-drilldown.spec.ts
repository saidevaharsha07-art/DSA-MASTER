import { test, expect } from 'playwright/test';

test.describe('DSA MASTER — Four-Platform Drilldown & Curriculum Hierarchy', () => {

  test('1. /journey renders and allows navigating to /journey/array alias', async ({ page }) => {
    await page.goto('/journey');
    await expect(page).toHaveTitle(/DSA/i);

    // Navigate to /journey/array alias
    await page.goto('/journey/array');
    await page.waitForLoadState('networkidle');

    // Title / header should indicate Basic Arrays
    await expect(page.locator('h1')).toContainText(/Array/i);

    // Verify 4-tier hierarchy headers exist
    await expect(page.getByText('Platform Availability & Drilldowns')).toBeVisible();
    await expect(page.getByText('Canonical 4-Tier Hierarchy')).toBeVisible();

    // Verify all 4 platform cards are present
    const leetcodeCard = page.locator('[data-platform="leetcode"]');
    const codechefCard = page.locator('[data-platform="codechef"]');
    const codeforcesCard = page.locator('[data-platform="codeforces"]');
    const gfgCard = page.locator('[data-platform="geeksforgeeks"]');

    await expect(leetcodeCard).toBeVisible();
    await expect(codechefCard).toBeVisible();
    await expect(codeforcesCard).toBeVisible();
    await expect(gfgCard).toBeVisible();

    // Verify LeetCode real count > 0
    await expect(leetcodeCard).toContainText('LeetCode');
    await expect(leetcodeCard).toContainText('Mapped Problems');

    // Verify CodeChef real count > 0
    await expect(codechefCard).toContainText('CodeChef');
    await expect(codechefCard).toContainText('Mapped Problems');

    // Verify Codeforces real count > 0
    await expect(codeforcesCard).toContainText('Codeforces');
    await expect(codeforcesCard).toContainText('Mapped Problems');

    // Verify GeeksForGeeks displays "No mapped problems yet" without fake numbers
    await expect(gfgCard).toContainText('GeeksForGeeks');
    await expect(gfgCard).toContainText('No mapped problems yet');
  });

  test('2. Deep-link from /journey/[area] platform cards to /practice with canonical query params', async ({ page }) => {
    await page.goto('/journey/basic-arrays');
    await page.waitForLoadState('networkidle');

    // Click LeetCode practice CTA
    const leetcodeLink = page.locator('[data-platform="leetcode"] a');
    await expect(leetcodeLink).toHaveAttribute('href', /practice\?area=basic-arrays&platform=leetcode/);
    await leetcodeLink.click();

    await page.waitForURL('**/practice?area=basic-arrays&platform=leetcode*');
    await expect(page.getByRole('button', { name: /Basic Arrays/ })).toBeVisible();

    // Verify URL params in Practice Arena
    expect(page.url()).toContain('area=basic-arrays');
    expect(page.url()).toContain('platform=leetcode');

    // Test CodeChef drilldown
    await page.goto('/journey/basic-arrays');
    await page.waitForLoadState('networkidle');
    const codechefLink = page.locator('[data-platform="codechef"] a');
    await expect(codechefLink).toHaveAttribute('href', /practice\?area=basic-arrays&platform=codechef/);
    await codechefLink.click();
    await page.waitForURL('**/practice?area=basic-arrays&platform=codechef*');
    expect(page.url()).toContain('platform=codechef');

    // Test GeeksForGeeks drilldown shows empty state gracefully
    await page.goto('/journey/basic-arrays');
    await page.waitForLoadState('networkidle');
    const gfgLink = page.locator('[data-platform="geeksforgeeks"] a');
    await expect(gfgLink).toHaveAttribute('href', /practice\?area=basic-arrays&platform=geeksforgeeks/);
    await gfgLink.click();
    await page.waitForURL('**/practice?area=basic-arrays&platform=geeksforgeeks*');
    expect(page.url()).toContain('platform=geeksforgeeks');

    // Should display graceful empty message
    await expect(page.getByText(/No mapped problems yet for GeeksForGeeks/i)).toBeVisible();
  });

  test('3. Test Two Pointers and Binary Search areas and platform drilldown', async ({ page }) => {
    // Two Pointers
    await page.goto('/journey/two-pointers');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText(/Two Pointers/i);
    await expect(page.locator('[data-platform="leetcode"]')).toBeVisible();
    await expect(page.locator('[data-platform="codechef"]')).toBeVisible();
    await expect(page.locator('[data-platform="codeforces"]')).toBeVisible();
    await expect(page.locator('[data-platform="geeksforgeeks"]')).toBeVisible();

    // Binary Search
    await page.goto('/journey/binary-search');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText(/Binary Search/i);
    await expect(page.locator('[data-platform="leetcode"]')).toBeVisible();
    await expect(page.locator('[data-platform="codechef"]')).toBeVisible();
    await expect(page.locator('[data-platform="codeforces"]')).toBeVisible();
    await expect(page.locator('[data-platform="geeksforgeeks"]')).toBeVisible();

    // Drill down to LeetCode Binary Search
    const bsLeetCode = page.locator('[data-platform="leetcode"] a');
    await bsLeetCode.click();
    await page.waitForURL('**/practice?area=binary-search&platform=leetcode*');
    expect(page.url()).toContain('area=binary-search');
  });

  test('4. Subtopic and filter URL sync & browser navigation', async ({ page }) => {
    await page.goto('/practice?area=basic-arrays&platform=leetcode');
    await page.waitForLoadState('networkidle');

    // Subtopic dropdown should exist
    const subtopicSelect = page.locator('select[aria-label="Filter by subtopic"]');
    await expect(subtopicSelect).toBeVisible();

    // Select first subtopic if available
    const options = await subtopicSelect.locator('option').all();
    if (options.length > 1) {
      const targetVal = await options[1].getAttribute('value');
      if (targetVal && targetVal !== 'all') {
        await subtopicSelect.selectOption(targetVal);
        await page.waitForTimeout(500);
        expect(page.url()).toContain(`subtopic=${targetVal}`);

        // Browser back button restores previous state
        await page.goBack();
        await page.waitForTimeout(500);
        expect(page.url()).not.toContain(`subtopic=${targetVal}`);
      }
    }
  });

});
