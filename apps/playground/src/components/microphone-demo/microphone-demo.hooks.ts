import { useRef, useState } from "react";
import { Camera, Microphone } from "@pwasdk/core";
import { MICROPHONE_DEMO_WORD } from "./microphone-demo.constants";

export function useMicrophoneDemo() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopListenRef = useRef<(() => void) | null>(null);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [micError, setMicError] = useState("");
  const [isMicLoading, setIsMicLoading] = useState(false);
  const [heardText, setHeardText] = useState("");
  const [wordMatched, setWordMatched] = useState(false);
  const [isListening, setIsListening] = useState(false);

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
    setIsMicLoading(true);

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
    } finally {
      setIsMicLoading(false);
    }
  };

  const stopListening = () => {
    stopListenRef.current?.();
    stopListenRef.current = null;
    setIsListening(false);
  };

  const listenForWord = () => {
    setMicError("");
    if (!Microphone.isSpeechSupported()) {
      setMicError("Speech recognition is not supported in this browser.");
      return;
    }

    stopListening();
    setHeardText("");
    setWordMatched(false);

    try {
      stopListenRef.current = Microphone.listen((result) => {
        setHeardText(result.text);
        if (result.text.toLowerCase().includes(MICROPHONE_DEMO_WORD)) {
          setWordMatched(true);
        }
      });
      setIsListening(true);
    } catch (e: any) {
      setMicError(e?.message || "Failed to listen.");
    }
  };

  const stopMicOnly = () => {
    stopListening();
    stopStream(micStream, setMicStream);
    if (audioRef.current) audioRef.current.srcObject = null;
    setMicError("");
  };

  return {
    audioRef,
    micStream,
    micError,
    isMicLoading,
    isListening,
    heardText,
    wordMatched,
    isMediaDevicesSupported,
    isSpeechSupported: Microphone.isSpeechSupported(),
    openMic,
    stopMicOnly,
    listenForWord,
    stopListening,
  };
}
