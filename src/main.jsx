import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { initClarity } from './analytics/clarity.js'
import { initGA } from './analytics/ga.js'
// Keeps which channel sent this visitor (UTM links → first + latest touch) in
// the browser, so the quiz on the same domain can send it to the RPV
// dashboard and Kit. Runs when this module loads; never throws.
import './analytics/utmSource.js'

initClarity() // Microsoft Clarity — heatmaps + recordings (same project as the quiz)
initGA() // GA4 — page views + traffic sources (same property as the quiz)

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
