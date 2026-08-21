import "./ProofIntro.css";
import HighlightSweep from "../primitives/HighlightSweep.jsx";

export default function ProofIntro() {
  return (
    <section className="proof-intro">
      <div className="wrap center">
        <h2 className="proof-intro__headline" data-reveal>
          How do you convince{" "}
          <br className="hl-br" />
          <HighlightSweep tone="plumdark">them to buy from you?</HighlightSweep>
        </h2>

        <p className="proof-intro__sub" data-reveal data-reveal-delay="120">
          This question led us to develop a proprietary diagnostic system that has helped our clients get incredible results…
        </p>
      </div>
    </section>
  );
}
