import "./TestimonialCard.css";

function renderWithBold(text) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

/**
 * Testimonial split — portrait image on a dark panel (left), testimonial
 * copy on a light textured panel (right): the pull-quote headline (with one
 * phrase in the sitewide highlight box), the body paragraphs, and the
 * person's role in a plum tag. The name is baked into the left-side image.
 */
export default function TestimonialCard({ name, role, headline, highlightPhrase, body, imageSrc, reversed }) {
  const headlineParts = highlightPhrase ? headline.split(highlightPhrase) : [headline];

  return (
    <figure
      className={`testimonial-card${reversed ? " testimonial-card--reversed" : ""}`}
      data-reveal
    >
      <div className="testimonial-card__media">
        <img className="testimonial-card__photo" src={imageSrc} alt={name} loading="lazy" />
      </div>

      <div className="testimonial-card__text">
        <p className="testimonial-card__headline">
          {headlineParts[0]}
          {highlightPhrase && (
            <>
              <span className="highlight">{highlightPhrase}</span>
              {headlineParts[1]}
            </>
          )}
        </p>

        {body.map((line, i) => (
          <p key={i} className="testimonial-card__body-line">
            {renderWithBold(line)}
          </p>
        ))}

        <span className="testimonial-card__role-tag">{role}</span>
      </div>
    </figure>
  );
}
