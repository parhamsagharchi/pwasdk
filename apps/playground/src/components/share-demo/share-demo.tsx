import { Share } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";
import CodeSnippet from "../code-snippet";
import { SHARE_EXAMPLE } from "./share-demo.constants";

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
    <section className={DEMO_SECTION_CLASS}>
      <h2>📤 Share</h2>
      <button className={DEMO_BUTTON_CLASS} onClick={handleShareClick}>
        Share This Page
      </button>
      <p>
        <small>Supported: {String(Share.isSupported())}</small>
      </p>
      <CodeSnippet code={SHARE_EXAMPLE} />
    </section>
  );
}

export default ShareDemo;
