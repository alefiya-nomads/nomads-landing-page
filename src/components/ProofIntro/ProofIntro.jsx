import "./ProofIntro.css";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import { proofOutro, problem } from "../../data/copy.js";

export default function ProofIntro() {
  return (
    <section className="proof-intro">
      <div className="wrap center">
        <h2 className="proof-intro__headline">
          How Do You Convince{" "}
          <br className="hl-br" />
          <HighlightSweep tone="plumdark">Them To Buy From You?</HighlightSweep>
        </h2>

        <p className="proof-intro__sub">{problem.lines[3]}</p>
      </div>

      <img
        className="proof-intro__doodle"
        src="/Assets/Doodle/tick box white doodle.png"
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}
