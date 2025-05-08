// import { defineConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  // Acá podés configurar otras cosas de Vite si las necesitás
  plugins:[
    react(),
    tailwindcss()
  ],
  server: {
    host: true, // Para usarlo dentro de Docker o desde otra máquina
  },
  test:{
    environment:'happy-dom',
  }
});