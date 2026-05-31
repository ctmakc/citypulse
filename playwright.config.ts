import { defineConfig, devices } from '@playwright/test'

/**
 * CityPulse frontend E2E config.
 *
 * - Runs against the dev server on :3095 (frontend), backend on :3096.
 * - `webServer.reuseExistingServer: true` means an already-running `npm run dev`
 *   is reused as-is; CI can boot one with the given command. A running server is
 *   never restarted.
 * - The chromium project pins `channel: undefined` and relies on the cached
 *   Playwright chromium build already installed on this machine (revision 1223 /
 *   @playwright/test 1.60.0) — no fresh browser download is triggered. We force
 *   the full headless chrome (not the headless-shell) via `chromiumSandbox: false`
 *   + the default `headless: true`, since only the full chrome binary is cached.
 * - No nondeterministic values (no Date.now / random / time-based ports).
 */

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3095'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'line',

  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },

  use: {
    baseURL: BASE_URL,
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    trace: 'retain-on-failure',
    // Desktop viewport so the promo header's desktop nav + role switcher
    // (both hidden < 760px) are present and clickable.
    viewport: { width: 1366, height: 900 },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 900 },
        // Use the cached full chromium build; disabling the sandbox keeps it
        // launchable in restricted CI/sandbox environments without a download.
        launchOptions: {
          args: ['--no-sandbox'],
        },
      },
    },
  ],

  webServer: {
    command: 'npm run dev -- --port 3095',
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
