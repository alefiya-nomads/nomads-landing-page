import "./FourAreas.css";
import { fourAreas } from "../../data/copy.js";
import Button from "../primitives/Button.jsx";
import HighlightSweep from "../primitives/HighlightSweep.jsx";

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
            The Diagnostic Will Walk You{" "}
            <br className="hl-br" />
            Through{" "}
            <HighlightSweep tone="cream2">All Four Areas</HighlightSweep> Of{" "}
            <br className="hl-br" />
            Compounding RPV OS:
          </h2>
        </div>
        <img
          className="four-areas__doodle-top"
          src="/Assets/Doodle/curvy arrow white.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="four-areas__bottom">
        <div className="wrap">
          <div className="four-areas__grid">
            {fourAreas.areas.map((area, i) => (
              <div className="four-areas__card" key={i} data-reveal data-reveal-delay={i * 90}>
                <img className="four-areas__icon" src={ICONS[i]} alt="" aria-hidden="true" />
                <h3 className="four-areas__card-title">{area.title}</h3>
                <p className="four-areas__card-body">{area.body}</p>
              </div>
            ))}
          </div>

          <img
            className="four-areas__doodle-bottom"
            src="/Assets/Doodle/blue straight arrow.png"
            alt=""
            aria-hidden="true"
          />

          <div className="four-areas__cta center" data-reveal>
            <Button href="#diagnostic">Start the diagnostic now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
