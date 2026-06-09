import type { SkillCategory } from '@/content/resume'

const LEAD =
  'Day to day: AWS and GCP, Terraform and Terragrunt, Kubernetes across EKS/GKE/AKS, Python and Go, and the CI/CD and secrets plumbing that ties them together.'

/** Spec-sheet rows, not a chip cloud — every skill in plain prose. */
export function SkillSheet({ categories }: { categories: SkillCategory[] }) {
  return (
    <div className="space-y-6 max-w-3xl">
      <p className="text-base text-foreground/85 leading-relaxed">{LEAD}</p>
      <dl>
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-x-8 gap-y-1 py-3 border-b border-border/50 last:border-0"
          >
            <dt className="font-mono text-xs font-medium text-primary uppercase tracking-wider pt-0.5">
              {cat.name}
            </dt>
            <dd className="text-sm text-muted-foreground leading-relaxed">
              {cat.keywords.join(', ')}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
