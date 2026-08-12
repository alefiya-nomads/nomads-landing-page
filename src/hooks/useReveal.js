import { useEffect } from "react";

/**
 * Scroll reveal for the content *inside* sections (not whole sections).
 *
 * Any element marked `data-reveal` starts faded/offset (set in CSS, so
 * there's no flash of visible content before JS runs) and fades up into
 * place the first time it scrolls into view. `data-reveal-delay="120"`
 * staggers siblings — e.g. cards in a grid cascading one after another.
 *
 * Same motion as v1's Reveal primitive: opacity 0 -> 1 while translating
 * up 28px, 0.7s cubic-bezier(0.2, 0.7, 0.2, 1), one-shot per element.
 * Reduced-motion users get everything revealed immediately.
 */
export default function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("reveal--in"));
      return;
    }

    const pending = new Set(items);

    const show = (el) => {
      if (!pending.has(el)) return;
      pending.delete(el);
      const delay = Number(el.dataset.revealDelay || 0);
      if (delay) el.style.transitionDelay = `${delay}ms`;
      el.classList.add("reveal--in");
      io.unobserve(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && show(entry.target));
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach((el) => io.observe(el));

    /* Safety net: an instant jump (anchor link, scroll restoration on
       refresh, programmatic scrollTo) can skip past elements without the
       observer ever reporting them, leaving that content stuck invisible.
       Sweep the pending set on scroll and reveal anything already on
       screen; the listener removes itself once nothing is left. */
    let lastSweep = 0;
    const sweep = () => {
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) show(el);
      });
      if (!pending.size) teardown();
    };
    const onScroll = () => {
      // Time-throttled rather than rAF-throttled: rAF can be starved when
      // the tab/pane isn't compositing, which would strand the fallback.
      const now = performance.now();
      if (now - lastSweep < 100) return;
      lastSweep = now;
      sweep();
    };

    function teardown() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Cover landing mid-page (restored scroll / #anchor) without scrolling.
    const initial = setTimeout(sweep, 0);

    return () => {
      clearTimeout(initial);
      io.disconnect();
      teardown();
    };
  }, []);
}
