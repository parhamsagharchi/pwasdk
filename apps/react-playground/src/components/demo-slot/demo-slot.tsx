import { useState } from "react";
import CodeSnippet from "../code-snippet";
import { isDemoVisible } from "../playground-hero/playground-hero.utils";
import type { IDemoSlotProps } from "./demo-slot.types";

function DemoSlot({
  category,
  label,
  query,
  activeCategory,
  span,
  signature,
  status = "Ready",
  title,
  description,
  code,
  children,
}: IDemoSlotProps) {
  const [codeOpen, setCodeOpen] = useState(false);

  if (!isDemoVisible(activeCategory, category, query, label)) return null;

  const className = span ? `bento-card ${span}` : "bento-card";

  const handleCodeToggleClick = () => {
    setCodeOpen((current) => !current);
  };

  return (
    <article className={className}>
      <div className="bento-stage">
        {signature ? (
          <span className="method-sig-badge mono">{signature}</span>
        ) : null}
        <span className="hardware-status-badge">
          <span className="dot" />
          {status}
        </span>
        {children}
      </div>
      <div className="bento-foot">
        <div className="bento-foot-header">
          <div>
            <div className="bento-foot-title">{title}</div>
            <div className="bento-foot-desc">{description}</div>
          </div>
          <button
            type="button"
            className="btn-code-trigger mono"
            aria-expanded={codeOpen}
            onClick={handleCodeToggleClick}
          >
            {codeOpen ? "Hide code" : "Show code"}
          </button>
        </div>
        {codeOpen ? <CodeSnippet code={code} /> : null}
      </div>
    </article>
  );
}

export default DemoSlot;
