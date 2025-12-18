# Organization Control Center

This repository (`jbcom.github.io`) serves dual purposes:

1. **Public Portfolio Site** - Jon Bogaty's professional portfolio hosted on GitHub Pages
2. **Organization Control Center** - Central hub for org-wide settings and AI agent instructions

This document explains the **organization control center** functionality.

---

## 🔄 Settings Synchronization

### Probot Settings App

This repository uses the [Probot Settings App](https://probot.github.io/apps/settings/) to synchronize configuration across all repositories in the `jbcom` organization.

**How it works:**
1. Settings are defined in `.github/settings.yml` in this repository
2. The Probot app propagates these settings to all org repositories
3. Individual repos inherit defaults and can override specific settings
4. Changes made in target repos are **overwritten** by the control center sync

### What Gets Synced

| Setting | File | Description |
|---------|------|-------------|
| Repository defaults | `settings.yml` | Issues, projects, wiki, merge settings |
| Branch protection | `settings.yml` | Rulesets for main and PR branches |
| Labels | `settings.yml` | Standardized labels across all repos |
| Environments | `settings.yml` | Deployment environment configs |

### settings.yml Structure

```yaml
# .github/settings.yml

repository:
  has_issues: true
  has_projects: true
  allow_squash_merge: true
  delete_branch_on_merge: true
  # ... more settings

labels:
  - name: "priority: critical"
    color: b60205
    description: Critical priority
  # ... more labels

rulesets:
  - name: Main
    target: branch
    enforcement: active
    # ... branch rules
```

### ⚠️ Important Rules

1. **DO NOT** edit `settings.yml` in target repositories - changes will be overwritten
2. **ALL** org-wide setting changes must be made in this control center repo
3. Settings changes propagate automatically on push to `main`

---

## 🤖 AI Agent Instructions

This repository is the **source of truth** for AI agent instructions used across the organization.

### Organization-Wide Agent Files

| File | Purpose | Synced To |
|------|---------|-----------|
| `AGENTS.md` | Comprehensive agent instructions | All repos |
| `CLAUDE.md` | Claude Code specific guidance | All repos |
| `.github/copilot-instructions.md` | GitHub Copilot context | All repos |
| `.github/agents/*.md` | Role-specific agent guides | All repos |
| `.cursor/rules/*.mdc` | Cursor IDE rules | All repos |

### Agent Role Definitions

Located in `.github/agents/`:

| Agent | File | Responsibilities |
|-------|------|------------------|
| **Code Reviewer** | `code-reviewer.md` | PR reviews, security checks, quality |
| **Project Manager** | `project-manager.md` | Issues, project boards, tracking |
| **Test Runner** | `test-runner.md` | Unit, integration, E2E testing |

### Cursor Rules

Located in `.cursor/rules/`:

| Rule | Purpose |
|------|---------|
| `00-fundamentals.mdc` | Core principles for all agents |
| `01-pr-workflow.mdc` | Pull request workflow guidance |
| `02-memory-bank.mdc` | Session context management |
| `ci.mdc` | CI/CD workflow rules |
| `releases.mdc` | Release process guidelines |
| `typescript.mdc` | TypeScript-specific standards |

### How Agent Instructions Propagate

Agent instruction files are:
1. **Authored** in this control center repository
2. **Propagated** to other repos via sync mechanisms
3. **Referenced** by AI agents when working on any org repo

---

## 📊 Synced Labels

Standard labels applied to all org repositories:

### Priority Labels
| Label | Color | Description |
|-------|-------|-------------|
| `priority: critical` | 🔴 #b60205 | Must fix immediately |
| `priority: high` | 🟠 #d93f0b | High priority |
| `priority: medium` | 🟡 #fbca04 | Medium priority |

### Type Labels
| Label | Color | Description |
|-------|-------|-------------|
| `bug` | 🔴 #d73a4a | Something isn't working |
| `enhancement` | 🔵 #a2eeef | New feature or request |
| `documentation` | 🔵 #0075ca | Docs improvements |
| `epic` | 🟣 #7057ff | Epic tracking sub-tasks |

### AI Agent Labels
| Label | Color | Description |
|-------|-------|-------------|
| `Amazon Q development agent` | 🔵 #008dff | Amazon Q feature generation |
| `Amazon Q transform agent` | 🟣 #7f33ff | Amazon Q code upgrades |
| `codex` | ⚪ #ededed | Codex AI agent |
| `copilot-assigned` | 🟣 #6f42c1 | GitHub Copilot Coding Agent |

---

## 🔐 Branch Protection Rules

### Main Branch (`main`)

- ✅ Non-fast-forward commits blocked
- ✅ Linear history required
- ✅ Pull request required
- ✅ Squash merge only
- ✅ Review thread resolution required
- ⚠️ Admin bypass allowed

### PR Branches (all except `main`)

- ✅ Copilot code review on push
- ✅ Code quality checks (errors level)

---

## 🚀 Making Changes

### To Update Org Settings

1. Edit `.github/settings.yml` in this repository
2. Commit and push to `main`
3. Probot app syncs changes to all org repos

### To Update Agent Instructions

1. Edit the relevant file (`AGENTS.md`, `.github/agents/*.md`, etc.)
2. Commit and push to `main`
3. Changes propagate to target repos via sync

### To Add New Labels

1. Add label definition to `.github/settings.yml` under `labels:`
2. Commit and push to `main`
3. Label appears in all org repositories

---

## 🔗 Related Resources

- [Probot Settings App](https://probot.github.io/apps/settings/)
- [GitHub Repository Settings API](https://docs.github.com/en/rest/reference/repos#update-a-repository)
- [GitHub Rulesets Documentation](https://docs.github.com/en/rest/repos/rules)
