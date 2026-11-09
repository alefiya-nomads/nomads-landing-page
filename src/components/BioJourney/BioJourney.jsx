import { Fragment, useEffect, useRef, useState } from "react";
import "./BioJourney.css";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import CountUp from "../primitives/CountUp.jsx";
import renderRich from "../primitives/richText.jsx";
import useInView from "../../hooks/useInView.js";
import { bio2 } from "../../data/copy.js";

// Ten visitors; the first `gone` of them leave after a single visit.
const VISITORS = 10;
// Journey rail stops: By 2022, the quiz pitch, the rebuild, the Ecosystem.
const MILESTONES = 4;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Bio 2 — "By 2022 … It was marketing." Rebuilt from the nomadsmarketing.co
 * homepage "Bio 2" section: portrait on the left (lavender-plum gradient,
 * sticky on desktop), story on the right (light pink). Stacks portrait-first
 * at <=900px. Copy is verbatim (copy.js `bio2`).
 *
 * Interactive pieces (the homepage's static tags/highlights, reworked):
 *   - journey rail: a line down the story fills as you scroll; its nodes
 *     light up at four milestones (By 2022, the quiz pitch, the rebuild,
 *     the Ecosystem's birth)
 *   - 70% card: ten visitor dots, seven drift away, 70% counts up
 *   - plum sweeps on the "That changed…" lines and the Ecosystem title
 *   - three objection buckets fill one after another
 *   - Ecosystem card: five-minute timer ring, cold → warm phrase pair,
 *     1% → 5% conversion bars
 */
export default function BioJourney() {
  const storyRef = useRef(null);
  const mileRefs = useRef([]);
  // Reduced motion: rail starts (and stays) full, every node lit. The rail
  // fill itself is a CSS variable set on the story element (see effect).
  const [lit, setLit] = useState(() => (prefersReducedMotion() ? MILESTONES : 0));

  const [goneRef, goneIn] = useInView({ threshold: 0.4 });
  const [bucketRef, bucketIn] = useInView({ threshold: 0.5 });
  const [timerRef, timerIn] = useInView({ threshold: 0.6 });
  const [coldRef, coldIn] = useInView({ threshold: 0.6 });
  const [rateRef, rateIn] = useInView({ threshold: 0.4 });

  // Journey rail: fill = how far the story has passed 60% down the
  // viewport; a milestone lights once its top crosses that same line.
  useEffect(() => {
    const story = storyRef.current;
    if (!story || prefersReducedMotion()) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = window.innerHeight * 0.6;
      const r = story.getBoundingClientRect();
      const f = Math.min(Math.max((line - r.top) / r.height, 0), 1);
      // Written straight to the DOM: keeping it in React state would
      // re-render the whole section on every scroll frame.
      story.style.setProperty("--fill", String(Math.round(f * 1000) / 1000));
      setLit(mileRefs.current.filter((m) => m && m.getBoundingClientRect().top < line).length);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const first = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Milestone wrapper: a static div (no data-reveal on it, so React
  // re-rendering its node class can't wipe useReveal's DOM class) holding
  // the rail node + the milestone's own content. A plain function, NOT a
  // component defined in render — a new component type every scroll frame
  // would remount the subtree and reset its animations.
  const mile = (i, children, className = "") => (
    <div className={`bio2__mile ${className}`.trim()} ref={(el) => (mileRefs.current[i] = el)}>
      <span className={`bio2__node${lit > i ? " bio2__node--lit" : ""}`} aria-hidden="true" />
      {children}
    </div>
  );

  const [coldA, coldRest] = bio2.cold.split(bio2.coldFrom);
  const [coldB, coldC] = coldRest.split(bio2.coldTo);

  return (
    <section className="bio2" aria-labelledby="bio2-heading">
      <div className="bio2__visual">
        <div className="bio2__photo-sticky">
          <picture>
            <source media="(max-width: 900px)" srcSet="/Assets/bio/bio-2-mobile.webp" />
            <img
              className="bio2__photo"
              src="/Assets/bio/bio-2.webp"
              alt="Alefiya smiling, seated in a rattan peacock chair"
              width="1200"
              height="1200"
              loading="lazy"
              data-reveal
            />
          </picture>
        </div>
      </div>

      <div className="bio2__text">
        <div className="bio2__inner">
          <div className="bio2__story" ref={storyRef} style={{ "--fill": prefersReducedMotion() ? 1 : 0 }}>
            <span className="bio2__rail" aria-hidden="true">
              <i className="bio2__rail-fill" />
            </span>

            {mile(
              0,
              <>
              <p className="bio2__year" data-reveal>
                {bio2.year}
              </p>
            </>,
              "bio2__mile--year"
            )}

            <p className="bio2__para" data-reveal>
              {bio2.lead}
            </p>

            <h2 className="bio2__headline" id="bio2-heading" data-reveal data-reveal-delay="80">
              {bio2.headline}
            </h2>

            <p className="bio2__para" data-reveal>
              {renderRich(bio2.followed)}
            </p>

            <p className="bio2__para" data-reveal>
              {bio2.traffic}
            </p>

            {/* 70% card — the sentence itself, with ten visitors of whom
                seven leave after a single visit. */}
            <div className="bio2__reveal" data-reveal>
              <div ref={goneRef} className={`bio2-gone${goneIn ? " bio2-gone--in" : ""}`}>
                <p className="bio2-gone__text num-hl-dark">{renderRich(bio2.gone)}</p>
                <div className="bio2-gone__viz" aria-hidden="true">
                  <CountUp
                    className="bio2-gone__pct"
                    target={bio2.gonePercent}
                    suffix="%"
                    duration={1600}
                  />
                  <span className="bio2-gone__people">
                    {Array.from({ length: VISITORS }, (_, i) => (
                      <i
                        key={i}
                        className={
                          "bio2-gone__person" +
                          (i < bio2.gonePercent / 10 ? " bio2-gone__person--gone" : "")
                        }
                        style={{ "--pi": i }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            </div>

            <p className="bio2__para" data-reveal>
              {renderRich(bio2.primed)}
            </p>

            {mile(
              1,
              <>
              <p className="bio2__changed" data-reveal>
                {bio2.changed.map((line, i) => (
                  <Fragment key={line}>
                    {i > 0 && " "}
                    <span className="bio2__changed-line">
                      <HighlightSweep tone="plum">{line}</HighlightSweep>
                    </span>
                  </Fragment>
                ))}
              </p>
            </>
            )}

            <p className="bio2__para" data-reveal>
              {renderRich(bio2.quizzes)}
            </p>

            <p className="bio2__para" data-reveal>
              {bio2.however}
            </p>

            {mile(
              2,
              <>
              <p className="bio2__ditched" data-reveal>
                {bio2.ditched}
              </p>
            </>
            )}

            <div className="bio2__studied">
              <p className="bio2__para" data-reveal>
                {renderRich(bio2.studied)}
              </p>
              <div className="bio2__reveal" data-reveal>
                <div
                  ref={bucketRef}
                  className={`bio2-buckets${bucketIn ? " bio2-buckets--in" : ""}`}
                  aria-hidden="true"
                >
                  {Array.from({ length: bio2.buckets }, (_, i) => (
                    <svg key={i} className="bio2-bucket" viewBox="0 0 48 52" style={{ "--bi": i }}>
                      <defs>
                        <clipPath id={`bio2-bucket-clip-${i}`}>
                          <path d="M6 14 L42 14 L37 48 L11 48 Z" />
                        </clipPath>
                      </defs>
                      <g clipPath={`url(#bio2-bucket-clip-${i})`}>
                        <rect className="bio2-bucket__fill" x="0" y="14" width="48" height="34" />
                      </g>
                      <path className="bio2-bucket__body" d="M6 14 L42 14 L37 48 L11 48 Z" />
                      <path className="bio2-bucket__handle" d="M10 14 C10 2, 38 2, 38 14" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* The Ecosystem card (stone box on the homepage). */}
            {mile(
              3,
              <>
              <div className="bio2-born" data-reveal>
                <p className="bio2-born__title">
                  <HighlightSweep tone="plum">{bio2.born}</HighlightSweep>
                </p>

                <p className="bio2-born__para">{renderRich(bio2.helps)}</p>

                <div
                  ref={timerRef}
                  className={`bio2-timer${timerIn ? " bio2-timer--in" : ""}`}
                >
                  <svg className="bio2-timer__ring" viewBox="0 0 44 44" aria-hidden="true">
                    <circle className="bio2-timer__track" cx="22" cy="22" r="18" />
                    <circle className="bio2-timer__arc" cx="22" cy="22" r="18" pathLength="100" />
                    <line className="bio2-timer__hand" x1="22" y1="22" x2="22" y2="9" />
                  </svg>
                  <span className="bio2-timer__label">{bio2.minutes}</span>
                </div>

                <p
                  ref={coldRef}
                  className={`bio2-born__para bio2-cold${coldIn ? " bio2-cold--in" : ""}`}
                >
                  {coldA}
                  <span className="bio2-cold__from">{bio2.coldFrom}</span>
                  {coldB}
                  <span className="bio2-cold__to">{bio2.coldTo}</span>
                  {coldC}
                </p>

                <div className="bio2-rates">
                  <p className="bio2-born__para bio2-rates__text">{renderRich(bio2.rates)}</p>
                  <div
                    ref={rateRef}
                    className={`bio2-rates__chart${rateIn ? " bio2-rates__chart--in" : ""}`}
                    aria-hidden="true"
                  >
                    <span className="bio2-rates__col bio2-rates__col--from">
                      <CountUp className="bio2-rates__val" target={bio2.rateFrom} suffix="%" duration={700} />
                      <i style={{ "--h": bio2.rateFrom / bio2.rateTo }} />
                    </span>
                    <span className="bio2-rates__col bio2-rates__col--to">
                      <CountUp className="bio2-rates__val" target={bio2.rateTo} suffix="%" duration={1400} />
                      <i style={{ "--h": 1 }} />
                    </span>
                  </div>
                </div>

                <p className="bio2-born__para bio2-born__gaps">{renderRich(bio2.gaps)}</p>
              </div>
            </>,
              "bio2__mile--card"
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
