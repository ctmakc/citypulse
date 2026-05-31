import { test, expect } from '@playwright/test'
import { ADMIN_EMAIL, ADMIN_PASSWORD } from './helpers'

/**
 * /login → real backend auth → /overview portal.
 *
 * The form ships pre-filled with the demo credentials; we set them explicitly
 * so the test documents what it signs in with.
 */

test.describe('Authentication', () => {
  test('logs in and lands on the Overview portal', async ({ page }) => {
    await page.goto('/login')

    await expect(page.getByRole('heading', { name: /^Sign in$/i })).toBeVisible()

    await page.locator('#login-email').fill(ADMIN_EMAIL)
    await page.locator('#login-password').fill(ADMIN_PASSWORD)
    await page.getByRole('button', { name: /sign in/i }).click()

    // Successful login routes to /overview.
    await page.waitForURL('**/overview', { timeout: 20_000 })

    // Overview content.
    await expect(
      page.getByRole('heading', { name: /This morning in Meridian/i }).first(),
    ).toBeVisible()

    // Portal sidebar (the primary navigation landmark) with its key items.
    const sidebar = page.locator('#primary-navigation')
    await expect(sidebar).toBeVisible()
    await expect(sidebar.getByRole('button', { name: /^Overview$/ })).toBeVisible()
    await expect(sidebar.getByRole('button', { name: /^Assets$/ })).toBeVisible()
  })
})
