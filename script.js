(() => {
  const email = 'jon@jonbogaty.com';

  const copyButton = document.querySelector('[data-copy-email]');
  copyButton?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      copyButton.textContent = 'Copied';
      window.setTimeout(() => {
        copyButton.textContent = 'Copy email';
      }, 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });

  const tabs = Array.from(document.querySelectorAll('[data-lens]'));
  const panels = Array.from(document.querySelectorAll('[data-lens-panel]'));
  for (const tab of tabs) {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-lens');
      for (const current of tabs) {
        current.setAttribute('aria-selected', String(current === tab));
      }
      for (const panel of panels) {
        panel.classList.toggle('hidden', panel.getAttribute('data-lens-panel') !== key);
      }
    });
  }

  const navLinks = Array.from(document.querySelectorAll('.nav a'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      for (const link of navLinks) {
        link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
      }
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.35, 0.65] },
  );
  for (const section of sections) observer.observe(section);

  window.addEventListener('load', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (window.Lenis) {
      const lenis = new window.Lenis({ duration: 0.9, smoothWheel: true });
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

  });
})();
