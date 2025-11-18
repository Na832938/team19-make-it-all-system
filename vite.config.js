import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detect environment and choose a base appropriate for the host.
//
// Options:
// - Vercel: serve from root `/`
// - GitHub Pages (project site): serve from '/team19-make-it-all-system/'
// - You can override with BASE_URL env var when building: BASE_URL=/some/path vite build
export default defineConfig(() => {
  const isVercel = !!process.env.VERCEL
  const base = process.env.BASE_URL ?? (isVercel ? '/' : '/team19-make-it-all-system/')

  return {
    plugins: [react()],
    base, // chosen per environment
    build: {
      outDir: 'dist',
    },
  }
})
