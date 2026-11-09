import { Fragment } from "react";
import "./BioIntro.css";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import renderRich from "../primitives/richText.jsx";
import useInView from "../../hooks/useInView.js";
import { bio1 } from "../../data/copy.js";

/**
 * Bio 1 — "Hey, I'm Alefiya" bakery origin story, rebuilt from the
 * nomadsmarketing.co homepage "Bio 1" section: split layout with the copy
 * on an ice-blue panel (left) and the circular composite portrait on a
 * midnight panel (right; stacks portrait-first on mobile, as on the
 * homepage). Copy is verbatim (copy.js `bio1`).
 *
 * The homepage's static highlight boxes are replaced with interactive,
 * scroll-animated pieces that carry the same words:
 *   - price line: big bold text, "$120" swept in plum
 *   - flavours: three simple text tiles
 *   - lesson lines: plain semibold lead-in inside the quote box
 *   - quote card: "being different from your alternatives." sweeps in
 */
export default function BioIntro() {
  const [quoteRef, quoteIn] = useInView({ threshold: 0.45 });

  const [quoteLead, quoteRest] = bio1.quote.split(bio1.quoteStrike);
  const [quoteMid, quoteTail] = quoteRest.split(bio1.quoteWin);

  return (
    <section className="bio1" aria-labelledby="bio1-heading">
      <div className="bio1__text">
        <div className="bio1__inner">
          <h2 className="bio1__headline" id="bio1-heading" data-reveal>
            {bio1.headlineBefore}{" "}
            <span className="bio1__name">{bio1.nameScript}</span>
            {","}
            {bio1.headlineLines.map((line, i) => {
              // Keep "co-founder" from splitting at its hyphen on mobile.
              const [first, ...rest] = line.split(" ");
              return (
                <Fragment key={line}>
                  {" "}
                  <br className="hl-br" />
                  {i === 0 && first.includes("-") ? (
                    <>
                      <span className="bio1__nowrap">{first}</span> {rest.join(" ")}
                    </>
                  ) : (
                    line
                  )}
                </Fragment>
              );
            })}
          </h2>

          <p className="bio1__para" data-reveal data-reveal-delay="80">
            {bio1.intro}
          </p>

          {/* The price line, as big bold text (no card): same words as the
              homepage paragraph, with "$120" swept in plum. */}
          <p className="bio1-price-line" data-reveal>
            <strong>
              {bio1.priceLine.boldBefore}{" "}
              <HighlightSweep tone="plum">{bio1.priceLine.price}</HighlightSweep>
            </strong>{" "}
            {bio1.priceLine.after}
          </p>

          <p className="bio1__para" data-reveal>
            {renderRich(bio1.paragraphs[0])}
          </p>

          {/* Flavours — the bold flavour line as three simple tiles. */}
          <ul className="bio1-flavours" data-reveal>
            {bio1.flavours.map((f) => (
              <li key={f} className="bio1-flavour">
                <span className="bio1-flavour__name">{f}</span>
              </li>
            ))}
          </ul>

          <p className="bio1__para bio1__para--buyers" data-reveal>
            {renderRich(bio1.buyers)}
          </p>

          {/* Quote card — lead-in lines on top, then the quote; the winning
              phrase sweeps in. */}
          <div className="bio1__reveal" data-reveal>
          <blockquote
            ref={quoteRef}
            className={`bio1-quote${quoteIn ? " bio1-quote--in" : ""}`}
          >
            {/* Lead-in lines sit inside the box, above the quote. */}
            <p className="bio1__lesson">
              {bio1.lesson.map((line, i) => (
                <Fragment key={line}>
                  {/* Real space between the lines so the text reads
                      "...that was my first..." outside the visual layout too. */}
                  {i > 0 && " "}
                  <span className="bio1__lesson-line">{line}</span>
                </Fragment>
              ))}
            </p>
            <p className="bio1-quote__text">
              {quoteLead}
              {bio1.quoteStrike}
              {quoteMid}
              <span className="hl-sweep hl-sweep--navy bio1-quote__win">
                <span className="hl-sweep__text">{bio1.quoteWin}</span>
              </span>
              {quoteTail}
            </p>
          </blockquote>
          </div>
        </div>
      </div>

      <div className="bio1__visual">
        <picture>
          <source media="(max-width: 900px)" srcSet="/Assets/bio/bio-1-mobile.webp" />
          <img
            className="bio1__photo"
            src="/Assets/bio/bio-1.webp"
            alt="Alefiya, co-founder and chief strategist at Nomads Marketing, with two of her bakery creations"
            width="1400"
            height="1462"
            loading="lazy"
            data-reveal
          />
        </picture>
      </div>
    </section>
  );
}
