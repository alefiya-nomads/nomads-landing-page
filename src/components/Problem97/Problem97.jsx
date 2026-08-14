import { useEffect, useRef } from "react";
import "./Problem97.css";
import { problem } from "../../data/copy.js";

const PUZZLE_SRC = "/Assets/Images/5th section left side puzzle image.png";

export default function Problem97() {
  const videoRef = useRef(null);

  // Play the pie animation ONCE the first time it scrolls into view (no
  // loop). Reduced-motion users get the finished final frame instead.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const showEnd = () => {
      const seekEnd = () => { video.currentTime = video.duration || 0; };
      if (video.readyState >= 1) seekEnd();
      else video.addEventListener("loadedmetadata", seekEnd, { once: true });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showEnd();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(showEnd);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <section className="problem">
      <div className="problem__panel problem__panel--dark">
        <div className="problem__frame">
          <img src={PUZZLE_SRC} alt="" className="problem__puzzle" aria-hidden="true" loading="lazy" />
        </div>
      </div>

      <div className="problem__panel problem__panel--light">
        <div className="problem__content">
          <p className="problem__stat-label" data-reveal>
            {problem.lines[1]}
          </p>

          {/* Animated pie infographic (built in gif-studio/) — contains the
              "Say you're selling medicine for ulcers." headline, the 97/3
              pie, the 100-people badge and the 03/97 callout cards.
              WebM carries a real alpha channel (transparent over the teal
              panel); the MP4 fallback has the panel teal baked in. */}
          <video
            ref={videoRef}
            className="problem__gif"
            muted
            playsInline
            preload="metadata"
            aria-label="Out of 100 people, 3% know they have ulcers and buy immediately; 97% have stomach pain but don't see the problem yet"
            data-reveal
            data-reveal-delay="120"
          >
            <source src="/Assets/97-percent-pie.webm" type="video/webm" />
            <source src="/Assets/97-percent-pie.mp4" type="video/mp4" />
          </video>

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
        </div>
      </div>
    </section>
  );
}
