import { useState } from "react";
import { Clipboard } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import { CLIPBOARD_EXAMPLE } from "./clipboard-demo.constants";

function ClipboardDemo() {
  const [clipboardText, setClipboardText] = useState("");

  const handleCopyClick = async () => {
    try {
      await Clipboard.copy("Hello from PWA SDK!");
      alert("Copied to clipboard!");
    } catch (error: any) {
      alert("Failed to copy: " + error.message);
    }
  };

  const handlePasteClick = async () => {
    try {
      const text = await Clipboard.paste();
      setClipboardText(text);
      alert("Pasted: " + text);
    } catch (error: any) {
      alert("Failed to paste: " + error.message);
    }
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <h2>📋 Clipboard</h2>
      <div>
        <button className={DEMO_BUTTON_CLASS} onClick={handleCopyClick}>
          Copy Text
        </button>
        <button className={DEMO_BUTTON_CLASS} onClick={handlePasteClick}>
          Paste Text
        </button>
      </div>
      {clipboardText && (
        <p>
          Last pasted: <code>{clipboardText}</code>
        </p>
      )}
      <p>
        <small>Supported: {String(Clipboard.isSupported())}</small>
      </p>
      <CodeSnippet code={CLIPBOARD_EXAMPLE} />
    </section>
  );
}

export default ClipboardDemo;
