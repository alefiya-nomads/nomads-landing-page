import "./ProofTable.css";
import { proofTable, proofOutro } from "../../data/copy.js";
import Button from "../primitives/Button.jsx";

const TONES = [
  {
    beforeBg: "var(--bg-lavender)",
    beforeBorder: "#c9a8d4",
    afterBg: "var(--brand-plum)",
    afterText: "var(--white)",
    arrow: "var(--brand-plum)",
  },
  {
    beforeBg: "#f2e6d8",
    beforeBorder: "var(--stone)",
    afterBg: "var(--ink-dark)",
    afterText: "var(--white)",
    arrow: "var(--ink-dark)",
  },
  {
    beforeBg: "#e4fbff",
    beforeBorder: "#a0b4d4",
    afterBg: "var(--midnight-blue)",
    afterText: "var(--white)",
    arrow: "var(--midnight-blue)",
  },
  {
    beforeBg: "#e0b5a3",
    beforeBorder: "#c9a8d4",
    afterBg: "var(--brand-plum)",
    afterText: "var(--white)",
    arrow: "var(--brand-plum)",
  },
  {
    beforeBg: "var(--bg-lavender)",
    beforeBorder: "#a0b4d4",
    afterBg: "#2a0d20",
    afterText: "var(--white)",
    arrow: "#2a0d20",
  },
];

function DoodleArrow() {
  return (
    <img
      className="proof__arrow-icon"
      src="/Assets/Doodle/sczv 6.png"
      alt=""
      aria-hidden="true"
    />
  );
}

export default function ProofTable() {
  return (
    <section className="proof">
      <div className="wrap">
        <div className="proof__headers" data-reveal>
          <h3 className="proof__col-label">Before</h3>
          <span className="proof__col-spacer" />
          <h3 className="proof__col-label">After</h3>
        </div>

        <div className="proof__rows">
          {proofTable.map((pair, i) => {
            const tone = TONES[i % TONES.length];
            return (
              <div className="proof__row" key={i} data-reveal data-reveal-delay={i * 80}>
                <div
                  className="proof__card proof__card--before"
                  style={{
                    background: tone.beforeBg,
                    borderColor: tone.beforeBorder,
                  }}
                >
                  <p>{pair.before}</p>
                </div>

                <div className="proof__arrow">
                  <DoodleArrow />
                </div>

                <div
                  className="proof__card proof__card--after"
                  style={{
                    background: tone.afterBg,
                    color: tone.afterText,
                    borderColor: tone.afterBg,
                  }}
                >
                  <p>{pair.after}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="proof__cta" data-reveal>
          <Button href="#diagnostic">
            Show me how to convert
            <br />
            more of the 97% of my traffic
          </Button>
          <p className="proof__sub">{proofOutro.sub}</p>
        </div>
      </div>
    </section>
  );
}
