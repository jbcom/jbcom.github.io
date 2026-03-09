import { expect, test } from '@playwright/test'

test.describe('Site navigation', () => {
  test('home page loads at / with correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Jon Bogaty/)
  })

  test('About tab is active by default', async ({ page }) => {
    await page.goto('/')
    const aboutTab = page.getByRole('tab', { name: /About/i })
    await expect(aboutTab).toHaveAttribute('data-state', 'active')
  })

  test('can switch to Work tab', async ({ page }) => {
    await page.goto('/')
    const workTab = page.getByRole('tab', { name: /Work/i })
    await workTab.click()
    await expect(workTab).toHaveAttribute('data-state', 'active')
    await expect(page.getByText('Flipside Crypto').first()).toBeVisible()
  })

  test('can switch to Projects tab', async ({ page }) => {
    await page.goto('/')
    const projectsTab = page.getByRole('tab', { name: /Projects/i })
    await projectsTab.click()
    await expect(projectsTab).toHaveAttribute('data-state', 'active')
    await expect(page.getByText('Agentic', { exact: true })).toBeVisible()
  })

  test('can switch between tabs', async ({ page }) => {
    await page.goto('/')
    const workTab = page.getByRole('tab', { name: /Work/i })
    const aboutTab = page.getByRole('tab', { name: /About/i })
    await workTab.click()
    await expect(workTab).toHaveAttribute('data-state', 'active')
    await aboutTab.click()
    await expect(aboutTab).toHaveAttribute('data-state', 'active')
  })

  test('footer is visible with contact info', async ({ page }) => {
    await page.goto('/')
    const footer = page.getByRole('contentinfo')
    await expect(footer).toBeVisible()
    await expect(footer.getByText('Jon Bogaty', { exact: true }).first()).toBeVisible()
    await expect(footer.getByText('Lincoln, NE')).toBeVisible()
  })
})
