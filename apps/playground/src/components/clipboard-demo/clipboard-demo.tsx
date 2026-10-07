import { useState } from "react";
import { Clipboard } from "@pwasdk/core";
import {
  DEMO_BUTTON_STYLE,
  DEMO_SECTION_STYLE,
} from "../../constants/demo.constants";

function ClipboardDemo() {
  const [clipboardText, setClipboardText] = useState("");

  return (
    <section style={DEMO_SECTION_STYLE}>
      <h2>📋 Clipboard</h2>
      <div>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={async () => {
            try {
              await Clipboard.copy("Hello from PWA SDK!");
              alert("Copied to clipboard!");
            } catch (error: any) {
              alert("Failed to copy: " + error.message);
            }
          }}
        >
          Copy Text
        </button>
        <button
          style={DEMO_BUTTON_STYLE}
          onClick={async () => {
            try {
              const text = await Clipboard.paste();
              setClipboardText(text);
              alert("Pasted: " + text);
            } catch (error: any) {
              alert("Failed to paste: " + error.message);
            }
          }}
        >
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
    </section>
  );
}

export default ClipboardDemo;
