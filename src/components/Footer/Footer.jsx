import "./Footer.css";
import Button from "../primitives/Button.jsx";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import { footer } from "../../data/copy.js";

const PHOTO_SRC = "/Assets/photos/alefiya-footer.png";

/**
 * Closing footer, ported from v1 (Section tone="footer"). The v1
 * Section primitive's footer tone/background is inlined on the section
 * element, and v1's phrase-based HighlightSweep is expressed with v2's
 * children-based sweep component.
 */
export default function Footer() {
  const [sweep, rest] = footer.signature.split("Compound Revenue");

  return (
    <section className="footer" id="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__copy">
            {footer.lines.map((line, i) => (
              <p key={i} className="footer__line">
                {line}
              </p>
            ))}

            <h2 className="footer__signature">
              {sweep}
              <HighlightSweep tone="plum">Compound Revenue</HighlightSweep>
              {rest}
            </h2>

            <Button variant="onDark" href="#diagnostic">
              {footer.ctaLabel}
            </Button>
          </div>

          <div className="footer__photo">
            <img src={PHOTO_SRC} alt="Alefiya, co-founder and CMO at Nomads Marketing" />
          </div>
        </div>
      </div>
    </section>
  );
}
