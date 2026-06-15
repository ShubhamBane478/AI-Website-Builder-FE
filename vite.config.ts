import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      '@/app':       path.resolve(__dirname, './src/app'),
      '@/domains':   path.resolve(__dirname, './src/domains'),
      '@/shared':    path.resolve(__dirname, './src/shared'),
      '@/templates': path.resolve(__dirname, './src/templates'),
      '@/infra':     path.resolve(__dirname, './src/infrastructure'),
      '@/store':     path.resolve(__dirname, './src/store'),
    },
  },
  server: {
    port: 3000,
  },
})
