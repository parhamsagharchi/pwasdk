import { useCallback, useEffect, useRef, useState } from "react";
import { Screenshot, type IScreenshotEvent } from "@pwasdk/core";

export interface IScreenshotFeedbackState {
  isListening: boolean;
  isSheetOpen: boolean;
  lastEvent: IScreenshotEvent | null;
  status: string;
  nativeBridge: boolean;
  enableListening: () => void;
  disableListening: () => void;
  simulate: () => void;
  openSheet: () => void;
  closeSheet: () => void;
}

export function useScreenshotFeedback(): IScreenshotFeedbackState {
  const stopRef = useRef<(() => void) | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [lastEvent, setLastEvent] = useState<IScreenshotEvent | null>(null);
  const [status, setStatus] = useState("");
  const [nativeBridge, setNativeBridge] = useState(false);

  const closeSheet = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  const openSheet = useCallback(() => {
    setIsSheetOpen(true);
  }, []);

  const disableListening = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    setIsListening(false);
    setStatus("Stopped listening for screenshots.");
  }, []);

  const enableListening = useCallback(() => {
    if (!Screenshot.isSupported()) {
      setStatus("Screenshot helpers need a browser window.");
      return;
    }

    Screenshot.installBridge();
    setNativeBridge(Screenshot.isNativeDetectionSupported());

    stopRef.current?.();
    stopRef.current = Screenshot.watch({
      autoNotify: false,
      listenKeyboard: true,
      onDetected: (event) => {
        setLastEvent(event);
        setIsSheetOpen(true);
        setStatus(
          event.source === "native"
            ? "The phone OS reported a screenshot."
            : event.source === "keyboard"
              ? "Keyboard screenshot shortcut detected."
              : "Screenshot simulated — this is where your tip sheet opens.",
        );
      },
    });

    setIsListening(true);
    setStatus(
      "Listening for Simulate / PrintScreen. Power+Volume in Chrome will not fire.",
    );
  }, []);

  const simulate = useCallback(() => {
    if (!isListening) {
      enableListening();
    }
    Screenshot.notifyDetected({ source: "manual" });
  }, [enableListening, isListening]);

  useEffect(() => {
    return () => {
      stopRef.current?.();
      stopRef.current = null;
    };
  }, []);

  return {
    isListening,
    isSheetOpen,
    lastEvent,
    status,
    nativeBridge,
    enableListening,
    disableListening,
    simulate,
    openSheet,
    closeSheet,
  };
}
