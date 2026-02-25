import { Download, Github, Linkedin, MessageCircle } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface HeroProps {
  name: string
  label: string
  summary: string
}

/**
 * Shader background with graceful degradation.
 * Dynamically imports @paper-design/shaders-react to avoid SSR/build issues.
 * Falls back to a pure CSS animated gradient if WebGL is unavailable.
 */
function ShaderBg() {
  const [ShaderComponent, setShaderComponent] = useState<React.ComponentType<{
    className?: string
    style?: React.CSSProperties
    colors?: string[]
    speed?: number
    backgroundColor?: string
  }> | null>(null)

  useEffect(() => {
    // Check for WebGL support before loading the shader
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) return // Fall back to CSS gradient

    import('@paper-design/shaders-react')
      .then((mod) => setShaderComponent(() => mod.MeshGradient))
      .catch(() => {
        // Shader load failed — CSS fallback stays
      })
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

  // CSS fallback — animated radial gradients
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

export function HeroSection({ name, label, summary }: HeroProps) {
  // Extract first sentence of summary for the hero tagline
  const tagline = `${summary.split('. ').slice(0, 1).join('. ')}.`

  return (
    <section className="relative overflow-hidden">
      {/* Shader / gradient background */}
      <ShaderBg />

      {/* Dot grid overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Name with gradient */}
          <h1
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-none"
            style={{
              background:
                'linear-gradient(135deg, #E8A849 0%, #F0EDE8 40%, #6B8BAD 80%, #E8A849 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 8s ease-in-out infinite',
            }}
          >
            {name}
          </h1>

          {/* Label / role */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-mono text-xs sm:text-sm text-primary/80 uppercase tracking-[0.2em] mt-4"
          >
            {label}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-6 max-w-2xl mx-auto"
          >
            {tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-3 mt-8 flex-wrap"
          >
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-primary/30 hover:border-primary/60"
              asChild
            >
              <a href="/Jon_Bogaty_Resume.pdf" download>
                <Download className="size-3.5" />
                Resume
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" asChild>
              <a href="https://github.com/jbcom" target="_blank" rel="noopener noreferrer">
                <Github className="size-3.5" />
                GitHub
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" asChild>
              <a href="https://linkedin.com/in/jonbogaty" target="_blank" rel="noopener noreferrer">
                <Linkedin className="size-3.5" />
                LinkedIn
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" asChild>
              <a href="https://t.me/jbpersonaldev" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-3.5" />
                Telegram
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade into content */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
