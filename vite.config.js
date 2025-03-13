import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/appuntamento': 'http://localhost:8080', // Assicurati che l'URL del backend sia corretto
    },
  },
})
