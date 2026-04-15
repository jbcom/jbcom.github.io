import { Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface SectionTabsProps {
  tabs: { key: string; label: string }[]
  name: string
  heroSentinelRef: React.RefObject<HTMLDivElement | null>
}

export function SectionTabs({ tabs, name, heroSentinelRef }: SectionTabsProps) {
  const [collapsed, setCollapsed] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = heroSentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      (entries) => setCollapsed(!entries[0].isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [heroSentinelRef])

  return (
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        collapsed
          ? 'border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center gap-4 h-14">
        {collapsed && (
          <a
            href="#top"
            className="font-heading text-lg text-foreground shrink-0 hover:text-primary transition-colors"
          >
            {name}
          </a>
        )}

        <TabsList
          variant="line"
          className="bg-transparent border-0 h-14 gap-0 overflow-x-auto scrollbar-hide scroll-fade-x flex-1 justify-start sm:justify-center"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="text-sm font-medium h-14 rounded-none data-[state=active]:after:bg-primary whitespace-nowrap"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {collapsed && (
          <Button
            size="sm"
            variant="outline"
            className="gap-2 shrink-0 hidden sm:inline-flex"
            asChild
          >
            <a href="/Jon_Bogaty_Resume.pdf" download>
              <Download className="size-3.5" />
              Resume
            </a>
          </Button>
        )}
      </div>
    </header>
  )
}
