import { defineConfig } from 'vite';
// import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

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
  esbuild: {
    // Apunta al tsconfig adecuado para Vite
    tsconfig: './tsconfig.json',  // Asegura que Vite use tu tsconfig.json principal
  },
});
