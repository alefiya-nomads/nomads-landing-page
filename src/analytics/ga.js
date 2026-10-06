/**
 * GA4 base tag — automatic page views, sessions and traffic sources for the
 * landing page. Same property and same setup as the quiz (Quiz/src/analytics/
 * ga.js), so landing → quiz → results on diagnostic.nomadsmarketing.co is one
 * session and every sign-up keeps the visitor's original source.
 *
 * The Measurement ID is public (it ships in the client bundle), so it's
 * committed here like the quiz's. VITE_GA_ID overrides it.
 */
const GA_ID = import.meta.env.VITE_GA_ID || 'G-HP0WTDLWJ7';
// Production always tracks. Dev is OFF by default (keeps prod reports clean) —
// set VITE_GA_DEV=true to send dev hits into GA4 DebugView for testing.
const ENABLE_DEV = import.meta.env.VITE_GA_DEV === 'true';
const ENABLED =
  /^G-[A-Z0-9]+$/i.test(GA_ID) && (import.meta.env.PROD || ENABLE_DEV);
const DEBUG = !import.meta.env.PROD; // dev hits land in GA4 DebugView

export function initGA() {
  if (!ENABLED || typeof window === 'undefined' || window.gtag) return;

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // In dev, tag traffic as "internal" so the GA4 Internal-Traffic data filter
  // (Active + Exclude) keeps local testing out of production reports.
  const config = { debug_mode: DEBUG };
  if (DEBUG) config.traffic_type = 'internal';
  window.gtag('config', GA_ID, config);
}
