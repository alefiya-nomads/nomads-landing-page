import { useEffect, useRef, useState } from "react";

/**
 * Generic scroll-triggered count-up used everywhere a number/percentage
 * is displayed as a standalone stat (RPV snapshot card, calculator
 * mock, checklist gauge score, "Aren't you curious" stats) — animates
 * 0 -> target once, the first time it scrolls into view, then holds.
 * Respects prefers-reduced-motion (jumps straight to the target).
 */
export default function CountUp({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1500,
  separator = false,
  as: Tag = "span",
  className,
}) {
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ref = useRef(null);
  const [value, setValue] = useState(prefersReducedMotion ? target : 0);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            let startTs = null;
            const step = (ts) => {
              if (!startTs) startTs = ts;
              const p = Math.min((ts - startTs) / duration, 1);
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
  }, [target, decimals, duration, prefersReducedMotion]);

  const formatted = separator
    ? value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value.toFixed(decimals);

  return (
    <Tag ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </Tag>
  );
}
