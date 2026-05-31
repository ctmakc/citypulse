import { test, expect } from '@playwright/test'

/**
 * Public /report page (no auth, no portal chrome).
 *
 * Submitting hits the public POST /reports311 endpoint. When the backend is up
 * it returns a real trackingCode; the page also has a client-side fallback code,
 * so a success state appears either way. We assert the success heading + that a
 * tracking code is shown, then exercise the Track tab.
 */

test.describe('Public 311 report', () => {
  test('submit a report and see a tracking code, then switch to Track', async ({ page }) => {
    await page.goto('/report')

    // Page heading + the two-mode tablist.
    await expect(page.getByRole('heading', { name: /Report a problem in your city/i })).toBeVisible()
    await expect(page.getByRole('tab', { name: /Submit a report/i })).toBeVisible()

    // 1) Pick a category (toggle button with aria-pressed).
    const pothole = page.getByRole('button', { name: 'Pothole', exact: true })
    await pothole.click()
    await expect(pothole).toHaveAttribute('aria-pressed', 'true')

    // 2) Fill the location.
    await page.locator('#loc').fill('Main St & 1st Ave, Riverside')

    // 3) Choose a severity. The severity pills live in a group labelled
    // "Severity"; scope to it to avoid matching the category buttons.
    const severityGroup = page.getByRole('group', { name: 'Severity' })
    const high = severityGroup.getByRole('button', { name: /High/i })
    await high.click()
    await expect(high).toHaveAttribute('aria-pressed', 'true')

    // 4) Submit.
    await page.getByRole('button', { name: /Submit report/i }).click()

    // Success state: heading + tracking-code panel.
    await expect(page.getByRole('heading', { name: /report received/i })).toBeVisible({ timeout: 15_000 })
    await expect(page.getByText('Your tracking code', { exact: true })).toBeVisible()

    // The success card offers a "Track this report" action that jumps to the
    // Track tab pre-filled. Switching modes is the "switch to Track tab" step.
    await page.getByRole('button', { name: /Track this report/i }).click()

    // Now on the Track view: heading flips and the Track tab is selected.
    await expect(page.getByRole('heading', { name: /Track your report/i })).toBeVisible()
    await expect(page.getByRole('tab', { name: /Track a report/i })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    // The tracking-code input is present.
    await expect(page.locator('#track')).toBeVisible()
  })

  test('can switch to the Track tab directly from the toggle', async ({ page }) => {
    await page.goto('/report')

    await page.getByRole('tab', { name: /Track a report/i }).click()
    await expect(page.getByRole('heading', { name: /Track your report/i })).toBeVisible()
    await expect(page.locator('#track')).toBeVisible()
    // Empty-state prompt before any lookup.
    await expect(page.getByText(/Look up a report/i)).toBeVisible()
  })
})
