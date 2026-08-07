import useInView from "../../hooks/useInView.js";
import "./HighlightSweep.css";

/**
 * Scroll-triggered highlight wipe: the wrapped phrase gets a colored box
 * that sweeps in from the left as the heading scrolls into view. Rendered
 * as a plain inline span so the phrase starts on the same line as the
 * text before it and wraps naturally mid-phrase (each wrapped line
 * fragment sweeps its own background via box-decoration-break: clone).
 *
 * `tone` picks the background/foreground pair; `className` lets a section
 * pass extra styling. Copy is untouched — children render verbatim.
 */
export default function HighlightSweep({ children, tone = "plum", className = "" }) {
  const [ref, inView] = useInView();

  return (
    <span
      ref={ref}
      className={`hl-sweep hl-sweep--${tone} ${className} ${inView ? "hl-sweep--in" : ""}`}
    >
      {children}
    </span>
  );
}
