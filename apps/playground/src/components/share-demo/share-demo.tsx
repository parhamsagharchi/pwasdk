import { Share } from "@pwasdk/core";
import {
  DEMO_BUTTON_STYLE,
  DEMO_SECTION_STYLE,
} from "../../constants/demo.constants";

function ShareDemo() {
  const handleShareClick = async () => {
    const result = await Share.share({
      title: "PWA SDK",
      text: "Check out this awesome PWA SDK!",
      url: window.location.href,
    });
    if (result) {
      alert("Shared successfully!");
    }
  };

  return (
    <section style={DEMO_SECTION_STYLE}>
      <h2>📤 Share</h2>
      <button style={DEMO_BUTTON_STYLE} onClick={handleShareClick}>
        Share This Page
      </button>
      <p>
        <small>Supported: {String(Share.isSupported())}</small>
      </p>
    </section>
  );
}

export default ShareDemo;
