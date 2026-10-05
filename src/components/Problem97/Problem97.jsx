import { useEffect, useRef } from "react";
import "./Problem97.css";
import { problem } from "../../data/copy.js";

// Animated WebP with a real alpha channel (encoded loop=1: plays once and
// holds the last frame). <img>+WebP is the one transparent-animation format
// every browser supports — iOS Safari can't play VP9-alpha WebM, and
// HEVC-alpha can only be encoded on macOS. Source: gif-studio/frames (RGBA).
const PIE_ANIM = "/Assets/Gifs/market-pie.webp";
// Static final frame for reduced-motion users.
const PIE_STILL = "/Assets/Gifs/market-pie-final.webp";

// Puzzle cut-out for the dark statement panel. The "- no subline" export is
// the same art with the script "Your audience needs guidance…" line cropped
// off — Yemi flagged it as not being in the copy doc (landing page changes
// doc, item 6).
const PUZZLE = "/Assets/Images/5th section left side puzzle image 2 - no subline.png";

// copy.js stores lines[5] as a single sentence ("Sooo…how do you convince…").
// The reference splits it in two: "Sooo…" on its own line, then the question
// starting with a capital "H" — casing follows the reference (design-v2.md
// 0.8). Falls back to the whole line if the copy ever stops matching.
const CONVINCE_LINE = (() => {
  const tail = problem.lines[5].split("Sooo…")[1];
  return tail ? tail.charAt(0).toUpperCase() + tail.slice(1) : problem.lines[5];
})();

/**
 * Merged section (formerly two: BuyAnyway + Problem97).
 *
 * Left  — dark navy textured panel: the puzzle art with the "People who are
 *         actively looking for a solution will buy anyway. But what about the
 *         rest?" statement and its script subline at the foot.
 * Right — ice-blue panel: the 97% diagnosis — the stat line, the animated
 *         market-split pie infographic, the "you lose the 60 people" explanation,
 *         the "Even though they do." highlight and the closing question.
 */
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
      {/* LEFT — the "buy anyway" statement: the artwork carries the puzzle
          pieces + headline. */}
      <div className="problem__panel problem__panel--dark">
        <div className="problem__statement">
          <img
            className="problem__puzzle"
            src={PUZZLE}
            alt="People who are actively looking for a solution will buy anyway. But what about the rest?"
            loading="lazy"
            data-reveal
          />
        </div>
      </div>

      {/* RIGHT — the 97% diagnosis, opening with the ulcer example. */}
      <div className="problem__panel problem__panel--light">
        <div className="problem__content">
          <p className="problem__gif-lead" data-reveal>
            {"Say you're selling medicine for ulcers. Out of 100 people"}
          </p>

          {/* Animated market-split pie (gif-studio/pie-market.html): 3% ready
              to buy now, 7% open to it, and three 30% groups. src is assigned
              on scroll-into-view (see the effect above); CSS aspect-ratio
              reserves the space so the layout doesn't jump when it loads. */}
          <img
            ref={imgRef}
            className="problem__gif"
            alt="Pie chart of 100 buyers: 3% ready to buy now, 7% are open to it, 30% not thinking about it, 30% don't think they're interested, and 30% know they're not interested"
            data-reveal
            data-reveal-delay="120"
          />

          <p className="problem__para" data-reveal>
            So when your messaging targets the problem ("medicine for ulcers"), <strong>you lose the 60 people</strong>{" "}
            who genuinely believe they don&rsquo;t have ulcers.
          </p>

          <p className="problem__highlight" data-reveal data-reveal-delay="100">
            {problem.lines[4]}
          </p>

          <p className="problem__sooo" data-reveal data-reveal-delay="140">
            Sooo&hellip;
          </p>

          <p className="problem__para" data-reveal data-reveal-delay="180">
            {CONVINCE_LINE}
          </p>

          <h2 className="problem__question" data-reveal data-reveal-delay="240">
            How do you convince them to buy from you?
          </h2>
        </div>
      </div>
    </section>
  );
}
