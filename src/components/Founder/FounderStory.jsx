import { Fragment, useMemo } from "react";
import "./FounderStory.css";

function splitBoldSegments(text) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((segment, i) => ({ text: segment, bold: i % 2 === 1 }))
    .filter((seg) => seg.text.length > 0);
}

function tokenize(text) {
  return text.split(/(\s+)/).filter(Boolean);
}

export default function FounderStory({ paragraphs, numberedList, paragraphs2 }) {
  const { blocks } = useMemo(() => {
    const toTokens = (text) =>
      splitBoldSegments(text).flatMap((seg) =>
        tokenize(seg.text).map((tok) =>
          /^\s+$/.test(tok)
            ? { space: true, text: tok }
            : { space: false, text: tok, bold: seg.bold }
        )
      );

    // Reference design splits the "So, I ditched..." sentence: the tail
    // "strategy from scratch." becomes its own plum-highlighted badge.
    const scratchRe = /\s*strategy from scratch\.\s*$/i;
    const soDitched = paragraphs2[6] || "";
    const soDitchedPrefix = soDitched.replace(scratchRe, "");

    const blocks = [];
    paragraphs.forEach((t) => blocks.push({ kind: "p", tokens: toTokens(t) }));
    blocks.push({ kind: "list", items: numberedList.map((t) => toTokens(t)) });
    blocks.push({ kind: "p", tokens: toTokens(paragraphs2[0]) });
    blocks.push({
      kind: "p",
      className: "founder-story__accent",
      tokens: toTokens(paragraphs2[1]),
    });
    blocks.push({ kind: "p", tokens: toTokens(paragraphs2[2]) });
    blocks.push({
      kind: "box",
      paras: [
        { className: "founder-story__lead", tokens: toTokens(paragraphs2[3]) },
        { tokens: toTokens(paragraphs2[4]) },
      ],
    });
    // Reference shows this as 2 lines breaking after "that" — force the
    // break on desktop, natural wrap on mobile (hl-br).
    const however = paragraphs2[5] || "";
    const howeverCut = however.indexOf(" worked");
    blocks.push({
      kind: "p",
      className: "founder-story__strong",
      lines:
        howeverCut > -1
          ? [toTokens(however.slice(0, howeverCut)), toTokens(however.slice(howeverCut + 1))]
          : [toTokens(however)],
    });
    blocks.push({ kind: "p", tokens: toTokens(soDitchedPrefix) });
    // Reference image ends at the "Strategy from scratch." badge — the
    // remaining copy.js paragraphs are intentionally not rendered here.
    blocks.push({ kind: "highlight", tokens: toTokens("Strategy from scratch.") });

    return { blocks };
  }, [paragraphs, numberedList, paragraphs2]);

  const renderTokens = (toks) =>
    toks.map((t, i) =>
      t.space ? (
        t.text
      ) : t.bold ? (
        <strong key={i}>{t.text}</strong>
      ) : (
        <Fragment key={i}>{t.text}</Fragment>
      )
    );

  return (
    <div className="founder-story">
      {blocks.map((b, i) => {
        if (b.kind === "list") {
          return (
            <ol className="founder__numbered" key={i}>
              {b.items.map((toks, j) => (
                <li key={j}>
                  <img
                    className="founder__numbered-icon"
                    src={`/Assets/Icons/number points icon ${j + 1}.png`}
                    alt=""
                    aria-hidden="true"
                  />
                  <span className="founder__numbered-label">{renderTokens(toks)}</span>
                </li>
              ))}
            </ol>
          );
        }
        if (b.kind === "box") {
          return (
            <div className="founder-story__box" key={i}>
              {b.paras.map((p, j) => (
                <p key={j} className={p.className}>
                  {renderTokens(p.tokens)}
                </p>
              ))}
            </div>
          );
        }
        if (b.kind === "highlight") {
          return (
            <p className="founder-story__scratch" key={i}>
              <span className="founder-story__scratch-badge">{renderTokens(b.tokens)}</span>
            </p>
          );
        }
        return (
          <p key={i} className={b.className}>
            {b.lines
              ? b.lines.map((toks, j) => (
                  <Fragment key={j}>
                    {j > 0 && " "}
                    {j > 0 && <br className="hl-br" />}
                    {renderTokens(toks)}
                  </Fragment>
                ))
              : renderTokens(b.tokens)}
          </p>
        );
      })}
    </div>
  );
}
