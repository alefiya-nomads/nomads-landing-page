import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // host: true exposes the dev server on the local network (0.0.0.0) so
  // phones/tablets on the same Wi-Fi can open it via the PC's LAN IP.
  server: {
    host: true,
  },
})
