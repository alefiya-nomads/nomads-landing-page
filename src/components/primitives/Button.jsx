import "./Button.css";

/**
 * Sitewide button primitive.
 * design.md: 0px border-radius, single hard-offset shadow, no blur.
 * variant "primary" = dark fill / light text (default on light sections)
 * variant "onDark"  = light fill / dark text (used when the button sits
 *                      on a plum/navy/dark-textured section, matching the
 *                      "Let's Chat" nav button treatment documented in design.md)
 */
export default function Button({ children, onClick, href, variant = "primary", type = "button", className = "" }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      className={`btn btn--${variant} ${className}`.trim()}
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
    >
      {children}
    </Tag>
  );
}
