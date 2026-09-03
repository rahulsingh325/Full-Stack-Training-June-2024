import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      'store': path.resolve(__dirname, 'src/store'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [`color-functions`, `global-builtin`, `import`]
      }
    }
  }
})
