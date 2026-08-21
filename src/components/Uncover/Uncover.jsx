import "./Uncover.css";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import { uncover } from "../../data/copy.js";

// Heights of the ascending mini bar chart on card 05 — mirrors the
// ▁▃▂▅▆█ pattern from the copy spec (rise, small dip, then climb).
const OPP_BAR_HEIGHTS = [18, 34, 26, 52, 66, 88];

/* Mono step number + status dot at the top of every card. */
function CardHead({ n, accent = false }) {
  return (
    <div className="uncover-card__head">
      <span className="uncover-card__num">{n}</span>
      <span
        className={"uncover-card__dot" + (accent ? " uncover-card__dot--accent" : "")}
        aria-hidden="true"
      />
    </div>
  );
}

export default function Uncover() {
  const [quizCard, rpvCard, metricsCard, pillarsCard, oppCard] = uncover.cards;
  const [leadBefore, leadAfter] = uncover.lead.split(uncover.leadHighlight);
  const [footBefore] = uncover.footer.split(uncover.footerAccent);

  return (
    <section className="uncover">
      <div className="wrap">
        <p className="uncover__eyebrow" data-reveal>
          {uncover.eyebrow}
        </p>

        <h2 className="uncover__headline" data-reveal data-reveal-delay="90">
          {leadBefore}
          <HighlightSweep tone="cream2">{uncover.leadHighlight}</HighlightSweep>
          {leadAfter}
        </h2>

        <div className="uncover__cards">
          {/* 01 — mini quiz: question bars, one checked, progress pips */}
          <article className="uncover-card uncover-card--dark" data-reveal>
            <CardHead n={quizCard.n} />
            <div className="uncover-card__visual uncover-quiz" aria-hidden="true">
              <span className="uncover-quiz__q">{quizCard.quiz.q}</span>
              <div className="uncover-quiz__bars">
                {Array.from({ length: quizCard.quiz.bars }, (_, i) => (
                  <span key={i} className="uncover-quiz__bar">
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
              <div className="uncover-quiz__pips">
                {Array.from({ length: quizCard.quiz.pips }, (_, i) => (
                  <i key={i} className={i < quizCard.quiz.pipsOn ? "is-on" : undefined} />
                ))}
              </div>
            </div>
            <p className="uncover-card__label">{quizCard.label}</p>
          </article>

          {/* 02 — current RPV × visitors = revenue (light payoff card) */}
          <article className="uncover-card uncover-card--light" data-reveal data-reveal-delay="90">
            <CardHead n={rpvCard.n} />
            <div className="uncover-card__visual uncover-rpv">
              <span className="uncover-rpv__big">{rpvCard.stat}</span>
              <span className="uncover-rpv__cap">{rpvCard.statCaption}</span>
              <span className="uncover-card__rule" aria-hidden="true" />
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
            </div>
            <p className="uncover-card__label">{rpvCard.label}</p>
          </article>

          {/* 03 — the 5 metrics, three of them blurred out */}
          <article className="uncover-card uncover-card--dark" data-reveal data-reveal-delay="180">
            <CardHead n={metricsCard.n} />
            <div className="uncover-card__visual uncover-metrics">
              <ul className="uncover-metrics__list">
                {metricsCard.metrics.map((m, i) => (
                  <li key={m}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {m}
                  </li>
                ))}
                {Array.from({ length: metricsCard.blurredCount }, (_, i) => (
                  <li key={`blur-${i}`} className="uncover-metrics__hidden" aria-hidden="true">
                    <span>{String(metricsCard.metrics.length + i + 1).padStart(2, "0")}</span>
                    <i />
                  </li>
                ))}
              </ul>
              <span className="uncover-card__rule" aria-hidden="true" />
              <span className="uncover-metrics__cap">{metricsCard.caption}</span>
            </div>
            <p className="uncover-card__label">{metricsCard.label}</p>
          </article>

          {/* 04 — symptom → pillar map + team score */}
          <article className="uncover-card uncover-card--dark" data-reveal data-reveal-delay="270">
            <CardHead n={pillarsCard.n} />
            <div className="uncover-card__visual uncover-pillars">
              <ul className="uncover-pillars__list">
                {pillarsCard.pillars.map((p) => (
                  <li key={p.pillar}>
                    <span className="uncover-pillars__when">{p.when}</span>
                    <span className="uncover-pillars__name">→ {p.pillar}</span>
                  </li>
                ))}
              </ul>
              <span className="uncover-card__rule" aria-hidden="true" />
              <span className="uncover-pillars__score">{pillarsCard.score}</span>
            </div>
            <p className="uncover-card__label">{pillarsCard.label}</p>
          </article>

          {/* 05 — the opportunity (light payoff card, plum ring = finale) */}
          <article
            className="uncover-card uncover-card--light uncover-card--final"
            data-reveal
            data-reveal-delay="360"
          >
            <CardHead n={oppCard.n} accent />
            <div className="uncover-card__visual uncover-opp">
              <span className="uncover-opp__pre">{oppCard.pre}</span>
              <span className="uncover-opp__big">{oppCard.stat}</span>
              <span className="uncover-opp__sub">{oppCard.sub}</span>
              <div className="uncover-opp__bars" aria-hidden="true">
                {OPP_BAR_HEIGHTS.map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
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
