import { useRef } from 'react'
import { HeroSection } from '@/components/HeroSection'
import { SectionTabs } from '@/components/SectionTabs'
import { SiteFooter } from '@/components/SiteFooter'
import { AboutSection } from '@/components/sections/AboutSection'
import { EarlierCareer } from '@/components/sections/EarlierCareer'
import { EducationList } from '@/components/sections/EducationList'
import { JobList } from '@/components/sections/JobList'
import { ProjectGrid } from '@/components/sections/ProjectGrid'
import { SkillGrid } from '@/components/sections/SkillGrid'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import resume from '@/content/resume.json'

// Explicit, reader-value ordering (not alphabetical, not JSON order)
const TABS = [
  { key: 'about', label: 'About' },
  { key: 'projects', label: 'Projects' },
  { key: 'work', label: 'Work' },
  { key: 'skills', label: 'Skills' },
  { key: 'earlierCareer', label: 'Earlier Career' },
  { key: 'education', label: 'Education' },
] as const

export default function App() {
  const heroSentinelRef = useRef<HTMLDivElement>(null)

  return (
    <Tabs defaultValue="about" className="min-h-screen flex flex-col !gap-0">
      <div id="top" />

      <HeroSection
        name={resume.about.name}
        label={resume.about.label}
        tagline={resume.about.tagline}
        status={resume.about.status}
        stats={resume.about.stats}
      />

      <div ref={heroSentinelRef} aria-hidden className="h-px" />

      <SectionTabs tabs={[...TABS]} name={resume.about.name} heroSentinelRef={heroSentinelRef} />

      <main className="flex-1">
        <TabsContent value="about" className="mt-0">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
            <h2 className="font-heading text-2xl text-foreground mb-6">About</h2>
            <AboutSection data={resume.about} />
          </div>
        </TabsContent>

        <TabsContent value="projects" className="mt-0">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
            <h2 className="font-heading text-2xl text-foreground mb-6">Projects</h2>
            <ProjectGrid items={resume.projects} />
          </div>
        </TabsContent>

        <TabsContent value="work" className="mt-0">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
            <h2 className="font-heading text-2xl text-foreground mb-6">Work</h2>
            <JobList jobs={resume.work} />
          </div>
        </TabsContent>

        <TabsContent value="skills" className="mt-0">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
            <h2 className="font-heading text-2xl text-foreground mb-6">Skills</h2>
            <SkillGrid categories={resume.skills} />
          </div>
        </TabsContent>

        <TabsContent value="earlierCareer" className="mt-0">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
            <h2 className="font-heading text-2xl text-foreground mb-6">Earlier Career</h2>
            <EarlierCareer data={resume.earlierCareer} />
          </div>
        </TabsContent>

        <TabsContent value="education" className="mt-0">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
            <h2 className="font-heading text-2xl text-foreground mb-6">Education</h2>
            <EducationList items={resume.education} />
          </div>
        </TabsContent>
      </main>

      <SiteFooter />
    </Tabs>
  )
}
