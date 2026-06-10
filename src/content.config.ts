import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
// astro/zod is what the official Astro 6 examples use for collection
// schemas; the upstream zod-3 deprecation marker on `z` is cosmetic.
import { z } from 'astro/zod'

/**
 * Writing — short technical posts and case studies. The Writing nav link
 * and index only surface once at least one post exists; an empty "blog
 * coming soon" is worse than none. Add a post by dropping a markdown file
 * in src/content/writing/ with this frontmatter:
 *
 *   ---
 *   title: Sole-operator DevOps — the Flipside playbook
 *   description: One-sentence summary for the index and RSS.
 *   pubDate: 2026-06-15
 *   ---
 */
const writingSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
})

/** Astro's generated InferEntrySchema resolves to `any` in this repo's
 * tsconfig (known typegen quirk) — pages annotate entries with this type,
 * inferred straight from the schema, instead. */
export interface WritingEntry {
  id: string
  data: z.infer<typeof writingSchema>
}

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: writingSchema,
})

export const collections = { writing }
