import { expect, test } from '@playwright/test'

test.describe('Resume content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('hero line sells the broader career through-line', async ({ page }) => {
    await expect(page.getByText(/through-line is bigger than one role/).first()).toBeVisible()
    await expect(page.getByText(/fleet operations, cloud migrations/).first()).toBeVisible()
  })

  test('education appears on the CV page', async ({ page }) => {
    await page.goto('/cv')
    await expect(page.getByText(/Ivy Tech Community College/).first()).toBeVisible()
  })

  test('no PDF link anywhere — DOCX is the only distributable', async ({ page }) => {
    await expect(page.locator('a[href$=".pdf"]')).toHaveCount(0)
  })

  test('download DOCX link exists in the Astrofy sidebar', async ({ page }) => {
    const docxLink = page.locator('aside a[href="/Jon_Bogaty_Resume.docx"]')
    await expect(docxLink).toBeVisible()
    await expect(docxLink).toHaveAttribute('download', '')
  })
})

test.describe('CV page (Astrofy timeline)', () => {
  test('cv page renders profile, experience, skills, and education', async ({ page }) => {
    await page.goto('/cv')
    await expect(page.getByText('Profile')).toBeVisible()
    await expect(page.getByText('Experience')).toBeVisible()
    await expect(page.getByText('Skills')).toBeVisible()
    await expect(page.getByText('Education')).toBeVisible()
    await expect(page.getByText('Flipside Crypto').first()).toBeVisible()
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

  test('resume page has correct job entries, starting at Symbiont', async ({ page }) => {
    await page.goto('/resume')
    await expect(page.getByText('Flipside Crypto').first()).toBeVisible()
    await expect(page.getByText('GoHealth').first()).toBeVisible()
    await expect(page.getByText('Symbiont').first()).toBeVisible()
    // Pre-2017 roles live in the Earlier Career paragraph, never as entries
    await expect(page.getByText('Senior Systems Operations Engineer')).toHaveCount(0)
    await expect(page.getByText('Cloud Platforms').first()).toBeVisible() // skills matrix lives here
  })
})
