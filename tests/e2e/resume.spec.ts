import { expect, test } from '@playwright/test'

test.describe('Resume page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resume/')
  })

  test('page title contains "Resume"', async ({ page }) => {
    await expect(page).toHaveTitle(/Resume/)
  })

  test('"Jon Bogaty" is visible as h1', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Jon Bogaty')
  })

  test('"Professional Summary" section exists', async ({ page }) => {
    await expect(page.getByText('Professional Summary')).toBeVisible()
  })

  test('"Professional Experience" section exists', async ({ page }) => {
    await expect(page.getByText('Professional Experience')).toBeVisible()
  })

  test('"Flipside Crypto" appears in experience', async ({ page }) => {
    await expect(page.getByText('Flipside Crypto', { exact: true })).toBeVisible()
  })

  test('download PDF link exists and points to correct path', async ({ page }) => {
    const pdfLink = page.locator('a[href="/Jon_Bogaty_Resume.pdf"]')
    await expect(pdfLink).toBeVisible()
    await expect(pdfLink).toHaveAttribute('download', '')
  })

  test('download DOCX link exists and points to correct path', async ({ page }) => {
    const docxLink = page.locator('a[href="/Jon_Bogaty_Resume.docx"]')
    await expect(docxLink).toBeVisible()
    await expect(docxLink).toHaveAttribute('download', '')
  })

  test('"Core Competencies" section exists', async ({ page }) => {
    await expect(page.getByText('Core Competencies')).toBeVisible()
  })

  test('skills section has multiple categories', async ({ page }) => {
    const skillNames = page.locator('dt.skill-name')
    await expect(skillNames).not.toHaveCount(0)
    const count = await skillNames.count()
    expect(count).toBeGreaterThanOrEqual(5)
  })
})
