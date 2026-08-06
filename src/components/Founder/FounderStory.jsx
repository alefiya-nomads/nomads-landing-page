import { useMemo } from "react";
import useScrollProgress from "../../hooks/useScrollProgress.js";
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
  const [ref, progress] = useScrollProgress();

  const { paraTokens, listTokens, para2Tokens, total } = useMemo(() => {
    let counter = 0;
    const assign = (arr) =>
      arr.map((text) =>
        splitBoldSegments(text).flatMap((seg) =>
          tokenize(seg.text).map((tok) =>
            /^\s+$/.test(tok)
              ? { space: true, text: tok }
              : { space: false, text: tok, bold: seg.bold, idx: counter++ }
          )
        )
      );
    const paraTokens = assign(paragraphs);
    const listTokens = assign(numberedList);
    const para2Tokens = assign(paragraphs2);
    return { paraTokens, listTokens, para2Tokens, total: counter };
  }, [paragraphs, numberedList, paragraphs2]);

  const fadeWindow = Math.max(1.5 / total, 0.008);

  const opacityFor = (idx) => {
    const threshold = (idx / total) * (1 - fadeWindow);
    const raw = (progress - threshold) / fadeWindow;
    return Math.min(Math.max(raw, 0), 1);
  };

  const renderTokens = (toks) =>
    toks.map((t, i) =>
      t.space ? (
        t.text
      ) : (
        <span key={i} className="founder-story__word" style={{ opacity: opacityFor(t.idx) }}>
          {t.bold ? <strong>{t.text}</strong> : t.text}
        </span>
      )
    );

  return (
    <div ref={ref} className="founder-story">
      {paraTokens.map((toks, i) => (
        <p key={`p1-${i}`}>{renderTokens(toks)}</p>
      ))}

      <ol className="founder__numbered">
        {listTokens.map((toks, i) => (
          <li key={`li-${i}`}>{renderTokens(toks)}</li>
        ))}
      </ol>

      {para2Tokens.map((toks, i) => (
        <p key={`p2-${i}`}>{renderTokens(toks)}</p>
      ))}
    </div>
  );
}
