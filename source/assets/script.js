(() => {
  const email = "jon@jonbogaty.com";
  window.JON_PORTFOLIO = {
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
  };
  window.proofDeck = () => ({
    active: "impact",
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
    const tabs = Array.from(document.querySelectorAll("[data-lens]"));
    const panels = Array.from(document.querySelectorAll("[data-lens-panel]"));
    for (const tab of tabs) {
      tab.addEventListener("click", () => {
        const key = tab.getAttribute("data-lens");
        for (const current of tabs) {
          current.setAttribute("aria-selected", String(current === tab));
        }
        for (const panel of panels) {
          panel.classList.toggle(
            "hidden",
            panel.getAttribute("data-lens-panel") !== key,
          );
        }
      });
    }
    const navLinks = Array.from(document.querySelectorAll(".nav a"));
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
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
    if (
      !window.matchMedia("(prefers-reduced-motion:reduce)").matches &&
      window.Lenis
    ) {
      const lenis = new window.Lenis({ duration: 0.9, smoothWheel: true });
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  });
})();
