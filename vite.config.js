import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use different base for local and production
const isProd = process.env.NODE_ENV === 'production';
const base = isProd ? '/personal-portfolio-26/' : '/';

export default defineConfig({
  plugins: [react()],
  base,
});
