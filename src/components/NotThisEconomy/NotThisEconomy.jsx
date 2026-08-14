import "./NotThisEconomy.css";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import { notThisEconomy } from "../../data/copy.js";

const LAPTOP_SRC = "/Assets/Images/tablet mockup.png";

export default function NotThisEconomy() {
  const [, sub] = notThisEconomy.lines;

  // Manual line breaks (design-v2.md 0.6) matching the reference image's
  // 4-line headline pattern. These concatenate back to notThisEconomy.lines[0]
  // verbatim — kept as literals since the sentence has no clean split points
  // to chain off of.
  const headlineLine1 = "This isn’t the economy to";
  const headlineLine2 = "continue pouring money";
  const headlineLine3 = "down the drain in hopes";
  const headlineLine4Prefix = "of";

  return (
    <section className="economy">
      <img
        className="economy__badge"
        src="/Assets/Doodle/white circle badge.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <div className="economy__frame">
        <div className="wrap economy__grid">
          <div className="economy__copy">
            <h2 className="economy__headline" data-reveal>
              {headlineLine1}{" "}
              <br className="hl-br" />
              {headlineLine2}{" "}
              <br className="hl-br" />
              {headlineLine3}{" "}
              <br className="hl-br" />
              {headlineLine4Prefix} <HighlightSweep tone="iceblue">getting "more traffic".</HighlightSweep>
            </h2>

            <p className="economy__sub" data-reveal data-reveal-delay="120">
              {sub}
            </p>
          </div>

          <div className="economy__visual" data-reveal data-reveal-delay="200">
            <img src={LAPTOP_SRC} alt="RPV dashboard shown on a laptop" className="economy__laptop" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
