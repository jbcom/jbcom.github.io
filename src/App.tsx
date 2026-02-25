import { Briefcase, Code, User } from 'lucide-react'
import { AboutSection } from '@/components/AboutSection'
import { CareerPanel } from '@/components/CareerPanel'
import { HeroSection } from '@/components/HeroSection'
import { ProjectsPanel } from '@/components/ProjectsPanel'
import { SiteFooter } from '@/components/SiteFooter'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import resume from '@/content/resume.json'

export default function App() {
  return (
    <Tabs defaultValue="about" className="min-h-screen flex flex-col">
      {/* Header — tabs only, no redundant branding */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-center h-14">
          <TabsList variant="line" className="bg-transparent border-0 h-14 gap-0">
            <TabsTrigger
              value="about"
              className="text-sm font-medium gap-1.5 h-14 rounded-none data-[state=active]:after:bg-primary"
            >
              <User className="size-4" />
              <span className="hidden sm:inline">About Me</span>
              <span className="sm:hidden">About</span>
            </TabsTrigger>
            <TabsTrigger
              value="career"
              className="text-sm font-medium gap-1.5 h-14 rounded-none data-[state=active]:after:bg-primary"
            >
              <Briefcase className="size-4" />
              Career
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="text-sm font-medium gap-1.5 h-14 rounded-none data-[state=active]:after:bg-primary"
            >
              <Code className="size-4" />
              <span className="hidden sm:inline">Open-Source Projects</span>
              <span className="sm:hidden">Projects</span>
            </TabsTrigger>
          </TabsList>
        </div>
      </header>

      {/* Hero */}
      <HeroSection
        name={resume.basics.name}
        label={resume.basics.label}
        summary={resume.basics.summary}
      />

      {/* Tab Content */}
      <main className="flex-1">
        <TabsContent value="about" className="mt-0">
          <AboutSection
            summary={resume.basics.summary}
            skills={resume.skills}
            education={resume.education}
            email={resume.basics.email}
            location={resume.basics.location}
            profiles={resume.basics.profiles}
          />
        </TabsContent>

        <TabsContent value="career" className="mt-0">
          <CareerPanel />
        </TabsContent>

        <TabsContent value="projects" className="mt-0">
          <ProjectsPanel />
        </TabsContent>
      </main>

      {/* Footer */}
      <SiteFooter />
    </Tabs>
  )
}
