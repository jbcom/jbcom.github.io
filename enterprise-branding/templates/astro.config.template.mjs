// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Enterprise navigation - shared across all org portals
const enterpriseNav = [
  { icon: 'github', label: 'GitHub', href: 'https://github.com/[ORG_NAME]' },
];

// Enterprise sidebar links - consistent jbcom branding
const enterpriseSidebarLinks = {
  label: 'jbcom Enterprise',
  items: [
    { label: 'jbcom Hub', link: 'https://jbcom.github.io', attrs: { target: '_blank' } },
    { label: 'Agentic (AI)', link: 'https://agentic.dev', attrs: { target: '_blank' } },
    { label: 'Strata (3D)', link: 'https://strata.game', attrs: { target: '_blank' } },
    { label: 'Extended Data', link: 'https://extendeddata.dev', attrs: { target: '_blank' } },
    { label: 'Arcade Cabinet', link: 'https://arcade-cabinet.github.io', attrs: { target: '_blank' } },
  ],
};

// https://astro.build/config
export default defineConfig({
  site: 'https://[ORG_DOMAIN]',
  integrations: [
    starlight({
      title: '[ORG_TITLE]',
      description: '[ORG_DESCRIPTION]',
      
      // Enterprise branding
      customCss: ['./src/styles/custom.css'],
      
      // Logo (org-specific)
      logo: {
        light: './src/assets/logo.svg',
        dark: './src/assets/logo.svg',
      },
      
      // Social links
      social: enterpriseNav,
      
      // Enterprise head tags
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:site_name', content: 'jbcom Enterprise' },
        },
        {
          tag: 'meta',
          attrs: { name: 'author', content: 'Jon Bogaty' },
        },
      ],
      
      // Sidebar - org-specific + enterprise footer
      sidebar: [
        // === ORG-SPECIFIC NAVIGATION ===
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/getting-started/' },
            { label: 'Installation', link: '/getting-started/installation/' },
          ],
        },
        {
          label: 'Packages',
          autogenerate: { directory: 'packages' },
        },
        {
          label: 'API Reference',
          autogenerate: { directory: 'api' },
        },
        // === ENTERPRISE FOOTER ===
        enterpriseSidebarLinks,
      ],
      
      // Credits
      credits: true,
      lastUpdated: true,
      
      // Edit links back to control-center
      editLink: {
        baseUrl: 'https://github.com/[ORG_NAME]/[ORG_NAME].github.io/edit/main/',
      },
    }),
  ],
});
