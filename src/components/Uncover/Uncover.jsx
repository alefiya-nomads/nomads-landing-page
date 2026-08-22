import { useEffect, useRef, useState } from "react";
import "./Uncover.css";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import CountUp from "../primitives/CountUp.jsx";
import useInView from "../../hooks/useInView.js";
import { uncover } from "../../data/copy.js";

// Heights of the ascending mini bar chart on card 05 — mirrors the
// ▁▃▂▅▆█ pattern from the copy spec (rise, small dip, then climb).
const OPP_BAR_HEIGHTS = [18, 34, 26, 52, 66, 88];

/**
 * "What you'll uncover" — rebuilt to the 5-card mock: dark textured band
 * (Dark Backgrounds-01), mono chip, big white headline with a plum
 * highlight, then five rounded cards in the mock's color rotation
 * (cream / plum / mauve / midnight / ice), each with a contrast-matched
 * circular number badge and its docx label at the bottom.
 *
 * Card middles (all scroll-animated via the shared cards in-view flag):
 *   01 — quiz rows slide in, the first one ticks itself
 *   02 — $2.17 counts up over the visitors-math note
 *   03 — the metric list slides in, three rows blurred out
 *   04 — one "If …" symptom over a down arrow over its pillar, cycling
 *        through all four pairs (HeroRotator-style cross-fade)
 *   05 — the $125k/mo stat with the ascending bars growing in
 * All copy is verbatim from copy.js (sourced from the docx).
 */
