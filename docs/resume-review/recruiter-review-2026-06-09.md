# Resume Review: Recruiter + Copy Editor + Career Coach

**Date:** 2026-06-09
**Source reviewed:** `src/content/resume.ts` (canonical data — migrated from resume.json in PR #152)
**Reviewer stance:** senior technical recruiter screening Staff/Principal DevOps-Platform-SRE resumes; professional resume copy editor; career coach. Harsh-honest by request. No facts invented — `[needs real number]` marks missing data Jon must supply.

---

## A. RECRUITER 6-SECOND SCAN

**What a screener's eye hits, in order:** name → headline → current title/company → most recent dates → first 2 bullets of current role → years of experience stat.

### The headline is the biggest immediate problem
```
"Staff DevOps & Platform Engineer | Multi-Cloud Infrastructure Architect | Python/Go Open-Source Builder"
```
This is the exact pipe-stacked, three-title pattern that reads as AI/self-promotional. Worse: it's **strategically incoherent**. A screener can't tell what you are. "Staff DevOps & Platform Engineer" is a real, searchable title. "Multi-Cloud Infrastructure Architect" and "Python/Go Open-Source Builder" dilute it. Recruiters boolean-search on *one* title bucket. Pick **one** primary identity. "Open-Source Builder" actively hurts for an employed-staff-role search — it signals hobbyist, not operator.

The tagline compounds it: "Founding-DevOps operator" is strong and differentiated — that should be in the *headline*, not buried. "who ships OSS frameworks" is the wrong lead for a job seeker: it advertises the thing that looks like unemployment.

### The "Independent / Open-Source" current role — the #1 risk
As written, it reads as **unemployment with a productivity story stapled on**:
1. Company name is literally `"Independent"` — the universal recruiter tell for "between jobs."
2. The summary opens with *"Full-time focus … following departure from Flipside Crypto"* — explaining the gap *inside the role* draws a circle around it.
3. Status "Available · Independent OSS" — "Available" + "Independent" together scream *looking, not working*.

**This can be a strength, but only if reframed as deliberate.** A 15-year staff engineer who, after a layoff, spent months shipping a C/WASM supply-chain-secured password generator with SLSA L3 + Sigstore and a Go autonomous-dev orchestrator is demonstrating exactly the senior platform/security judgment the target roles want. The problem is 100% framing, not substance. Date math: Jan 2026–present = ~5 months as of June 2026 — short, explainable, recent. Don't let framing turn 5 months into a red flag.

### The 5-year sole-engineer Flipside tenure — strongest asset, undersold
"First and only DevOps engineer," 5-year arc, $150K→$40-50K/mo, 10K-line tooling. **This is the story.** It's the antidote to both the job-hopping below it and the "hobbyist" risk. Flag: 8 dense bullets means the 6-second scan bounces off the wall of text. The sole-operator + $100K/mo savings + 146-module codegen must land in the first two bullets.

### Job-hopping 2014–2020 — real pattern, currently unmitigated
- Magnetic: ~13mo · ClassPass: ~12mo · Qualia: ~11mo · Jump Ramp: **~6mo** · Symbiont: ~2.8yr ✓ · GoHealth: ~10mo

**Five sub-14-month roles in ~6 years**, including a 6-month stint. A senior screener will read flight risk — the wrong signal for a Staff hire. Symbiont (2.8yr) and Flipside (5yr) partially rehabilitate it, but nothing currently frames it. Jump Ramp at 6 months is the weakest line item and an interview landmine. Fix: compress Magnetic + Jump Ramp (+ arguably Qualia) into `earlierCareer` so the visible history reads Flipside 5yr / GoHealth / Symbiont 2.8yr / ClassPass.

### departureContext
"Role eliminated January 2026…" — correct instinct, **wrong placement**. A departure note on a resume draws attention to the ending, not the work, and contradicts the "deliberate independent period" story. **Delete `departureContext` from the resume**; handle layoff context in cover letter / recruiter screen. Only Flipside has it, which makes it stick out more.

### Does the headline match search terms?
Partially. "Staff DevOps & Platform Engineer" — searchable. Missing from headline/summary lead: **SRE** (you have the title history), **Kubernetes**, **Terraform**, **Platform Engineering** as a phrase. The AI-infra angle is present but thin for an AI-infrastructure target — one genuine project.

---

## B. ATS & STRUCTURE

### Keyword coverage
**Well covered:** AWS, GCP, Azure, Terraform, Terragrunt, Kubernetes, EKS/GKE/AKS, Docker, Lambda, Python, Go, CI/CD, GitHub Actions, GitLab CI, Jenkins, ArgoCD, GitOps, Vault, secrets management, Prometheus, Grafana, Datadog, Snowflake, IAM, Zero-Trust, SLSA, Sigstore.

**Gaps / under-weighted:**
- **"SRE" / "Site Reliability"** — only in one job title; not a named skill or summary competency. Add a reliability skill group (SLOs, error budgets, on-call, incident response).
- **"Platform Engineering"** as a literal skill keyword — implied everywhere, named nowhere.
- **Helm** — conspicuously absent for someone running EKS/GKE/AKS (add only if true).
- **OpenTelemetry, service mesh** — common Staff-Platform JD terms; add only if real.
- **FinOps / Cost Optimization** — you have the best cost story on the resume and the ATS keyword isn't present.

### Section ordering & length
- The Independent role says "— see Projects," forcing a scroll past everything. Inline one-line project descriptors or move Projects directly under Work.
- **Strata Game Library is off-narrative** for DevOps/SRE/Platform — cut from the resume (keep on the site).
- The full document is almost certainly **3+ pages**. Target 2 for a 15-year senior IC. Cut: Strata, the weakest 2014–2017 one-bullet roles (fold to earlierCareer), departureContext, and merge 2-3 Flipside bullets.

### Machine-parsing hazards
- Pipe characters in the headline — replace with a single title.
- `→` arrows and `$100K+/mo` shorthand can mangle in text extraction. Spell out: "from ~$150K to ~$40–50K per month."
- The hero stats block fragments ("15+ Years", "$100K+/mo Cloud saved") parse as noise if they reach the DOCX — ensure the generator renders them as a labeled line or drops them.
- Education at the bottom with an AAS — correct placement. Fine.

---

## C. LINE-BY-LINE COPY EDIT

### Summary
> "Track record of modernizing infrastructure as the sole DevOps engineer, authoring 10,000+ line Python tooling from scratch, and driving six-figure monthly cloud cost reductions…"

"Track record of" is an LLM tell *and* a hedge; "six-figure monthly" launders a hard number into marketing-speak.
**Rewrite:** "As the sole DevOps engineer at Flipside Crypto, modernized AWS infrastructure, authored 10,000+ lines of Python tooling from scratch, and cut cloud spend by ~$100K/month."

> "Early adopter of Docker and Terraform before industry-wide adoption"

Unverifiable puffery, and **duplicated** verbatim at ClassPass. Keep once, at ClassPass, where the 2015 date anchor proves it. In summary: "Used Docker and Terraform in production from 2015." The date does the bragging.

> "Building tools that bridge AI research and production engineering."

Vague aspirational closer. If AI-infra is a real target: "Author of an AI agent orchestration framework (Agentic) spanning TypeScript, Python, and Rust." Else cut.

> "Active open-source contributor and framework author publishing across…"

"Active open-source contributor" + "Independent" role tips the reader toward "unemployed hobbyist," and undersells the truth.
**Rewrite:** "Author and maintainer of five published frameworks across Python, Go, TypeScript, and Rust, including a polyglot AI-agent orchestration toolkit and a 5-package data library."

### Independent (current role)
> "Full-time focus on production-grade open-source infrastructure tooling following departure from Flipside Crypto."

Explains the gap inside the role. **Rewrite:** "Independent open-source work focused on supply-chain security, reproducible builds, and autonomous agent orchestration — shipping production-grade tooling in Go, C/WASM, and Python."

> "Authoring case studies on multi-cloud migration patterns…"

"Authoring case studies" = blogging; reads as filler activity. Cut, or move published writing to a Writing/Talks section with links.

> "— see Projects"

Breaks the skim. Inline: "…paranoid-passwd, a C/WASM password generator with SLSA L3 provenance and Sigstore keyless signing."

### Flipside Crypto
> "Joined as the first and only DevOps engineer; overhauled legacy AWS infrastructure … to 99% serverless…"

Strong but a 40-word run-on with the best metric at the end. **Rewrite:** "First and only DevOps engineer; led a 5-year migration of legacy AWS infrastructure to ~99% serverless (Lambda + managed services)." `[verify: 99% — measured or estimate?]`

> tm_cli bullet — your single best technical bullet. Tighten: "Built tm_cli — a 10,000+ line Python CLI/library that generates 146+ Terraform modules across 13 providers (AWS, GCP, GitHub, Vault, Slack) from annotated Python functions."

> "$150K/month → $40-50K/month … $100K+/month in sustained savings"

Nearly perfect — **move to bullet #1 or #2** (currently #5). ATS-safe rendering: "Cut AWS spend from ~$150K to ~$40–50K per month (~$100K/month sustained) via serverless migration, right-sizing, and autoscaling."

> "Identified, placed, and mentored SRE engineers … while remaining the singular DevOps IC"

Two ideas crammed; "Identified, placed" is HR-speak; and this is the **third repetition** of the sole-engineer point. Make the point once, powerfully. Keep: "Established company-wide CI/CD patterns, secrets-sharing workflows, and automation standards adopted across product and data teams." Mentoring only with a number: "Mentored [needs real number] engineers…"

> "Administered all IT and security operations: Google Workspace, 1Password, DNS…"

IT/Helpdesk-adjacent laundry list — down-levels a Staff Platform identity.
**Rewrite:** "Owned security and identity operations alongside the platform role: SSO/SCIM, HashiCorp Vault, Snowflake security, compliance audits, and incident response."

> Fireblocks bullet — dense jargon, no outcome. **Rewrite:** "Led a cross-cloud Fireblocks co-signer migration (AWS Nitro Enclaves/Anjuna → Fireblocks-native on GCP) to [needs real outcome: reduce custody risk / cut cost / simplify compliance], spanning enclave architecture, GCP workload identity, and MDM device provisioning."

### GoHealth
> "Spearheaded SRE initiatives … improved system scalability, availability, and operational visibility"

Three abstractions, zero numbers — textbook unquantified SRE claim.
**Rewrite:** "Drove SRE reliability work for a high-traffic health-insurance marketplace, improving availability and observability during peak open-enrollment surges (uptime [needs real number]%, MTTR ↓ [needs real number])."

### Symbiont — solid, keep. Optional: "…deployed for [needs real number] enterprise customers."

### Jump Ramp
> "cutting onboarding time significantly" — canonical unquantified intensifier. Number or delete. And consider folding the whole 6-month role into earlierCareer.

### ClassPass — "$20K/month Janitor Monkey" bullet is good, keep. The "pioneering IaC" claim lives here (with the 2015 date), not in the summary.

### Magnetic — fold to earlierCareer, or: "Managed 300+ server fleet for a multinational ad-tech firm; led Chef cookbook overhaul and Rundeck+PAM automation."

### Projects
- **radioactive-ralph:** drop the named-variants flavor (site-only). "Go autonomous dev orchestrator driving Claude Code across multiple repos with safety gates — Unix-socket IPC, SQLite event log, stream-json session control, launchd/systemd integration."
- **paranoid-passwd:** lead with the supply-chain stack, not the "LLM as adversary" gimmick: "C-core password generator compiled to <100KB WASM (Zig cross-compile, FIPS 180-4 SHA-256), with Wolfi/melange/apko supply chain, SLSA L3 provenance, Sigstore keyless signing, SBOM attestation."
- **Agentic:** kill "Production-ready"/"intelligent agent fleets": "Polyglot AI-agent orchestration framework (TypeScript, Python, Rust): fleet management, AI-powered triage, framework-agnostic crew orchestration, 4 GitHub Marketplace Actions."
- **Extended Data Library:** kill "Battle-tested": "Python monorepo of 5 independently published PyPI packages (serialization, structured logging, cloud connectors, Go secrets-sync) with strict typing and 75%+ test coverage."
- **Strata:** cut from resume entirely.

---

## D. CAREER COACH POSITIONING

### The one story this resume should tell
**"The engineer who runs your entire platform alone."** 5 years as the sole DevOps/platform/SRE/security function, a $100K/mo cost win, and a 10K-line codegen platform proving leverage. Companies pay Staff/Principal money for exactly this profile. Everything should ladder up to that thesis.

**Secondary theme:** force-multiplication through tooling — tm_cli, terraform-pipeline, the OSS frameworks all evidence "I build the system that does the work." That's the Staff/Principal differentiator.

**Do NOT lead with "AI-infra builder."** One genuine AI-infra project can't sustain it as a primary identity; recruiters for those roles will probe. "Platform engineer who also builds AI-agent orchestration tooling" is believable and differentiating. Revisit when Agentic has adoption numbers.

### Cut entirely
1. Strata project (off-thesis) · 2. `departureContext` · 3. "Authoring case studies" bullet · 4. Pipe-stacked headline · 5. Google Workspace/1Password/DNS laundry · 6. Magnetic + Jump Ramp (+ Qualia) as full entries — fold to earlierCareer · 7. Duplicate "before industry-wide adoption" claim.

### Missing — add (with real data only)
- **Scope numbers at Flipside:** engineers/teams served, # Lambda functions, # repos/environments. Scope = seniority signal.
- **Reliability metrics:** the resume has *zero* hard reliability numbers despite SRE positioning — uptime/SLA, MTTR, incident reduction at GoHealth and Flipside. Biggest credibility gap.
- **Independent-role reframe:** rename so it reads deliberate — "Independent (Self-Directed)" or the existing jonbogaty.com freelance entity so it reads consultancy, not gap. No mention of the Flipside departure in the body.
- **OSS adoption line** (only if non-trivial): "5 published frameworks · [stars] · [PyPI downloads/mo]". Real numbers convert hobby → adopted. If small, omit.
- **Certifications** if held (CKA, AWS, Terraform Associate). Don't fabricate.

### One resume or variants?
**Two variants, one JSON source of truth** (the pipeline makes this cheap):
- **Variant A — "Platform/DevOps/SRE Operator"** (primary, ~90% of applications): headline "Staff Platform & DevOps Engineer," lead with sole-operator + cost + tooling, AI as supporting project, Strata cut.
- **Variant B — "Platform + Supply-Chain Security"**: elevate paranoid-passwd (SLSA/Sigstore/SBOM), Vault/secrets, Fireblocks enclave migration, and the security-ops scope.
- No separate AI-infra variant yet.

---

## E. TOP 10 ACTIONS (ranked by impact)

1. **Replace the pipe-stacked headline** with one searchable title: `"Staff Platform & DevOps Engineer — Sole-Operator Infrastructure at Scale"`.
2. **Reframe the Independent role**: rename to read deliberate; **delete "following departure from Flipside Crypto."**
3. **Delete `departureContext`** from Flipside. Cover-letter/verbal only.
4. **Reorder Flipside highlights**: $100K/mo cost cut and tm_cli codegen to #1 and #2.
5. **Cut Strata** from the resume (keep on site).
6. **De-slop the summary**: remove "Track record of," "before industry-wide adoption" (keep at ClassPass), "Active open-source contributor," "bridge AI research and production."
7. **Add reliability + scope numbers** (`[needs real number]` placeholders) at Flipside and GoHealth — zero hard reliability metrics is the biggest credibility gap for SRE-titled roles.
8. **Fold Magnetic + Jump Ramp (+ Qualia) into earlierCareer** — removes the 6-month landmine and breaks the job-hop optics.
9. **Compress the Flipside IT-admin bullet** to security & identity operations framing.
10. **Add literal skill keywords**: FinOps/Cost Optimization, SRE/SLOs/Error Budgets, Platform Engineering (+ Helm/OpenTelemetry only if true).

---

## Bottom line

The substance is genuinely strong — a 5-year sole-operator with a real $100K/mo win and a 10K-line internal platform is a Staff-grade profile most candidates can't match. The resume **undersells that and oversells the OSS-hobbyist angle**, with a headline that doesn't commit to an identity and a current-role framing that reads as unemployment. Fix the framing (1-3), lead with proof (4), cut off-thesis material (5, 8), and the same facts read as Staff/Principal instead of "talented generalist between jobs." The only place data is actually missing is reliability metrics (7) — get real numbers or the SRE positioning stays soft.
