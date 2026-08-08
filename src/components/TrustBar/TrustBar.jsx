import "./TrustBar.css";
import { hero } from "../../data/copy.js";

const LOGOS = [
  { src: "/Assets/logos/1.png", alt: "ScoreApp" },
  { src: "/Assets/logos/2.png", alt: "Heartbeat" },
  { src: "/Assets/logos/3.png", alt: "Interact" },
];

// Four identical copies of the logo set scroll left by exactly one set
// width per loop, so the marquee is seamless at any viewport width.
const COPIES = [0, 1, 2, 3];

export default function TrustBar() {
  return (
    <section className="trustbar" aria-label="Preferred partners">
      <p className="trustbar__label">{hero.trustbar}</p>

      <div className="trustbar__marquee">
        <div className="trustbar__track">
          {COPIES.map((copy) => (
            <div className="trustbar__set" key={copy} aria-hidden={copy > 0}>
              {LOGOS.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={copy === 0 ? logo.alt : ""}
                  className="trustbar__logo"
                  loading="lazy"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
