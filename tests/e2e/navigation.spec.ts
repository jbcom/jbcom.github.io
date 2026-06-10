import { expect, test } from '@playwright/test'

test.describe('Astrofy portfolio navigation', () => {
  test('home page loads at / with the Astrofy sidebar shell', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Jon Bogaty/)
    await expect(page.getByRole('complementary')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Home' })).toHaveClass(/font-semibold/)
  })

  test('home page sells Jon with proof and action above the fold', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1, name: "I'm Jon Bogaty." })).toBeVisible()
    await expect(page.getByText(/make messy infrastructure operable/)).toBeVisible()
    await expect(page.getByText(/through-line is bigger than one role/)).toBeVisible()
    await expect(page.getByRole('link', { name: 'How I contribute' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Read the CV' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Download DOCX' }).first()).toBeVisible()
  })

  test('sidebar routes are real pages', async ({ page }) => {
    for (const [label, path, heading] of [
      ['Contributor', '/contributor', 'The value is not just what I have touched.'],
      ['Outcomes', '/outcomes', 'Outcomes'],
      ['Projects', '/projects', 'Projects'],
      ['Services', '/services', 'Platform work for teams that need leverage.'],
      ['Writing', '/writing/', 'Writing'],
      ['CV', '/cv', 'Jon Bogaty'],
    ] as const) {
      await page.goto('/')
      await page.locator('aside').getByRole('link', { name: label, exact: true }).click()
      await expect(page).toHaveURL(new RegExp(`${path.replace(/\/$/, '').replace('/', '\\/')}/?$`))
      await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible()
    }
  })

  test('projects page shows the three flagships with package surfaces', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.getByText('paranoid-passwd').first()).toBeVisible()
    await expect(page.getByText('radioactive-ralph').first()).toBeVisible()
    await expect(page.getByText('Extended Data Library').first()).toBeVisible()
    await expect(page.getByText('paranoid-passwd-gui')).toBeVisible()
    await expect(page.getByText('Package surface').first()).toBeVisible()
  })

  test('outcomes page complements CV and projects with proof stories', async ({ page }) => {
    await page.goto('/outcomes')
    await expect(page.getByText('Cut cloud spend while modernizing the platform')).toBeVisible()
    await expect(
      page.getByText('Turned infrastructure repetition into generated modules')
    ).toBeVisible()
    await expect(page.getByText('Owned secrets, identity, compliance')).toBeVisible()
    await expect(page.getByRole('link', { name: 'CV experience' }).first()).toHaveAttribute(
      'href',
      '/cv#experience'
    )
  })

  test('contributor page sells Jon as a senior individual contributor', async ({ page }) => {
    await page.goto('/contributor')
    await expect(page.getByText('I am strongest where ownership is unclear')).toBeVisible()
    await expect(page.getByText('Owner of the messy middle')).toBeVisible()
    await expect(page.getByText('Senior IC who raises the floor')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Inspect artifacts' })).toHaveAttribute(
      'href',
      '/projects'
    )
  })

  test('services page keeps the consulting/current-work positioning explicit', async ({ page }) => {
    await page.goto('/services')
    await expect(page.getByText('Independent consulting')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Cloud cost reduction' })).toBeVisible()
    await expect(page.getByText(/making ownership visible/)).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Why the services exist' })).toBeVisible()
  })

  test('GitHub link opens in new tab', async ({ page }) => {
    await page.goto('/')
    const githubLink = page.getByRole('link', { name: 'GitHub' }).first()
    await expect(githubLink).toHaveAttribute('target', '_blank')
    await expect(githubLink).toHaveAttribute('rel', /noopener/)
  })
})
