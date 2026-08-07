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
      />
      <img
        className="calc__doodle-thisway"
        src="/Assets/Doodle/thisway dashed arrow.png"
        alt=""
        aria-hidden="true"
      />
      <div className="wrap">
        <h2 className="calc__headline center">
          Before You Spend Another Dollar{" "}
          <br className="hl-br" />
          On Traffic, Find Out What Your{" "}
          <br className="hl-br" />
          <HighlightSweep tone="cream">Current Traffic Is Actually Worth.</HighlightSweep>
        </h2>

        <p className="calc__subtitle center">{calculator.lines[1]}</p>

        <div className="calc__points">
          <div className="calc__point">
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

          <div className="calc__point">
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

        <div className="calc__mock-frame">
          <div className="calc__mock-bar">
            <img className="calc__mock-logo" src="/icons/logo.avif" alt="Nomads" />
          </div>
          <div className="calc__mock-body">
            <span className="todo">Calculator screenshot / GIF — asset pending</span>
          </div>
        </div>

        <div className="calc__bottom">
          <p className="calc__gap-text center">{calculator.lines[4]}</p>
          <div className="center">
            <Button href="#diagnostic" variant="onDark">
              Show me my potential rpv
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
