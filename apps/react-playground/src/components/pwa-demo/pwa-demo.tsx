import { useState } from "react";
import { Pwa } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";

function PwaDemo() {
  const [showIosHelp, setShowIosHelp] = useState(false);
  const platform = Pwa.platform();
  const standalone = Pwa.isStandalone();

  const handleShowIosHelpClick = () => {
    setShowIosHelp((current) => !current);
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <div className="demo-meta demo-meta-spaced">
        <p>Platform: {platform}</p>
        <p>Standalone (installed): {String(standalone)}</p>
        <p>
          Install prompt event:{" "}
          {String(Pwa.isInstallPromptSupported())}
        </p>
      </div>
      {platform === "ios" ? (
        <div className="demo-actions-row" style={{ marginTop: 10 }}>
          <button
            type="button"
            className={DEMO_BUTTON_CLASS}
            onClick={handleShowIosHelpClick}
          >
            {showIosHelp ? "Hide iOS install steps" : "iOS install steps"}
          </button>
        </div>
      ) : null}
      {showIosHelp ? (
        <div className="demo-callout" style={{ marginTop: 12, whiteSpace: "pre-line" }}>
          {Pwa.getIOSInstallInstructions()}
        </div>
      ) : null}
      {platform !== "ios" && !standalone ? (
        <p className="demo-meta" style={{ marginTop: 8 }}>
          On Android Chrome, use the Install example when the browser offers a
          prompt. On iOS, add to Home Screen from Safari.
        </p>
      ) : null}
    </section>
  );
}

export default PwaDemo;
