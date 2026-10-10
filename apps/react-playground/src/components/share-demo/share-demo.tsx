import { Share } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";

function ShareDemo() {
  const handleShareClick = () => {
    void (async () => {
      const result = await Share.share({
        title: "PWA SDK",
        text: "Check out this awesome PWA SDK!",
        url: window.location.href,
      });
      if (result) {
        alert("Shared successfully!");
      }
    })();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      <button
        type="button"
        className="btn-cyan mono btn-demo-compact"
        onClick={handleShareClick}
      >
        Invoke OS Share
      </button>
      <p className="demo-meta">Supported: {String(Share.isSupported())}</p>
    </section>
  );
}

export default ShareDemo;
