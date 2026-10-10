import { useState } from "react";
import type { ChangeEvent } from "react";
import { Clipboard } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";

function ClipboardDemo() {
  const [value, setValue] = useState(
    "https://github.com/parhamsagharchi/pwasdk",
  );
  const [status, setStatus] = useState("");

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCopyClick = () => {
    void (async () => {
      try {
        await Clipboard.copy(value);
        setStatus("Copied!");
        window.setTimeout(() => setStatus(""), 1200);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setStatus(message);
      }
    })();
  };

  const handlePasteClick = () => {
    void (async () => {
      try {
        const text = await Clipboard.paste();
        setValue(text);
        setStatus("Pasted!");
        window.setTimeout(() => setStatus(""), 1200);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setStatus(message);
      }
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <div className="clip-cyber-stage">
        <div className="clip-cyber-input-wrap">
          <input type="text" value={value} onChange={handleValueChange} />
        </div>
        <div className="demo-actions-row">
          <button type="button" className="pulse-chip-btn" onClick={handleCopyClick}>
            Copy
          </button>
          <button
            type="button"
            className="pulse-chip-btn"
            onClick={handlePasteClick}
          >
            Paste
          </button>
        </div>
        {status ? <p className="demo-meta">{status}</p> : null}
        <p className="demo-meta">Supported: {String(Clipboard.isSupported())}</p>
      </div>
    </section>
  );
}

export default ClipboardDemo;
