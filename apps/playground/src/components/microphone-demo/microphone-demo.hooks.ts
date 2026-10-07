import { useRef, useState } from "react";
import { Camera, Microphone } from "@pwasdk/core";

export function useMicrophoneDemo() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [micError, setMicError] = useState("");

  const isMediaDevicesSupported =
    Camera.isSupported() || Microphone.isSupported();

  const stopStream = (
    stream: MediaStream | null,
    setFn: (s: MediaStream | null) => void,
  ) => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setFn(null);
    }
  };

  const openMic = async () => {
    setMicError("");

    if (!Microphone.isSupported()) {
      setMicError("Microphone API is not supported in this browser.");
      return;
    }

    stopStream(micStream, setMicStream);

    try {
      const stream = await Microphone.open();
      setMicStream(stream);

      if (audioRef.current) {
        Microphone.attachToAudio(audioRef.current, stream);
      }
    } catch (e: any) {
      console.error("mic error:", e);
      setMicError(
        e?.message || "Failed to open microphone. Check permissions.",
      );
    }
  };

  const stopMicOnly = () => {
    stopStream(micStream, setMicStream);
    if (audioRef.current) audioRef.current.srcObject = null;
    setMicError("");
  };

  return {
    audioRef,
    micStream,
    micError,
    isMediaDevicesSupported,
    openMic,
    stopMicOnly,
  };
}
