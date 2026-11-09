import { useEffect, useRef, useState } from "react";
import { MediaSession } from "@pwasdk/core";
import {
  DEMO_BUTTON_CLASS,
  DEMO_SECTION_CLASS,
} from "../../constants/demo.constants";

function MediaSessionDemo() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [lastAction, setLastAction] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!MediaSession.isSupported()) return;

    MediaSession.setMetadata({
      title: "Night Drive",
      artist: "PWA SDK Demo",
      album: "@pwasdk/core",
    });

    MediaSession.setActionHandler("play", () => {
      void audioRef.current?.play();
      setLastAction("play");
      MediaSession.setPlaybackState("playing");
    });
    MediaSession.setActionHandler("pause", () => {
      audioRef.current?.pause();
      setLastAction("pause");
      MediaSession.setPlaybackState("paused");
    });
    MediaSession.setActionHandler("stop", () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setLastAction("stop");
      MediaSession.setPlaybackState("none");
    });

    return () => {
      MediaSession.clear();
    };
  }, []);

  const handlePlayClick = () => {
    void (async () => {
      try {
        await audioRef.current?.play();
        MediaSession.setPlaybackState("playing");
        setPlaying(true);
        setStatus("Playing — check lock screen / notification controls.");
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        setStatus(message || "Could not play audio.");
      }
    })();
  };

  const handlePauseClick = () => {
    audioRef.current?.pause();
    MediaSession.setPlaybackState("paused");
    setPlaying(false);
    setStatus("Paused.");
  };

  return (
    <section className={DEMO_SECTION_CLASS}>
      {!MediaSession.isSupported() ? (
        <div className="demo-callout">
          Media Session is not available in this browser.
        </div>
      ) : (
        <p className="demo-meta">
          Set “Now playing” metadata and lock-screen controls — like Spotify or
          Telegram voice.
        </p>
      )}
      <audio
        ref={audioRef}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="demo-actions-row">
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handlePlayClick}
          disabled={!MediaSession.isSupported()}
        >
          Play demo track
        </button>
        <button
          type="button"
          className={DEMO_BUTTON_CLASS}
          onClick={handlePauseClick}
          disabled={!MediaSession.isSupported() || !playing}
        >
          Pause
        </button>
      </div>
      <div className="demo-meta demo-meta-spaced">
        <p>Works here: {MediaSession.isSupported() ? "Yes" : "No"}</p>
        <p>Playing: {playing ? "Yes" : "No"}</p>
        {lastAction ? <p>Last lock-screen action: {lastAction}</p> : null}
        {status ? <p>{status}</p> : null}
      </div>
    </section>
  );
}

export default MediaSessionDemo;
