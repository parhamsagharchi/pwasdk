import { useEffect, useRef, useState } from "react";
import { Camera, Microphone } from "@pwasdk/core";
import { MICROPHONE_DEMO_WORD } from "./microphone-demo.constants";

export function useMicrophoneDemo() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stopListenRef = useRef<(() => void) | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [micError, setMicError] = useState("");
  const [isMicLoading, setIsMicLoading] = useState(false);
  const [heardText, setHeardText] = useState("");
  const [wordMatched, setWordMatched] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const isMediaDevicesSupported =
    Camera.isSupported() || Microphone.isSupported();

  const stopListening = () => {
    stopListenRef.current?.();
    stopListenRef.current = null;
    setIsListening(false);
  };

  const stopMicOnly = () => {
    stopListening();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setMicStream(null);
    if (audioRef.current) audioRef.current.srcObject = null;
    setMicError("");
  };

  const openMic = async () => {
    setMicError("");

    if (!Microphone.isSupported()) {
      setMicError("Microphone is not available in this browser.");
      return;
    }

    stopMicOnly();
    setIsMicLoading(true);

    try {
      const stream = await Microphone.open();
      streamRef.current = stream;
      setMicStream(stream);

      if (audioRef.current) {
        Microphone.attachToAudio(audioRef.current, stream);
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setMicError(message || "Could not open the mic. Check permission.");
    } finally {
      setIsMicLoading(false);
    }
  };

  const listenForWord = () => {
    setMicError("");
    if (!Microphone.isSpeechSupported()) {
      setMicError("Speech-to-text is not available in this browser.");
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
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setMicError(message || "Could not start speech listen.");
    }
  };

  useEffect(() => {
    return () => {
      stopListening();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

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
