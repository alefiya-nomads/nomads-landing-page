import { useEffect, useRef } from "react";
import "./Problem97.css";
import { problem } from "../../data/copy.js";

// Animated WebP with a real alpha channel (encoded loop=1: plays once and
// holds the last frame). <img>+WebP is the one transparent-animation format
// every browser supports — iOS Safari can't play VP9-alpha WebM, and
// HEVC-alpha can only be encoded on macOS. Source: gif-studio/frames (RGBA).
const PIE_ANIM = "/Assets/Gifs/97-percent-pie.webp";
// Static final frame for reduced-motion users.
const PIE_STILL = "/Assets/Gifs/97-percent-pie-final.webp";

export default function Problem97() {
  const imgRef = useRef(null);

  // Start the play-once animation the first time it scrolls into view (the
  // WebP begins playing when its src is assigned). Reduced-motion users get
  // the finished final frame instead.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      img.src = PIE_STILL;
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.src = PIE_ANIM;
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(img);
    return () => io.disconnect();
  }, []);

  return (
    <section className="problem">
      <div className="problem__panel problem__panel--dark">
        <div className="problem__content">
          <p className="problem__stat-label" data-reveal>
            {problem.lines[1]}
          </p>

          <p className="problem__gif-lead" data-reveal data-reveal-delay="80">
            {"Say you're selling medicine for ulcers."}
          </p>

          {/* Animated pie infographic — the 97/3 pie, the 100-people badge
              and the 03/97 callout cards. src is assigned on scroll-into-view
              (see the effect above); CSS aspect-ratio reserves the space so
              the layout doesn't jump when it loads. */}
          <img
            ref={imgRef}
            className="problem__gif"
            alt="Out of 100 people, 3% know they have ulcers and buy immediately; 97% have stomach pain but don't see the problem yet"
            data-reveal
            data-reveal-delay="120"
          />
        </div>
      </div>

      <div className="problem__panel problem__panel--light">
        <div className="problem__content">
          {/* Reference shows "97 people" here; copy.js's problem.lines[3] and
              legend say "70" (3/70/27 split) instead of the reference's 3/97
              split — flagged per 0.8, defaulting to the reference's numbers. */}
          <p className="problem__para" data-reveal>
            So when your messaging targets the problem ("medicine for ulcers"), <strong>you lose the 97 people</strong>{" "}
            who genuinely believe they don&rsquo;t have ulcers.
          </p>

          <p className="problem__highlight" data-reveal data-reveal-delay="100">
            {problem.lines[4]}
          </p>

          <p className="problem__para problem__para--bold" data-reveal data-reveal-delay="180">
            {problem.lines[5]}
          </p>

          <h2 className="problem__question" data-reveal data-reveal-delay="240">
            How do you convince<br />them to buy from you?
          </h2>
        </div>
      </div>
    </section>
  );
}
