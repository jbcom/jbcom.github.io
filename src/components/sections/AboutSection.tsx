import type resume from '@/content/resume.json'

export function AboutSection({ data }: { data: typeof resume.about }) {
  const paragraphs = Array.isArray(data.summary) ? data.summary : [data.summary]
  return (
    <div className="space-y-6 max-w-3xl">
      {paragraphs.map((p) => (
        <p key={p} className="text-sm text-muted-foreground leading-relaxed">
          {p}
        </p>
      ))}
      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
        <span>
          {data.location.city}, {data.location.region}
        </span>
        <span>·</span>
        <a
          href={`mailto:${data.email}`}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          {data.email}
        </a>
      </div>
      <div className="flex flex-wrap gap-3">
        {data.profiles.map((p) => (
          <a
            key={p.network}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {p.network} →
          </a>
        ))}
      </div>
    </div>
  )
}
