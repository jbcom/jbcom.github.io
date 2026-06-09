import { Download, FileText, Github, Linkedin, MessageCircle } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'

interface Stat {
  value: string
  label: string
}

interface HeroProps {
  name: string
  label: string
  heroLine: string
  status?: { label: string; pulse?: boolean }
  stats?: Stat[]
}

export function HeroSection({ name, label, heroLine, status, stats }: HeroProps) {
  return (
    <section className="relative overflow-clip">
      <div className="hero-glow" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {/* Compact identity block — no display-type headline. The proof
              sentence is the hero; everything above it is just identity. */}
          <p className="font-mono text-xs text-primary uppercase tracking-[0.2em]">{name}</p>

          <h1 className="font-heading text-3xl sm:text-4xl font-normal tracking-tight text-foreground mt-2">
            {label}
          </h1>

          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed mt-5 max-w-2xl">
            {heroLine}
          </p>

          {stats && stats.length > 0 && (
            <dl className="flex flex-wrap items-stretch mt-10">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={
                    i === 0 ? 'pr-5 sm:pr-7 py-1' : 'border-l border-border px-5 sm:px-7 py-1'
                  }
                >
                  <dd className="font-heading text-3xl sm:text-4xl text-foreground leading-none">
                    {stat.value}
                  </dd>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground mt-2">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          )}

          <div className="flex items-center gap-2 mt-10 flex-wrap">
            <Button size="sm" className="gap-2" asChild>
              <a href="/Jon_Bogaty_Resume.docx" download>
                <Download className="size-3.5" />
                Download Résumé
              </a>
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-border" asChild>
              <a href="/resume/">
                <FileText className="size-3.5" />
                View Résumé
              </a>
            </Button>
            <div className="flex items-center gap-1 ml-1">
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-muted-foreground"
                aria-label="GitHub"
                asChild
              >
                <a href="https://github.com/jbcom" target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-muted-foreground"
                aria-label="LinkedIn"
                asChild
              >
                <a
                  href="https://linkedin.com/in/jonbogaty"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="size-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-muted-foreground"
                aria-label="Telegram"
                asChild
              >
                <a href="https://t.me/jbpersonaldev" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" />
                </a>
              </Button>
            </div>
          </div>

          {status && <p className="font-mono text-xs text-muted-foreground mt-8">{status.label}</p>}
        </motion.div>
      </div>
    </section>
  )
}
