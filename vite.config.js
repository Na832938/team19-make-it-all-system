export default defineConfig({
  plugins: [react()],
  base: '/team19-make-it-all-system/', // ✔ correct for GitHub Pages
  build: {
    outDir: 'dist',
  },
})
