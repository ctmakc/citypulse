import { expect, type Page } from '@playwright/test'

export const ADMIN_EMAIL = 'admin@meridian.city'
export const ADMIN_PASSWORD = 'citypulse2026'

/**
 * Log in through the real /login UI. On success the app stores a JWT in
 * localStorage and routes to /overview. We wait for that URL so callers land
 * on an authenticated portal page. The login form is pre-filled with the demo
 * credentials, but we set them explicitly so the test is self-describing.
 */
export async function login(page: Page) {
  await page.goto('/login')

  const email = page.locator('#login-email')
  const password = page.locator('#login-password')
  await email.fill(ADMIN_EMAIL)
  await password.fill(ADMIN_PASSWORD)

  await page.getByRole('button', { name: /sign in/i }).click()

  // Real backend issues a token → app pushes to /overview.
  await page.waitForURL('**/overview', { timeout: 20_000 })
  await expect(page.getByRole('heading', { name: /This morning in Meridian/i }).first()).toBeVisible()
}
