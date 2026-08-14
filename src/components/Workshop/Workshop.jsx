import "./Workshop.css";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import { workshop } from "../../data/copy.js";

/**
 * Section J — "A Private On-Demand Workshop With Alefiya." Rebuilt to the
 * reference: dark navy section, centered mono chip + white headline (with
 * the "On-Demand" cream highlight box), centered intro copy, then the
 * NOMADS video-card image with a white closing-note card overlapping its
 * bottom-right corner (the sitewide overlap motif).
 *
 * Note: copy.js stores the heading in sentence case ("private on-demand");
 * the reference shows Title Case with "On-Demand" capitalised, so the
 * headline is rendered to match the reference casing (text-transform +
 * the literal highlight word).
 */
export default function Workshop() {
  const [before, after] = workshop.heading.split("on-demand");

  return (
    <section className="workshop" id="workshop">
      <div className="wrap workshop__wrap">
        <span className="workshop__chip" data-reveal>
          {workshop.chip}
        </span>

        <h2 className="workshop__headline" data-reveal data-reveal-delay="80">
          {before}
          <HighlightSweep tone="cream2">On-Demand</HighlightSweep>
          <br className="workshop__brk" />
          {after}
        </h2>

        {workshop.lines.map((line, i) => (
          <p
            key={i}
            className={`workshop__para${i === 1 ? " workshop__para--bold" : ""}`}
            data-reveal
            data-reveal-delay={160 + i * 90}
          >
            {line}
          </p>
        ))}

        <div className="workshop__showcase" data-reveal data-reveal-delay="120">
          <img
            className="workshop__video"
            src="/Assets/Images/video image.webp"
            alt="A private on-demand workshop with Alefiya Khorakiwala"
            loading="lazy"
          />

          <div className="workshop__closing">
            {workshop.closingLines.slice(0, 2).map((line, i) => (
              <p key={i} className="workshop__closing-para">
                {line}
              </p>
            ))}
            <p className="workshop__closer">{workshop.closingLines[2]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
