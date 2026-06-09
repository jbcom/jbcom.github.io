/**
 * Canonical resume data — single source of truth for the site and the DOCX.
 *
 * Authored as TypeScript (not JSON) for: multiline prose without escaping,
 * comments documenting positioning decisions, type checking, and cheap
 * role-targeted variants later.
 *
 * HARD RULE: every fact here must be real. No invented metrics, titles, or
 * dates. Positioning decisions follow docs/resume-review/recruiter-review-2026-06-09.md.
 */

export interface Profile {
  network: string
  username: string
  url: string
}

export interface Stat {
  value: string
  label: string
}

export interface WorkEntry {
  name: string
  position: string
  startDate: string
  endDate: string | null
  tech?: string[]
  summary?: string | null
  highlights: string[]
  /** When false the entry stays on the site but is cut from the DOCX. */
  onResume?: boolean
}

export interface EarlierPosition {
  name: string
  position: string
  year: string
}

export interface SkillCategory {
  name: string
  keywords: string[]
}

export interface ProjectPackage {
  name: string
  description: string
}

export type ProjectCategory = 'security' | 'agents' | 'data' | '3d'

export interface Project {
  name: string
  tagline: string
  /** Site copy — can carry personality. */
  description: string
  /** Resume copy override — leads with the engineering credential. */
  resumeDescription?: string
  /** When false the project stays on the site but is cut from the DOCX. */
  onResume?: boolean
  /** Drives the site accent color — color means category, never decoration. */
  category: ProjectCategory
  url: string
  domain?: string
  tech?: string[]
  packages?: ProjectPackage[]
}

export interface Education {
  institution: string
  area: string
  studyType: string
  startDate: string
  endDate: string
  honors: string[]
}

export interface Resume {
  about: {
    name: string
    label: string
    tagline: string
    /** One-sentence proof for the site hero — assembled from summary facts. */
    heroLine: string
    status?: { label: string; pulse?: boolean }
    stats?: Stat[]
    email: string
    url: string
    location: { city: string; region: string; countryCode: string }
    profiles: Profile[]
    summary: string[]
  }
  work: WorkEntry[]
  earlierCareer: { summary: string; positions: EarlierPosition[] }
  skills: SkillCategory[]
  projects: Project[]
  education: Education[]
}

