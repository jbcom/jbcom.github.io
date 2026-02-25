# Changelog

## [1.0.1](https://github.com/jbcom/jbcom.github.io/compare/v1.0.0...v1.0.1) (2026-02-25)


### Bug Fixes

* **ci:** move deploy into CD pipeline, fix GITHUB_TOKEN workflow trigger limitation ([9bee841](https://github.com/jbcom/jbcom.github.io/commit/9bee8413e694c0fbda1d9bdaad26f99d3d6dae08))
* timeline order, FSC consolidation, resume print colors ([#95](https://github.com/jbcom/jbcom.github.io/issues/95)) ([fd4c63d](https://github.com/jbcom/jbcom.github.io/commit/fd4c63dc7562be454805330ba56c2d42bb0ae4e5))

## 1.0.0 (2026-02-24)


### ⚠ BREAKING CHANGES

* migrate to Vite + React + shadcn/ui with resume generation pipeline

### Features

* **a11y:** add descriptive aria-labels to ecosystem buttons ([#50](https://github.com/jbcom/jbcom.github.io/issues/50)) ([e217334](https://github.com/jbcom/jbcom.github.io/commit/e217334b6e44278543bf0c57e6981483576cd85c))
* add arcade-cabinet theme ([f71ab67](https://github.com/jbcom/jbcom.github.io/commit/f71ab67a2631bb53ac13c4e651593cecaa681e33))
* add automated tests for critical paths and dependency flow visualization ([#64](https://github.com/jbcom/jbcom.github.io/issues/64)) ([aaed969](https://github.com/jbcom/jbcom.github.io/commit/aaed9694680cb873d778b2f27c9e35758c463885))
* add portal astro config template ([89f1b98](https://github.com/jbcom/jbcom.github.io/commit/89f1b9862582d259b7918625a176aa58d2b4234b))
* add portal CSS template ([84747cd](https://github.com/jbcom/jbcom.github.io/commit/84747cdf20069c6468d9a820ce0d99333a0c29da))
* complete site with CI/CD and improved content ([9a36834](https://github.com/jbcom/jbcom.github.io/commit/9a36834f576a9fae11514ea2759270e170a5d311))
* **ecosystem:** reorganize with MACRO/MESO/MICRO hierarchy and Rust integration ([d1dcca4](https://github.com/jbcom/jbcom.github.io/commit/d1dcca44c7e9215e5fc89a9ba07a3557870e792e))
* enable org discussions link in issue template ([#29](https://github.com/jbcom/jbcom.github.io/issues/29)) ([5124ea0](https://github.com/jbcom/jbcom.github.io/commit/5124ea08b527435271df84ac04892d9ca32dc161))
* **enterprise:** enhance interconnections and division branding ([27aa7ab](https://github.com/jbcom/jbcom.github.io/commit/27aa7ab1481716b87cd17935b5ae9f7b24a0af95))
* **enterprise:** establish multi-org documentation strategy and branding ([8f656a4](https://github.com/jbcom/jbcom.github.io/commit/8f656a4ac8a387374e48cb6439f69803abe3e44b))
* initial jbcom.github.io showcase ([d4e6a21](https://github.com/jbcom/jbcom.github.io/commit/d4e6a210c49c6600ac5d5594dc8e9d8e0becbaae))
* migrate from Vite/React/MUI to pure Astro SSG ([70fe6d6](https://github.com/jbcom/jbcom.github.io/commit/70fe6d637e8fa2f7b259da939265d1806543ad41))
* migrate to Vite + React + shadcn/ui with resume generation pipeline ([4a8f0c2](https://github.com/jbcom/jbcom.github.io/commit/4a8f0c2f12987274c53c498ea65ca0bc19c314ea))
* **security:** add input length limit to ecosystem search ([#66](https://github.com/jbcom/jbcom.github.io/issues/66)) ([c5a3a31](https://github.com/jbcom/jbcom.github.io/commit/c5a3a3102a1d23240a823e052b0f8153d12d6f91))
* **security:** add strict CSP and refactor inline JS ([#56](https://github.com/jbcom/jbcom.github.io/issues/56)) ([3231fa2](https://github.com/jbcom/jbcom.github.io/commit/3231fa26c5f3b2fa6130c40644468429063d7eb9))
* **settings:** add ecosystem-specific settings with ESLint ([c255da2](https://github.com/jbcom/jbcom.github.io/commit/c255da2dfa341b31ffb2fe6c9c44f8ab9103b2c2))
* **ux:** add clear button to ecosystem search ([#61](https://github.com/jbcom/jbcom.github.io/issues/61)) ([3f63622](https://github.com/jbcom/jbcom.github.io/commit/3f636221aa7e8bca3cf3bb058799f25e93ac80f8))
* **ux:** add tooltips to ecosystem buttons ([#74](https://github.com/jbcom/jbcom.github.io/issues/74)) ([b7a19d6](https://github.com/jbcom/jbcom.github.io/commit/b7a19d69d0d7fd9717f0cfaf04145bc785a10689))
* **ux:** improve accessibility for Demos and Resume pages ([#36](https://github.com/jbcom/jbcom.github.io/issues/36)) ([9d9ceba](https://github.com/jbcom/jbcom.github.io/commit/9d9cebae459c7c35900a01198ef28b2c31c7514d))
* **ux:** improve category card accessibility and interactivity ([#69](https://github.com/jbcom/jbcom.github.io/issues/69)) ([e58e390](https://github.com/jbcom/jbcom.github.io/commit/e58e390d716c0aeeced7c23b2cfd07b1d981f3dd))


### Bug Fixes

* avoid broken pipe with large diffs ([bb5b479](https://github.com/jbcom/jbcom.github.io/commit/bb5b479f67beae7871cdfd836ad4a4e27c36090d))
* **ci:** remove broken workflow symlinks and fix package.json formatting ([#25](https://github.com/jbcom/jbcom.github.io/issues/25)) ([d7b14e8](https://github.com/jbcom/jbcom.github.io/commit/d7b14e8633f6fade2c0dc12cd74d22099caf38b7))
* **ci:** remove duplicate pnpm version specification ([da2ea28](https://github.com/jbcom/jbcom.github.io/commit/da2ea28fd8e0f3579372df134980cf7a9187ee1c))
* **ci:** remove Sphinx docs workflow ([#26](https://github.com/jbcom/jbcom.github.io/issues/26)) ([617007a](https://github.com/jbcom/jbcom.github.io/commit/617007a1e81f12df10aded29df04fd0509365333))
* CodeQL alerts, update and pin GitHub Actions, and improve test reliability ([734ab55](https://github.com/jbcom/jbcom.github.io/commit/734ab551ff30938de8274a03f394200baa96fafd))
* ecosystem-reviewer gracefully handles missing Jules API key ([8e5a9e2](https://github.com/jbcom/jbcom.github.io/commit/8e5a9e29a9200feee0202347ff5c01f91fa3c9d8))
* resolve all P0-P3 code review issues (closes [#6](https://github.com/jbcom/jbcom.github.io/issues/6), [#7](https://github.com/jbcom/jbcom.github.io/issues/7), [#8](https://github.com/jbcom/jbcom.github.io/issues/8), [#9](https://github.com/jbcom/jbcom.github.io/issues/9), [#10](https://github.com/jbcom/jbcom.github.io/issues/10), [#11](https://github.com/jbcom/jbcom.github.io/issues/11), [#12](https://github.com/jbcom/jbcom.github.io/issues/12)) ([#13](https://github.com/jbcom/jbcom.github.io/issues/13)) ([712aed7](https://github.com/jbcom/jbcom.github.io/commit/712aed7adaa594c65d2cf5ef5880e8b0392010ca))
* use direct Ollama API for more reliable reviews ([c8cda9e](https://github.com/jbcom/jbcom.github.io/commit/c8cda9ec0d4f56168f53c30d77f8b6d0c1ea1e90))


### Performance Improvements

* Memoize PackageCard component ([#35](https://github.com/jbcom/jbcom.github.io/issues/35)) ([29f2004](https://github.com/jbcom/jbcom.github.io/commit/29f200471c0585c8e7d1424cc16e9423efdac5cf))
* Optimize ecosystem package filtering ([#68](https://github.com/jbcom/jbcom.github.io/issues/68)) ([b1c182e](https://github.com/jbcom/jbcom.github.io/commit/b1c182e1524296896a076f0d16cc1adac60cbab7))
* Optimize ecosystem search filtering ([#60](https://github.com/jbcom/jbcom.github.io/issues/60)) ([c56171f](https://github.com/jbcom/jbcom.github.io/commit/c56171f58b57fdaa5efc5224587c72dd7db483a1))
