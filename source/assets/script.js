(() => {
  const email = "jon@jonbogaty.com";
  const ready = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
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
  });
})();