const resume: Resume = {
  about: {
    name: 'Jon Bogaty',
    // One searchable title, not a pipe-stacked keyword list. Recruiters
    // boolean-search a single title bucket; everything else dilutes it.
    label: 'Staff Platform & DevOps Engineer',
    tagline:
      '15+ years in DevOps, SRE, and platform engineering. Five of them as the sole infrastructure engineer at Flipside Crypto. Now consulting independently and shipping open-source tooling in Rust, Go, and Python.',
    heroLine:
      'The sole infrastructure engineer at Flipside Crypto for five years — modernized AWS to ~99% serverless, built a 10,000-line Python platform generating 146 Terraform modules, and cut cloud spend by ~$100K/month.',
    // No "Available" — reads as job-hunting, not working.
    status: { label: 'Independent consulting · open to Staff platform roles', pulse: false },
    // Each stat must be self-explanatory at a glance — a bare dollar figure
    // with no baseline reads as noise; the percentage carries its own context.
    stats: [
      { value: '15', label: 'Years in infrastructure' },
      { value: '~70%', label: 'AWS cost reduction' },
      { value: '5', label: 'PyPI packages' },
    ],
    email: 'jon@jonbogaty.com',
    url: 'https://www.jonbogaty.com',
    location: { city: 'Lincoln', region: 'NE', countryCode: 'US' },
    profiles: [
      { network: 'LinkedIn', username: 'jonbogaty', url: 'https://linkedin.com/in/jonbogaty' },
      { network: 'GitHub', username: 'jbcom', url: 'https://github.com/jbcom' },
      { network: 'Telegram', username: 'jbpersonaldev', url: 'https://t.me/jbpersonaldev' },
    ],
    // Thesis: "the engineer who runs your entire platform alone." Concrete
    // facts up front; the 2015 date does the early-adopter bragging.
    summary: [
      'Infrastructure engineer with 15+ years across DevOps, SRE, and platform engineering on AWS, GCP, and Azure. As the sole DevOps engineer at Flipside Crypto for five years, modernized legacy AWS infrastructure to ~99% serverless, built a 10,000-line Python platform that generates 146+ Terraform modules across 13 providers, and cut cloud spend from ~$150K to ~$40–50K per month. Running Docker and Terraform in production since 2015.',
      'Now consulting independently in platform and DevOps engineering, and publishing open-source tooling. Three flagships: paranoid-passwd (Rust-native password manager), radioactive-ralph (Go autonomous development orchestrator), and the Extended Data Library (5 PyPI packages plus a Go secrets-sync pipeline).',
    ],
  },

  work: [
    {
      // The current period is consulting under the long-standing
      // jonbogaty.com entity (freelance since 2005, see earlierCareer) — open
      // source is a supporting mention here, never a "position." Specific
      // engagements/outcomes: [needs real engagement details from Jon].
      name: 'jonbogaty.com',
      position: 'Independent Platform & DevOps Consultant',
      startDate: '2026-01',
      endDate: null,
      tech: ['AWS', 'GCP', 'Terraform', 'Kubernetes', 'Python', 'Go', 'Rust'],
      summary:
        'Independent consulting in platform engineering, DevOps, and infrastructure automation — cloud architecture, Terraform, cost optimization, and security operations — drawing on the sole-operator playbook from Flipside.',
      highlights: [
        'Publishing production open-source tooling alongside client work: paranoid-passwd (Rust-native password manager), radioactive-ralph (Go autonomous development orchestrator), and the Extended Data Library (5 PyPI packages plus a Go secrets-sync pipeline)',
      ],
    },
    {
      name: 'Flipside Crypto',
      position: 'Staff DevOps & Platform Engineer',
      startDate: '2021-06',
      endDate: '2026-01',
      tech: ['AWS', 'GCP', 'Python', 'Terraform', 'Lambda', 'Vault', 'Snowflake', 'Fireblocks'],
      summary:
        'Founding DevOps hire at a blockchain analytics company; the sole DevOps engineer for five years, owning infrastructure, platform tooling, CI/CD, and security operations end to end.',
      // Best two proofs first: the cost win and the codegen platform.
      highlights: [
        'Cut AWS spend from ~$150K to ~$40–50K per month — ~$100K/month in sustained savings — through serverless migration, right-sizing, and automated scaling',
        'Built tm_cli, a 10,000+ line Python CLI and library that generates 146+ Terraform modules across 13 providers (AWS, GCP, GitHub, Vault, Slack) from annotated Python functions',
        'Led the five-year evolution of legacy AWS infrastructure from single-DC multi-cluster Kubernetes through container deployments to ~99% serverless (Lambda and managed services), built on Terraform and Terragrunt',
        'Architected deterministic secrets propagation with automatic deep-merge and conflict resolution across HashiCorp Vault and AWS Secrets Manager, serving hundreds of Lambda functions powering the data platform',
        'Led the cross-cloud Fireblocks co-signer migration from AWS Nitro Enclaves (Anjuna) to Fireblocks-native on GCP — enclave architecture, GCP workload identity, and MDM-managed cosigning device provisioning',
        'Established company-wide CI/CD patterns, secrets-sharing workflows, and automation standards adopted across product and data teams; mentored engineers placed into SRE roles',
        'Owned security and identity operations alongside the platform role: SSO/SCIM, HashiCorp Vault, Snowflake security, compliance audits, and incident response',
      ],
    },
    {
      name: 'GoHealth',
      position: 'Senior Site Reliability Engineer',
      startDate: '2020-08',
      endDate: '2021-06',
      tech: ['AWS', 'Python', 'Kubernetes', 'Prometheus', 'Grafana'],
      summary: null,
      highlights: [
        'Owned SRE for a high-traffic health-insurance marketplace, improving availability and operational visibility across production environments',
        'Built production monitoring and alerting systems that reduced MTTR and improved uptime through peak open-enrollment surge traffic',
      ],
    },
    {
      name: 'Symbiont',
      position: 'Senior Development Operations Engineer',
      startDate: '2017-11',
      endDate: '2020-08',
      tech: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Python', 'Go', 'Terraform', 'Packer', 'Ansible'],
      summary: null,
      highlights: [
        'Owned the enterprise CI/CD platform for a blockchain DLT product: automation and infrastructure tooling in Python, Go, Ansible, Terraform, and Packer across AWS, GCP, and Azure',
        'Designed and operated production Kubernetes across AWS EKS, GCP GKE, and Azure AKS — a version-controlled multi-cloud deployment architecture for enterprise customers',
        'Built Terraform-based repeatable customer deployment workflows for secure installs of DLT infrastructure into enterprise cloud environments on all three major providers',
      ],
    },
    {
      // Site-only: on the DOCX this is covered by the Earlier Career
      // paragraph (its cost win and early-IaC claim are quoted there).
      name: 'ClassPass',
      position: 'Senior Systems Operations Engineer',
      startDate: '2015-04',
      endDate: '2016-04',
      onResume: false,
      tech: ['AWS', 'Docker', 'Terraform', 'Packer', 'Vagrant'],
      summary: null,
      highlights: [
        'Containerized services with Docker and adopted Terraform, Packer, Atlas, and Vagrant in 2015 — infrastructure as code before it was standard practice',
        'Managed 200–300 production AWS instances powering the ClassPass desktop and mobile experience for a major international fitness subscription platform',
        'Reduced cloud costs $20K/month by deploying Netflix OSS Janitor Monkey for automated resource lifecycle management',
      ],
    },
  ],

  // Everything before Symbiont is compressed into one prose paragraph:
  // a decade of short roles reads as a consulting-style arc in prose, but as
  // job-hopping in a list. Companies and years stay named — honest and
  // background-check safe — they just don't get line items. The structured
  // positions are kept as the historical record; renderers use the summary.
  earlierCareer: {
    summary:
      'A decade of senior DevOps and infrastructure work in consulting-style engagements across ad-tech, e-commerce, mobile, and publishing — Jump Ramp (2017), Qualia Media (2016–17), ClassPass (2015–16), Magnetic (2014–15), Digital First Media (2014), EachScape (2013), and Totsy (2012–13) — alongside freelance systems consulting as jonbogaty.com (2005–13). Highlights: early production Docker and Terraform adoption (2015), a $20K/month AWS cost reduction via Netflix OSS Janitor Monkey, a 300+ server fleet managed with Chef and Rundeck, a metrics-based GCP auto-scaler, and datacenter-to-cloud migrations throughout.',
    positions: [
      { name: 'Jump Ramp', position: 'Sr. DevOps Engineer', year: '2017' },
      { name: 'Qualia Media', position: 'Sr. DevOps Engineer', year: '2016–17' },
      { name: 'ClassPass', position: 'Sr. Systems Operations Engineer', year: '2015–16' },
      { name: 'Magnetic', position: 'Sr. DevOps Engineer', year: '2014–15' },
      { name: 'Digital First Media', position: 'Sr. DevOps Engineer', year: '2014' },
      { name: 'EachScape', position: 'DevOps Engineer', year: '2013' },
      { name: 'Totsy', position: 'DevOps Engineer', year: '2012–13' },
      { name: 'jonbogaty.com', position: 'Freelance Systems Consultant', year: '2005–13' },
    ],
  },

  // Condensed to the highest-impact categories. Every keyword here either
  // matches a Staff Platform/DevOps/SRE JD filter or differentiates (AI,
  // supply-chain security). Long-tail tools live in the work bullets.
  skills: [
    {
      name: 'Platform & Reliability',
      keywords: [
        'Platform Engineering',
        'Site Reliability Engineering (SRE)',
        'Kubernetes (EKS, GKE, AKS)',
        'Docker',
        'Incident Response',
        'Cost Optimization (FinOps)',
      ],
    },
    {
      name: 'Cloud Platforms',
      keywords: [
        'AWS (Lambda, ECS/EKS, IAM, VPC, Secrets Manager, Nitro Enclaves)',
        'GCP (GKE, Pub/Sub, BigQuery, Cloud Run)',
        'Azure (AKS, Entra ID, Key Vault)',
      ],
    },
    {
      name: 'Infrastructure as Code',
      keywords: ['Terraform', 'Terragrunt', 'Packer', 'Ansible'],
    },
    {
      name: 'CI/CD & Automation',
      keywords: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'ArgoCD', 'GitOps'],
    },
    {
      name: 'Security & Compliance',
      keywords: [
        'Zero-Trust Architecture',
        'IAM/RBAC',
        'HashiCorp Vault',
        'Secrets Management',
        'Supply-Chain Security (SLSA, Sigstore, SBOM)',
        'Fireblocks',
      ],
    },
    {
      name: 'Observability',
      keywords: ['Prometheus', 'Grafana', 'Datadog', 'CloudWatch', 'PagerDuty'],
    },
    {
      name: 'Programming & AI',
      keywords: [
        'Python',
        'Go',
        'TypeScript',
        'Bash',
        'SQL',
        'AI agent orchestration',
        'MCP servers',
      ],
    },
  ],

  projects: [
    {
      name: 'radioactive-ralph',
      category: 'agents',
      tagline: 'Autonomous Continuous Development Orchestrator',
      description:
        'Drives Claude Code across a portfolio of git repos — continuously, with safety gates, and ten named variants (green, red, blue, immortal, savage, etc.). Go binary with Unix socket IPC, SQLite event log, stream-json session control, and brew/launchd/systemd service integration.',
      resumeDescription:
        'Go autonomous development orchestrator that drives Claude Code across multiple repositories with safety gates: Unix-socket IPC, SQLite event log, stream-json session control, and launchd/systemd service integration.',
      url: 'https://github.com/jbcom/radioactive-ralph',
      domain: 'jonbogaty.com/radioactive-ralph',
      tech: ['Go', 'SQLite', 'GoReleaser', 'launchd', 'systemd', 'Homebrew', 'Claude Code'],
      packages: [
        { name: 'ralph (CLI)', description: 'ralph init / run / status / service install' },
        { name: 'Claude Code plugin', description: 'Ten /ralph variants as slash commands' },
        { name: 'Homebrew + Scoop', description: 'Cross-platform distribution via jbcom/tap' },
      ],
    },
    {
      // Copy sourced from the live repo README (../paranoid-passwd) —
      // the earlier C/WASM/SLSA story is retired upstream.
      name: 'paranoid-passwd',
      category: 'security',
      tagline: 'Local Secrets. Verifiable Trust.',
      description:
        'Rust-native password manager and generator: scriptable CLI, full-screen terminal wizard, and Slint desktop GUI over an encrypted local vault (Argon2id + AES-256-GCM on SQLite). Recovery through mnemonic, device-bound, and certificate-wrapped keyslots; vendored locked dependencies and verifiable, attested releases.',
      resumeDescription:
        'Rust-native password manager and generator — CLI, terminal wizard, and Slint desktop GUI over an Argon2id + AES-256-GCM encrypted vault with mnemonic, device-bound, and certificate-wrapped recovery keyslots; vendored locked dependencies and attested releases.',
      url: 'https://github.com/jbcom/paranoid-passwd',
      domain: 'paranoid-passwd.com',
      tech: ['Rust', 'Slint', 'OpenSSL', 'SQLite', 'Argon2id', 'AES-256-GCM'],
      packages: [
        { name: 'paranoid-passwd', description: 'CLI, generator wizard TUI, and native vault TUI' },
        { name: 'paranoid-passwd-gui', description: 'Slint desktop app — macOS .dmg, Linux .deb' },
        { name: '7-crate workspace', description: 'core · vault · seal · audit · ops · cli · gui' },
      ],
    },
    {
      name: 'Extended Data Library',
      category: 'data',
      tagline: 'Python + Go Data Toolkit',
      description:
        'Python monorepo of 5 independently published PyPI packages — multi-format serialization, configuration management, structured logging, and cloud connectors — plus a Go secrets-sync pipeline. Strict typing, 75%+ test coverage, MCP server support.',
      url: 'https://github.com/jbcom/extended-data-types',
      domain: 'extended-data.dev',
      tech: ['Python', 'Go', 'FastAPI', 'Pydantic', 'boto3', 'Vault', 'Anthropic SDK'],
      packages: [
        {
          name: 'extended-data-types',
          description: 'Multi-format serialization (YAML, JSON, TOML, HCL)',
        },
        {
          name: 'lifecyclelogging',
          description: 'Lifecycle-aware structured logging with rich output',
        },
        { name: 'vendor-connectors', description: 'Universal cloud & AI service connectors' },
        { name: 'secretssync', description: 'Enterprise secret sync pipeline (Go)' },
      ],
    },
  ],

  education: [
    {
      institution: 'Ivy Tech Community College',
      area: 'Computer Information Technology',
      studyType: 'Associate of Applied Science (AAS)',
      startDate: '2007',
      endDate: '2009',
      honors: ['Graduated with Honors', "Dean's List (All Semesters)"],
    },
  ],
}

export default resume
