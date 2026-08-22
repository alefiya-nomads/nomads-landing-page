import "./FourStages.css";
import Button from "../primitives/Button.jsx";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import useInView from "../../hooks/useInView.js";
import { fourStages } from "../../data/copy.js";

// The closing phrase of the heading gets the plum sweep highlight; the "M"
// of "market" renders in the Better Brush script. Split off the lead so the
// highlight wraps exactly that phrase.
const HEAD_SWEEP = "the market your competitors ignore.";
const [headBefore] = fourStages.heading.split(HEAD_SWEEP);

/**
 * "Four stages" — the horizontal zigzag timeline (approved mock): a dashed
 * plum spine runs across the middle band, four numbered cards alternate
 * above/below it (01 up, 02 down, 03 up, 04 down). On scroll into view the
 * spine draws itself across, the nodes pop in, and the cards fade in one by
 * one (via the sitewide data-reveal system). Collapses to a vertical
 * stepper below 900px.
 */
export default function FourStages() {
  // Triggers the spine-draw + node-pop once the timeline scrolls into view.
  const [tlRef, tlInView] = useInView({ threshold: 0.25 });

  return (
    <section className="stages">
      <div className="wrap">
        <h2 className="stages__heading" data-reveal>
          {headBefore}
          <HighlightSweep tone="plumdark">
            the{" "}
            <span className="stages__script-m">M</span>arket your competitors ignore.
          </HighlightSweep>
        </h2>

        <p className="stages__intro" data-reveal data-reveal-delay="100">
          {fourStages.intro}
        </p>

        <div
          ref={tlRef}
          className={`stages__timeline${tlInView ? " stages__timeline--in" : ""}`}
        >
          <span className="stages__spine" aria-hidden="true" />
          {fourStages.stages.map((stage, i) => (
            // Timing is driven entirely by --stages-total on .stages__timeline
            // (CSS): the spine draws linearly over that total, and box i
            // (via its --i index) fades during the i-th quarter — change the
            // one variable and everything re-divides automatically.
            <div
              key={stage.n}
              className={`stages__slot ${i % 2 === 0 ? "stages__slot--up" : "stages__slot--down"}`}
              style={{ gridColumn: i + 1, "--i": i }}
            >
              <article className={`stages__card stages__card--c${i}`}>
                <img
                  className="stages__badge"
                  src={`/Assets/Doodle/red point ${i + 1}.png`}
                  alt={`Step ${stage.n}`}
                  loading="lazy"
                />
                <h3 className="stages__name">{stage.name}</h3>
                <p className="stages__body">{stage.body}</p>
              </article>
            </div>
          ))}
        </div>

        <p className="stages__outro stages__outro--bold" data-reveal>
          {fourStages.outroBold}
        </p>
        <p className="stages__outro" data-reveal data-reveal-delay="100">
          {fourStages.outro}
        </p>

        <div className="stages__cta" data-reveal>
          <Button href="#diagnostic">{fourStages.ctaLabel}</Button>
          <p className="stages__cta-sub">{fourStages.ctaSub}</p>
        </div>
      </div>
    </section>
  );
}
