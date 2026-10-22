import "./Testimonials.css";
import TestimonialCard from "./TestimonialCard.jsx";
import { founder } from "../../data/copy.js";

// Per-testimonial portrait cutout on the left panel.
const LANDING_IMAGES = [
  "/Assets/testimonial/lara landing page.png",
  "/Assets/testimonial/ryan landing page.png",
];

// Per-testimonial media-panel background (behind the portrait cutout).
const MEDIA_BGS = [
  "/Assets/landing-page/Dark Backgrounds-01.webp",
  "/Assets/landing-page/green eagel bg.webp",
];

// Per-testimonial copy-panel background (full CSS `background` value).
// Lara's paper texture sits under a cream wash: the QC doc flagged her
// testimonial as hard to read on the page, and the full-strength texture
// was fighting the body text.
const TEXT_BGS = [
  'linear-gradient(rgba(254, 252, 245, 0.85), rgba(254, 252, 245, 0.85)), url("/Assets/landing-page/Texture.webp")',
  "#ffffff",
];

/**
 * The two founder testimonials (Lara Acosta, Ryan Schwartz), each rendered
 * as a full-bleed split: a portrait image on a dark panel (left) and the
 * testimonial copy on a light panel (right).
 */
export default function Testimonials() {
  return (
    <section className="testimonials">
      {founder.testimonials.map((t, i) => (
        <TestimonialCard
          key={i}
          name={t.name}
          role={t.role}
          headline={t.headline}
          highlightPhrase={t.highlightPhrase}
          body={t.body}
          imageSrc={LANDING_IMAGES[i]}
          mediaBg={MEDIA_BGS[i % MEDIA_BGS.length]}
          textBg={TEXT_BGS[i % TEXT_BGS.length]}
          reversed={i % 2 === 1}
          seamDoodle={i === 0}
          readable={i === 0}
        />
      ))}
    </section>
  );
}
