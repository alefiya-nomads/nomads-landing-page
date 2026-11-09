import { Fragment } from "react";
import "./BioPause.css";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import CountUp from "../primitives/CountUp.jsx";
import renderRich from "../primitives/richText.jsx";
import useInView from "../../hooks/useInView.js";
import { bio3 } from "../../data/copy.js";

/* ---- Per-story visuals (all aria-hidden: the paragraphs carry the facts,
   every figure here comes from them). Each owns its in-view flag; the flag
   lives on a static wrapper's CHILD so React never rewrites the className
   of a [data-reveal] element (useReveal adds its class via the DOM). ---- */

// Story 01: the headline result as plain big text (no box). Decorative
// repeat of the paragraph's own words, so hidden from screen readers.
function ResultText({ viz }) {
  return (
    <p className="bio3-result" aria-hidden="true">
      {viz.text}
    </p>
  );
}

function CallsViz({ viz }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const dots = (n, good, cls) =>
    Array.from({ length: n }, (_, i) => (
      <i
        key={i}
        className={`bio3-calls__dot ${i < good ? "bio3-calls__dot--won" : "bio3-calls__dot--lost"} ${cls}`}
        style={{ "--ci": i }}
      />
    ));
  return (
    <div ref={ref} className={`bio3-viz bio3-calls${inView ? " is-in" : ""}`} aria-hidden="true">
      <div className="bio3-calls__set bio3-calls__set--before">
        <span className="bio3-calls__count">
          {viz.before.closed}/{viz.before.booked}
        </span>
        <span className="bio3-calls__grid">{dots(viz.before.booked, viz.before.closed, "")}</span>
      </div>
      <img className="bio3-calls__arrow" src="/Assets/Doodle/sczv 7.png" alt="" />
      <div className="bio3-calls__set bio3-calls__set--after">
        <span className="bio3-calls__count">
          {viz.after.closed}/{viz.after.booked}
        </span>
        <span className="bio3-calls__grid">{dots(viz.after.booked, viz.after.closed, "")}</span>
      </div>
    </div>
  );
}

function SavedViz({ viz }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  return (
    <div ref={ref} className={`bio3-viz bio3-saved${inView ? " is-in" : ""}`} aria-hidden="true">
      <svg className="bio3-saved__shield" viewBox="0 0 24 24">
        <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z" />
        <path className="bio3-saved__tick" d="M8.5 12.2l2.4 2.4 4.8-5" />
      </svg>
      <CountUp className="bio3-saved__amount" target={viz.amount} prefix="$" separator duration={2000} />
    </div>
  );
}

const VIZ = { result: ResultText, calls: CallsViz, saved: SavedViz };
const STORY_TONES = ["lavender", "plum", "navy"];

/**
 * Bio 3 — "The pause that changed everything", rebuilt from the
 * nomadsmarketing.co homepage: story on the left (cream), portrait on the
 * right (dark plum texture, sticky on desktop); portrait-first on mobile.
 * Copy is verbatim (copy.js `bio3`).
 *
 * The homepage's static tags become live pieces: a "For six month" pill
 * with a calendar icon, arrow bullets that slide in, three "case file"
 * story cards each with its own scroll-animated visual (the £96,000 result
 * as big text, a 27→31 call scoreboard, a $2M-saved counter) and their
 * highlight lines as sweeps, numbered problem badges, and the two
 * spreadsheet points as "looks good ↑ / looks bad ↓" cards.
 */
