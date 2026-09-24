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
export default function TestimonialCard({ name, role, headline, highlightPhrase, body, imageSrc, mediaBg, textBg, reversed, seamDoodle }) {
  const headlineParts = highlightPhrase ? headline.split(highlightPhrase) : [headline];

  return (
    <figure
      className={`testimonial-card${reversed ? " testimonial-card--reversed" : ""}`}
      data-reveal
    >
      <div
        className="testimonial-card__media"
        style={mediaBg ? { backgroundImage: `url("${mediaBg}")` } : undefined}
      >
        <img className="testimonial-card__photo" src={imageSrc} alt={name} loading="lazy" />
        {/* Credentials sit under the person's name (baked into the portrait
            art), not under the testimonial — Yemi, landing page changes doc. */}
        <span className="testimonial-card__role-tag">{role}</span>
      </div>

      <div
        className="testimonial-card__text"
        style={textBg ? { background: textBg } : undefined}
      >
        {/* Pull quote wrapped in real quotation marks (Yemi). */}
        <p className="testimonial-card__headline">
          &ldquo;{headlineParts[0]}
          {highlightPhrase && (
            <>
              <span className="highlight">{highlightPhrase}</span>
              {headlineParts[1]}
            </>
          )}
          &rdquo;
        </p>

        {body.map((line, i) => (
          <p key={i} className="testimonial-card__body-line">
            {renderWithBold(line)}
          </p>
        ))}
      </div>

      {seamDoodle && (
        <img
          className="testimonial-card__seam-doodle"
          src="/Assets/Doodle/testimonial circle doodle.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      )}
    </figure>
  );
}
