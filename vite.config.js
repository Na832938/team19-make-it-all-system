import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: ' https://github.com/Na832938/team19-make-it-all-system', // replace with your repository name
  build: {
    outDir: 'dist',
  },
})
