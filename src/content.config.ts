import { defineCollection, z } from 'astro:content'

// Schema for org bundles synced from org doc sites
const orgsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    org: z.string(),
    name: z.string(),
    domain: z.string(),
    accent: z.string(),
    description: z.string(),
    packages: z.array(
      z.object({
        name: z.string(),
        version: z.string(),
        status: z.enum(['production', 'beta', 'alpha', 'experimental']),
        description: z.string().optional(),
      })
    ),
    navigation: z.array(
      z.object({
        label: z.string(),
        path: z.string(),
      })
    ),
    lastSync: z.string().datetime().optional(),
  }),
})

export const collections = {
  orgs: orgsCollection,
}
