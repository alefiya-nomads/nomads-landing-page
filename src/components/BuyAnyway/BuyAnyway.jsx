import "./BuyAnyway.css";

/**
 * Dark-navy banner bridging the checklist and the 97% problem: "People who
 * are actively looking for a solution will buy anyway. But what about the
 * rest?" — the copy is problem.lines[0] in copy.js (stored sentence-case;
 * rendered here in the reference's Title Case per design-v2.md 0.8). The
 * closing question sits on its own line in ice-blue (#E4FBFF) with a script
 * "W", and a Moon Time script subline follows. The puzzle art is baked into
 * the background image (puzzle blue bg.png), so nothing extra is added.
 */
export default function BuyAnyway() {
  return (
    <section className="buy-anyway">
      <div className="wrap buy-anyway__inner">
        <h2 className="buy-anyway__headline" data-reveal>
          <span className="buy-anyway__line">People Who Are Actively Looking</span>{" "}
          <span className="buy-anyway__line">For A Solution Will Buy Anyway.</span>
          <span className="buy-anyway__line buy-anyway__line--accent">
            But <span className="buy-anyway__script-w">W</span>hat About The Rest?
          </span>
        </h2>

        <p className="buy-anyway__sub" data-reveal data-reveal-delay="120">
          Your audience needs guidance before they’re ready to purchase.
        </p>
      </div>
    </section>
  );
}
