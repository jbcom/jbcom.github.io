import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  Sparkles,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export interface CareerEntry {
  company: string
  role: string
  period: string
  phase?: string
  description: string
  milestone?: string
  highlights?: string[]
  skills?: string[]
  /** Show career advancement within one company (e.g., DevOps → IT & Security) */
  roles?: { title: string; period: string }[]
}

interface FoundationRole {
  company: string
  role: string
  year: string
}

interface SkillCategory {
  name: string
  keywords: string[]
}

interface Education {
  institution: string
  area: string
  studyType: string
  startDate: string
  endDate: string
  honors: string[]
}

interface Innovation {
  year: string
  title: string
  description: string
}

interface Props {
  entries: CareerEntry[]
  foundationRoles: FoundationRole[]
  skills: SkillCategory[]
  education: Education[]
  innovation: Innovation[]
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function TimelineCard({ entry, isActive }: { entry: CareerEntry; isActive: boolean }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card
      className={cn(
        'shrink-0 w-[calc(100vw-3rem)] sm:w-[380px] snap-center transition-all duration-300 relative overflow-hidden select-none',
        isActive
          ? 'border-primary/40 shadow-[0_0_30px_rgba(232,168,73,0.12)] ring-1 ring-primary/20'
          : 'border-border hover:border-primary/20'
      )}
    >
      {/* Top accent */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-0.5',
          entry.milestone ? 'bg-primary' : 'bg-border'
        )}
      />

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              'w-10 h-10 rounded-lg border flex items-center justify-center font-mono text-xs font-medium shrink-0',
              entry.milestone
                ? 'bg-primary/10 text-primary border-primary/25'
                : 'bg-muted text-muted-foreground border-border'
            )}
          >
            {getInitials(entry.company)}
          </div>
          <span className="font-mono text-xs text-muted-foreground">{entry.period}</span>
        </div>
        <CardTitle className="font-heading text-xl font-normal mt-2">{entry.company}</CardTitle>
        {entry.phase && (
          <span className="font-mono text-[0.65rem] font-medium text-[#6B8BAD] uppercase tracking-wider">
            {entry.phase}
          </span>
        )}
        {entry.roles ? (
          <div className="space-y-1.5 mt-1">
            {entry.roles.map((r, i) => (
              <div key={`${r.title}-${r.period}`} className="flex items-center gap-2">
                {i > 0 && <span className="text-primary/50 text-[0.6rem]">&#8594;</span>}
                <div>
                  <span className="text-primary font-semibold text-sm">{r.title}</span>
                  <span className="font-mono text-[0.6rem] text-muted-foreground ml-2">
                    {r.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CardDescription className="text-primary font-semibold text-sm">
            {entry.role}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {entry.milestone && (
          <Badge variant="outline" className="border-primary/25 bg-primary/10 text-primary text-xs">
            <Sparkles className="size-3 mr-1" />
            {entry.milestone}
          </Badge>
        )}

        <p className="text-sm text-muted-foreground leading-relaxed">{entry.description}</p>

        {/* Skill tags */}
        {entry.skills && entry.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {entry.skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="text-[0.65rem] font-normal px-2 py-0"
              >
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {/* Expandable highlights */}
        {entry.highlights && entry.highlights.length > 0 && (
          <div className="pt-1">
            <Separator className="mb-3" />
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              <ChevronDown
                className={cn(
                  'size-3.5 transition-transform duration-200',
                  expanded && 'rotate-180'
                )}
              />
              Key Highlights
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 space-y-2 overflow-hidden"
                >
                  {entry.highlights.map((h) => (
                    <li
                      key={h}
                      className="text-xs text-muted-foreground leading-relaxed pl-4 relative"
                    >
                      <span className="absolute left-1 top-1.5 w-1.5 h-1.5 rounded-full bg-primary/30 border border-primary/50" />
                      {h}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function CareerTimeline({ entries, foundationRoles, skills, education, innovation }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(entries.length - 1)
  const [canScrollLeft, setCanScrollLeft] = useState(true)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const hasInitiallyScrolled = useRef(false)

  // Mouse drag state
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)
  const hasDragged = useRef(false)
  const rafId = useRef(0)

  // Measure actual card width dynamically
  const getCardWidth = useCallback(() => {
    const el = scrollRef.current
    if (!el) return 400
    const firstCard = el.querySelector(':scope > *') as HTMLElement | null
    if (!firstCard) return 400
    const gap = parseInt(getComputedStyle(el).gap, 10) || 24
    return firstCard.offsetWidth + gap
  }, [])

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const cw = getCardWidth()
    const idx = Math.round(el.scrollLeft / cw)
    setActiveIndex(Math.max(0, Math.min(idx, entries.length - 1)))
    setCanScrollLeft(el.scrollLeft > 20)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20)
  }, [entries.length, getCardWidth])

  // Throttle scroll handler to one update per animation frame
  const throttledScrollUpdate = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(updateScrollState)
  }, [updateScrollState])

  // Scroll to the last entry (most recent) before first paint — prevents flash at position 0
  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el || hasInitiallyScrolled.current) return
    hasInitiallyScrolled.current = true
    const cw = getCardWidth()
    el.scrollTo({ left: (entries.length - 1) * cw, behavior: 'instant' })
  }, [entries.length, getCardWidth])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', throttledScrollUpdate, { passive: true })
    updateScrollState()
    return () => {
      el.removeEventListener('scroll', throttledScrollUpdate)
      cancelAnimationFrame(rafId.current)
    }
  }, [throttledScrollUpdate, updateScrollState])

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => updateScrollState()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [updateScrollState])

  const scrollToIndex = (idx: number) => {
    const cw = getCardWidth()
    scrollRef.current?.scrollTo({ left: idx * cw, behavior: 'smooth' })
  }

  const scrollByDirection = (direction: -1 | 1) => {
    const newIdx = Math.max(0, Math.min(activeIndex + direction, entries.length - 1))
    scrollToIndex(newIdx)
  }

  // Mouse drag handlers for desktop click-and-drag
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current
    if (!el) return
    isDragging.current = true
    hasDragged.current = false
    dragStartX.current = e.pageX - el.offsetLeft
    dragScrollLeft.current = el.scrollLeft
    el.style.cursor = 'grabbing'
    el.style.scrollSnapType = 'none'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
    const el = scrollRef.current
    if (!el) return
    const x = e.pageX - el.offsetLeft
    const delta = x - dragStartX.current
    if (Math.abs(delta) > 5) hasDragged.current = true
    el.scrollLeft = dragScrollLeft.current - delta
  }

  const handleMouseUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    const el = scrollRef.current
    if (!el) return
    el.style.cursor = ''
    // Re-enable snap after a brief delay so it settles to nearest card
    requestAnimationFrame(() => {
      el.style.scrollSnapType = ''
    })
  }

  // Prevent click events from firing after a drag
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation()
      e.preventDefault()
      hasDragged.current = false
    }
  }

  return (
    <div className="space-y-0">
      {/* Innovation Milestones */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 sm:pt-10 pb-6 sm:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {innovation.map((item) => (
            <div
              key={item.year}
              className="flex items-center gap-3 sm:flex-col sm:text-center p-3 sm:p-4 rounded-lg bg-card border border-border"
            >
              <Lightbulb className="size-4 text-primary shrink-0 sm:mx-auto sm:mb-0" />
              <div className="min-w-0">
                <div className="font-mono text-xs text-primary font-medium">{item.year}</div>
                <div className="text-xs font-semibold text-foreground mt-0.5 sm:mt-1">
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Timeline Navigation */}
      <section className="py-4 sm:py-6">
        {/* Nav dots + arrows */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
          <button
            type="button"
            onClick={() => scrollByDirection(-1)}
            disabled={!canScrollLeft}
            className="shrink-0 p-1 sm:p-1.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Previous"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex-1 flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide px-1">
            {entries.map((entry, i) => (
              <button
                type="button"
                key={`${entry.company}-${entry.period}`}
                onClick={() => scrollToIndex(i)}
                title={`${entry.company} — ${entry.period}`}
                aria-label={`Jump to ${entry.company}`}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-1.5 sm:px-2 py-1 rounded-md shrink-0 transition-all',
                  i === activeIndex ? 'bg-primary/10' : 'hover:bg-muted'
                )}
              >
                <span
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    i === activeIndex
                      ? 'bg-primary scale-125 ring-2 ring-primary/30'
                      : entry.milestone
                        ? 'bg-primary/50'
                        : 'bg-border'
                  )}
                />
                <span
                  className={cn(
                    'font-mono text-[0.55rem] sm:text-[0.6rem] transition-colors',
                    i === activeIndex ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {entry.period.split('–')[0].trim().split(' ').pop()}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByDirection(1)}
            disabled={!canScrollRight}
            className="shrink-0 p-1 sm:p-1.5 rounded-md border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Next"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 mb-4 sm:mb-6">
          <div className="h-0.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / entries.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Horizontal scrolling card track with gradient fade indicators */}
        <div className="relative">
          {/* Left fade indicator */}
          <div
            className={cn(
              'absolute left-0 top-0 bottom-6 w-8 sm:w-16 z-10 pointer-events-none transition-opacity duration-300',
              'bg-gradient-to-r from-background to-transparent',
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            )}
          />
          {/* Right fade indicator */}
          <div
            className={cn(
              'absolute right-0 top-0 bottom-6 w-8 sm:w-16 z-10 pointer-events-none transition-opacity duration-300',
              'bg-gradient-to-l from-background to-transparent',
              canScrollRight ? 'opacity-100' : 'opacity-0'
            )}
          />

          <section
            ref={scrollRef}
            aria-label="Career timeline cards"
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 cursor-grab active:cursor-grabbing px-[max(1rem,calc((100vw-380px)/2))] sm:px-[max(1.5rem,calc((100vw-380px)/2))]"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClickCapture={handleClickCapture}
          >
            {entries.map((entry, i) => (
              <TimelineCard
                key={`${entry.company}-${entry.period}`}
                entry={entry}
                isActive={i === activeIndex}
              />
            ))}
          </section>

          {/* Swipe hint on mobile — only shown initially */}
          <SwipeHint />
        </div>
      </section>

      <Separator />

      {/* Foundation Roles */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        <h2 className="font-heading text-2xl text-foreground mb-2">Foundation Roles</h2>
        <p className="text-sm text-muted-foreground mb-4 sm:mb-6 max-w-2xl">
          Progressive DevOps and infrastructure roles spanning ad-tech, e-commerce, mobile
          platforms, publishing, and freelance consulting (2005–2014).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {foundationRoles.map((pos) => (
            <div
              key={`${pos.company}-${pos.year}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/20 transition-colors"
            >
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center font-mono text-[0.6rem] text-muted-foreground shrink-0">
                {getInitials(pos.company)}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground truncate">{pos.company}</div>
                <div className="text-xs text-muted-foreground truncate">{pos.role}</div>
              </div>
              <span className="ml-auto font-mono text-[0.6rem] text-muted-foreground shrink-0">
                {pos.year}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Skills Matrix */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        <h2 className="font-heading text-2xl text-foreground mb-4 sm:mb-6">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skills.map((category) => (
            <div key={category.name} className="space-y-2">
              <h3 className="font-mono text-xs font-medium text-primary uppercase tracking-wider">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.keywords.map((kw) => (
                  <Badge
                    key={kw}
                    variant="secondary"
                    className="text-[0.65rem] font-normal whitespace-nowrap"
                  >
                    {kw}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Education */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        <h2 className="font-heading text-2xl text-foreground mb-4 sm:mb-6">Education</h2>
        {education.map((edu) => (
          <div key={edu.institution} className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center shrink-0">
              <GraduationCap className="size-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-foreground">{edu.studyType}</div>
              <div className="text-sm text-muted-foreground">{edu.area}</div>
              <div className="text-sm text-muted-foreground">{edu.institution}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {edu.honors.map((h) => (
                  <Badge key={h} variant="secondary" className="text-[0.65rem]">
                    {h}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

/** Animated swipe hint that appears once then fades out */
function SwipeHint() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: [0, -12, 0] }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.4 },
            x: { duration: 1.2, repeat: 1, ease: 'easeInOut' },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-muted-foreground/70 pointer-events-none sm:hidden"
        >
          <ChevronLeft className="size-3" />
          <span>Swipe to explore</span>
          <ChevronRight className="size-3" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