export default function Uncover() {
  const [quizCard, rpvCard, metricsCard, pillarsCard, oppCard] = uncover.cards;
  const [leadBefore, leadAfter] = uncover.lead.split(uncover.leadHighlight);
  const [footBefore] = uncover.footer.split(uncover.footerAccent);

  // Drives every in-card animation the first time the card row scrolls
  // into view (rows sliding, tick, note, bars, and the pillar rotation).
  // threshold 0 (any intersection), NOT a fraction: on short viewports the
  // stacked ≤640px grid is ~1500px tall, so a fractional threshold like
  // 0.25 is mathematically unreachable (max ratio ≈ viewport/height) and
  // the animations would never start — cards would render blank forever.
  const [cardsRef, cardsInView] = useInView({ threshold: 0 });

  // Card 04: which symptom→pillar pair is on stage, cross-faded on swap
  // (same interval/fade pattern as HeroRotator).
  const [pillarIdx, setPillarIdx] = useState(0);
  const [pillarSwap, setPillarSwap] = useState(false);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (!cardsInView || reducedMotion.current || pillarsCard.pillars.length <= 1) return;
    const timer = setInterval(() => {
      setPillarSwap(true);
      setTimeout(() => {
        setPillarIdx((i) => (i + 1) % pillarsCard.pillars.length);
        setPillarSwap(false);
      }, 350);
    }, 2600);
    return () => clearInterval(timer);
  }, [cardsInView, pillarsCard.pillars.length]);

  const stagePillar = pillarsCard.pillars[pillarIdx];

  // The $2.17 stat split for the count-up: "$" prefix + 2.17 target.
  const rpvTarget = Number(rpvCard.stat.replace("$", ""));

  return (
    <section className="uncover">
      <div className="wrap">
        <p className="uncover__eyebrow" data-reveal>
          {uncover.eyebrow}
        </p>

        <h2 className="uncover__headline" data-reveal data-reveal-delay="90">
          {leadBefore}
          <HighlightSweep tone="plum">{uncover.leadHighlight}</HighlightSweep>
          {leadAfter}
        </h2>

        <div
          ref={cardsRef}
          className={"uncover__cards" + (cardsInView ? " uncover__cards--in" : "")}
        >
          {/* 01 — cream: quiz rows, the first one ticks itself */}
          <article className="uncover-card uncover-card--cream" data-reveal>
            <span className="uncover-card__badge">{quizCard.n}</span>
            <div className="uncover-card__visual uncover-quiz" aria-hidden="true">
              {Array.from({ length: quizCard.quiz.bars }, (_, i) => (
                <span key={i} className="uncover-quiz__row" style={{ "--qi": i }}>
                  <i
                    className={
                      "uncover-quiz__box" +
                      (i === quizCard.quiz.checkedBar ? " uncover-quiz__box--checked" : "")
                    }
                  />
                  <i className="uncover-quiz__line" />
                </span>
              ))}
            </div>
            <p className="uncover-card__label">{quizCard.label}</p>
          </article>

          {/* 02 — plum: $2.17 count-up + the visitors math in a cream note */}
          <article className="uncover-card uncover-card--plum" data-reveal data-reveal-delay="90">
            <span className="uncover-card__badge">{rpvCard.n}</span>
            <div className="uncover-card__visual uncover-rpv">
              <CountUp
                className="uncover-rpv__big"
                target={rpvTarget}
                prefix="$"
                decimals={2}
                duration={1800}
                loop
                loopPauseMs={4200}
              />
              <span className="uncover-rpv__note">
                <span className="uncover-rpv__cap">{rpvCard.statCaption}</span>
                <i className="uncover-rpv__rule" aria-hidden="true" />
                {rpvCard.math.map((line, i) => (
                  <span
                    key={line}
                    className={
                      "uncover-rpv__math" +
                      (i === rpvCard.math.length - 1 ? " uncover-rpv__math--total" : "")
                    }
                  >
                    {line}
                  </span>
                ))}
              </span>
            </div>
            <p className="uncover-card__label">{rpvCard.label}</p>
          </article>

          {/* 03 — mauve: the 5 metrics, three of them blurred out */}
          <article className="uncover-card uncover-card--mauve" data-reveal data-reveal-delay="180">
            <span className="uncover-card__badge">{metricsCard.n}</span>
            <div className="uncover-card__visual uncover-metrics">
              <ul className="uncover-metrics__list">
                {metricsCard.metrics.map((m, i) => (
                  <li key={m} style={{ "--mi": i }}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {m}
                  </li>
                ))}
                {Array.from({ length: metricsCard.blurredCount }, (_, i) => (
                  <li
                    key={`blur-${i}`}
                    className="uncover-metrics__hidden"
                    aria-hidden="true"
                    style={{ "--mi": metricsCard.metrics.length + i }}
                  >
                    <span>{String(metricsCard.metrics.length + i + 1).padStart(2, "0")}</span>
                    <i />
                  </li>
                ))}
              </ul>
              <span className="uncover-metrics__foot">
                <i className="uncover-metrics__rule" aria-hidden="true" />
                <span className="uncover-metrics__cap">{metricsCard.caption}</span>
              </span>
            </div>
            <p className="uncover-card__label">{metricsCard.label}</p>
          </article>

          {/* 04 — midnight: symptom → (down arrow) → pillar, cycling */}
          <article className="uncover-card uncover-card--navy" data-reveal data-reveal-delay="270">
            <span className="uncover-card__badge">{pillarsCard.n}</span>
            <div className="uncover-card__visual uncover-pillars">
              <div
                className={
                  "uncover-pillars__stage" +
                  (pillarSwap ? " uncover-pillars__stage--swap" : "")
                }
              >
                <span className="uncover-pillars__when">{stagePillar.when}</span>
                <svg
                  className="uncover-pillars__arrow"
                  viewBox="0 0 16 32"
                  aria-hidden="true"
                >
                  <line x1="8" y1="1" x2="8" y2="24" />
                  <polyline points="2 19, 8 26, 14 19" />
                </svg>
                <span className="uncover-pillars__name">{stagePillar.pillar}</span>
              </div>
              <span className="uncover-pillars__foot">
                <i className="uncover-pillars__rule" aria-hidden="true" />
                <span className="uncover-pillars__score">{pillarsCard.score}</span>
              </span>
            </div>
            <p className="uncover-card__label">{pillarsCard.label}</p>
          </article>

          {/* 05 — ice: the opportunity stat + ascending bars growing in */}
          <article className="uncover-card uncover-card--ice" data-reveal data-reveal-delay="360">
            <span className="uncover-card__badge">{oppCard.n}</span>
            <div className="uncover-card__visual uncover-opp">
              <span className="uncover-opp__pre">{oppCard.pre}</span>
              <span className="uncover-opp__big">{oppCard.stat}</span>
              <span className="uncover-opp__sub">{oppCard.sub}</span>
              <div className="uncover-opp__bars" aria-hidden="true">
                {OPP_BAR_HEIGHTS.map((h, i) => (
                  <i key={i} style={{ height: `${h}%`, "--bi": i }} />
                ))}
              </div>
            </div>
            <p className="uncover-card__label">{oppCard.label}</p>
          </article>
        </div>

        <p className="uncover__footer" data-reveal>
          {footBefore}
          <span className="uncover__footer-accent">{uncover.footerAccent}</span>
        </p>
      </div>
    </section>
  );
}
