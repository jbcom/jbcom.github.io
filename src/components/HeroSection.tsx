import { Download, FileText, Github, Linkedin, MessageCircle } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface Stat {
  value: string
  label: string
}

interface Status {
  label: string
  pulse?: boolean
}

interface HeroProps {
  name: string
  label: string
  tagline: string
  status?: Status
  stats?: Stat[]
}

function ShaderBg() {
  const [ShaderComponent, setShaderComponent] = useState<React.ComponentType<{
    className?: string
    style?: React.CSSProperties
    colors?: string[]
    speed?: number
    backgroundColor?: string
  }> | null>(null)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) return

    import('@paper-design/shaders-react')
      .then((mod) => setShaderComponent(() => mod.MeshGradient))
      .catch(() => {})
  }, [])

  if (ShaderComponent) {
    return (
      <ShaderComponent
        className="absolute inset-0 w-full h-full"
        colors={['#0B0D14', '#1F1400', '#0B0D14', '#0C1522', '#0B0D14']}
        speed={0.15}
        backgroundColor="#0B0D14"
      />
    )
  }

  return (
    <div
      className="absolute inset-0 animate-[gradientShift_20s_ease-in-out_infinite]"
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 20% 50%, rgba(232,168,73,0.08), transparent 60%),
          radial-gradient(ellipse 60% 50% at 80% 50%, rgba(107,139,173,0.06), transparent 60%),
          #0B0D14
        `,
      }}
    />
  )
}

export function HeroSection({ name, label, tagline, status, stats }: HeroProps) {
  return (
    <section className="relative overflow-clip">
      <ShaderBg />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          {status && (
            <div className="flex justify-center mb-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                {status.pulse && (
                  <span className="pulse-dot inline-block size-1.5 rounded-full bg-[var(--brand-success)]" />
                )}
                {status.label}
              </span>
            </div>
          )}

          <h1 className="hero-name font-heading text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-tight">
            {name}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-mono text-xs sm:text-sm text-primary/80 uppercase tracking-[0.2em] mt-4"
          >
            {label}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg text-foreground/90 leading-relaxed mt-6 max-w-2xl mx-auto"
          >
            {tagline}
          </motion.p>

          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 max-w-2xl mx-auto"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border/60 bg-card/40 backdrop-blur-sm px-3 py-3"
                >
                  <div className="font-heading text-2xl sm:text-3xl text-primary leading-none">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground mt-1.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-2 mt-8 flex-wrap"
          >
            <Button size="sm" className="gap-2" asChild>
              <a href="/Jon_Bogaty_Resume.pdf" download>
                <Download className="size-3.5" />
                Download Resume
              </a>
            </Button>
            <Button variant="outline" size="sm" className="gap-2 border-border" asChild>
              <a href="/resume/">
                <FileText className="size-3.5" />
                View Resume
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
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
