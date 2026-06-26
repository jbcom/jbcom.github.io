(() => {
  const email = "jon@jonbogaty.com";
  window.JON_PORTFOLIO = {
    email,
    proofDeck: [
      {
        key: "impact",
        label: "Impact",
        kicker: "What I can prove",
        title: "I have receipts, not a vibe.",
        intro:
          "The useful version of me is the one who can point to production systems, invoices, incidents, and code that changed.",
        items: [
          [
            "~$100K/mo AWS savings",
            "Reduced spend from roughly $150K to $40-50K per month while improving platform control.",
          ],
          [
            "146+ Terraform modules",
            "Built tm_cli, a 10,000+ line Python platform across 13 providers.",
          ],
          [
            "30-40% faster recovery",
            "Improved incident triage and MTTR through monitoring, alerting, escalation, and runbooks.",
          ],
        ],
      },
      {
        key: "system",
        label: "System",
        kicker: "How I work",
        title: "I make the operating model visible.",
        intro:
          "The first job is usually not writing more YAML. It is finding the ownership gaps, the risky defaults, and the places the team is guessing.",
        items: [
          [
            "Map the real system",
            "Ownership, runtime boundaries, spend, secrets, deploy paths, and incident reality.",
          ],
          [
            "Encode decisions",
            "Terraform, CI/CD, migrations, policy checks, docs, and defaults people can review.",
          ],
          [
            "Keep the loop closed",
            "Observability, incident review, cost signals, release gates, and SRE habits that stick.",
          ],
        ],
      },
      {
        key: "fit",
        label: "Fit",
        kicker: "Where I am useful",
        title: "I sit between strategy and the shell prompt.",
        intro:
          "I can lead the room, talk to internal customers and vendors, then go implement the thing that removes the recurring pain.",
        items: [
          [
            "Platform and SRE",
            "Cloud infrastructure, reliability, security, developer experience, and operational readiness.",
          ],
          [
            "Staff-level execution",
            "Ambiguous production problems turned into repeatable systems and boring defaults.",
          ],
          [
            "Customer-facing technical work",
            "Compliance, vendor constraints, internal customers, product pressure, and production tradeoffs.",
          ],
        ],
      },
      {
        key: "ai",
        label: "AI + OSS",
        kicker: "Current signal",
        title: "I use AI like an engineering system, not a sticker.",
        intro:
          "My open-source work is where I keep sharpening the loop: agents, tests, docs, reviews, releases, and evidence that work actually ran.",
        items: [
          [
            "3-year AI-agent program",
            "Specialized agents for architecture, implementation, testing, docs, review, and release.",
          ],
          [
            "radioactive-ralph",
            "Autonomous continuous development orchestration in Go.",
          ],
          [
            "paranoid-passwd + extended-data",
            "Rust, Python, and Go projects built around verifiable engineering standards.",
          ],
        ],
      },
    ],
    consoleSections: [
      {
        key: "proof",
        label: "Proof",
        kicker: "Evidence",
        title: "Numbers, systems, and visible outcomes.",
        summary:
          "The work is easiest to trust when it is tied to cost, reliability, platform surface area, and code that stayed useful.",
        details: [
          {
            key: "cost",
            label: "Cost",
            stat: "~$100K/mo",
            title: "Cloud spend brought under control.",
            body: "Reduced AWS spend from roughly $150K to $40-50K per month while improving platform control, scalability, and ownership.",
            items: ["FinOps", "AWS", "architecture reviews", "service ownership"],
          },
          {
            key: "infra",
            label: "Infra",
            stat: "146+",
            title: "Terraform modules with real adoption pressure.",
            body: "Built tm_cli, a 10,000+ line Python platform spanning 13 providers and 146+ modules.",
            items: ["Terraform", "Terragrunt", "Python", "platform product"],
          },
          {
            key: "recovery",
            label: "Recovery",
            stat: "30-40%",
            title: "Faster triage and recovery.",
            body: "Improved incident triage and MTTR through monitoring, alerting, escalation, and runbooks that engineers could actually use.",
            items: ["SRE", "observability", "incident command", "runbooks"],
          },
          {
            key: "ai",
            label: "AI",
            stat: "3 years",
            title: "AI-assisted engineering as a working system.",
            body: "Led specialized agents across architecture, implementation, tests, docs, review, release, and evidence collection.",
            items: ["agents", "quality gates", "code review", "release proof"],
          },
        ],
      },
      {
        key: "model",
        label: "Model",
        kicker: "Operating model",
        title: "Control is designed, not wished into existence.",
        summary:
          "The pattern is to make the production system legible, encode the repeatable parts, and keep feedback loops close.",
        details: [
          {
            key: "map",
            label: "Map",
            stat: "01",
            title: "Make the system legible.",
            body: "Map ownership, runtime boundaries, spend, secrets, deployment paths, vendor constraints, and incident reality.",
            items: ["ownership", "runtime boundaries", "secrets", "vendor context"],
          },
          {
            key: "encode",
            label: "Encode",
            stat: "02",
            title: "Move repeatable decisions into code.",
            body: "Turn recurring platform choices into Terraform, CI/CD, migrations, policy checks, runbooks, and reviewable defaults.",
            items: ["IaC", "CI/CD", "policy", "docs"],
          },
          {
            key: "teach",
            label: "Teach",
            stat: "03",
            title: "Make the operating model shared.",
            body: "Mentor engineers into shared SRE practice instead of centralizing every production judgment in one person.",
            items: ["mentoring", "reviews", "incident practice", "internal customers"],
          },
          {
            key: "loop",
            label: "Loop",
            stat: "04",
            title: "Keep drift visible.",
            body: "Use observability, incident review, cost signals, release gates, and customer feedback to catch drift early.",
            items: ["dashboards", "postmortems", "FinOps", "release gates"],
          },
        ],
      },
      {
        key: "fit",
        label: "Fit",
        kicker: "Hiring lens",
        title: "Different teams need different versions of the same operator.",
        summary:
          "The consistent value is the ability to lead the room, talk to internal customers and vendors, and still implement the thing.",
        details: [
          {
            key: "leader",
            label: "Leader",
            stat: "Lead",
            title: "Platform leadership grounded in production.",
            body: "Roadmaps, mentoring, architecture reviews, incident command, team operating models, and cross-functional delivery.",
            items: ["roadmaps", "mentoring", "architecture", "incident command"],
          },
          {
            key: "staff",
            label: "Staff IC",
            stat: "Build",
            title: "Staff-level execution in ambiguous systems.",
            body: "Ambiguous platform problems converted into infrastructure code, delivery paths, secrets systems, migrations, and durable defaults.",
            items: ["platform engineering", "secrets", "migrations", "developer experience"],
          },
          {
            key: "sre",
            label: "SRE",
            stat: "Own",
            title: "Reliability without theater.",
            body: "Availability targets, alert quality, escalation paths, capacity planning, and production ownership that survives pressure.",
            items: ["availability", "alerting", "capacity", "operations"],
          },
          {
            key: "customers",
            label: "Customers",
            stat: "Talk",
            title: "Credible with internal customers and vendors.",
            body: "Comfortable handling compliance, vendor constraints, internal customer pressure, product tradeoffs, and technical explanation.",
            items: ["vendors", "compliance", "stakeholders", "technical discovery"],
          },
        ],
      },
      {
        key: "stack",
        label: "Stack",
        kicker: "Searchable skills",
        title: "The keywords are backed by work.",
        summary:
          "This keeps the ATS surface broad without turning the page into a wall of badges.",
        details: [
          {
            key: "cloud",
            label: "Cloud",
            stat: "3x",
            title: "AWS, Google Cloud, and Azure.",
            body: "Production infrastructure across compute, Kubernetes, serverless, storage, databases, identity, and networking.",
            items: ["AWS", "Google Cloud", "Azure", "Kubernetes"],
          },
          {
            key: "delivery",
            label: "Delivery",
            stat: "Ship",
            title: "CI/CD and developer systems.",
            body: "GitHub Actions, GitLab CI, Jenkins, Argo CD, GitOps, Docker, Packer, Ansible, and release gates.",
            items: ["GitHub Actions", "GitLab CI", "Argo CD", "Docker"],
          },
          {
            key: "security",
            label: "Security",
            stat: "Trust",
            title: "Identity, secrets, and supply chain.",
            body: "IAM/RBAC, SSO/SCIM, Vault, Secrets Manager, Snowflake security, SLSA, Sigstore, and SBOM work.",
            items: ["IAM", "Vault", "SLSA", "SBOM"],
          },
          {
            key: "code",
            label: "Code",
            stat: "Code",
            title: "Enough software depth to build the platform.",
            body: "Python, Go, TypeScript, Bash, SQL, MCP servers, automation, and testable operational tooling.",
            items: ["Python", "Go", "TypeScript", "SQL"],
          },
        ],
      },
    ],
  };
  window.proofDeck = () => ({
    active: "impact",
    email: window.JON_PORTFOLIO.email,
    tabs: window.JON_PORTFOLIO.proofDeck,
    get panel() {
      return this.tabs.find((tab) => tab.key === this.active) || this.tabs[0];
    },
    select(key) {
      this.active = key;
    },
    move(delta) {
      const current = this.tabs.findIndex((tab) => tab.key === this.active);
      const next = (current + delta + this.tabs.length) % this.tabs.length;
      this.active = this.tabs[next].key;
      requestAnimationFrame(() =>
        document.getElementById(`proof-tab-${this.active}`)?.focus(),
      );
    },
    first() {
      this.active = this.tabs[0].key;
      requestAnimationFrame(() =>
        document.getElementById(`proof-tab-${this.active}`)?.focus(),
      );
    },
    last() {
      this.active = this.tabs[this.tabs.length - 1].key;
      requestAnimationFrame(() =>
        document.getElementById(`proof-tab-${this.active}`)?.focus(),
      );
    },
  });
  window.evidenceConsole = () => ({
    activeSection: "proof",
    activeDetails: {
      proof: "cost",
      model: "map",
      fit: "leader",
      stack: "cloud",
    },
    sections: window.JON_PORTFOLIO.consoleSections,
    get section() {
      return (
        this.sections.find((section) => section.key === this.activeSection) ||
        this.sections[0]
      );
    },
    get activeDetail() {
      return this.activeDetails[this.activeSection] || this.section.details[0].key;
    },
    get detail() {
      return (
        this.section.details.find((detail) => detail.key === this.activeDetail) ||
        this.section.details[0]
      );
    },
    selectSection(key) {
      this.activeSection = key;
      if (!this.activeDetails[key]) {
        const section = this.sections.find((item) => item.key === key);
        this.activeDetails[key] = section?.details[0]?.key;
      }
    },
    selectDetail(key) {
      this.activeDetails[this.activeSection] = key;
    },
    moveSection(delta) {
      const current = this.sections.findIndex(
        (section) => section.key === this.activeSection,
      );
      const next = (current + delta + this.sections.length) % this.sections.length;
      this.selectSection(this.sections[next].key);
      requestAnimationFrame(() =>
        document.getElementById(`console-tab-${this.activeSection}`)?.focus(),
      );
    },
    moveDetail(delta) {
      const details = this.section.details;
      const current = details.findIndex((detail) => detail.key === this.activeDetail);
      const next = (current + delta + details.length) % details.length;
      this.selectDetail(details[next].key);
      requestAnimationFrame(() =>
        document
          .getElementById(`console-detail-tab-${this.section.key}-${this.activeDetail}`)
          ?.focus(),
      );
    },
  });
  const ready = (fn) => {
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  };
  ready(() => {
    const copyButton = document.querySelector("[data-copy-email]");
    copyButton?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
        copyButton.textContent = "Copied";
        window.setTimeout(() => {
          copyButton.textContent = "Copy email";
        }, 1600);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
    const navLinks = Array.from(document.querySelectorAll(".nav a"));
    const sections = navLinks
      .map((link) => {
        const href = link.getAttribute("href");
        return href?.startsWith("#") ? document.querySelector(href) : null;
      })
      .filter(Boolean);
    if (sections.length > 0 && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (!visible) return;
          for (const link of navLinks) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${visible.target.id}`,
            );
          }
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.35, 0.65] },
      );
      for (const section of sections) observer.observe(section);
    }
    if (
      !window.matchMedia("(prefers-reduced-motion:reduce)").matches &&
      window.Lenis
    ) {
      const lenis = new window.Lenis({ duration: 0.9, smoothWheel: true });
      let rafId = null;
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      const start = () => {
        if (rafId === null) rafId = requestAnimationFrame(raf);
      };
      const stop = () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
      };
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stop();
        else start();
      });
      window.addEventListener(
        "pagehide",
        () => {
          stop();
          lenis.destroy?.();
        },
        { once: true },
      );
      start();
    }
  });
})();
