import { test, expect } from '@playwright/test'

/**
 * Smoke test: portal screens must not throw an uncaught runtime error.
 *
 * `/overview` and `/wildfire` both render with a static demo fallback even when
 * unauthenticated, so they should load cleanly with zero `pageerror` events.
 */

for (const path of ['/overview', '/wildfire']) {
  test(`no uncaught page error on ${path}`, async ({ page }) => {
    const pageErrors: string[] = []
    page.on('pageerror', (err) => pageErrors.push(err.message))

    await page.goto(path, { waitUntil: 'domcontentloaded' })

    // Let client effects / lazy chunks settle.
    await page.waitForLoadState('networkidle').catch(() => {})

    // Something real should be on screen (main landmark is always present).
    await expect(page.locator('#main-content')).toBeVisible()

    expect(pageErrors, `Uncaught errors on ${path}:\n${pageErrors.join('\n')}`).toEqual([])
  })
}
