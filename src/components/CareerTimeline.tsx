import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'

export interface CareerEntry {
  company: string
  role: string
  period: string
  phase?: string
  description: string
  milestone?: string
  highlights?: string[]
}

interface Props {
  entries: CareerEntry[]
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function TimelineCard({ entry, index }: { entry: CareerEntry; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      className="tl-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {/* Top accent bar */}
      <div
        className="tl-card-accent"
        style={{ background: entry.milestone ? 'var(--brand)' : 'var(--border-hover)' }}
      />

      {/* Company badge + period */}
      <div className="tl-card-header">
        <div
          className="tl-card-badge"
          style={{
            background: entry.milestone ? 'var(--brand-dim)' : 'var(--bg-elevated)',
            color: entry.milestone ? 'var(--brand)' : 'var(--text-secondary)',
            borderColor: entry.milestone ? 'rgba(232, 168, 73, 0.25)' : 'var(--border)',
          }}
        >
          {getInitials(entry.company)}
        </div>
        <span className="tl-card-period">{entry.period}</span>
      </div>

      {/* Company name + phase */}
      <h3 className="tl-card-company">{entry.company}</h3>
      {entry.phase && <span className="tl-card-phase">{entry.phase}</span>}

      {/* Role */}
      <p className="tl-card-role">{entry.role}</p>

      {/* Milestone badge */}
      {entry.milestone && <span className="tl-card-milestone">{entry.milestone}</span>}

      {/* Description */}
      <p className="tl-card-desc">{entry.description}</p>

      {/* Expandable highlights */}
      {entry.highlights && entry.highlights.length > 0 && (
        <div className="tl-card-highlights">
          <button
            type="button"
            className="tl-card-expand"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            <span
              className="tl-card-arrow"
              style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
            />
            Key Highlights
          </button>
          {expanded && (
            <motion.ul
              className="tl-card-list"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
            >
              {entry.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </motion.ul>
          )}
        </div>
      )}
    </motion.article>
  )
}

export default function CareerTimeline({ entries }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll progress to horizontal translation
  // Each card is ~380px wide + 24px gap. Total scroll width = cards * 404
  const cardWidth = 380
  const gap = 24
  const totalCards = entries.length
  const totalScrollWidth = totalCards * (cardWidth + gap) - gap

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [
      0,
      -(
        totalScrollWidth -
        (typeof window !== 'undefined' ? Math.min(window.innerWidth - 48, 1200) : 900)
      ),
    ]
  )

  // Track active card index for the progress bar
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.round(latest * (totalCards - 1))
    setActiveIndex(Math.max(0, Math.min(idx, totalCards - 1)))
  })

  // Progress line width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div
      ref={containerRef}
      className="tl-container"
      style={{ height: `${totalCards * 45 + 100}vh` }}
    >
      <div className="tl-sticky">
        {/* Year navigation dots */}
        <div className="tl-nav">
          {entries.map((entry, i) => (
            <button
              type="button"
              key={`${entry.company}-${entry.period}`}
              className={`tl-nav-dot ${i === activeIndex ? 'tl-nav-dot--active' : ''} ${entry.milestone ? 'tl-nav-dot--milestone' : ''}`}
              title={`${entry.company} — ${entry.period}`}
              aria-label={`Jump to ${entry.company}`}
              onClick={() => {
                // Scroll to the right position
                if (containerRef.current) {
                  const containerTop = containerRef.current.offsetTop
                  const containerHeight = containerRef.current.scrollHeight - window.innerHeight
                  const targetScroll = containerTop + (i / (totalCards - 1)) * containerHeight
                  window.scrollTo({ top: targetScroll, behavior: 'smooth' })
                }
              }}
            >
              <span className="tl-nav-year">
                {entry.period.split('–')[0].trim().split(' ').pop()}
              </span>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="tl-progress-track">
          <motion.div className="tl-progress-bar" style={{ width: progressWidth }} />
        </div>

        {/* Horizontal card track */}
        <motion.div ref={scrollRef} className="tl-track" style={{ x }}>
          {entries.map((entry, i) => (
            <TimelineCard key={`${entry.company}-${entry.period}`} entry={entry} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
