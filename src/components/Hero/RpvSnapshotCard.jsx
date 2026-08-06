import { useEffect, useState } from "react";
import "./RpvSnapshotCard.css";
import { hero } from "../../data/copy.js";
import CountUp from "../primitives/CountUp.jsx";

/**
 * "Your RPV™ Snapshot" result card — current vs. potential RPV as two
 * stacked label+number rows on the left, a small vertical bar chart
 * (short bar = current, tall bar = potential) on the right, and a
 * horizontal gap-bar underneath that animates its fill on mount.
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
    <div className="rpv-card">
      <div className="rpv-card__bar">
        <span>{snapshotCard.title}</span>
        <span className="rpv-card__dot" aria-hidden="true" />
      </div>

      <div className="rpv-card__body">
        <div className="rpv-card__stats">
          <div className="rpv-card__stat">
            <span className="rpv-card__k">How much you make per visitor today</span>
            <CountUp
              target={snapshotCard.current}
              prefix="$"
              decimals={2}
              className="rpv-card__v rpv-card__v--now"
            />
          </div>
          <div className="rpv-card__stat">
            <span className="rpv-card__k">How much you could make per visitor</span>
            <CountUp
              target={snapshotCard.potential}
              prefix="$"
              decimals={2}
              className="rpv-card__v rpv-card__v--pot"
            />
          </div>
        </div>

        <div className="rpv-card__chart">
          <span className="rpv-card__chart-annotation">Your Potential</span>
          <div className="rpv-card__bars">
            <div className="rpv-card__bar-col">
              <div
                className="rpv-card__bar-fill rpv-card__bar-fill--now"
                style={{ height: barsGrown ? `${currentPct}%` : "0%" }}
              >
                <span className="rpv-card__bar-label">${snapshotCard.current.toFixed(2)}</span>
              </div>
            </div>
            <div className="rpv-card__bar-col">
              <div
                className="rpv-card__bar-fill rpv-card__bar-fill--pot"
                style={{ height: barsGrown ? `${potentialPct}%` : "0%" }}
              >
                <span className="rpv-card__bar-label rpv-card__bar-label--pot">
                  ${snapshotCard.potential.toFixed(2)}
                </span>
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
