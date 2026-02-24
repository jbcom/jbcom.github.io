/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'

export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts', 'tests/unit/**/*.test.ts'],
    exclude: ['node_modules', 'dist', '.astro'],
  },
})
