import { expect, test } from '@playwright/test'

test.describe('Resume content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Flipside Crypto appears in the Work tab', async ({ page }) => {
    const workTab = page.getByRole('tab', { name: /Work/i })
    await workTab.click()
    await expect(page.getByText('Flipside Crypto').first()).toBeVisible()
  })

  test('career summary is visible in About tab', async ({ page }) => {
    await expect(page.getByText('Senior infrastructure engineer').first()).toBeVisible()
  })

  test('skills section has multiple categories', async ({ page }) => {
    const skillsTab = page.getByRole('tab', { name: /Skills/i })
    await skillsTab.click()
    await expect(page.getByText('Cloud Platforms').first()).toBeVisible()
    await expect(page.getByText('Infrastructure as Code').first()).toBeVisible()
  })

  test('education section exists', async ({ page }) => {
    const educationTab = page.getByRole('tab', { name: /Education/i })
    await educationTab.click()
    await expect(page.getByText('Ivy Tech Community College').first()).toBeVisible()
  })

  test('download PDF link exists in footer', async ({ page }) => {
    const pdfLink = page.locator('a[href="/Jon_Bogaty_Resume.pdf"]')
    await expect(pdfLink).toBeVisible()
    await expect(pdfLink).toHaveAttribute('download', '')
  })

  test('download DOCX link exists in footer', async ({ page }) => {
    const docxLink = page.locator('a[href="/Jon_Bogaty_Resume.docx"]')
    await expect(docxLink).toBeVisible()
    await expect(docxLink).toHaveAttribute('download', '')
  })
})

test.describe('Resume page (print-optimized)', () => {
  test('resume page renders with all sections', async ({ page }) => {
    await page.goto('/resume')
    await expect(page.getByText('Jon Bogaty')).toBeVisible()
    await expect(page.getByText('Professional Summary')).toBeVisible()
    await expect(page.getByText('Professional Experience')).toBeVisible()
    await expect(page.getByText('Technical Skills')).toBeVisible()
    await expect(page.getByText('Education')).toBeVisible()
  })

  test('resume page has correct job entries', async ({ page }) => {
    await page.goto('/resume')
    await expect(page.getByText('Flipside Crypto')).toBeVisible()
    await expect(page.getByText('GoHealth')).toBeVisible()
    await expect(page.getByText('ClassPass')).toBeVisible()
  })
})
