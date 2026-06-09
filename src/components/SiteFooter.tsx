import { Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import resume from '@/content/resume'

const edu = resume.education[0]

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="border-t border-border scroll-mt-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-8">
        <div>
          <h2 className="font-heading text-3xl text-foreground">Let's talk.</h2>
          <a
            href={`mailto:${resume.about.email}`}
            className="inline-block text-lg text-primary hover:text-primary/80 transition-colors mt-2"
          >
            {resume.about.email}
          </a>
        </div>

        <div className="flex items-center gap-x-6 gap-y-3 flex-wrap">
          {resume.about.profiles.map((p) => (
            <a
              key={p.network}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {p.network} ↗
            </a>
          ))}
          <span className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a href="/Jon_Bogaty_Resume.docx" download>
                <Download className="size-3.5" />
                Download Résumé
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" asChild>
              <a href="/resume/">
                <FileText className="size-3.5" />
                View
              </a>
            </Button>
          </span>
        </div>

        <div className="flex justify-between gap-4 flex-wrap text-xs text-muted-foreground">
          <span>
            {resume.about.location.city}, {resume.about.location.region} · open to remote
          </span>
          <span>
            {edu.studyType.replace(/ \(.*\)/, '')}, {edu.area} — {edu.institution} ({edu.endDate}
            ), with honors
          </span>
        </div>

        <p className="font-mono text-[0.65rem] text-muted-foreground/70">
          © {currentYear} Jon Bogaty · v{__APP_VERSION__} · updated {__BUILD_DATE__}
        </p>
      </div>
    </footer>
  )
}
