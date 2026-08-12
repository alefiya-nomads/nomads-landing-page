import "./TestimonialCard.css";

/**
 * Testimonial card — ported verbatim from v1: the pre-rendered card
 * face image (paper-grain gradient fill, white inner border, hard plum
 * drop-shadow baked in) as the card background, a decorative oversized
 * quote glyph top-left and bottom-right, a circular avatar with a warm
 * gradient ring, name + role centered under it, and a bold pull-quote
 * headline (with one phrase in the sitewide purple highlight box)
 * followed by the rest of the testimonial as regular body paragraphs.
 *
 * If no headshot is supplied via `avatarSrc`, the avatar renders the
 * person's initials on the same warm gradient ring.
 */
function renderWithBold(text) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export default function TestimonialCard({ name, role, headline, highlightPhrase, body, avatarSrc }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  const headlineParts = highlightPhrase ? headline.split(highlightPhrase) : [headline];

  return (
    <figure className="testimonial-card" data-reveal>
      <div className="testimonial-card__inner">
        <img
          src="/Assets/quote.avif"
          className="testimonial-card__quote testimonial-card__quote--open"
          alt=""
          aria-hidden="true"
        />

        <div className="testimonial-card__grid">
          <div className="testimonial-card__person">
            <div className="testimonial-card__avatar">
              {avatarSrc ? (
                <img src={avatarSrc} alt="" />
              ) : (
                <span className="testimonial-card__initials">{initials}</span>
              )}
            </div>
            <figcaption>
              <div className="testimonial-card__name">{name}</div>
              <div className="testimonial-card__role">{role}</div>
            </figcaption>
          </div>

          <blockquote className="testimonial-card__content">
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
          </blockquote>
        </div>

        <img
          src="/Assets/quote.avif"
          className="testimonial-card__quote testimonial-card__quote--close"
          alt=""
          aria-hidden="true"
        />
      </div>
    </figure>
  );
}
