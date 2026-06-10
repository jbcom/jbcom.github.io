import { expect, test } from '@playwright/test'

test.describe('Site navigation', () => {
  test('home page loads at / with correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Jon Bogaty/)
  })

  test('hero shows who + proof + action above the fold', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('heading', { level: 1, name: 'Staff Platform & DevOps Engineer' })
    ).toBeVisible()
    await expect(page.getByText('Jon Bogaty').first()).toBeVisible()
    await expect(page.getByText(/sole infrastructure engineer at Flipside Crypto/)).toBeVisible()
    await expect(page.getByRole('link', { name: /Download Résumé/i }).first()).toBeVisible()
  })

  test('anchor nav scrolls to sections', async ({ page }) => {
    await page.goto('/')
    for (const [label, id] of [
      ['Open Source', 'open-source'],
      ['Contact', 'contact'],
    ] as const) {
      const anchor = page.locator(`header a[href="/#${id}"]`, { hasText: label })
      await expect(anchor).toBeVisible()
      await anchor.click()
      await expect(page.locator(`#${id}`)).toBeInViewport()
    }
  })

  test('no Work or Skills sections — the résumé carries career history', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#work')).toHaveCount(0)
    await expect(page.locator('#skills')).toHaveCount(0)
  })

  test('open source tri-panel shows the three flagships with package tables', async ({ page }) => {
    await page.goto('/')
    const oss = page.locator('#open-source')
    await expect(oss.getByText('paranoid-passwd').first()).toBeVisible()
    await expect(oss.getByText('radioactive-ralph').first()).toBeVisible()
    await expect(oss.getByText('Extended Data Library').first()).toBeVisible()
    await expect(oss.getByText('paranoid-passwd-gui')).toBeVisible()
  })

  test('GitHub link opens in new tab', async ({ page }) => {
    await page.goto('/')
    const githubLink = page.getByRole('link', { name: 'GitHub' }).first()
    await expect(githubLink).toHaveAttribute('target', '_blank')
    await expect(githubLink).toHaveAttribute('rel', /noopener/)
  })

  test('footer is visible with contact info', async ({ page }) => {
    await page.goto('/')
    const footer = page.getByRole('contentinfo')
    await expect(footer).toBeVisible()
    await expect(footer.getByText("Let's talk.")).toBeVisible()
    await expect(footer.getByText(/Lincoln, NE/)).toBeVisible()
  })
})
