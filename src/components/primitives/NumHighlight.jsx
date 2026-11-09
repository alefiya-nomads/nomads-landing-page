import useInView from "../../hooks/useInView.js";
import "./NumHighlight.css";

/**
 * Key data figure inside body copy (copy marker `==…==`): bold figure in a
 * theme-coloured, slightly rounded box (result-page style) that fills in on scroll.
 * Colours come from --num-hl-color / --num-hl-bg so dark cards can
 * override them. Text renders verbatim.
 */
export default function NumHighlight({ children }) {
  const [ref, inView] = useInView({ threshold: 0.6 });
  return (
    <span ref={ref} className={`num-hl${inView ? " num-hl--in" : ""}`}>
      {children}
    </span>
  );
}
