/**
 * Generate og-image.png (1200x630) — social share card.
 * Output: public/og-image.png
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'
import resume from '../src/content/resume.json' with { type: 'json' }

const root = resolve(import.meta.dirname!, '..')
const out = resolve(root, 'public/og-image.png')

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @font-face { font-family: 'Instrument Serif'; src: url(https://fonts.gstatic.com/s/instrumentserif/v5/jizEREVNn4nADZqV5yRuqaKbiaLD.woff2) format('woff2'); font-weight: 400; }
  @font-face { font-family: 'JetBrains Mono'; src: url(https://fonts.gstatic.com/s/jetbrainsmono/v24/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO1l.woff2) format('woff2'); font-weight: 500; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: radial-gradient(ellipse 60% 50% at 20% 50%, rgba(232,168,73,0.15), transparent 60%),
                radial-gradient(ellipse 60% 50% at 80% 50%, rgba(107,139,173,0.12), transparent 60%),
                #0B0D14;
    color: #F0EDE8;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    padding: 80px;
    font-family: 'Inter', -apple-system, sans-serif;
    position: relative;
    overflow: hidden;
  }
  body::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  .pill {
    display: inline-flex; align-items: center; gap: 10px;
    border: 1px solid rgba(232,168,73,0.4);
    background: rgba(232,168,73,0.08);
    color: #E8A849;
    padding: 8px 20px; border-radius: 999px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px; font-weight: 500;
    letter-spacing: 0.05em;
    margin-bottom: 28px;
    position: relative; z-index: 1;
  }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: #4ADE80; }
  h1 {
    font-family: 'Instrument Serif', serif;
    font-size: 140px; font-weight: 400;
    background: linear-gradient(135deg, #E8A849 0%, #F0EDE8 50%, #6B8BAD 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1; margin-bottom: 24px;
    position: relative; z-index: 1;
  }
  .label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px; font-weight: 500;
    color: #E8A849; opacity: 0.9;
    letter-spacing: 0.15em; text-transform: uppercase;
    text-align: center;
    margin-bottom: 24px;
    position: relative; z-index: 1;
  }
  .tagline {
    font-size: 28px; line-height: 1.4;
    color: rgba(240,237,232,0.9);
    text-align: center; max-width: 900px;
    position: relative; z-index: 1;
  }
  .url {
    position: absolute; bottom: 40px; left: 0; right: 0;
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px; color: rgba(240,237,232,0.5);
    letter-spacing: 0.05em;
  }
</style>
</head>
<body>
  <div class="pill"><span class="dot"></span> ${resume.about.status?.label ?? 'Available'}</div>
  <h1>${resume.about.name}</h1>
  <div class="label">${resume.about.label.split(' | ')[0]}</div>
  <div class="tagline">${resume.about.tagline}</div>
  <div class="url">jonbogaty.com</div>
</body>
</html>`

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.setContent(html, { waitUntil: 'networkidle', timeout: 20000 })
  const buf = await page.screenshot({ type: 'png', fullPage: false })
  writeFileSync(out, buf)
  console.log(`og-image generated: ${out} (${(buf.length / 1024).toFixed(1)} KB)`)
} finally {
  await browser.close()
}
