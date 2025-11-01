import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/team19-make-it-all-system/', // correct GitHub Pages base path
  build: {
    outDir: 'dist',
  },
})
