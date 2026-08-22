import { useEffect, useRef } from "react";
import "./Problem97.css";
import { problem } from "../../data/copy.js";


export default function Problem97() {
  const videoRef = useRef(null);

  // Synchronous detection of Safari/iOS to avoid linter warnings on state updates in effects
  const isSafari = typeof navigator !== "undefined" && (
    (navigator.userAgent.toLowerCase().includes("safari") && 
     !navigator.userAgent.toLowerCase().includes("chrome") && 
     !navigator.userAgent.toLowerCase().includes("android")) ||
    (/ipad|iphone|ipod/.test(navigator.userAgent.toLowerCase()) || 
     (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))
  );

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
            {!isSafari && <source src="/Assets/97-percent-pie.webm" type="video/webm" />}
            <source src="/Assets/97-percent-pie.mp4" type="video/mp4" />
          </video>
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
            How do you convince them to buy from you?
          </h2>
        </div>
      </div>
    </section>
  );
}
