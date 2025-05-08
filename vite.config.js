import { defineConfig } from 'vite';
// import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: true,
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',  // Habilitar minificación de código
  },
  // test:{
  //   environment:'happy-dom',
  // }
});
