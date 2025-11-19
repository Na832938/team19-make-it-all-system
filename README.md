# Team19 Make-It-All System

Modern helpdesk and issue-tracking app, now running on Next.js and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4 + PostCSS
- **Charts**: chart.js
- **Runtime**: Node 18+

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy (Vercel)

This repo is ready for Vercel:

- Connect the GitHub repo in Vercel
- Framework preset: Next.js
- Build command: `next build`
- Output directory: `.next`

Optional project file: `vercel.json` is included.

## Project Structure

- `src/app/` – Next.js routes (`layout.jsx`, `page.jsx`, feature pages)
- `src/components/` – UI components (migrated as client components)
- `src/styles/` – Global CSS imported by `app/layout.jsx`
- `public/` – Static files (favicon, manifest, service worker)
- `next.config.mjs` – Next.js config

## Notes

- Legacy Vite setup has been removed. The app no longer uses GitHub Pages.
- Some legacy router files remain in `src/` for reference but are not used by Next.js.
