import "./NotThisEconomy.css";
import { notThisEconomy } from "../../data/copy.js";

export default function NotThisEconomy() {
  const [, sub] = notThisEconomy.lines;

  // Manual line breaks (design-v2.md 0.6) matching the reference image's
  // 3-line headline pattern, with the closing quoted phrase rendered in the
  // Better Brush script (per the mock). These concatenate back to
  // notThisEconomy.lines[0] verbatim — kept as literals since the sentence
  // has no clean split points to chain off of.
  const headlineLine1 = "This isn’t the economy to continue";
  const headlineLine2 = "pouring money down the drain in";
  const headlineLine3Prefix = "hopes of getting";
  const scriptPhrase = '"more traffic"';

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
        {/* Single white doodle arrow on the right. */}
        <img
          className="economy__arrow"
          src="/Assets/Doodle/straight arrow.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        <div className="wrap economy__grid">
          <div className="economy__copy">
            <h2 className="economy__headline" data-reveal>
              {headlineLine1}{" "}
              <br className="hl-br" />
              {headlineLine2}{" "}
              <br className="hl-br" />
              <span className="economy__tail">
                {headlineLine3Prefix}{" "}
                <span className="economy__script">{scriptPhrase}</span>
              </span>
            </h2>

            <p className="economy__sub" data-reveal data-reveal-delay="120">
              {sub}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
