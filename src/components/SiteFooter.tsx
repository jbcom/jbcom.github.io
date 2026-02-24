import { Download, Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/jbcom', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jonbogaty', icon: Linkedin },
  { label: 'Telegram', href: 'https://t.me/jbpersonaldev', icon: MessageCircle },
  { label: 'Email', href: 'mailto:jon@jonbogaty.com', icon: Mail },
]

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand + Location */}
          <div className="space-y-3">
            <div>
              <span className="font-heading text-xl text-foreground">Jon Bogaty</span>
              <p className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-wider mt-1">
                DevOps · SRE · Platform Engineering · AI
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              Lincoln, NE · Open to remote worldwide
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  <link.icon className="size-3.5" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Resume Downloads */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Resume
            </h3>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" className="w-fit gap-2" asChild>
                <a href="/Jon_Bogaty_Resume.pdf" download>
                  <Download className="size-3.5" />
                  Download PDF
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-fit gap-2 text-muted-foreground"
                asChild
              >
                <a href="/Jon_Bogaty_Resume.docx" download>
                  <Download className="size-3.5" />
                  Download DOCX
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-xs text-muted-foreground text-center">
          &copy; {currentYear} Jon Bogaty. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
