import { HeroSection } from '@/components/HeroSection'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteNav } from '@/components/SiteNav'
import { OpenSource } from '@/components/sections/OpenSource'
import resume from '@/content/resume'

/**
 * A lobby, not a brochure: identity + proof + action in the hero, then the
 * one thing a résumé can't show — the live open-source portfolio. Career
 * history and the skills matrix live in the résumé (one click away, HTML
 * and DOCX); duplicating them here was noise.
 */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div id="top" />

      <SiteNav name={resume.about.name} />

      <HeroSection
        name={resume.about.name}
        label={resume.about.label}
        heroLine={resume.about.heroLine}
        status={resume.about.status}
        stats={resume.about.stats}
      />

      <main className="flex-1">
        <section id="open-source" className="mx-auto max-w-5xl px-4 sm:px-6 py-14 scroll-mt-14">
          <h2 className="font-heading text-3xl text-foreground mb-8">Open Source</h2>
          <OpenSource items={resume.projects} lead={resume.about.summary[1]} />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
