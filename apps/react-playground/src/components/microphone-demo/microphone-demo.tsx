import { useEffect, useRef } from "react";
import { DEMO_SECTION_CLASS } from "../../constants/demo.constants";
import PageLoader from "../page-loader";
import { MICROPHONE_DEMO_WORD } from "./microphone-demo.constants";
import { useMicrophoneDemo } from "./microphone-demo.hooks";

function MicrophoneDemo() {
  const {
    audioRef,
    micStream,
    micError,
    isMicLoading,
    isListening,
    heardText,
    wordMatched,
    isMediaDevicesSupported,
    isSpeechSupported,
    openMic,
    stopMicOnly,
    listenForWord,
    stopListening,
  } = useMicrophoneDemo();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;

    const draw = () => {
      const w = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 280);
      const h = (canvas.height =
        canvas.offsetHeight * window.devicePixelRatio || 64);
      const bars = 32;
      const barWidth = w / bars - 2 * window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);
      const active = Boolean(micStream || isListening);
      const t = Date.now() * 0.006;
      for (let i = 0; i < bars; i++) {
        const val = active
          ? 70 + Math.sin(i * 0.35 + t) * 45 + Math.cos(i * 0.7 - t * 1.4) * 35
          : 10;
        const barHeight = Math.max(4, (val / 255) * h * 0.92);
        const x = i * (barWidth + 2 * window.devicePixelRatio);
        const grad = ctx.createLinearGradient(0, h, 0, 0);
        grad.addColorStop(0, "#00f2fe");
        grad.addColorStop(1, "#8b5cf6");
        ctx.fillStyle = active ? grad : "rgba(255,255,255,0.12)";
        ctx.fillRect(x, h - barHeight, barWidth, barHeight);
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [micStream, isListening]);

  const handleToggleMicClick = () => {
    if (micStream) stopMicOnly();
    else openMic();
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {isMicLoading ? <PageLoader /> : null}
      <div className="audio-spectrum-stage">
        <canvas ref={canvasRef} className="cyber-spectrum-canvas" />
        <button
          type="button"
          className={
            micStream || isListening
              ? "mic-action-pill recording"
              : "mic-action-pill"
          }
          onClick={handleToggleMicClick}
          disabled={!isMediaDevicesSupported}
        >
          <span className="mic-live-dot">●</span>
          <span className="mic-status-label">
            {micStream ? "Stop Mic" : "Record Voice"}
          </span>
        </button>
        <div className="haptic-pulse-grid">
          <button
            type="button"
            className="pulse-chip-btn"
            onClick={listenForWord}
            disabled={!isSpeechSupported || isListening}
          >
            Listen for “{MICROPHONE_DEMO_WORD}”
          </button>
          <button
            type="button"
            className="pulse-chip-btn"
            onClick={stopListening}
            disabled={!isListening}
          >
            Stop listening
          </button>
        </div>
        <audio ref={audioRef} className="sr-only-media" />
        {heardText ? (
          <p className="demo-meta">
            Heard: <code>{heardText}</code>
          </p>
        ) : null}
        {wordMatched ? (
          <p className="demo-meta">Matched “{MICROPHONE_DEMO_WORD}”.</p>
        ) : null}
        {micError ? <p className="demo-error">{micError}</p> : null}
      </div>
    </section>
  );
}

export default MicrophoneDemo;
