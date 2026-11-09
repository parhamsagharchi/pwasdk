import { useCallback, useRef, useState } from "react";
import { DoubleTap } from "@pwasdk/core";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";
import { useDemoAutorun } from "../../hooks/use-demo-autorun.hooks";

function DoubleTapDemo() {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const [likes, setLikes] = useState(0);
  const [burst, setBurst] = useState(false);
  const [status, setStatus] = useState("Double-tap the photo to like.");

  const stop = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
  }, []);

  const start = useCallback(() => {
    const el = cardRef.current;
    if (!el || !DoubleTap.isSupported()) return;
    stop();
    stopRef.current = DoubleTap.watch(
      el,
      () => {
        setLikes((n) => n + 1);
        setBurst(true);
        setStatus("Liked! (haptic fired if supported)");
        window.setTimeout(() => setBurst(false), 450);
      },
      { haptic: true, thresholdMs: 320 },
    );
  }, [stop]);

  useDemoAutorun(start, stop);

  return (
    <section className={DEMO_SECTION_CLASS}>
      <p className="demo-meta">
        Instagram-style double-tap — heart + phone vibration.
      </p>
      <button
        type="button"
        ref={cardRef}
        className="like-photo-card"
        aria-label="Double-tap to like"
      >
        <span className="like-photo-gradient" />
        <span className={burst ? "like-heart burst" : "like-heart"}>♥</span>
        <span className="like-photo-hint mono">Double-tap me</span>
      </button>
      <div className="demo-meta demo-meta-spaced">
        <p>Likes: {likes}</p>
        <p>{status}</p>
      </div>
    </section>
  );
}

export default DoubleTapDemo;
