import "./NotThisEconomy.css";
import { notThisEconomy } from "../../data/copy.js";

const LAPTOP_SRC = "/Assets/Images/2nd section laptop image.png";

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
      <div className="economy__frame">
        <div className="wrap economy__grid">
          <div className="economy__copy">
            <h2 className="economy__headline">
              {headlineLine1}
              <br />
              {headlineLine2}
              <br />
              {headlineLine3}
              <br />
              {headlineLine4Prefix} <span className="economy__highlight">getting "more traffic".</span>
            </h2>

            <p className="economy__sub">{sub}</p>
          </div>

          <div className="economy__visual">
            <img src={LAPTOP_SRC} alt="RPV dashboard shown on a laptop" className="economy__laptop" />
          </div>
        </div>
      </div>
    </section>
  );
}
