import { useEffect, useRef, useState } from "react";

export default function useScrollProgress({ completionFraction = 0.55 } = {}) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotionRef.current) {
      setProgress(1);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let ticking = false;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalDistance = (rect.height + vh) * completionFraction;
      const raw = (vh - rect.top) / totalDistance;
      const clamped = Math.min(Math.max(raw, 0), 1);
      setProgress(Math.round(clamped * 1000) / 1000);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [completionFraction]);

  return [ref, progress];
}
