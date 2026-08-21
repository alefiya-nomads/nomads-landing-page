import "./Testimonials.css";
import TestimonialCard from "./TestimonialCard.jsx";
import { founder } from "../../data/copy.js";

// Both testimonials use Lara's landing-page image on the left for now —
// Ryan's own image gets added later (just replace index 1).
const LANDING_IMAGES = [
  "/Assets/testimonial/lara landing page.png",
  "/Assets/testimonial/lara landing page.png",
];

/**
 * The two founder testimonials (Lara Acosta, Ryan Schwartz), each rendered
 * as a full-bleed split: a portrait image on a dark panel (left) and the
 * testimonial copy on a light textured panel (right).
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
          reversed={i % 2 === 1}
        />
      ))}
    </section>
  );
}
