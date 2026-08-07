import "./ChecklistSection.css";
import Button from "../primitives/Button.jsx";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import { checklistIntro, scenarios, checklistOutro } from "../../data/copy.js";

export default function ChecklistSection() {
  // Manual line breaks (design-v2.md 0.6) matching the reference image's
  // 3-line headline pattern (7 words / 3 words / 4 highlighted words).
  // These concatenate back to checklistIntro.heading verbatim.
  const headlineLine1 = "Do you have what it takes to";
  const headlineLine2 = "add $1.5M/year from";
  const headlineLine3 = "your existing marketing spend?";

  // The reference image shows this button in sentence case, not the ALL-CAPS
  // string copy.js's checklistOutro.ctaLabel carries — rendering the reference's
  // casing per design-v2.md 0.8 (flagged, not silently picked: same words,
  // casing differs from the copy.js source).
  const ctaLabel = "Show me how to add $1.5m in extra revenue this year";

  return (
    <section className="checklist">
      <img
        className="checklist__doodle-compass"
        src="/Assets/Doodle/compass doodle.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className="checklist__doodle-note"
        src="/Assets/Doodle/3rd sec doodle.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className="checklist__doodle-arrows"
        src="/Assets/Doodle/straight arrow.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className="checklist__doodle-footprints"
        src="/Assets/Doodle/footprint doodle.png"
        alt=""
        aria-hidden="true"
      />
      <div className="wrap">
        <h2 className="checklist__headline">
          {headlineLine1}{" "}
          <br className="hl-br" />
          {headlineLine2}{" "}
          <br className="hl-br" />
          <HighlightSweep tone="plum">{headlineLine3}</HighlightSweep>
        </h2>

        <div className="checklist__intro-row">
          <span className="checklist__tag">{checklistIntro.sub}</span>
          {/* Reference reads "TICK THE BOX AND FIND OUT." — copy.js's chip
              says "Check all that apply" (conflict flagged, defaulting to
              the reference per design-v2.md 0.8). CSS uppercases it. */}
          <span className="checklist__intro-text">Tick the box and find out.</span>
        </div>

        <ul className="checklist__list">
          {scenarios.map((scenario, i) => (
            <li key={scenario.id} className={`checklist__item ${i % 2 === 0 ? "checklist__item--plum" : "checklist__item--navy"}`}>
              <label className="checklist__label">
                <input type="checkbox" className="checklist__checkbox" />
                <span>{scenario.situation}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="checklist__cta">
          <Button href="#diagnostic">{ctaLabel}</Button>
          <p className="checklist__cta-sub">{checklistOutro.sub}</p>
        </div>
      </div>
    </section>
  );
}
