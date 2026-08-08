import { useEffect, useRef, useState } from "react";
import "./CountUpStat.css";

/**
 * Ported from v1: number animates 0 -> target over ~1.5s the first
 * time it scrolls into view (IntersectionObserver, threshold 0.35,
 * fires once), with a companion loading-bar fill.
 */
export default function CountUpStat({ target, suffix = "", decimals = 0, label }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setValue(target);
      setStarted(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            const dur = 1500;
            let startTs = null;
            const step = (ts) => {
              if (!startTs) startTs = ts;
              const p = Math.min((ts - startTs) / dur, 1);
              setValue(Number((target * p).toFixed(decimals)));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [target, decimals, started]);

  return (
    <div className="count-up-stat" ref={ref}>
      <div className="count-up-stat__inner">
        <span className="count-up-stat__big">
          {value.toFixed(decimals)}
          {suffix}
        </span>
        <span className="count-up-stat__label">{label}</span>
        <div className="count-up-stat__load">
          <i style={{ width: started ? "100%" : "0%" }} />
        </div>
      </div>
    </div>
  );
}
