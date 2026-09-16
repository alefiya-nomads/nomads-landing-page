import "./Header.css";
import Button from "../primitives/Button.jsx";

/**
 * Sticky site header — NOMADS wordmark (left), a centered tagline, and the
 * diagnostic CTA (right), matching the reference navbar. White bar with a
 * plum keyline border.
 */
export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <picture className="site-header__logo-pic">
          <source
            media="(max-width: 900px)"
            srcSet="/Assets/navbar%20mobile%20logo.avif"
          />
          <img
            src="/Assets/navbar logo.png"
            alt="Nomads Marketing"
            className="site-header__logo"
          />
        </picture>
        <p className="site-header__tagline">
          Could you add $1.5M/year by making more $ per visitor?
        </p>
        <Button href="https://nomads-quiz-v2.vercel.app/">Start the Diagnostic Now</Button>
      </div>
    </header>
  );
}
