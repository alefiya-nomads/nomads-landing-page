import "./ProofIntro.css";
import { proofOutro, problem } from "../../data/copy.js";

export default function ProofIntro() {
  return (
    <section className="proof-intro">
      <div className="wrap center">
        <h2 className="proof-intro__headline">
          How Do You Convince
          <br />
          <span className="proof-intro__highlight">
            Them To Buy From You?
          </span>
        </h2>

        <p className="proof-intro__sub">{problem.lines[3]}</p>
      </div>

      <svg
        className="proof-intro__stamp"
        viewBox="0 0 140 60"
        aria-hidden="true"
      >
        <ellipse
          cx="70"
          cy="30"
          rx="65"
          ry="26"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
        />
        <text
          x="70"
          y="28"
          textAnchor="middle"
          fontSize="9"
          fontStyle="italic"
          fill="rgba(255,255,255,0.45)"
          fontFamily="var(--font-script)"
        >
          <tspan x="70" dy="0">Tick a box to see</tspan>
          <tspan x="70" dy="12">the verdict</tspan>
        </text>
      </svg>
    </section>
  );
}
