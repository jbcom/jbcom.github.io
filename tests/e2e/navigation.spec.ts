import { expect, test } from '@playwright/test'

test.describe('Site navigation', () => {
  test('home page loads at / with correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Jon Bogaty/)
  })

  test('Career Timeline tab is active by default', async ({ page }) => {
    await page.goto('/')
    const careerTab = page.getByRole('tab', { name: /Career/i })
    await expect(careerTab).toHaveAttribute('data-state', 'active')
  })

  test('can switch to Open-Source Projects tab', async ({ page }) => {
    await page.goto('/')
    const projectsTab = page.getByRole('tab', { name: /Projects/i })
    await projectsTab.click()
    await expect(projectsTab).toHaveAttribute('data-state', 'active')
    await expect(page.getByText('Agentic')).toBeVisible()
  })

  test('can switch back to Career Timeline tab', async ({ page }) => {
    await page.goto('/')
    const projectsTab = page.getByRole('tab', { name: /Projects/i })
    const careerTab = page.getByRole('tab', { name: /Career/i })
    await projectsTab.click()
    await careerTab.click()
    await expect(careerTab).toHaveAttribute('data-state', 'active')
    await expect(page.getByText('Flipside Crypto').first()).toBeVisible()
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
    await expect(footer.getByText('Jon Bogaty')).toBeVisible()
    await expect(footer.getByText('Lincoln, NE')).toBeVisible()
  })
})
