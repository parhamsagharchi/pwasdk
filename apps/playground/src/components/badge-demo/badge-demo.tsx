import { Badge } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import { BADGE_EXAMPLE } from "./badge-demo.constants";

function BadgeDemo() {
  const handleSetBadgeClick = async () => {
    try {
      await Badge.set(5);
      alert("Badge set to 5");
    } catch (error: any) {
      alert("Failed: " + error.message);
    }
  };

  const handleClearBadgeClick = async () => {
    try {
      await Badge.clear();
      alert("Badge cleared");
    } catch (error: any) {
      alert("Failed: " + error.message);
    }
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <h2>🏷️ App Badge</h2>
      <div>
        <button className={DEMO_BUTTON_CLASS} onClick={handleSetBadgeClick}>
          Set Badge (5)
        </button>
        <button className={DEMO_BUTTON_CLASS} onClick={handleClearBadgeClick}>
          Clear Badge
        </button>
      </div>
      <p>
        <small>Supported: {String(Badge.isSupported())}</small>
      </p>
      <p style={{ fontSize: "12px", marginTop: "4px" }}>
        📌 The badge is a small number shown on the installed app icon (for
        example in the taskbar/dock). It only works in some browsers (like
        Chrome/Edge) when the PWA is installed; on iOS it is usually not
        supported.
      </p>
      <CodeSnippet code={BADGE_EXAMPLE} />
    </section>
  );
}

export default BadgeDemo;
