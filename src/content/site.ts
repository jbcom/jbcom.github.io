export interface OutcomeStory {
  slug: string
  eyebrow: string
  title: string
  summary: string
  proof: string[]
  complements: { label: string; href: string }[]
}

export interface OperatingPrinciple {
  title: string
  body: string
}

export interface ContributorSignal {
  title: string
  body: string
}

export interface ContributionMode {
  title: string
  context: string
  proof: string
}

export const outcomeStories: OutcomeStory[] = [
  {
    slug: 'confidential-startup-platform',
    eyebrow: 'Confidential consulting',
    title: 'Turned early-stage product direction into a deployable platform',
    summary:
      'For a confidential stealth startup, the work is not just feature delivery. It is turning product, research, auth, media, ML-worker, deployment, and security requirements into a coherent platform that can move toward production without exposing the client publicly.',
    proof: [
      'Two-service topology: TypeScript web/API plus Python worker for media processing, moderation, entity extraction, and matching.',
      'Production-readiness path across Railway, Neon Postgres, S3 blob storage, Doppler secrets, Drizzle migrations, Procrastinate queueing, Postgres LISTEN/NOTIFY, and SSE.',
      'Auth, security, and quality foundations covering browser sessions, bearer tokens, native OAuth bridge, DB-backed admin roles, CSRF/rate-limit posture, and web/worker test lanes.',
    ],
    complements: [
      { label: 'CV experience', href: '/cv#experience' },
      { label: 'Services: platform audit', href: '/services' },
    ],
  },
  {
    slug: 'career-infrastructure-arc',
    eyebrow: 'Career through-line',
    title: 'Kept turning infrastructure sprawl into operable systems',
    summary:
      'Before the most recent Staff role, the same pattern was already present: fleet operations, cloud migrations, infrastructure as code, CI/CD, and operational cleanup across consulting-style infrastructure environments.',
    proof: [
      'Early production Docker and Terraform adoption in the 2015 era.',
      'Chef/Rundeck fleet automation, datacenter-to-cloud migrations, and cloud cost control across pre-2017 infrastructure roles.',
      'Later work extended the same pattern into multi-cloud Kubernetes, SRE, secrets, security operations, and FinOps.',
    ],
    complements: [
      { label: 'CV earlier career', href: '/cv#experience' },
      { label: 'Contributor profile', href: '/contributor' },
    ],
  },
  {
    slug: 'cross-cloud-delivery',
    eyebrow: 'Multi-cloud delivery',
    title: 'Built repeatable enterprise deployment paths across clouds',
    summary:
      'Before Flipside, the work was already platform-shaped: CI/CD, Terraform, Packer, Ansible, and Kubernetes across AWS, GCP, and Azure for enterprise blockchain infrastructure.',
    proof: [
      'Production Kubernetes across EKS, GKE, and AKS.',
      'Repeatable customer deployment workflows built with Terraform.',
      'Automation and infrastructure tooling written in Python, Go, Ansible, Terraform, and Packer.',
    ],
    complements: [
      { label: 'CV experience', href: '/cv#experience' },
      { label: 'Services: automation', href: '/services' },
    ],
  },
  {
    slug: 'terraform-codegen',
    eyebrow: 'Platform tooling',
    title: 'Turned infrastructure repetition into generated modules',
    summary:
      'At Flipside Crypto, tm_cli turned repeated Terraform work into a typed internal platform: infrastructure definitions were generated from annotated Python functions instead of hand-maintained module sprawl.',
    proof: [
      '10,000+ lines of Python CLI/library code.',
      '146+ generated Terraform modules.',
      '13 providers represented, including AWS, GCP, GitHub, Vault, and Slack.',
    ],
    complements: [
      { label: 'CV experience', href: '/cv#experience' },
      { label: 'Open-source systems', href: '/projects' },
    ],
  },
  {
    slug: 'secrets-security-ops',
    eyebrow: 'Security operations',
    title: 'Owned secrets, identity, compliance, and platform delivery together',
    summary:
      'Within the Flipside platform role, security operations were not separate from delivery. The same ownership surface included deterministic secrets propagation, Vault and AWS Secrets Manager workflows, SSO/SCIM, Snowflake security, audits, and incident response.',
    proof: [
      'Secrets propagation used automatic deep-merge and conflict resolution.',
      'Hundreds of Lambda functions were served by the secrets workflow.',
      'Security and identity operations sat alongside CI/CD and infrastructure ownership.',
    ],
    complements: [
      { label: 'CV skills', href: '/cv#skills' },
      { label: 'paranoid-passwd', href: '/projects#paranoid-passwd' },
    ],
  },
  {
    slug: 'flipside-cloud-cost',
    eyebrow: 'Cloud cost + architecture',
    title: 'Cut cloud spend while modernizing the platform',
    summary:
      'At Flipside Crypto, the cost story was not a one-time cleanup. It was tied to a multi-year platform migration: legacy AWS infrastructure moved toward Lambda and managed services, with right-sizing and automated scaling turning into sustained savings.',
    proof: [
      'AWS spend moved from roughly $150K/month to $40-50K/month.',
      'Savings held at about $100K/month after the migration work.',
      'The same arc moved legacy AWS infrastructure to roughly 99% serverless.',
    ],
    complements: [
      { label: 'CV experience', href: '/cv#experience' },
      { label: 'Services: cost reduction', href: '/services' },
    ],
  },
]

