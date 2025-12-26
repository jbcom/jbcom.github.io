/**
 * jbcom Ecosystem Data
 *
 * Complete catalog of packages. Each is production-tested.
 * Includes dependency relationships showing how primitives power complex packages.
 */

export type Language = 'typescript' | 'python' | 'go' | 'terraform'
export type Category = 'ai' | 'games' | 'infra' | 'libs'
export type Status = 'stable' | 'beta' | 'alpha' | 'wip'
export type PackageTier = 'primitive' | 'core' | 'application'

export interface CategoryInfo {
  name: string
  description: string
  color: string
  division: string
}

export interface Package {
  id: string
  name: string
  displayName: string
  description: string
  category: Category
  language: Language
  repo: string
  npm?: string
  pypi?: string
  demo?: string
  status: Status
  featured: boolean
  tags: string[]
  /** IDs of packages this one depends on (within jbcom ecosystem) */
  dependsOn?: string[]
  /** Tier: primitive (foundation), core (built on primitives), application (end-user) */
  tier?: PackageTier
  /** For games/apps: indicates web version is coming soon */
  comingSoon?: boolean
  /** Expected launch info for coming soon items */
  comingSoonText?: string
}

export const packages: Package[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // AI & AGENTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'agentic-control',
    name: 'nodejs-agentic-control',
    displayName: 'agentic-control',
    description:
      'Fleet management for AI agents. Spawn, monitor, triage, and orchestrate agents across organizations.',
    category: 'ai',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-agentic-control',
    npm: '@jbcom/agentic-control',
    status: 'stable',
    featured: true,
    tags: ['AI', 'Agents', 'Fleet', 'CLI'],
    tier: 'application',
  },
  {
    id: 'agentic-crew',
    name: 'python-agentic-crew',
    displayName: 'agentic-crew',
    description:
      'Define crews once, deploy anywhere. Framework-agnostic AI crew configuration for CrewAI, LangGraph, and Strands.',
    category: 'ai',
    language: 'python',
    repo: 'https://github.com/jbcom/python-agentic-crew',
    pypi: 'agentic-crew',
    status: 'beta',
    featured: true,
    tags: ['AI', 'CrewAI', 'LangGraph', 'Orchestration'],
    dependsOn: ['vendor-connectors', 'lifecyclelogging', 'directed-inputs-class'],
    tier: 'application',
  },
  {
    id: 'agentic-triage',
    name: 'nodejs-agentic-triage',
    displayName: 'agentic-triage',
    description:
      'AI-powered GitHub issue triage and sprint planning. Classify, prioritize, and route issues automatically.',
    category: 'ai',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-agentic-triage',
    npm: '@jbcom/agentic-triage',
    status: 'beta',
    featured: false,
    tags: ['AI', 'GitHub', 'Triage', 'Planning'],
    dependsOn: ['agentic-control'],
    tier: 'application',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GAME DEVELOPMENT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'strata',
    name: 'nodejs-strata',
    displayName: 'strata',
    description:
      'Procedural 3D graphics for React Three Fiber. Layered terrain, water, vegetation, sky, and volumetrics.',
    category: 'games',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-strata',
    npm: '@jbcom/strata',
    demo: '/demos',
    status: 'beta',
    featured: true,
    tags: ['3D', 'Procedural', 'R3F', 'WebGL'],
    tier: 'core',
  },
  {
    id: 'rivermarsh',
    name: 'nodejs-rivermarsh',
    displayName: 'Rivermarsh',
    description:
      'Mobile 3D exploration game built with strata and Capacitor. Explore procedurally generated marshlands, discover wildlife, and uncover hidden secrets.',
    category: 'games',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-rivermarsh',
    status: 'alpha',
    featured: false,
    tags: ['Mobile', 'Game', '3D', 'Capacitor', 'Exploration'],
    dependsOn: ['strata'],
    tier: 'application',
    comingSoon: true,
    comingSoonText: 'Web demo coming Q1 2026',
  },
  {
    id: 'otterfall',
    name: 'nodejs-otterfall',
    displayName: 'Otterfall',
    description:
      '3D adventure with procedural terrain generation. Guide your otter through cascading waterfalls and dynamic environments.',
    category: 'games',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-otterfall',
    status: 'alpha',
    featured: false,
    tags: ['Game', '3D', 'Procedural', 'Adventure'],
    dependsOn: ['strata'],
    tier: 'application',
    comingSoon: true,
    comingSoonText: 'In development',
  },
  {
    id: 'otter-river-rush',
    name: 'nodejs-otter-river-rush',
    displayName: 'Otter River Rush',
    description:
      'Fast-paced river racing with procedurally generated levels. Dodge obstacles, collect power-ups, and race against time.',
    category: 'games',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-otter-river-rush',
    status: 'alpha',
    featured: false,
    tags: ['Game', 'Racing', 'Procedural', 'Arcade'],
    dependsOn: ['strata'],
    tier: 'application',
    comingSoon: true,
    comingSoonText: 'In development',
  },
  {
    id: 'pixels-pygame-palace',
    name: 'nodejs-pixels-pygame-palace',
    displayName: "Pixel's Palace",
    description:
      "Professor Pixel's educational platform for learning game development. Interactive tutorials, coding challenges, and creative projects.",
    category: 'games',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-pixels-pygame-palace',
    status: 'wip',
    featured: false,
    tags: ['Education', 'Game Dev', 'Learning', 'Interactive'],
    tier: 'application',
    comingSoon: true,
    comingSoonText: 'Coming 2026',
  },
  {
    id: 'ai-game-dev',
    name: 'python-ai-game-dev',
    displayName: 'AI Game Dev',
    description: 'AI-assisted game development tools.',
    category: 'games',
    language: 'python',
    repo: 'https://github.com/jbcom/python-ai-game-dev',
    status: 'wip',
    featured: false,
    tags: ['AI', 'Game Dev'],
    dependsOn: ['agentic-crew', 'lifecyclelogging'],
    tier: 'application',
  },
  {
    id: 'rivers-of-reckoning',
    name: 'python-rivers-of-reckoning',
    displayName: 'Rivers of Reckoning',
    description: 'Narrative roguelike with procedural storytelling.',
    category: 'games',
    language: 'python',
    repo: 'https://github.com/jbcom/python-rivers-of-reckoning',
    status: 'wip',
    featured: false,
    tags: ['Roguelike', 'Narrative'],
    tier: 'application',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INFRASTRUCTURE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'vendor-connectors',
    name: 'python-vendor-connectors',
    displayName: 'vendor-connectors',
    description:
      'Unified Python clients for AWS, GCP, GitHub, Slack, Vault, and Zoom. Includes AI tool interfaces.',
    category: 'infra',
    language: 'python',
    repo: 'https://github.com/jbcom/python-vendor-connectors',
    pypi: 'vendor-connectors',
    status: 'stable',
    featured: true,
    tags: ['Enterprise', 'AWS', 'GCP', 'Connectors'],
    dependsOn: ['extended-data-types', 'directed-inputs-class', 'lifecyclelogging'],
    tier: 'core',
  },
  {
    id: 'secretsync',
    name: 'go-secretsync',
    displayName: 'SecretSync',
    description: 'Sync secrets from HashiCorp Vault to AWS Secrets Manager in real-time.',
    category: 'infra',
    language: 'go',
    repo: 'https://github.com/jbcom/go-secretsync',
    status: 'stable',
    featured: false,
    tags: ['Secrets', 'Vault', 'AWS'],
    tier: 'core',
  },
  {
    id: 'vault-secret-sync',
    name: 'go-vault-secret-sync',
    displayName: 'Vault Secret Sync',
    description: 'Kubernetes operator for Vault-to-cloud secret synchronization.',
    category: 'infra',
    language: 'go',
    repo: 'https://github.com/jbcom/go-vault-secret-sync',
    status: 'stable',
    featured: false,
    tags: ['Vault', 'Kubernetes', 'Secrets'],
    dependsOn: ['secretsync'],
    tier: 'application',
  },
  {
    id: 'terraform-github-markdown',
    name: 'terraform-github-markdown',
    displayName: 'terraform-github-markdown',
    description: 'Terraform module for managing GitHub repository files.',
    category: 'infra',
    language: 'terraform',
    repo: 'https://github.com/jbcom/terraform-github-markdown',
    status: 'stable',
    featured: false,
    tags: ['Terraform', 'GitHub', 'IaC'],
    tier: 'core',
  },
  {
    id: 'terraform-repository-automation',
    name: 'terraform-repository-automation',
    displayName: 'terraform-repository-automation',
    description: 'Terraform module for GitHub repository settings, rulesets, and configuration.',
    category: 'infra',
    language: 'terraform',
    repo: 'https://github.com/jbcom/terraform-repository-automation',
    status: 'stable',
    featured: false,
    tags: ['Terraform', 'GitHub', 'Automation'],
    dependsOn: ['terraform-github-markdown'],
    tier: 'application',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIBRARIES (Primitives)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'extended-data-types',
    name: 'python-extended-data-types',
    displayName: 'extended-data-types',
    description:
      'Enhanced Python data structures: deep-merge maps, typed lists, and configuration helpers.',
    category: 'libs',
    language: 'python',
    repo: 'https://github.com/jbcom/python-extended-data-types',
    pypi: 'extended-data-types',
    status: 'stable',
    featured: false,
    tags: ['Python', 'Data Structures', 'Utilities'],
    tier: 'primitive',
  },
  {
    id: 'directed-inputs-class',
    name: 'python-directed-inputs-class',
    displayName: 'directed-inputs-class',
    description: 'Type-safe configuration with environment variable overrides and validation.',
    category: 'libs',
    language: 'python',
    repo: 'https://github.com/jbcom/python-directed-inputs-class',
    pypi: 'directed-inputs-class',
    status: 'stable',
    featured: false,
    tags: ['Configuration', 'Validation', 'Type Safety'],
    dependsOn: ['extended-data-types'],
    tier: 'primitive',
  },
  {
    id: 'lifecyclelogging',
    name: 'python-lifecyclelogging',
    displayName: 'lifecyclelogging',
    description:
      'Structured logging with rich formatting, verbosity controls, and lifecycle tracking.',
    category: 'libs',
    language: 'python',
    repo: 'https://github.com/jbcom/python-lifecyclelogging',
    pypi: 'lifecyclelogging',
    status: 'stable',
    featured: false,
    tags: ['Logging', 'CLI', 'Rich'],
    tier: 'primitive',
  },
  {
    id: 'python-terraform-bridge',
    name: 'python-terraform-bridge',
    displayName: 'python-terraform-bridge',
    description: 'Python utilities for Terraform external data sources and module development.',
    category: 'libs',
    language: 'python',
    repo: 'https://github.com/jbcom/python-terraform-bridge',
    pypi: 'python-terraform-bridge',
    status: 'stable',
    featured: false,
    tags: ['Terraform', 'Python', 'IaC'],
    dependsOn: ['extended-data-types', 'directed-inputs-class'],
    tier: 'core',
  },
  {
    id: 'port-api',
    name: 'go-port-api',
    displayName: 'Port API',
    description: 'Service port management and discovery API.',
    category: 'libs',
    language: 'go',
    repo: 'https://github.com/jbcom/go-port-api',
    status: 'stable',
    featured: false,
    tags: ['API', 'Services', 'Ports'],
    tier: 'primitive',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// METADATA
// ═══════════════════════════════════════════════════════════════════════════

export const categories: Record<Category, CategoryInfo> = {
  ai: {
    name: 'AI & Agents',
    description: 'Orchestration, fleet management, and intelligent automation',
    color: '#8b5cf6',
    division: 'Agentic',
  },
  games: {
    name: 'Game Development',
    description: 'Procedural graphics, game engines, and interactive experiences',
    color: '#06b6d4',
    division: 'Strata',
  },
  infra: {
    name: 'Infrastructure',
    description: 'Enterprise connectors, secrets, and DevOps tooling',
    color: '#10b981',
    division: 'Extended Data',
  },
  libs: {
    name: 'Libraries',
    description: 'Utilities, data types, and developer tools',
    color: '#f59e0b',
    division: 'Extended Data',
  },
}

export const languages: Record<Language, { name: string; color: string; icon: string }> = {
  typescript: { name: 'TypeScript', color: '#3178c6', icon: 'TS' },
  python: { name: 'Python', color: '#3776ab', icon: 'PY' },
  go: { name: 'Go', color: '#00add8', icon: 'GO' },
  terraform: { name: 'Terraform', color: '#7b42bc', icon: 'TF' },
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

export const getFeaturedPackages = () => packages.filter((p) => p.featured)
export const getPackagesByCategory = (cat: Category) => packages.filter((p) => p.category === cat)
export const getPackagesByLanguage = (lang: Language) => packages.filter((p) => p.language === lang)
export const getPackageById = (id: string) => packages.find((p) => p.id === id)
export const getPackageCount = () => packages.length
