/**
 * jbcom Ecosystem Data
 *
 * Complete catalog of all packages in the jbcom organization.
 * This data powers the Ecosystem page and project detail views.
 */

export type Language = 'typescript' | 'python' | 'go' | 'terraform'
export type Category = 'ai' | 'games' | 'infra' | 'libs'
export type Status = 'stable' | 'beta' | 'alpha' | 'wip'

export interface Package {
  id: string
  name: string
  displayName: string
  description: string
  longDescription?: string
  category: Category
  language: Language
  repo: string
  npm?: string
  pypi?: string
  docs?: string
  demo?: string
  status: Status
  featured: boolean
  tags: string[]
}

export const packages: Package[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // AI & AGENTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'agentic-control',
    name: 'nodejs-agentic-control',
    displayName: 'agentic-control',
    description: 'Unified AI agent fleet management, triage, and orchestration toolkit',
    longDescription: `A comprehensive TypeScript toolkit for managing AI agent fleets across multiple organizations.
    
Features:
- Intelligent multi-org token switching (jbcom, FlipsideCrypto, etc.)
- Fleet orchestration and monitoring
- Integration with GitHub, Anthropic, OpenAI
- Agent spawning and lifecycle management`,
    category: 'ai',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-agentic-control',
    npm: '@jbcom/agentic-control',
    status: 'stable',
    featured: true,
    tags: ['AI', 'Agents', 'Fleet Management', 'CLI', 'npm'],
  },
  {
    id: 'agentic-crew',
    name: 'python-agentic-crew',
    displayName: 'agentic-crew',
    description: 'Framework-agnostic AI crew orchestration - declare once, run anywhere',
    longDescription: `Define your AI crews once, deploy on any framework.

Supported frameworks:
- CrewAI
- LangGraph
- AWS Strands

Features:
- Unified configuration format
- Framework adapters
- Built-in tool integrations`,
    category: 'ai',
    language: 'python',
    repo: 'https://github.com/jbcom/python-agentic-crew',
    pypi: 'agentic-crew',
    status: 'beta',
    featured: true,
    tags: ['AI', 'CrewAI', 'LangGraph', 'Strands', 'PyPI'],
  },
  {
    id: 'agentic-triage',
    name: 'nodejs-agentic-triage',
    displayName: 'agentic-triage',
    description: 'AI-powered GitHub issue triage, PR review, and sprint planning',
    category: 'ai',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-agentic-triage',
    npm: '@jbcom/agentic-triage',
    status: 'beta',
    featured: false,
    tags: ['AI', 'GitHub', 'Triage', 'CLI', 'Sprint Planning'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GAME DEVELOPMENT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'strata',
    name: 'nodejs-strata',
    displayName: 'strata',
    description: 'Procedural 3D graphics library - terrain, water, vegetation, sky, volumetrics',
    longDescription: `The complete solution for layered 3D game development.

Layer System:
- **Background**: Sky, volumetrics, distant terrain
- **Midground**: Water, vegetation, particles
- **Foreground**: Characters, fur, molecular rendering

This website is powered by strata.`,
    category: 'games',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-strata',
    npm: '@jbcom/strata',
    demo: '/demos/strata',
    status: 'beta',
    featured: true,
    tags: ['3D', 'React Three Fiber', 'Procedural', 'WebGL', 'Layers'],
  },
  {
    id: 'rivermarsh',
    name: 'nodejs-rivermarsh',
    displayName: 'Rivermarsh',
    description: 'Mobile-first 3D exploration game with strata and Capacitor',
    category: 'games',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-rivermarsh',
    status: 'alpha',
    featured: false,
    tags: ['Mobile', 'Game', '3D', 'Capacitor', 'strata'],
  },
  {
    id: 'otterfall',
    name: 'nodejs-otterfall',
    displayName: 'Otterfall',
    description: '3D adventure with procedural terrain and AI-driven gameplay',
    category: 'games',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-otterfall',
    status: 'alpha',
    featured: false,
    tags: ['Game', '3D', 'Procedural', 'AI', 'strata'],
  },
  {
    id: 'otter-river-rush',
    name: 'nodejs-otter-river-rush',
    displayName: 'Otter River Rush',
    description: 'River racing with procedural levels and multiplayer',
    category: 'games',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-otter-river-rush',
    status: 'alpha',
    featured: false,
    tags: ['Game', 'Racing', 'Multiplayer', 'Procedural'],
  },
  {
    id: 'pixels-pygame-palace',
    name: 'nodejs-pixels-pygame-palace',
    displayName: "Professor Pixel's Palace",
    description: 'Educational game platform for learning game development',
    category: 'games',
    language: 'typescript',
    repo: 'https://github.com/jbcom/nodejs-pixels-pygame-palace',
    status: 'wip',
    featured: false,
    tags: ['Education', 'Game Dev', 'Learning'],
  },
  {
    id: 'ai-game-dev',
    name: 'python-ai-game-dev',
    displayName: 'AI Game Dev',
    description: "Professor Pixel's AI-powered game development assistant",
    category: 'games',
    language: 'python',
    repo: 'https://github.com/jbcom/python-ai-game-dev',
    status: 'wip',
    featured: false,
    tags: ['AI', 'Education', 'Game Development'],
  },
  {
    id: 'rivers-of-reckoning',
    name: 'python-rivers-of-reckoning',
    displayName: 'Rivers of Reckoning',
    description: 'Narrative roguelike with procedural storytelling',
    category: 'games',
    language: 'python',
    repo: 'https://github.com/jbcom/python-rivers-of-reckoning',
    status: 'wip',
    featured: false,
    tags: ['Roguelike', 'Narrative', 'Procedural'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INFRASTRUCTURE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'vendor-connectors',
    name: 'python-vendor-connectors',
    displayName: 'vendor-connectors',
    description: 'Enterprise connectors for AWS, GCP, GitHub, Slack, Vault, Zoom',
    longDescription: `Unified Python library for enterprise service integration.

Connectors:
- AWS (S3, Secrets Manager, IAM)
- Google Cloud (APIs, Billing, Resource Manager)
- GitHub (REST and GraphQL)
- Slack (Web API, Events)
- HashiCorp Vault
- Zoom

All connectors include AI tool interfaces for LangChain/CrewAI.`,
    category: 'infra',
    language: 'python',
    repo: 'https://github.com/jbcom/python-vendor-connectors',
    pypi: 'vendor-connectors',
    status: 'stable',
    featured: true,
    tags: ['Enterprise', 'AWS', 'GCP', 'Vault', 'Connectors', 'PyPI'],
  },
  {
    id: 'secretsync',
    name: 'go-secretsync',
    displayName: 'SecretSync',
    description: 'Enterprise secret sync from Vault to AWS Secrets Manager',
    category: 'infra',
    language: 'go',
    repo: 'https://github.com/jbcom/go-secretsync',
    status: 'stable',
    featured: false,
    tags: ['Secrets', 'Vault', 'AWS', 'Enterprise'],
  },
  {
    id: 'vault-secret-sync',
    name: 'go-vault-secret-sync',
    displayName: 'Vault Secret Sync',
    description: 'Real-time sync from Vault to cloud secret stores',
    category: 'infra',
    language: 'go',
    repo: 'https://github.com/jbcom/go-vault-secret-sync',
    status: 'stable',
    featured: false,
    tags: ['Vault', 'Secrets', 'Sync', 'Real-time'],
  },
  {
    id: 'terraform-github-markdown',
    name: 'terraform-github-markdown',
    displayName: 'terraform-github-markdown',
    description: 'Terraform module for GitHub repository file management',
    category: 'infra',
    language: 'terraform',
    repo: 'https://github.com/jbcom/terraform-github-markdown',
    status: 'stable',
    featured: false,
    tags: ['Terraform', 'GitHub', 'IaC'],
  },
  {
    id: 'terraform-repository-automation',
    name: 'terraform-repository-automation',
    displayName: 'terraform-repository-automation',
    description: 'Terraform module for GitHub repository configuration',
    category: 'infra',
    language: 'terraform',
    repo: 'https://github.com/jbcom/terraform-repository-automation',
    status: 'stable',
    featured: false,
    tags: ['Terraform', 'GitHub', 'Automation', 'IaC'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIBRARIES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'extended-data-types',
    name: 'python-extended-data-types',
    displayName: 'extended-data-types',
    description: 'Enhanced Python data types for maps, lists, and configuration',
    category: 'libs',
    language: 'python',
    repo: 'https://github.com/jbcom/python-extended-data-types',
    pypi: 'extended-data-types',
    status: 'stable',
    featured: false,
    tags: ['Python', 'Data Types', 'Utilities', 'PyPI'],
  },
  {
    id: 'directed-inputs-class',
    name: 'python-directed-inputs-class',
    displayName: 'directed-inputs-class',
    description: 'Type-safe configuration with environment overrides',
    category: 'libs',
    language: 'python',
    repo: 'https://github.com/jbcom/python-directed-inputs-class',
    pypi: 'directed-inputs-class',
    status: 'stable',
    featured: false,
    tags: ['Configuration', 'Type Safety', 'Validation', 'PyPI'],
  },
  {
    id: 'lifecyclelogging',
    name: 'python-lifecyclelogging',
    displayName: 'lifecyclelogging',
    description: 'Flexible logging with rich formatting and verbosity controls',
    category: 'libs',
    language: 'python',
    repo: 'https://github.com/jbcom/python-lifecyclelogging',
    pypi: 'lifecyclelogging',
    status: 'stable',
    featured: false,
    tags: ['Logging', 'CLI', 'Rich', 'PyPI'],
  },
  {
    id: 'python-terraform-bridge',
    name: 'python-terraform-bridge',
    displayName: 'python-terraform-bridge',
    description: 'Python utilities for Terraform data sources and modules',
    category: 'libs',
    language: 'python',
    repo: 'https://github.com/jbcom/python-terraform-bridge',
    pypi: 'python-terraform-bridge',
    status: 'stable',
    featured: false,
    tags: ['Terraform', 'Python', 'Bridge', 'IaC'],
  },
  {
    id: 'port-api',
    name: 'go-port-api',
    displayName: 'Port API',
    description: 'Unified port management across services',
    category: 'libs',
    language: 'go',
    repo: 'https://github.com/jbcom/go-port-api',
    status: 'stable',
    featured: false,
    tags: ['API', 'Ports', 'Services'],
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY METADATA
// ═══════════════════════════════════════════════════════════════════════════

export const categories: Record<
  Category,
  {
    name: string
    description: string
    color: string
    icon: string
  }
> = {
  ai: {
    name: 'AI & Agents',
    description: 'AI orchestration, agent management, and intelligent automation',
    color: '#7c3aed',
    icon: 'psychology',
  },
  games: {
    name: 'Game Development',
    description: 'Procedural graphics, game engines, and interactive experiences',
    color: '#06b6d4',
    icon: 'gamepad',
  },
  infra: {
    name: 'Infrastructure',
    description: 'Enterprise connectors, secret management, and DevOps tooling',
    color: '#10b981',
    icon: 'storage',
  },
  libs: {
    name: 'Libraries',
    description: 'Utility libraries, data types, and developer tools',
    color: '#f59e0b',
    icon: 'terminal',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// LANGUAGE METADATA
// ═══════════════════════════════════════════════════════════════════════════

export const languages: Record<
  Language,
  {
    name: string
    color: string
    icon: string
  }
> = {
  typescript: {
    name: 'TypeScript',
    color: '#3178c6',
    icon: 'TS',
  },
  python: {
    name: 'Python',
    color: '#3776ab',
    icon: 'PY',
  },
  go: {
    name: 'Go',
    color: '#00add8',
    icon: 'GO',
  },
  terraform: {
    name: 'Terraform',
    color: '#7b42bc',
    icon: 'TF',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

export const getFeaturedPackages = () => packages.filter((p) => p.featured)

export const getPackagesByCategory = (category: Category) =>
  packages.filter((p) => p.category === category)

export const getPackagesByLanguage = (language: Language) =>
  packages.filter((p) => p.language === language)

export const getPackageById = (id: string) => packages.find((p) => p.id === id)

export const getPackageCount = () => packages.length

export const getCategoryStats = () => {
  return Object.keys(categories).map((cat) => ({
    category: cat as Category,
    ...categories[cat as Category],
    count: packages.filter((p) => p.category === cat).length,
  }))
}
