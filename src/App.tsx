import { HeroSection } from '@/components/HeroSection'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteNav } from '@/components/SiteNav'
import { JobList } from '@/components/sections/JobList'
import { OpenSource } from '@/components/sections/OpenSource'
import { SkillSheet } from '@/components/sections/SkillSheet'
import resume from '@/content/resume'

/**
 * One opinionated scroll, not tabs: who + proof + action above the fold,
 * the Work receipts at depth 1, the open-source package detail at depth 2.
 * Each section gets its own layout — no shared shell.
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
        <section id="work" className="mx-auto max-w-5xl px-4 sm:px-6 py-14 scroll-mt-14">
          <h2 className="font-heading text-3xl text-foreground mb-8">Work</h2>
          <JobList jobs={resume.work} earlierCareer={resume.earlierCareer} />
        </section>

        <section
          id="open-source"
          className="border-t border-border/60 mx-auto max-w-5xl px-4 sm:px-6 py-14 scroll-mt-14"
        >
          <h2 className="font-heading text-3xl text-foreground mb-8">Open Source</h2>
          <OpenSource items={resume.projects} lead={resume.about.summary[1]} />
        </section>

        <section
          id="skills"
          className="border-t border-border/60 mx-auto max-w-5xl px-4 sm:px-6 py-14 scroll-mt-14"
        >
          <h2 className="font-heading text-3xl text-foreground mb-8">Skills</h2>
          <SkillSheet categories={resume.skills} />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
