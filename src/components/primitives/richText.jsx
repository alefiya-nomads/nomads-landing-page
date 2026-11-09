import NumHighlight from "./NumHighlight.jsx";

/**
 * Renders copy-doc emphasis markers used by the bio sections:
 *   **text**  -> <strong>
 *   __text__  -> <strong><em> (bold italic)
 *   ==text==  -> <NumHighlight> (key data figure: bold, in a theme chip)
 *   ^^text^^  -> <span class="rich-big"> (figure set a little larger, no chip)
 * ==…== and ^^…^^ also work inside **…** / __…__.
 * Single *asterisks* are left alone — on the homepage they are literal
 * characters (e.g. "*think*", "*accidentally*").
 */
function renderFigures(text, keyBase) {
  return text.split(/(==.+?==|\^\^.+?\^\^)/g).map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.length > 4 && part.startsWith("==") && part.endsWith("==")) {
      return <NumHighlight key={key}>{part.slice(2, -2)}</NumHighlight>;
    }
    if (part.length > 4 && part.startsWith("^^") && part.endsWith("^^")) {
      return (
        <span key={key} className="rich-big">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

export default function renderRich(text) {
  if (!text) return null;
  return text.split(/(\*\*.+?\*\*|__.+?__)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{renderFigures(part.slice(2, -2), i)}</strong>;
    }
    if (part.startsWith("__") && part.endsWith("__") && part.length > 4) {
      return (
        <strong key={i}>
          <em>{renderFigures(part.slice(2, -2), i)}</em>
        </strong>
      );
    }
    return renderFigures(part, i);
  });
}
