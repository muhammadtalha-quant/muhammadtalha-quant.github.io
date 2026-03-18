# Deployment and Validation Guide

This document explains how to build, validate, and deploy the terminal portfolio project.

## Prerequisites
- **Node.js**: Version 20 or higher.
- **npm**: Version 10 or higher.

> [!IMPORTANT]
> This project requires the `--legacy-peer-deps` flag for all `npm` commands due to specific dependency version requirements.

## npm Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `vite` | Starts the local development server. |
| `build` | `tsc && vite build` | Compiles TypeScript and builds the production bundle. |
| `preview` | `vite preview` | Previews the local build. |
| `lint` | `eslint ...` | Runs static analysis with ESLint (zero warnings policy). |
| `format` | `prettier --write` | Automatically formats code with Prettier. |
| `typecheck` | `tsc --noEmit` | Validates TypeScript types without emitting files. |
| `validate` | `npm run ...` | Complete validation pipeline (Typecheck → Lint → Format → Build). |

## Local Development
To start developing locally:
1.  Clone the repository.
2.  Install dependencies: `npm install --legacy-peer-deps`.
3.  Start the dev server: `npm run dev`.
4.  Access the site at `http://localhost:5173`.

## Validation Pipeline
Before every commit or PR, run:
```bash
npm run validate
```
A successful validation means:
- No TypeScript errors.
- No ESLint warnings or errors (`--max-warnings 0`).
- No Prettier formatting violations.
- The project builds successfully.

## GitHub Actions
The project uses two automated workflows:
- **`deploy.yml`**: Triggered on pushes to the `main` branch. Runs the validation pipeline and, if successful, deploys the build to GitHub Pages.
- **`pr-check.yml`**: Triggered on all pull requests. Runs the validation pipeline to ensure code quality before merging.

## GitHub Pages Setup
The repository must be configured to use **GitHub Actions** as the source for the Pages site:
1.  Go to **Settings** → **Pages**.
2.  Under **Build and deployment** → **Source**, select **GitHub Actions**.

## Sitemap and SEO
- **Sitemap**: Generated automatically during the build process using `vite-plugin-sitemap`. The output is located at `dist/sitemap.xml`.
- **SEO**: Meta tags and structured data are managed using `react-helmet-async` in `App.tsx` and static tags in `index.html`. This includes Open Graph (OG) tags, Twitter cards, and JSON-LD for search engine visibility.
