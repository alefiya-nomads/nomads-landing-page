import "./Testimonials.css";
import TestimonialCard from "./TestimonialCard.jsx";
import { founder } from "../../data/copy.js";

/**
 * The two founder testimonials (Lara Acosta, Ryan Schwartz) — ported
 * verbatim from v1, sharing one section and the workshop-gradient
 * background tone. Only deliberate change from v1: headings render in
 * Montserrat bold instead of Kilimanjaro (see TestimonialCard.css).
 */
export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="wrap">
        {founder.testimonials.map((t, i) => (
          <TestimonialCard
            key={i}
            name={t.name}
            role={t.role}
            headline={t.headline}
            highlightPhrase={t.highlightPhrase}
            body={t.body}
            avatarSrc={t.avatarSrc}
          />
        ))}
      </div>
    </section>
  );
}
