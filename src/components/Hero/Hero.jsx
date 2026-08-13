import "./Hero.css";
import Button from "../primitives/Button.jsx";
import RpvSnapshotCard from "./RpvSnapshotCard.jsx";
import HeroRotator from "./HeroRotator.jsx";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import { hero } from "../../data/copy.js";

const PHOTO_SRC = "/Assets/Gifs/Hero section gif.gif";

export default function Hero() {
  const [eyebrowIntro, bullet1, bullet2, rpvLine] = hero.eyebrow;

  // Bold the two called-out figures in the intro line, verbatim text unchanged.
  const [introA, introRest] = eyebrowIntro.split("$10k+");
  const [introB, introC] = introRest.split("$1.5M more a year");

  // Manual line breaks (design-v2.md 0.6) matching the reference image's
  // exact 4-line pattern, not the browser's auto-wrap. These four pieces
  // concatenate back to hero.headlinePrefix + the rotating word verbatim —
  // kept as literals since chaining .split() for 4 break points got
  // unreadable; update these if copy.js's headlinePrefix ever changes.
  const headlineLine1 = "What would it take to";
  const headlineLine2 = "add an additional";
  const headlineLine3Suffix = "with your";
  const headlineLine4Prefix = "current";

  // Bold the lead sentence of the RPV definition line.
  const [rpvBold, rpvRest] = rpvLine.split("Increase how much you earn per visitor");

  return (
    <section className="hero">
      <img src="/Assets/Doodle/Group 450.png" alt="" className="hero__doodle" aria-hidden="true" />
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow" data-reveal>
            {introA}
            <strong>$10k+</strong>
            {introB}
            <strong>$1.5M more a year</strong>
            {introC}
          </p>

          <h1 className="hero__headline" data-reveal data-reveal-delay="80">
            {headlineLine1}{" "}
            <br className="hl-br" />
            {headlineLine2}{" "}
            <br className="hl-br" />
            <HighlightSweep tone="plumdark">$1.5 M/year</HighlightSweep> {headlineLine3Suffix}{" "}
            <br className="hl-br" />
            {headlineLine4Prefix} <HeroRotator words={hero.rotatingWords} />
          </h1>

          <ul className="hero__list" data-reveal data-reveal-delay="160">
            <li>
              <img src="/icons/point-arrow.avif" alt="" className="hero__list-arrow" />
              {bullet1}
            </li>
            <li>
              <img src="/icons/point-arrow.avif" alt="" className="hero__list-arrow" />
              {bullet2}
            </li>
          </ul>

          <p className="hero__rpv-line" data-reveal data-reveal-delay="240">
            <strong>{rpvBold}</strong>
            Increase how much you earn per visitor
            {rpvRest}
          </p>

          <div data-reveal data-reveal-delay="320">
            <Button href="#diagnostic">{hero.ctaLabel}</Button>
          </div>

          <p className="hero__followup" data-reveal data-reveal-delay="400">
            {hero.followUp}
          </p>
        </div>

        <div className="hero__visual">
          <div className="hero__photo-wrap" data-reveal data-reveal-delay="200">
            <img src={PHOTO_SRC} alt="Alefiya, co-founder and CMO at Nomads Marketing" className="hero__photo" />
          </div>

          <RpvSnapshotCard />
        </div>
      </div>
    </section>
  );
}
