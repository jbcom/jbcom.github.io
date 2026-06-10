import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import resume from '@/content/resume'
import type { WritingEntry } from '@/content.config'

export async function GET(context: APIContext) {
  const posts = await getCollection('writing', ({ data }: WritingEntry) => !data.draft)
  return rss({
    title: `${resume.about.name} — Writing`,
    description: resume.about.tagline,
    site: context.site ?? resume.about.url,
    items: posts.map((post: WritingEntry) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/writing/${post.id}/`,
    })),
  })
}
