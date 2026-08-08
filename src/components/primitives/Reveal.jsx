import useInView from "../../hooks/useInView.js";
import "./Reveal.css";

/**
 * Fade-in-up scroll reveal (ported from v1): opacity 0 -> 1 while
 * translating up from below into place, triggered once the element
 * scrolls into view. Use a staggered `delay` on repeated cards/list
 * items for a cascading effect.
 */
export default function Reveal({ children, as: Tag = "div", delay = 0, className = "" }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "reveal--in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
