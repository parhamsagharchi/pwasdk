import { useState } from "react";
import { Clipboard } from "@pwasdk/core";
import type { ICodeSnippetProps } from "./code-snippet.types";

function CodeSnippet({ code }: ICodeSnippetProps) {
  const [copied, setCopied] = useState(false);

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
    <div className="code-snippet is-open">
      <div className="code-snippet-bar">
        <span className="mono">TypeScript SDK</span>
        <button type="button" className="pulse-chip-btn" onClick={handleCopyClick}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}

export default CodeSnippet;
