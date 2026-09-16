import "./FourAreas.css";
import { fourAreas } from "../../data/copy.js";
import Button from "../primitives/Button.jsx";
import HighlightSweep from "../primitives/HighlightSweep.jsx";

// Numbered brush-script badges (01–04), seated in each card's top-right
// corner per the reference layout.
const POINTS = [
  "/Assets/Doodle/point 1.png",
  "/Assets/Doodle/point 2.png",
  "/Assets/Doodle/point 3.png",
  "/Assets/Doodle/point 4.png",
];

// Per-card hand-drawn symbols (target, compass, stopwatch, envelope) shown
// top-left above the title — restored from v2.
const ICONS = [
  "/Assets/Icons/1.png",
  "/Assets/Icons/2.png",
  "/Assets/Icons/3.png",
  "/Assets/Icons/4.png",
];

export default function FourAreas() {
  return (
    <section className="four-areas">
      <div className="four-areas__top">
        <div className="wrap center">
          <span className="four-areas__chip">In Under 5 Minutes</span>
          <h2 className="four-areas__headline" data-reveal>
            The diagnostic will walk you{" "}
            <br className="hl-br" />
            through{" "}
            <HighlightSweep tone="cream2">all four areas</HighlightSweep> of{" "}
            <br className="hl-br" />
            Compounding RPV OS:
          </h2>
        </div>
        <img
          className="four-areas__doodle-top"
          src="/Assets/Doodle/curvy arrow white.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </div>

      <div className="four-areas__bottom">
        <div className="wrap">
          <div className="four-areas__grid">
            {fourAreas.areas.map((area, i) => (
              <div className="four-areas__card" key={i} data-reveal data-reveal-delay={i * 90}>
                <img className="four-areas__badge" src={POINTS[i]} alt="" aria-hidden="true" loading="lazy" />
                <img className="four-areas__icon" src={ICONS[i]} alt="" aria-hidden="true" loading="lazy" />
                <h3 className="four-areas__card-title">{area.title}</h3>
                <p className="four-areas__card-body" dangerouslySetInnerHTML={{ __html: area.body }}></p>
              </div>
            ))}
          </div>

          <img
            className="four-areas__doodle-bottom"
            src="/Assets/Doodle/blue straight arrow.png"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />

          <div className="four-areas__cta center" data-reveal>
            <Button href="https://nomads-quiz-v2.vercel.app/">Start the diagnostic now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
