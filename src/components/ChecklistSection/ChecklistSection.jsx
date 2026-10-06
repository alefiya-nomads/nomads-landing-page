import { useEffect, useRef, useState } from "react";
import "./ChecklistSection.css";
import Button from "../primitives/Button.jsx";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import { scenarios, checklistOutro } from "../../data/copy.js";

const pad = (n) => String(n + 1).padStart(2, "0");

// Numbered reaction animations: item N shows /Assets/Landing Page Gifs/N.webp
// (one per scenario, matched by position in the list). Two encode sets exist:
// the 1200px desktop files and 720px "-mobile" files at ~40% of the bytes —
// small screens display the animation at ~280-420 CSS px, so the smaller
// encode looks identical there but downloads far faster on mobile networks.
const gifFor = (i, small) =>
  `/Assets/Landing Page Gifs/${i + 1}${small ? "-mobile" : ""}.webp`;

/* Semicircle 0–10 diagnostic gauge. The needle sweeps from 0 up to `score`
   (ease-out, ~1.1s) every time a box is ticked — per Yemi's landing-page-
   changes doc ("the gauge is supposed to animate from 0 to the specified
   number"). Reduced-motion users get the final position immediately. */
function Gauge({ score }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(score);
      return;
    }
    let raf;
    const t0 = performance.now();
    const DURATION = 1100;
    const tick = (now) => {
      const p = Math.min((now - t0) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(score * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setShown(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const cx = 100;
  const cy = 92;
  const r = 74;
  const a = Math.PI * (1 - shown / 10); // 0 -> π (left), 10 -> 0 (right)
  const nx = cx + (r - 12) * Math.cos(a);
  const ny = cy - (r - 12) * Math.sin(a);

  return (
    <svg
      className="checklist__gauge"
      viewBox="0 0 200 108"
      role="img"
      aria-label={`Diagnostic score: ${score} out of 10`}
    >
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        className="checklist__gauge-track"
      />
      {[0, 2, 4, 6, 8, 10].map((t) => {
        const ta = Math.PI * (1 - t / 10);
        const x1 = cx + r * Math.cos(ta);
        const y1 = cy - r * Math.sin(ta);
        const x2 = cx + (r - 9) * Math.cos(ta);
        const y2 = cy - (r - 9) * Math.sin(ta);
        const lx = cx + (r + 12) * Math.cos(ta);
        const ly = cy - (r + 12) * Math.sin(ta);
        return (
          <g key={t}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} className="checklist__gauge-tick" />
            <text x={lx} y={ly + 3} className="checklist__gauge-tick-label">
              {t}
            </text>
          </g>
        );
      })}
      <line x1={cx} y1={cy} x2={nx} y2={ny} className="checklist__gauge-needle" />
      <circle cx={cx} cy={cy} r="5.5" className="checklist__gauge-hub" />
    </svg>
  );
}

/* The reaction panel body for a scenario — reused in the desktop side panel
   and inline inside each item below 900px. `gifSrc` is the numbered local
   GIF matched to the item's position. */
function ReactionContent({ scenario, gifSrc }) {
  const v = scenario.verdict || {};
  const hasScore = typeof v.score === "number";

  return (
    <>
      {scenario.reaction?.text && (
        <p className="checklist__reaction">{scenario.reaction.text}</p>
      )}

      <div className="checklist__media" aria-hidden="true">
        <img className="checklist__media-img" src={gifSrc} alt="" loading="lazy" />
      </div>

      {(hasScore || v.scoreLabel) && (
        <>
          <span className="checklist__panel-label">Diagnostic Gauge</span>
          {hasScore ? (
            <div className="checklist__gauge-wrap">
              {/* Keyed per scenario so the 0→score sweep replays even when two
                  boxes share the same score (e.g. boxes 1 and 5, both 8). */}
              <Gauge key={scenario.id} score={v.score} />
              {/* Items whose doc copy is qualitative ("Highest score") keep
                  that wording as the caption instead of the N/10 readout. */}
              <span className="checklist__gauge-score">
                {v.scoreLabel || `${v.score}/10`}
              </span>
            </div>
          ) : (
            <span className="checklist__score-label">{v.scoreLabel}</span>
          )}
        </>
      )}

      {v.lines && (
        <div className="checklist__verdict">
          {v.lines.map((line, i) => (
            <p
              key={i}
              className={i === 0 ? "checklist__verdict-lead" : "checklist__verdict-line"}
            >
              {i === 0 && v.emoji ? `${line} ${v.emoji}` : line}
            </p>
          ))}
        </div>
      )}

      {v.cta && (
        <div className="checklist__panel-cta">
          <Button variant="onDark" href="/diagnostic-start-now">
            {v.cta}
          </Button>
        </div>
      )}
    </>
  );
}

export default function ChecklistSection() {
  // Which scenario's reaction is shown. Single-select: ticking a box reveals
  // that item's reaction (in the side panel on desktop, inline below 900px).
  const [active, setActive] = useState(0);
  const s = scenarios[active];
  // Which encode set this visit uses — decided once per mount at the same
  // 900px breakpoint that swaps the side panel for the inline reveal, so the
  // prefetch below and every <img> always agree on one set of URLs.
  const [smallScreen] = useState(
    () => window.matchMedia("(max-width: 900px)").matches
  );
  const sectionRef = useRef(null);
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Warm the browser cache with every reaction animation once the section
  // nears the viewport (600px early), so ticking a box swaps to an
  // already-downloaded file instead of waiting out a multi-MB fetch on the
  // production network. The .blob() await matters: fetch() resolves on
  // headers, and Chrome stalls/discards response bodies nobody reads — only
  // consuming the body fully commits the file to the HTTP cache and makes
  // the downloads genuinely one-at-a-time (ticked item first).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Respect data-saver mode and very slow connections — those users keep
    // the on-demand <img> loading instead of a ~17MB speculative download.
    const conn = navigator.connection;
    if (conn && (conn.saveData || /(^|-)2g/.test(conn.effectiveType || ""))) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        io.disconnect();
        (async () => {
          const order = scenarios.map((_, i) => i);
          order.unshift(...order.splice(order.indexOf(activeRef.current), 1));
          for (const i of order) {
            try {
              await (await fetch(gifFor(i, smallScreen), { priority: "low" })).blob();
            } catch {
              // Offline / aborted — the <img> will fetch on demand instead.
            }
          }
        })();
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [smallScreen]);

  const ctaLabel = "Show me how to add $1.5m in extra revenue this year";

  return (
    <section className="checklist" ref={sectionRef}>
      <div className="wrap checklist__grid">
        {/* LEFT — the question list */}
        <div className="checklist__left">
          <h2 className="checklist__headline" data-reveal>
            Do you have what it takes to add $1.5M/year from{" "}
            <HighlightSweep tone="plum">your existing marketing spend?</HighlightSweep>
            {" Let's find out:"}
          </h2>

          <div className="checklist__intro-row" data-reveal data-reveal-delay="120">
            <span className="checklist__tag">Step 01</span>
            <span className="checklist__intro-text">Tick a box to find out.</span>
          </div>

          <ul className="checklist__list">
            {scenarios.map((scenario, i) => (
              <li
                key={scenario.id}
                className={`checklist__item${active === i ? " checklist__item--active" : ""}`}
              >
                <label className="checklist__label">
                  <span className="checklist__marker">
                    <span className="checklist__num">{pad(i)}</span>
                    <input
                      type="checkbox"
                      className="checklist__checkbox"
                      checked={active === i}
                      onChange={() => setActive(i)}
                    />
                  </span>
                  <span className="checklist__situation">{scenario.situation}</span>
                </label>

                {/* Inline reaction shown inside the ticked box below 900px. */}
                {active === i && (
                  <div className="checklist__item-reveal">
                    <ReactionContent scenario={scenario} gifSrc={gifFor(i, smallScreen)} />
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="checklist__cta" data-reveal>
            <Button href="/diagnostic-start-now">{ctaLabel}</Button>
            <p className="checklist__cta-sub">{checklistOutro.sub}</p>
          </div>
        </div>

        {/* RIGHT — side panel for the ticked item (desktop only) */}
        <div className="checklist__right">
          <div className="checklist__panel" aria-live="polite">
            <ReactionContent scenario={s} gifSrc={gifFor(active, smallScreen)} />
          </div>
        </div>
      </div>
    </section>
  );
}
