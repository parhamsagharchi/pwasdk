import { splitHighlightParts } from "./module-lab.search";

export function ModuleLabHighlight({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  const parts = splitHighlightParts(text, query);
  return (
    <>
      {parts.map((part, index) =>
        part.match ? (
          <mark key={`${part.text}-${index}`} className="module-lab-mark">
            {part.text}
          </mark>
        ) : (
          <span key={`${part.text}-${index}`}>{part.text}</span>
        ),
      )}
    </>
  );
}
