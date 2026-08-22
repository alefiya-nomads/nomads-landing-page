import "./ProofTable.css";
import { proofTable, proofOutro, fourStages } from "../../data/copy.js";
import Button from "../primitives/Button.jsx";
import CountUp from "../primitives/CountUp.jsx";
import HighlightSweep from "../primitives/HighlightSweep.jsx";

// Split the bridge heading so "Revenue Per Visitor™" gets the sweep.
const BRIDGE_SWEEP = "Revenue Per Visitor™";
const [bridgeBefore, bridgeAfter] = fourStages.bridge.split(BRIDGE_SWEEP);

// Split a display stat like "7,306%", "318×", "4.2×" or "$8K" into the
// pieces CountUp animates: a leading prefix, the numeric target, its
// decimal places, whether it uses thousands grouping, and a trailing
// suffix. Returns null if there's no number to count (falls back to text).
function parseStat(hero) {
  const match = String(hero).match(/^(.*?)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const target = Number(numStr.replace(/,/g, ""));
  if (Number.isNaN(target)) return null;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, target, suffix, decimals, separator: numStr.includes(",") };
}

const TONES = [
  { beforeBg: "var(--bg-lavender)", beforeBorder: "#c9a8d4", afterBg: "var(--brand-plum)", afterText: "var(--white)" },
  { beforeBg: "#f2e6d8", beforeBorder: "var(--stone)", afterBg: "var(--ink-dark)", afterText: "var(--white)" },
  { beforeBg: "#e4fbff", beforeBorder: "#a0b4d4", afterBg: "var(--midnight-blue)", afterText: "var(--white)" },
  { beforeBg: "#e0b5a3", beforeBorder: "#c9a8d4", afterBg: "var(--brand-plum)", afterText: "var(--white)" },
  { beforeBg: "var(--bg-lavender)", beforeBorder: "#a0b4d4", afterBg: "#2a0d20", afterText: "var(--white)" },
];

function renderWithBold(text) {
  if (!text) return null;
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export default function ProofTable() {
  return (
    <section className="proof">
      <div className="wrap">
        <h2 className="stages__bridge" data-reveal>
          {bridgeBefore}
          <HighlightSweep tone="plum">{BRIDGE_SWEEP}</HighlightSweep>
          {bridgeAfter}
        </h2>

        <div className="proof__headers" data-reveal>
          <div className="proof__head proof__head--before">
            <h3 className="proof__col-label">Before</h3>
            <span className="proof__head-arrow" aria-hidden="true">→</span>
          </div>
          <div className="proof__head">
            <h3 className="proof__col-label">After</h3>
          </div>
          <div className="proof__head proof__head--data" aria-hidden="true" />
        </div>

        <div className="proof__rows">
          {proofTable.map((pair, i) => {
            const tone = TONES[i % TONES.length];
            const stat = pair.stat || {};
            const heroParts = stat.hero ? parseStat(stat.hero) : null;
            return (
              <div className="proof__row" key={i} data-reveal data-reveal-delay={i * 80}>
                <div
                  className="proof__card proof__card--before"
                  style={{ background: tone.beforeBg, borderColor: tone.beforeBorder }}
                >
                  {pair.heading && <h4 className="proof__before-heading">{pair.heading}</h4>}
                  <p>{renderWithBold(pair.before)}</p>
                  <img
                    className="proof__row-arrow"
                    src="/Assets/Doodle/sczv 6.png"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                </div>

                <div
                  className="proof__card proof__card--after"
                  style={{ background: tone.afterBg, color: tone.afterText, borderColor: tone.afterBg }}
                >
                  {pair.afterHeading && (
                    <h4 className="proof__after-heading">{pair.afterHeading}</h4>
                  )}
                  <p>{renderWithBold(pair.after)}</p>
                </div>

                <div
                  className="proof__data"
                  style={{ background: tone.afterBg, color: tone.afterText, borderColor: tone.afterBg }}
                >
                  {stat.hero &&
                    (heroParts ? (
                      <CountUp
                        className="proof__data-hero"
                        target={heroParts.target}
                        prefix={heroParts.prefix}
                        suffix={heroParts.suffix}
                        decimals={heroParts.decimals}
                        separator={heroParts.separator}
                        duration={3200}
                      />
                    ) : (
                      <span className="proof__data-hero">{stat.hero}</span>
                    ))}
                  {stat.lines &&
                    stat.lines.map((line, j) => (
                      <span
                        key={j}
                        className={j === 0 ? "proof__data-line" : "proof__data-sub"}
                      >
                        {line}
                      </span>
                    ))}
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
