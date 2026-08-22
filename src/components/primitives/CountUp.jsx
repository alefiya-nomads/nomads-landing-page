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
  // loop: after reaching the target, wait loopPauseMs then recount from 0,
  // forever (skipped entirely under prefers-reduced-motion).
  loop = false,
  loopPauseMs = 1800,
  as: Tag = "span",
  className,
  style,
}) {
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ref = useRef(null);
  const [value, setValue] = useState(prefersReducedMotion ? target : 0);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;

    let cancelled = false;
    let rafId = null;
    let timeoutId = null;

    const run = () => {
      let startTs = null;
      const step = (ts) => {
        if (cancelled) return;
        if (!startTs) startTs = ts;
        const p = Math.min((ts - startTs) / duration, 1);
        setValue(Number((target * p).toFixed(decimals)));
        if (p < 1) {
          rafId = requestAnimationFrame(step);
        } else if (loop) {
          timeoutId = setTimeout(() => {
            if (!cancelled) run();
          }, loopPauseMs);
        }
      };
      rafId = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            run();
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
      io.disconnect();
    };
  }, [target, decimals, duration, prefersReducedMotion, loop, loopPauseMs]);

  const formatted = separator
    ? value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value.toFixed(decimals);

  return (
    <Tag ref={ref} className={className} style={style}>
      {prefix}
      {formatted}
      {suffix}
    </Tag>
  );
}