export default function BioPause() {

  return (
    <section className="bio3" aria-labelledby="bio3-heading">
      <div className="bio3__text">
        <div className="bio3__inner">
          <h2 className="bio3__headline" id="bio3-heading" data-reveal>
            {bio3.headlineLines.map((line, i) => (
              <Fragment key={line}>
                {i > 0 && (
                  <>
                    {" "}
                    <br className="hl-br" />
                  </>
                )}
                {line}
              </Fragment>
            ))}
          </h2>

          <p className="bio3__para" data-reveal>
            {renderRich(bio3.restricted)}
          </p>

          {/* "For six month" pill with a calendar icon. */}
          <div className="bio3__reveal" data-reveal>
            <div className="bio3-pause">
              <span className="bio3-pause__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
                  <path d="M3.5 10h17M8 3v4M16 3v4" />
                  <path className="bio3-pause__icon-dot" d="M7.5 13.5h2v2h-2zM11 13.5h2v2h-2zM14.5 13.5h2v2h-2z" />
                </svg>
              </span>
              <span className="bio3-pause__label">{bio3.sixMonths}</span>
            </div>
          </div>

          <p className="bio3__para" data-reveal>
            {bio3.itch}
          </p>

          <ul className="bio3__list">
            {bio3.itchList.map((item, i) => (
              <li key={item} data-reveal data-reveal-delay={i * 120}>
                <img src="/icons/point-arrow.avif" alt="" aria-hidden="true" className="bio3__arrow" />
                <span>{renderRich(item)}</span>
              </li>
            ))}
          </ul>

          <p className="bio3__para bio3__para--brace" data-reveal>
            {renderRich(bio3.brace)}
          </p>

          <div className="bio3__stories">
            {bio3.stories.map((story, si) => {
              const Viz = VIZ[story.viz.kind];
              return (
                <article
                  key={story.n}
                  className={`bio3-story bio3-story--${STORY_TONES[si]}${si > 0 ? " num-hl-dark" : ""}`}
                  data-reveal
                >
                  <header className="bio3-story__head">
                    <span className="bio3-story__num" aria-hidden="true">
                      {story.n}
                    </span>
                    <span className="bio3-story__label">
                      {bio3.wisdomLabel}
                    </span>
                  </header>
                  <h3 className="bio3-story__wisdom">{story.wisdom}</h3>

                  <Viz viz={story.viz} />

                  {story.paras.map((p, pi) =>
                    story.box && story.box.para === pi ? (
                      <div key={p} className="bio3-story__box">
                        <p className="bio3-story__box-head" aria-hidden="true">
                          {story.box.heading}
                        </p>
                        <p className="bio3-story__para">{renderRich(p)}</p>
                      </div>
                    ) : (
                      <p key={p} className="bio3-story__para">
                        {renderRich(p)}
                      </p>
                    )
                  )}

                  {story.problemLabel && (
                    <p className="bio3-story__problem">{story.problemLabel}</p>
                  )}
                  {story.paras2 &&
                    story.paras2.map((p) => (
                      <p key={p} className="bio3-story__para">
                        {renderRich(p)}
                      </p>
                    ))}

                  {story.mark && (
                    <p className="bio3-story__mark">
                      <HighlightSweep tone={si === 2 ? "iceblue" : "stone"}>{story.mark}</HighlightSweep>
                    </p>
                  )}
                  {story.after && <p className="bio3-story__para bio3-story__after">{renderRich(story.after)}</p>}
                </article>
              );
            })}
          </div>

          <p className="bio3__problems-lead" data-reveal>
            {bio3.problemsLead}
          </p>

          <div className="bio3__problems">
            {bio3.problems.map((pr) => (
              <div key={pr.n} className="bio3-problem" data-reveal>
                <span className="bio3-problem__num" aria-hidden="true">
                  {pr.n}
                </span>
                <div className="bio3-problem__body">
                  <h3 className="bio3-problem__title">{pr.title}</h3>
                  {pr.body && <p className="bio3__para bio3-problem__text">{renderRich(pr.body)}</p>}
                  {pr.points && (
                    <ul className="bio3-sheet">
                      {pr.points.map((pt, i) => (
                        <li key={pt} className={`bio3-sheet__card bio3-sheet__card--${i === 0 ? "good" : "bad"}`}>
                          <span className="bio3-sheet__trend" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                              {i === 0 ? <path d="M4 16l6-6 4 4 6-7" /> : <path d="M4 8l6 6 4-4 6 7" />}
                            </svg>
                          </span>
                          <span>{renderRich(pt)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="bio3__closer" data-reveal>
            {renderRich(bio3.closer)}
          </p>
        </div>
      </div>

      <div className="bio3__visual">
        <div className="bio3__photo-sticky">
          <picture>
            <source media="(max-width: 900px)" srcSet="/Assets/bio/bio-3-mobile.webp" />
            <img
              className="bio3__photo"
              src="/Assets/bio/bio-3.webp"
              alt="Alefiya smiling, in a blue patterned hijab"
              width="1200"
              height="1200"
              loading="lazy"
              data-reveal
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
