import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ANCHORS = [
  { id: 'work', label: 'Work' },
  { id: 'open-source', label: 'Open Source' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export function SiteNav({ name }: { name: string }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = ANCHORS.map((a) => document.getElementById(a.id)).filter(
      (el): el is HTMLElement => el !== null
    )
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    for (const el of sections) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 flex items-center gap-4 h-14">
        <a
          href="#top"
          className="font-heading text-lg text-foreground shrink-0 hover:text-primary transition-colors"
        >
          {name}
        </a>

        <nav className="flex items-center gap-1 sm:gap-2 flex-1 justify-end sm:justify-center overflow-x-auto scrollbar-hide">
          {ANCHORS.map((anchor) => (
            <a
              key={anchor.id}
              href={`#${anchor.id}`}
              className={cn(
                'relative px-2 sm:px-3 h-14 inline-flex items-center text-sm font-medium whitespace-nowrap transition-colors',
                active === anchor.id
                  ? 'text-foreground after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {anchor.label}
            </a>
          ))}
        </nav>

        <Button
          size="sm"
          variant="outline"
          className="gap-2 shrink-0 hidden sm:inline-flex"
          asChild
        >
          <a href="/Jon_Bogaty_Resume.docx" download>
            <Download className="size-3.5" />
            Résumé
          </a>
        </Button>
      </div>
    </header>
  )
}
