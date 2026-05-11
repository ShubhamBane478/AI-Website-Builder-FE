import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useProxy = env.USE_PROXY === 'true'

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
    server: {
      port: 3000,
      ...(useProxy && {
        proxy: {
          '/api': {
            target: 'https://ai-website-builder-be-production.up.railway.app',
            changeOrigin: true,
          },
        },
      }),
    },
    // When proxy is on, force VITE_API_BASE_URL to '' so fetch calls are relative
    // and Vite's proxy picks them up. User only needs to toggle USE_PROXY.
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
        useProxy ? '' : (env.VITE_API_BASE_URL ?? '')
      ),
    },
  }
})
