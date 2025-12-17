import { describe, it, expect } from 'vitest'
import {
  getFeaturedPackages,
  getPackagesByCategory,
  getPackagesByLanguage,
  getPackageById,
  getPackageCount,
  packages,
} from './ecosystem'

describe('ecosystem data helpers', () => {
  describe('getFeaturedPackages', () => {
    it('should return only featured packages', () => {
      const featured = getFeaturedPackages()
      expect(featured.every((p) => p.featured)).toBe(true)
    })

    it('should return at least one package', () => {
      const featured = getFeaturedPackages()
      expect(featured.length).toBeGreaterThan(0)
    })

    it('should return a subset of all packages', () => {
      const featured = getFeaturedPackages()
      expect(featured.length).toBeLessThanOrEqual(packages.length)
    })
  })

  describe('getPackagesByCategory', () => {
    it('should return packages for AI category', () => {
      const aiPackages = getPackagesByCategory('ai')
      expect(aiPackages.every((p) => p.category === 'ai')).toBe(true)
      expect(aiPackages.length).toBeGreaterThan(0)
    })

    it('should return packages for games category', () => {
      const gamePackages = getPackagesByCategory('games')
      expect(gamePackages.every((p) => p.category === 'games')).toBe(true)
      expect(gamePackages.length).toBeGreaterThan(0)
    })

    it('should return packages for infra category', () => {
      const infraPackages = getPackagesByCategory('infra')
      expect(infraPackages.every((p) => p.category === 'infra')).toBe(true)
      expect(infraPackages.length).toBeGreaterThan(0)
    })

    it('should return packages for libs category', () => {
      const libPackages = getPackagesByCategory('libs')
      expect(libPackages.every((p) => p.category === 'libs')).toBe(true)
      expect(libPackages.length).toBeGreaterThan(0)
    })
  })

  describe('getPackagesByLanguage', () => {
    it('should return packages for TypeScript language', () => {
      const tsPackages = getPackagesByLanguage('typescript')
      expect(tsPackages.every((p) => p.language === 'typescript')).toBe(true)
      expect(tsPackages.length).toBeGreaterThan(0)
    })

    it('should return packages for Python language', () => {
      const pyPackages = getPackagesByLanguage('python')
      expect(pyPackages.every((p) => p.language === 'python')).toBe(true)
      expect(pyPackages.length).toBeGreaterThan(0)
    })

    it('should return packages for Go language', () => {
      const goPackages = getPackagesByLanguage('go')
      expect(goPackages.every((p) => p.language === 'go')).toBe(true)
      expect(goPackages.length).toBeGreaterThan(0)
    })

    it('should return packages for Terraform language', () => {
      const tfPackages = getPackagesByLanguage('terraform')
      expect(tfPackages.every((p) => p.language === 'terraform')).toBe(true)
      expect(tfPackages.length).toBeGreaterThan(0)
    })
  })

  describe('getPackageById', () => {
    it('should return the correct package for agentic-control', () => {
      const pkg = getPackageById('agentic-control')
      expect(pkg).toBeDefined()
      expect(pkg?.id).toBe('agentic-control')
      expect(pkg?.name).toBe('nodejs-agentic-control')
    })

    it('should return the correct package for strata', () => {
      const pkg = getPackageById('strata')
      expect(pkg).toBeDefined()
      expect(pkg?.id).toBe('strata')
      expect(pkg?.name).toBe('nodejs-strata')
    })

    it('should return undefined for non-existent package', () => {
      const pkg = getPackageById('non-existent-package')
      expect(pkg).toBeUndefined()
    })

    it('should return package with all required fields', () => {
      const pkg = getPackageById('agentic-control')
      expect(pkg).toBeDefined()
      expect(pkg).toHaveProperty('id')
      expect(pkg).toHaveProperty('name')
      expect(pkg).toHaveProperty('displayName')
      expect(pkg).toHaveProperty('description')
      expect(pkg).toHaveProperty('category')
      expect(pkg).toHaveProperty('language')
      expect(pkg).toHaveProperty('repo')
      expect(pkg).toHaveProperty('status')
      expect(pkg).toHaveProperty('featured')
      expect(pkg).toHaveProperty('tags')
    })
  })

  describe('getPackageCount', () => {
    it('should return the total number of packages', () => {
      const count = getPackageCount()
      expect(count).toBe(packages.length)
    })

    it('should return a positive number', () => {
      const count = getPackageCount()
      expect(count).toBeGreaterThan(0)
    })

    it('should match the sum of all categories', () => {
      const aiCount = getPackagesByCategory('ai').length
      const gamesCount = getPackagesByCategory('games').length
      const infraCount = getPackagesByCategory('infra').length
      const libsCount = getPackagesByCategory('libs').length

      expect(getPackageCount()).toBe(aiCount + gamesCount + infraCount + libsCount)
    })
  })

  describe('packages data integrity', () => {
    it('should have unique IDs for all packages', () => {
      const ids = packages.map((p) => p.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have valid status for all packages', () => {
      const validStatuses = ['stable', 'beta', 'alpha', 'wip']
      expect(packages.every((p) => validStatuses.includes(p.status))).toBe(true)
    })

    it('should have valid category for all packages', () => {
      const validCategories = ['ai', 'games', 'infra', 'libs']
      expect(packages.every((p) => validCategories.includes(p.category))).toBe(true)
    })

    it('should have valid language for all packages', () => {
      const validLanguages = ['typescript', 'python', 'go', 'terraform']
      expect(packages.every((p) => validLanguages.includes(p.language))).toBe(true)
    })

    it('should have non-empty description for all packages', () => {
      expect(packages.every((p) => p.description.length > 0)).toBe(true)
    })

    it('should have valid repo URL for all packages', () => {
      expect(packages.every((p) => p.repo.startsWith('https://github.com/jbcom/'))).toBe(true)
    })
  })
})
