import { expect, test } from '@playwright/test'

test.describe('Resume Content', () => {
  test('about summary is visible on default tab', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByText('Senior infrastructure engineer', { exact: false }).first()
    ).toBeVisible()
  })

  test('work experience shows Flipside Crypto', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('tab', { name: /Work/i }).click()
    await expect(page.getByText('Flipside Crypto').first()).toBeVisible()
  })

  test('skills tab has multiple categories', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('tab', { name: /Skills/i }).click()
    await expect(page.getByText('Cloud Platforms').first()).toBeVisible()
    await expect(page.getByText('Infrastructure as Code').first()).toBeVisible()
  })

  test('education tab shows institution', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('tab', { name: /Education/i }).click()
    await expect(page.getByText('Ivy Tech Community College')).toBeVisible()
  })

  test('download PDF link exists in footer', async ({ page }) => {
    await page.goto('/')
    const footer = page.getByRole('contentinfo')
    const pdfLink = footer.locator('a[href="/Jon_Bogaty_Resume.pdf"]')
    await expect(pdfLink).toBeVisible()
    await expect(pdfLink).toHaveAttribute('download', '')
  })

  test('download DOCX link exists in footer', async ({ page }) => {
    await page.goto('/')
    const footer = page.getByRole('contentinfo')
    const docxLink = footer.locator('a[href="/Jon_Bogaty_Resume.docx"]')
    await expect(docxLink).toBeVisible()
    await expect(docxLink).toHaveAttribute('download', '')
  })
})
