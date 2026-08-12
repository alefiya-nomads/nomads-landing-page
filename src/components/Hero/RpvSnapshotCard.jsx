import { useEffect, useState } from "react";
import "./RpvSnapshotCard.css";
import { hero } from "../../data/copy.js";
import CountUp from "../primitives/CountUp.jsx";

/**
 * "Your RPV Snapshot" result card, built to match the reference design:
 * plum title bar, two salmon chips with big plum values on the left, a
 * beige gridline chart panel on the right with two dark bars (labels
 * inside), the hand-drawn "Your Potential" arrow doodle overlapping the
 * panel's top-right corner, a pill gap-bar, and a centered caption.
 */
export default function RpvSnapshotCard() {
  const { snapshotCard } = hero;
  const [filled, setFilled] = useState(false);
  const [barsGrown, setBarsGrown] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setBarsGrown(true), 200);
    const t2 = setTimeout(() => setFilled(true), 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const maxVal = snapshotCard.potential;
  const currentPct = (snapshotCard.current / maxVal) * 100;
  const potentialPct = 100;

  return (
    <div className="rpv-card" data-reveal data-reveal-delay="320">
      <div className="rpv-card__bar">
        <span>Your RPV Snapshot</span>
      </div>

      <div className="rpv-card__body">
        <div className="rpv-card__main">
          <div className="rpv-card__stats">
            <div className="rpv-card__stat">
              <span className="rpv-card__k">How much you make per visitor today</span>
              <CountUp
                target={snapshotCard.current}
                prefix="$"
                decimals={2}
                className="rpv-card__v"
              />
            </div>
            <div className="rpv-card__stat">
              <span className="rpv-card__k">How much you could make per visitor</span>
              <CountUp
                target={snapshotCard.potential}
                prefix="$"
                decimals={2}
                className="rpv-card__v"
              />
            </div>
          </div>

          <div className="rpv-card__chart">
            <img
              className="rpv-card__potential"
              src="/Assets/Doodle/your potential arrow doodle.png"
              alt=""
              aria-hidden="true"
            />
            <div className="rpv-card__bars">
              <div
                className="rpv-card__bar-fill rpv-card__bar-fill--now"
                style={{ height: barsGrown ? `${currentPct}%` : "0%" }}
              >
                <span className="rpv-card__bar-label">${snapshotCard.current.toFixed(2)}</span>
              </div>
              <div
                className="rpv-card__bar-fill rpv-card__bar-fill--pot"
                style={{ height: barsGrown ? `${potentialPct}%` : "0%" }}
              >
                <span className="rpv-card__bar-label">${snapshotCard.potential.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rpv-card__gapbar">
          <span
            className="rpv-card__gapfill"
            style={{ width: filled ? `${snapshotCard.fillPercent}%` : "0%" }}
          />
        </div>

        <p className="rpv-card__cap">{snapshotCard.caption}</p>
      </div>
    </div>
  );
}
