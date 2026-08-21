import "./Calculator.css";
import { calculator } from "../../data/copy.js";
import Button from "../primitives/Button.jsx";
import HighlightSweep from "../primitives/HighlightSweep.jsx";

function PointDoodle() {
  return (
    <img
      className="calc__chevron"
      src="/Assets/Doodle/sczv 7.png"
      alt=""
      aria-hidden="true"
      loading="lazy"
    />
  );
}

export default function Calculator() {
  return (
    <section className="calc">
      <img
        className="calc__doodle-curvy"
        src="/Assets/Doodle/curvy line dashed arrow white.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <div className="wrap calc__grid">
        {/* Left column — copy */}
        <div className="calc__copy">
          <span className="calc__chip" data-reveal>
            Before You Spend Another Dollar
          </span>
          <h2 className="calc__headline" data-reveal data-reveal-delay="80">
            On traffic, find out what your{" "}
            <HighlightSweep tone="cream">current traffic is actually worth.</HighlightSweep>
          </h2>

          <p className="calc__subtitle" data-reveal data-reveal-delay="120">
            {calculator.lines[1]}
          </p>

          <div className="calc__points">
            <div className="calc__point" data-reveal data-reveal-delay="80">
              <PointDoodle />
              <div>
                <p className="calc__point-label">
                  Your current Revenue Per Visitor™
                </p>
                <p className="calc__point-body">
                  how much revenue your business generates, on average, for every
                  person it attracts.
                </p>
              </div>
            </div>

            <div className="calc__point" data-reveal data-reveal-delay="180">
              <PointDoodle />
              <div>
                <p className="calc__point-label">
                  Your potential Revenue Per Visitor™
                </p>
                <p className="calc__point-body">
                  what that same traffic is worth once you and your team address
                  the weak spots across four key areas.
                </p>
              </div>
            </div>
          </div>

          <div className="calc__bottom" data-reveal>
            <p className="calc__gap-text">{calculator.lines[4]}</p>
            <div>
              <Button href="#diagnostic" variant="onDark">
                Show me my potential rpv
              </Button>
            </div>
          </div>
        </div>

        {/* Right column — calculator mock placeholder */}
        <div className="calc__visual" data-reveal data-reveal-delay="120">
          <div className="calc__mock-frame">
            <div className="calc__mock-bar">
              <img className="calc__mock-logo" src="/icons/logo.avif" alt="Nomads" loading="lazy" />
            </div>
            <div className="calc__mock-body">
              <span className="todo">Calculator screenshot / GIF — asset pending</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
