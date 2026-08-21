import "./FourStages.css";
import Button from "../primitives/Button.jsx";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import useInView from "../../hooks/useInView.js";
import { fourStages } from "../../data/copy.js";

/**
 * "Four stages" — the horizontal zigzag timeline (approved mock): a dashed
 * plum spine runs across the middle band, four numbered cards alternate
 * above/below it (01 up, 02 down, 03 up, 04 down). On scroll into view the
 * spine draws itself across, the nodes pop in, and the cards fade in one by
 * one (via the sitewide data-reveal system). Collapses to a vertical
 * stepper below 900px.
 */
export default function FourStages() {
  const [headBefore, headAfter] = fourStages.heading.split(fourStages.headingHighlight);

  // Triggers the spine-draw + node-pop once the timeline scrolls into view.
  const [tlRef, tlInView] = useInView({ threshold: 0.25 });

  return (
    <section className="stages">
      <div className="wrap">
        <h2 className="stages__headline" data-reveal>
          {headBefore}
          <HighlightSweep tone="plum">{fourStages.headingHighlight}</HighlightSweep>
          {headAfter}
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
              <article className="stages__card">
                <span className="stages__badge">{stage.n}</span>
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

        <h2 className="stages__bridge" data-reveal>
          {fourStages.bridge}
        </h2>
        <svg className="stages__bridge-arrow" viewBox="0 0 16 34" aria-hidden="true">
          <line x1="8" y1="0" x2="8" y2="26" />
          <polyline points="2,24 8,32 14,24" />
        </svg>
      </div>
    </section>
  );
}
