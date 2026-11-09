import { Fragment } from "react";
import "./BioBirth.css";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import CountUp from "../primitives/CountUp.jsx";
import renderRich from "../primitives/richText.jsx";
import useInView from "../../hooks/useInView.js";
import { bio4 } from "../../data/copy.js";

function StarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l2.6 6.9L22 12l-7.4 3.1L12 22l-2.6-6.9L2 12l7.4-3.1z" />
    </svg>
  );
}

/**
 * Bio 4 — "The birth of Compounding Revenue Per Visitor™ OS", rebuilt from
 * the nomadsmarketing.co homepage: portrait + phone mockup on the left
 * (the landing's teal map texture, sticky on desktop), story on the right
 * (white), closing with the ice-blue "today" box. Portrait-first on
 * mobile. Copy is verbatim (copy.js `bio4`).
 *
 * Interactive pieces (replacing the homepage's static tags):
 *   - North Star label: a slowly turning star
 *   - the big question: words land one by one in a featured card
 *   - "bigger picture" label: a zoom-out ripple
 *   - 15% / 85% split donut — the 85% drawn as the four quadrants
 *   - "today" box: book line as a navy sweep
 */
export default function BioBirth() {
  const [askRef, askIn] = useInView({ threshold: 0.5 });
  const [splitRef, splitIn] = useInView({ threshold: 0.45 });

  const words = bio4.bigQuestion.split(" ");
  const { quiz, quadrants } = bio4.split;
  // Donut geometry (pathLength 100 = percentages). The 85% becomes four
  // equal quadrant arcs with small gaps between segments.
  const GAP = 1.2;
  const quadEach = quadrants / 4;
  const segments = [
    { cls: "quiz", start: 0, len: quiz },
    ...Array.from({ length: 4 }, (_, i) => ({
      cls: `quad quad-${i}`,
      start: quiz + i * quadEach,
      len: quadEach,
    })),
  ];

  return (
    <section className="bio4" aria-labelledby="bio4-heading">
      <div className="bio4__visual">
        <div className="bio4__photo-sticky">
          <picture>
            <source media="(max-width: 900px)" srcSet="/Assets/bio/bio-4-mobile.webp" />
            <img
              className="bio4__photo"
              src="/Assets/bio/bio-4.webp"
              alt="Alefiya celebrating under falling confetti, beside a phone showing a Nomads quiz page"
              width="1100"
              height="1417"
              loading="lazy"
              data-reveal
            />
          </picture>
        </div>
      </div>

      <div className="bio4__text">
        <div className="bio4__inner">
          <h2 className="bio4__headline" id="bio4-heading" data-reveal>
            {bio4.headlineLines.map((line, i) => (
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

          <p className="bio4-label" data-reveal>
            <StarIcon className="bio4-label__star" />
            <span>{bio4.ledLabel}</span>
          </p>

          <p className="bio4__para" data-reveal>
            {bio4.northStar}
          </p>

          <div className="bio4-connect" data-reveal>
            <div className="bio4-connect__copy">
              <p className="bio4__para bio4-connect__lead">{renderRich(bio4.helps)}</p>
              <ul className="bio4__list">
                {bio4.helpsList.map((item) => (
                  <li key={item}>
                    <img src="/icons/point-arrow.avif" alt="" aria-hidden="true" className="bio4__arrow" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="bio4__para" data-reveal>
            {renderRich(bio4.instead)}
          </p>

          {/* The big question — words land one by one. */}
          <div className="bio4__reveal" data-reveal>
            <p ref={askRef} className={`bio4-ask${askIn ? " is-in" : ""}`}>
              <span className="bio4-ask__mark" aria-hidden="true">
                ?
              </span>
              <span className="bio4-ask__text">
                {words.map((w, i) => (
                  <span key={i} className="bio4-ask__word" style={{ "--wi": i }}>
                    {w}
                    {i < words.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            </p>
          </div>

          <p className="bio4-label bio4-label--zoom" data-reveal>
            <span className="bio4-zoom" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>{bio4.pictureLabel}</span>
          </p>

          <p className="bio4__para" data-reveal>
            {renderRich(bio4.smarter)}
          </p>

          {/* 15 / 85 split: the quiz vs the four quadrants. */}
          <div className="bio4-split" data-reveal>
            <div className="bio4-split__copy">
              <p className="bio4__para">{renderRich(bio4.fifteen)}</p>
              <p className="bio4__para bio4-split__last">{renderRich(bio4.eightyFive)}</p>
            </div>
            <div
              ref={splitRef}
              className={`bio4-donut${splitIn ? " is-in" : ""}`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 120 120" className="bio4-donut__svg">
                <circle className="bio4-donut__track" cx="60" cy="60" r="46" />
                {segments.map((s, i) => (
                  <circle
                    key={s.cls}
                    className={`bio4-donut__seg bio4-donut__seg--${s.cls.split(" ")[0]} ${s.cls}`}
                    cx="60"
                    cy="60"
                    r="46"
                    pathLength="100"
                    style={{
                      "--len": s.len - GAP,
                      "--start": s.start,
                      "--di": i,
                    }}
                  />
                ))}
              </svg>
              <span className="bio4-donut__legend">
                <span className="bio4-donut__key bio4-donut__key--quiz">
                  <i />
                  <CountUp target={quiz} suffix="%" duration={900} />
                </span>
                <span className="bio4-donut__key bio4-donut__key--quad">
                  <i />
                  <CountUp target={quadrants} suffix="%" duration={1600} />
                </span>
              </span>
            </div>
          </div>

          {/* "today" box (ice blue on the homepage). */}
          <div className="bio4-today" data-reveal>
            <p className="bio4-today__label">{bio4.today.label}</p>
            <p className="bio4-today__para">{renderRich(bio4.today.agency)}</p>
            <p className="bio4-today__book">
              <HighlightSweep tone="navy">{bio4.today.book}</HighlightSweep>
            </p>
            <p className="bio4-today__para">{bio4.today.learned}</p>
            <p className="bio4-today__para bio4-today__lesson">{renderRich(bio4.today.lesson)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
