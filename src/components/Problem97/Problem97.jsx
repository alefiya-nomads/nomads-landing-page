import "./Problem97.css";
import { problem } from "../../data/copy.js";

const PUZZLE_SRC = "/Assets/Images/5th section left side puzzle image.png";

export default function Problem97() {
  return (
    <section className="problem">
      <div className="problem__panel problem__panel--dark">
        <div className="problem__frame">
          <img src={PUZZLE_SRC} alt="" className="problem__puzzle" aria-hidden="true" />


        </div>
      </div>

      <div className="problem__panel problem__panel--light">
        <div className="problem__content">
          <p className="problem__stat-label">{problem.lines[1]}</p>

          <div className="problem__chart-row">
            <div className="problem__chart" role="img" aria-label="97% of 100 people don't see the problem yet, 3% buy it immediately">
              <span className="problem__chart-slice problem__chart-slice--small">
                3%
                <small>Buy it</small>
              </span>
              <div className="problem__chart-center">
                <strong>100</strong>
                <small>People</small>
              </div>
              <span className="problem__chart-slice problem__chart-slice--big">
                97%
                <small>Don't see the problem (yet)</small>
              </span>
            </div>

            <h3 className="problem__chart-caption">
              Say you're selling
              <br />
              medicine for ulcers.
            </h3>
          </div>

          <div className="problem__callouts">
            <div className="problem__callout">
              <span className="problem__callout-num">03</span>
              <div>
                <strong>Ready to Take Action</strong>
                <p>Know they have ulcers and buy immediately.</p>
              </div>
            </div>
            <div className="problem__callout">
              <span className="problem__callout-num">97</span>
              <div>
                <strong>Experiencing Pain</strong>
                <p>Have stomach pain, but they don't know ulcers cause it.</p>
              </div>
            </div>
          </div>

          {/* Reference shows "97 people" here; copy.js's problem.lines[3] and
              legend say "70" (3/70/27 split) instead of the reference's 3/97
              split — flagged per 0.8, defaulting to the reference's numbers. */}
          <p className="problem__para">
            So when your messaging targets the problem (“medicine for ulcers”), <strong>you lose the 97 people</strong>{" "}
            who genuinely believe they don't have ulcers.
          </p>

          <p className="problem__highlight">{problem.lines[4]}</p>

          <p className="problem__para problem__para--bold">{problem.lines[5]}</p>
        </div>
      </div>
    </section>
  );
}
