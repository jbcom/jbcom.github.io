import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type resume from '@/content/resume.json'

const HEADLINE_CATEGORIES = new Set(['Cloud Platforms', 'Programming', 'Infrastructure as Code'])

export function SkillGrid({ categories }: { categories: typeof resume.skills }) {
  const headline = categories.filter((c) => HEADLINE_CATEGORIES.has(c.name))
  const rest = categories.filter((c) => !HEADLINE_CATEGORIES.has(c.name))

  return (
    <div className="space-y-6">
      {headline.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {headline.map((cat) => (
            <Card key={cat.name} className="border-border border-l-2 border-l-primary">
              <CardContent className="p-5">
                <h3 className="font-heading text-lg text-foreground mb-3">{cat.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.keywords.map((kw) => (
                    <Badge key={kw} variant="secondary" className="text-xs font-normal">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((cat) => (
            <Card key={cat.name} className="border-border">
              <CardContent className="p-4">
                <h3 className="font-mono text-xs font-medium text-primary uppercase tracking-wider mb-2">
                  {cat.name}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.keywords.map((kw) => (
                    <Badge key={kw} variant="secondary" className="text-xs font-normal">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
