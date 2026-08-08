import "./Curious.css";
import Reveal from "../primitives/Reveal.jsx";
import CountUpStat from "./CountUpStat.jsx";
import HighlightSweep from "../primitives/HighlightSweep.jsx";
import { curious } from "../../data/copy.js";

/**
 * "Aren't you curious..." stats + case-study section, ported from v1
 * (Section L). v1's Section tone="gradient-cream-dark" background is
 * inlined on the section element; v1's phrase-based HighlightSweep is
 * expressed with v2's children-based sweep component.
 */
export default function Curious() {
  const headingParts = curious.heading.split("curious");
  const afterCurious = headingParts[1];
  const economyIdx = afterCurious.indexOf("economy");
  const beforeEconomy = afterCurious.slice(0, economyIdx);
  const restOfEconomy = afterCurious.slice(economyIdx + 1);
  const [preSweep, postSweep] = beforeEconomy.split("$1.5M/year");

  return (
    <section className="curious" id="curious">
      <div className="wrap">
        <h2 className="curious__heading">
          {headingParts[0]}
          curious
          {preSweep}
          <HighlightSweep tone="plum">$1.5M/year</HighlightSweep>
          {postSweep}
          <span className="curious__accent-e">E</span>
          {restOfEconomy}
        </h2>

        <div className="curious__grid">
          {curious.cases.map((c, i) => {
            const s = curious.stats[i];
            return (
              <div key={i} className="curious__column">
                {s && (
                  <Reveal delay={i * 100}>
                    <CountUpStat {...s} />
                  </Reveal>
                )}

                <Reveal delay={i * 100} className="curious__case-card">
                  <div className="curious__case-inner">
                    {c.logoSrc && (
                      <div className="curious__case-header">
                        <div className="curious__case-logo">
                          <img src={c.logoSrc} alt={`${c.company} logo`} />
                        </div>
                        <div>
                          <div className="curious__case-company">{c.company}</div>
                          <div className="curious__case-type">{c.type}</div>
                        </div>
                      </div>
                    )}
                    {!c.logoSrc && (
                      <div>
                        <div className="curious__case-company">{c.company}</div>
                        <div className="curious__case-type">{c.type}</div>
                      </div>
                    )}
                    <p className="curious__case-text">{c.text}</p>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
