import { useState } from "react";
import { Clipboard } from "@pwasdk/core";
import type { ICodeSnippetProps } from "./code-snippet.types";

function CodeSnippet({ code }: ICodeSnippetProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleToggleClick = () => {
    setOpen((current) => !current);
  };

  const handleCopyClick = async () => {
    try {
      await Clipboard.copy(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={open ? "code-snippet is-open" : "code-snippet"}>
      <div className="code-snippet-bar">
        <button
          type="button"
          className="code-snippet-toggle"
          aria-expanded={open}
          onClick={handleToggleClick}
        >
          <span className="code-snippet-chevron" aria-hidden="true" />
          Example
        </button>
        {open ? (
          <button type="button" className="pulse-chip-btn" onClick={handleCopyClick}>
            {copied ? "Copied!" : "Copy"}
          </button>
        ) : null}
      </div>
      {open ? (
        <pre>
          <code>{code.trim()}</code>
        </pre>
      ) : null}
    </div>
  );
}

export default CodeSnippet;
