import { expect, test } from '@playwright/test'

test.describe('Career Timeline', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Flipside Crypto appears in the timeline', async ({ page }) => {
    await expect(page.getByText('Flipside Crypto').first()).toBeVisible()
  })

  test('career summary is visible', async ({ page }) => {
    await expect(page.getByText('Senior technology leader')).toBeVisible()
  })

  test('innovation milestones are visible', async ({ page }) => {
    await expect(page.getByText('AI Operations Inventor')).toBeVisible()
    await expect(page.getByText('Early Docker & Terraform Adopter')).toBeVisible()
  })

  test('foundation roles section exists', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Foundation Roles' })).toBeVisible()
  })

  test('skills section has multiple categories', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible()
    await expect(page.getByText('Cloud Platforms')).toBeVisible()
    await expect(page.getByText('Infrastructure as Code')).toBeVisible()
  })

  test('education section exists', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible()
    await expect(page.getByText('Ivy Tech Community College')).toBeVisible()
  })

  test('timeline navigation dots are interactive', async ({ page }) => {
    const nextButton = page.getByRole('button', { name: 'Next' })
    await expect(nextButton).toBeVisible()
    await nextButton.click()
    // After clicking next, the second card should become active
    const secondDot = page.getByRole('button', { name: /Jump to Flipside Crypto/i }).nth(1)
    await expect(secondDot).toBeVisible()
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
