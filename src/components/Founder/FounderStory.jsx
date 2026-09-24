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

    // Yemi (landing page changes doc): "strategy from scratch." must complete
    // the sentence inline — highlighted, but never pulled onto its own line.
    const scratchRe = /\s*strategy from scratch\.\s*$/i;
    const soDitched = paragraphs2[6] || "";
    const soDitchedPrefix = soDitched.replace(scratchRe, "");
    const soDitchedTail = scratchRe.test(soDitched) ? "strategy from scratch." : "";

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
    // Yemi: "that worked across industries." stays together — break before
    // "that" (desktop only; natural wrap on mobile via hl-br).
    const however = paragraphs2[5] || "";
    const howeverCut = however.indexOf(" that ");
    blocks.push({
      kind: "p",
      className: "founder-story__strong",
      lines:
        howeverCut > -1
          ? [toTokens(however.slice(0, howeverCut)), toTokens(however.slice(howeverCut + 1))]
          : [toTokens(however)],
    });
    // One sentence, with the "strategy from scratch." tail highlighted
    // inline (Yemi: it completes the sentence, not its own line).
    blocks.push({
      kind: "scratch",
      tokens: toTokens(soDitchedPrefix),
      tail: soDitchedTail,
    });

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
            <ol className="founder__numbered" key={i} data-reveal>
              {b.items.map((toks, j) => (
                <li key={j}>
                  <img
                    className="founder__numbered-icon"
                    src={`/Assets/Icons/number points icon ${j + 1}.png`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                  <span className="founder__numbered-label">{renderTokens(toks)}</span>
                </li>
              ))}
            </ol>
          );
        }
        if (b.kind === "box") {
          return (
            <div className="founder-story__box" key={i} data-reveal>
              {b.paras.map((p, j) => (
                <p key={j} className={p.className}>
                  {renderTokens(p.tokens)}
                </p>
              ))}
            </div>
          );
        }
        if (b.kind === "scratch") {
          return (
            <p key={i} data-reveal>
              {renderTokens(b.tokens)}
              {b.tail && (
                <>
                  {" "}
                  <span className="founder-story__scratch-badge">{b.tail}</span>
                </>
              )}
            </p>
          );
        }
        return (
          <p key={i} className={b.className} data-reveal>
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
