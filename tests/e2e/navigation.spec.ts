import { expect, test } from '@playwright/test'

test.describe('Site navigation', () => {
  test('home page loads at /', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/jbcom/)
  })

  test('navigate to /resume/ and verify resume content visible', async ({ page }) => {
    await page.goto('/resume/')
    await expect(page.locator('h1')).toContainText('Jon Bogaty')
    await expect(page.getByText('Professional Experience')).toBeVisible()
  })

  test('all nav links are present and correct', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav[aria-label="Main navigation"]')

    await expect(nav.locator('a[href="/"]')).toBeVisible()
    await expect(nav.locator('a[href="/about/"]')).toBeVisible()
    await expect(nav.locator('a[href="/resume/"]')).toBeVisible()
    await expect(nav.locator('a[href="/ecosystem/"]')).toBeVisible()
    await expect(nav.locator('a[href="https://github.com/jbcom"]')).toBeVisible()
  })

  test('external GitHub link opens in new tab', async ({ page }) => {
    await page.goto('/')
    const githubLink = page.locator('nav a[href="https://github.com/jbcom"]')
    await expect(githubLink).toHaveAttribute('target', '_blank')
    await expect(githubLink).toHaveAttribute('rel', /noopener/)
  })
})
