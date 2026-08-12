import "./Footer.css";
import Button from "../primitives/Button.jsx";
import { footer } from "../../data/copy.js";

const PHOTO_SRC = "/Assets/Images/footer alefiya image.png";

/**
 * Closing footer, rebuilt to the reference: dark textured banner with the
 * seated-Alefiya image (badge + "Let's Find The Leak" script baked in) on
 * the left, and the copy column on the right — a cream pill chip, the
 * white body line, the big white signature heading, and the CTA button.
 * A looping doodle arrow sits in the bottom-right corner.
 *
 * Casing note: copy.js stores this copy in sentence case / ALL-CAPS; the
 * reference shows Title Case (body/heading) and a sentence-case button, so
 * casing is matched to the reference (text-transform + the derived label).
 */
export default function Footer() {
  // copy.js stores the CTA in ALL CAPS; the reference shows sentence case.
  const cta =
    footer.ctaLabel.charAt(0) + footer.ctaLabel.slice(1).toLowerCase();

  return (
    <section className="footer" id="footer">
      <div className="wrap footer__grid">
        <div className="footer__photo" data-reveal>
          <img src={PHOTO_SRC} alt="Alefiya Khoraki seated, reading a book" />
        </div>

        <div className="footer__copy">
          <p className="footer__chip" data-reveal>
            {footer.lines[0]}
          </p>

          <p className="footer__body" data-reveal data-reveal-delay="100">
            {footer.lines[1]}
          </p>

          <h2 className="footer__heading" data-reveal data-reveal-delay="180">
            {footer.signature}
          </h2>

          <div data-reveal data-reveal-delay="260">
            <Button variant="onDark" href="#diagnostic" className="footer__cta">
              {cta}
            </Button>
          </div>
        </div>
      </div>

      <img
        className="footer__arrow"
        src="/Assets/Doodle/arrow footer.png"
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}
