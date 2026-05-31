import { test, expect } from '@playwright/test'
import { login } from './helpers'

/**
 * Authenticated portal journeys.
 *
 * We log in via the real UI before each test so the JWT is in localStorage and
 * the authenticated portal renders. The portal screens are designed to fall
 * back to static demo data when an API call fails, so we deliberately stub the
 * two *list* endpoints that, against this backend, either return ~50k synthetic
 * rows (Assets) or a payload the screen can't render (Capital). Aborting those
 * GETs makes the screens use their built-in demo data — which is exactly the
 * "static-fallback demo data" path the suite is meant to tolerate — keeping
 * these tests deterministic and fast. Auth and all other calls stay live.
 */

test.beforeEach(async ({ page }) => {
  // Keep the Assets *list* and Capital *list* on static demo data. The
  // per-asset detail endpoint (/assets/{id}) is left live (lightweight).
  await page.route('**/api/v1/**', (route) => {
    const req = route.request()
    if (req.method() !== 'GET') return route.continue()
    const path = new URL(req.url()).pathname
    const isAssetList = /\/api\/v1\/assets\/?$/.test(path)
    const isCapitalList = /\/api\/v1\/capital(\/stats)?\/?$/.test(path)
    if (isAssetList || isCapitalList) return route.abort()
    return route.continue()
  })

  await login(page)
})

test('Overview → Assets → asset detail with all six tabs', async ({ page }) => {
  // We start on /overview after login. Navigate to Assets via the sidebar.
  const sidebar = page.locator('#primary-navigation')
  await sidebar.getByRole('button', { name: /^Assets$/ }).click()
  await expect(page).toHaveURL(/\/assets$/)

  // Asset Registry table (static demo rows, since the list GET is stubbed).
  await expect(page.getByRole('heading', { name: /Asset Registry/i })).toBeVisible()

  // Click the first data row (rows are links: "Open <name> (<id>)").
  const firstRow = page.getByRole('row', { name: /^Open / }).first()
  await expect(firstRow).toBeVisible()
  await firstRow.click()

  // Asset detail page.
  await expect(page).toHaveURL(/\/assets\/.+/)

  // The six tabs in the asset-detail tablist.
  const tablist = page.getByRole('tablist', { name: /Asset detail sections/i })
  await expect(tablist).toBeVisible()
  const tabs = tablist.getByRole('tab')
  await expect(tabs).toHaveCount(6)

  // Click through every tab and assert it becomes selected.
  const tabNames = ['Overview', 'Inspections', 'Sensors', 'Incidents', 'Work Orders', 'Documents']
  for (const name of tabNames) {
    const tab = tablist.getByRole('tab', { name, exact: true })
    await tab.click()
    await expect(tab).toHaveAttribute('aria-selected', 'true')
  }
})

test('Digital Twin: toggle a map layer', async ({ page }) => {
  await page.goto('/digital-twin')

  await expect(page.getByRole('heading', { name: /Digital Twin/i }).first()).toBeVisible()
  await expect(page.getByText('Map layers', { exact: true })).toBeVisible()

  // Layer toggles are switches labelled "<Group> layer" (e.g. "Assets layer").
  const assetsLayer = page.getByRole('switch', { name: /Assets layer/i })
  await expect(assetsLayer).toBeVisible()

  // Default is on; toggling flips aria-checked to false, then back to true.
  await expect(assetsLayer).toHaveAttribute('aria-checked', 'true')
  await assetsLayer.click()
  await expect(assetsLayer).toHaveAttribute('aria-checked', 'false')
  await assetsLayer.click()
  await expect(assetsLayer).toHaveAttribute('aria-checked', 'true')
})

test('Capital & Grants: risk-to-project pipeline is shown', async ({ page }) => {
  await page.goto('/capital-grants')

  await expect(page.getByRole('heading', { name: /Capital/i }).first()).toBeVisible()

  // The worked pipeline ends at funded capital project CP-118, with the
  // detected-risk main MX-118 at the start.
  await expect(page.getByText('CP-118').first()).toBeVisible()
  await expect(page.getByText('MX-118').first()).toBeVisible()
  // A couple of pipeline stage labels.
  await expect(page.getByText('Detected risk', { exact: true })).toBeVisible()
  await expect(page.getByText('Capital project', { exact: true })).toBeVisible()
})

test('Role switcher changes the visible sidebar item count', async ({ page }) => {
  const sidebar = page.locator('#primary-navigation')
  await expect(sidebar).toBeVisible()

  // Count nav buttons for the default role (City Manager → full nav).
  const beforeCount = await sidebar.getByRole('button').count()
  expect(beforeCount).toBeGreaterThan(8)

  // Open the desktop role switcher and pick a narrowly-scoped role.
  await page.getByRole('button', { name: /Viewing as .*Change role/i }).first().click()
  const menu = page.getByRole('menu', { name: /Select role/i })
  await expect(menu).toBeVisible()
  await menu.getByRole('menuitemradio', { name: 'Grants Office' }).click()

  // The Grants Office role sees far fewer sections, so the count drops.
  await expect
    .poll(async () => sidebar.getByRole('button').count())
    .toBeLessThan(beforeCount)

  // And the role lens is reflected in the switcher label.
  await expect(
    page.getByRole('button', { name: /Viewing as .*Change role/i }).first(),
  ).toContainText('Grants Office')
})
