import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    sourcemap: 'hidden',
  },
  plugins: [
    react(),
    tsconfigPaths()
  ],
  server: {
    allowedHosts: ['tame-snails-bake.loca.lt', 'loca.lt'],
    host: '0.0.0.0',
    port: 5177
  },
  base: '/energy-policy-system/',
})
