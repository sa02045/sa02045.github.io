# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Next.js 15 (App Router), TypeScript, and Tailwind CSS. It uses Contentlayer for MDX-based content management with blog posts stored in `data/blog/` and author profiles in `data/authors/`.

The site is deployed to GitHub Pages with static export (`output: 'export'` in production).

## Package Manager

**IMPORTANT**: This project uses **pnpm** (version 9.0.0) as the package manager, not npm or yarn.

- Install dependencies: `pnpm install`
- Always use `pnpm` for package operations

## Common Commands

### Development

- `pnpm dev` - Start development server (uses cross-env to set INIT_CWD)
- `pnpm start` - Alias for dev server

### Building & Deployment

- `pnpm build` - Build for production (runs postbuild script to generate static files)
- `pnpm serve` - Serve production build locally
- `pnpm deploy` - Deploy to GitHub Pages (builds and pushes to gh-pages branch)

### Code Quality

- `pnpm lint` - Run ESLint with auto-fix on pages, app, components, lib, layouts, and scripts directories
- Pre-commit hook automatically runs `lint-staged` which:
  - Runs ESLint with auto-fix on all JS/TS files
  - Runs Prettier on all JS/TS/JSON/CSS/MD/MDX files

### Analysis

- `pnpm analyze` - Build with bundle analysis enabled (sets ANALYZE=true)

## Architecture

### Content Management with Contentlayer

The blog uses Contentlayer 2 to transform MDX files into type-safe content:

- **Content location**: `data/blog/` for posts, `data/authors/` for author profiles
- **Configuration**: [contentlayer.config.ts](contentlayer.config.ts)
- **Content types**: `Blog` and `Authors` are auto-generated in `.contentlayer/generated`
- **Build process**: On build, Contentlayer:
  - Processes MDX with remark/rehype plugins (math, GFM, code syntax highlighting, autolink headings, etc.)
  - Generates `app/tag-data.json` with tag counts
  - Creates `public/search.json` for kbar search functionality
  - Computes reading time, slug, and table of contents for each post

### App Router Structure

- **App directory**: Uses Next.js 15 App Router with React Server Components
- **Key routes**:
  - `/` - Homepage ([app/Main.tsx](app/Main.tsx))
  - `/blog` - Blog list with pagination
  - `/blog/[...slug]` - Individual blog posts with dynamic layouts (PostSimple, PostLayout, PostBanner)
  - `/about` - About page
  - `/admin` - Local-only admin interface for creating posts (redirects in production)

### Path Aliases (tsconfig.json)

- `@/components/*` → `components/*`
- `@/data/*` → `data/*`
- `@/layouts/*` → `layouts/*`
- `@/css/*` → `css/*`
- `contentlayer/generated` → `.contentlayer/generated`

### Admin Interface

The `/admin` route provides a local development tool for creating blog posts:

- Only accessible in development (`NODE_ENV !== 'production'`)
- Supports image uploads to `public/static/blog/` via `/api/admin/upload-image`
- Creates new MDX files in `data/blog/` via `/api/admin/create-post`
- Files are created with frontmatter (title, date, tags, summary) and MDX content

### Styling

- **Tailwind CSS** with custom configuration
- **Typography plugin** for prose styling in blog posts
- **Theme system**: Uses `next-themes` for dark mode (configured in [app/theme-providers.tsx](app/theme-providers.tsx))
- **Syntax highlighting**: PrismJS via rehype-prism-plus with custom theme in `css/prism.css`
- **Math rendering**: KaTeX for LaTeX math expressions

### MDX Processing Pipeline

Posts go through extensive remark/rehype processing:

- **Remark plugins**: GFM, math, code titles, frontmatter extraction, image to JSX conversion, GitHub-style alerts
- **Rehype plugins**: slug generation, autolink headings, KaTeX, citations (from `data/references-data.bib`), syntax highlighting, minification

### Security Headers

The Next.js config ([next.config.js](next.config.js)) includes comprehensive security headers:

- Content Security Policy (allows giscus comments and umami analytics)
- X-Frame-Options, X-Content-Type-Options, HSTS, etc.

### Image Handling

- **Remote patterns** configured for: res.cloudinary.com, sa02045.github.io, github.io, avatars.githubusercontent.com
- **SVG support**: Uses `@svgr/webpack` to import SVGs as React components
- Images stored in `public/static/`

## Important Notes

### Static Export for GitHub Pages

- Production builds use `output: 'export'` mode
- Image optimization is handled via `unoptimized` flag when needed
- The build creates an `out/` directory with static files
- Deployment adds `.nojekyll` to the output directory

### Environment Variables

Key environment variables used:

- `NODE_ENV` - production/development mode switching
- `BASE_PATH` - optional base path for deployment
- `ANALYZE` - enables bundle analysis when set to 'true'
- `NEXT_PUBLIC_GISCUS_*` - Giscus comment system configuration (from [data/siteMetadata.js](data/siteMetadata.js))

### Locale & Language

- The site is configured for Korean locale (`ko-KR`)
- Giscus comments use Korean language
- Metadata includes `locale: 'ko_KR'` for OpenGraph

### TypeScript Configuration

- `strict: false` globally but `strictNullChecks: true`
- Incremental compilation enabled
- Composite project structure for better performance
