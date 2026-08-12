import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'

// Dev-only on-device DevTools (Eruda) — adds a floating inspector button,
// handy for inspecting/tweaking on a real phone over the LAN. The DEV
// guard + dynamic import means it's fully stripped from production builds.
if (import.meta.env.DEV) {
  import('eruda').then(({ default: eruda }) => eruda.init())
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
