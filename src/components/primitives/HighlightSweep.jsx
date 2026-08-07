import useInView from "../../hooks/useInView.js";
import "./HighlightSweep.css";

/**
 * Scroll-triggered highlight wipe: the wrapped phrase gets a colored box
 * that sweeps in from the left as the heading scrolls into view, the text
 * underneath switching to the highlight color as the sweep passes over it.
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
      <span className="hl-sweep__base">{children}</span>
      <span className="hl-sweep__overlay" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
