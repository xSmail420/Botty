import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'BottyWidget',
      fileName: 'widget',
      formats: ['iife'],
    },
  },
});