export const operatingPrinciples: OperatingPrinciple[] = [
  {
    title: 'Make the platform legible first',
    body: 'The first job is to expose where ownership, cost, secrets, deploy flow, and operational risk actually live. That map decides what should be automated, migrated, or left alone.',
  },
  {
    title: 'Prefer leverage over headcount theater',
    body: 'A recurring pattern in the work is building systems that let product, data, and security teams move without opening a ticket for every infrastructure change.',
  },
  {
    title: 'Tie modernization to measurable pressure',
    body: 'Serverless migration, Terraform generation, and secrets workflows matter because they reduce cost, repetition, risk, and release friction, not because they add newer tools.',
  },
  {
    title: 'Keep public artifacts connected to real operations',
    body: 'The open-source work is useful as proof when it shows release discipline, package surfaces, security thinking, and implementation taste that mirror platform work.',
  },
]

export const contributorSignals: ContributorSignal[] = [
  {
    title: 'I am strongest where ownership is unclear',
    body: 'The recurring pattern is not “knows AWS” or “writes Terraform.” It is walking into a platform surface that crosses cloud cost, deploy flow, secrets, reliability, and security operations, then making it legible enough for the rest of the company to use.',
  },
  {
    title: 'I build tools when process would otherwise sprawl',
    body: 'tm_cli, secrets propagation, release plumbing, and the public Rust/Go/Python projects all point at the same habit: replace repeated coordination with a maintained system, then make that system understandable.',
  },
  {
    title: 'I can operate alone without becoming a silo',
    body: 'The value of a senior IC is not becoming the only person who understands the platform. It is standards, CI/CD patterns, automation, mentoring, and sane defaults that let other engineers move without waiting for permission.',
  },
  {
    title: 'I bring platform, security, and cost into the same conversation',
    body: 'The work tends to be valuable because the same technical choices affect all three. Serverless migration, Terraform generation, secrets workflows, and identity operations are strongest when they are designed together.',
  },
]

export const contributionModes: ContributionMode[] = [
  {
    title: 'Owner of the messy middle',
    context:
      'When infrastructure spans product engineering, data teams, security operations, vendors, and finance.',
    proof:
      'In practice, that means treating platform tooling, CI/CD, secrets, cloud evolution, security operations, and cost pressure as one system instead of separate backlogs.',
  },
  {
    title: 'Force multiplier for small teams',
    context:
      'When the team is too small for heavy process but too mature to keep solving platform work by hand.',
    proof:
      'The pattern is turning repeated infrastructure work into maintained tools, generated configuration, release plumbing, and defaults other engineers can trust.',
  },
  {
    title: 'Builder with release discipline',
    context: 'When credibility needs to come from artifacts, not a list of claims.',
    proof:
      'The open-source portfolio shows package boundaries, installers, docs, release automation, GUI/TUI surfaces, and supply-chain/security thinking.',
  },
  {
    title: 'Senior IC who raises the floor',
    context:
      'When other engineers need better defaults instead of another meeting about best practices.',
    proof:
      'CI/CD patterns, secrets-sharing workflows, automation standards, and mentoring engineers into SRE roles were part of the platform contribution.',
  },
]
