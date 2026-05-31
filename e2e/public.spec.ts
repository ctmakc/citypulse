import { test, expect, type Page } from '@playwright/test'

/**
 * Public promo site: home hero, the unified CityPULSE header on every page,
 * and navigation to /platform, /solutions, /security, /contact.
 *
 * These pages are server-rendered with no API dependency, so they render the
 * same with or without the backend.
 */

// The shared header renders the "CityPULSE" wordmark inside a home link
// (aria-label="CityPULSE home"). The footer has the same link, so we scope to
// the page banner (the <header> landmark) to target the header specifically.
async function expectCityPulseHeader(page: Page) {
  const header = page.getByRole('banner')
  await expect(header).toBeVisible()
  // The home/seal link carries an explicit aria-label inside the header.
  await expect(header.getByRole('link', { name: /CityPULSE home/i })).toBeVisible()
  // And the wordmark text itself is present in the header.
  await expect(header.getByText('CityPULSE', { exact: true })).toBeVisible()
}

test.describe('Public promo site', () => {
  test('home renders the hero and the "Request a pilot" CTA', async ({ page }) => {
    await page.goto('/')

    // Hero headline.
    await expect(
      page.getByRole('heading', { name: /An AI-powered operating system for resilient cities/i }),
    ).toBeVisible()

    // Header CTA "Request a pilot" (links to /contact). There may be more than
    // one CTA flavour on the page ("Request a municipal pilot" in the hero), so
    // assert the exact header one is present.
    await expect(page.getByRole('link', { name: 'Request a pilot' }).first()).toBeVisible()

    // The unified header.
    await expectCityPulseHeader(page)
  })

  test('header is present on every site page', async ({ page }) => {
    for (const path of ['/', '/platform', '/solutions', '/security', '/contact']) {
      await page.goto(path)
      await expectCityPulseHeader(page)
      // Each page exposes a top-level <h1>.
      await expect(page.locator('h1').first()).toBeVisible()
    }
  })

  test('nav links route to platform / solutions / security', async ({ page }) => {
    await page.goto('/')

    // Click each primary nav link (desktop nav is visible at 1366px width).
    await page.getByRole('link', { name: 'Platform', exact: true }).first().click()
    await expect(page).toHaveURL(/\/platform$/)
    await expectCityPulseHeader(page)

    await page.getByRole('link', { name: 'Solutions', exact: true }).first().click()
    await expect(page).toHaveURL(/\/solutions$/)
    await expectCityPulseHeader(page)

    await page.getByRole('link', { name: 'Security', exact: true }).first().click()
    await expect(page).toHaveURL(/\/security$/)
    await expectCityPulseHeader(page)

    // The header CTA takes us to /contact.
    await page.getByRole('link', { name: 'Request a pilot' }).first().click()
    await expect(page).toHaveURL(/\/contact$/)
    await expectCityPulseHeader(page)
  })
})
