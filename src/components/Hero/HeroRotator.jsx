import { useEffect, useRef, useState } from "react";
import "./HeroRotator.css";

/**
 * Cross-fades between the rotating hero words (ported from v1).
 * ~2.2s interval, ~0.4s swap. Renders with the v2 accent-word styling.
 *
 * For phrases of 3+ words, the first word stays on the same line as the
 * preceding "current" and the remaining words break onto the next line
 * (explicit <br>), so a long phrase reads as e.g. "current influencer /
 * marketing budget?" rather than shoving the whole phrase down a line.
 */
export default function HeroRotator({ words, intervalMs = 2200, swapMs = 400 }) {
  const [index, setIndex] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion.current || words.length <= 1) return;
    const timer = setInterval(() => {
      setSwapping(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setSwapping(false);
      }, swapMs);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [words, intervalMs, swapMs]);

  const parts = words[index].split(" ");
  const breakAfterFirst = parts.length >= 3;

  return (
    <span
      className={`accent-word hero-rotator${swapping ? " hero-rotator--swap" : ""}`}
    >
      {breakAfterFirst ? (
        <>
          {parts[0]}
          <br />
          {parts.slice(1).join(" ")}?
        </>
      ) : (
        <>{words[index]}?</>
      )}
    </span>
  );
}
