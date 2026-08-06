import "./Calculator.css";
import { calculator } from "../../data/copy.js";
import Button from "../primitives/Button.jsx";

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
      <div className="wrap">
        <h2 className="calc__headline center">
          Before You Spend Another Dollar
          <br />
          On Traffic, Find Out What Your
          <br />
          <span className="calc__highlight">
            Current Traffic Is Actually Worth.
          </span>
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
            <span className="calc__mock-brand">NOMADS</span>
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
