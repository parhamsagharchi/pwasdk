import { useCallback, useEffect, useRef, useState } from "react";
import { Shake, type IShakeEvent } from "@pwasdk/core";

export interface IShakeFeedbackState {
  isSupported: boolean;
  needsPermission: boolean;
  isListening: boolean;
  isSheetOpen: boolean;
  lastShake: IShakeEvent | null;
  status: string;
  enableListening: () => Promise<void>;
  disableListening: () => void;
  openSheet: () => void;
  closeSheet: () => void;
}

export function useShakeFeedback(): IShakeFeedbackState {
  const stopRef = useRef<(() => void) | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [lastShake, setLastShake] = useState<IShakeEvent | null>(null);
  const [status, setStatus] = useState("");

  const isSupported = Shake.isSupported();
  const needsPermission = Shake.needsPermission();

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
    setStatus("Shake listening stopped.");
  }, []);

  const enableListening = useCallback(async () => {
    if (!Shake.isSupported()) {
      setStatus("DeviceMotion is not available in this browser.");
      return;
    }

    try {
      const permission = await Shake.requestPermission();
      if (permission === "denied") {
        setStatus("Motion permission denied. Enable it in Safari settings.");
        return;
      }
      if (permission === "unsupported") {
        setStatus("Shake is not supported here.");
        return;
      }

      stopRef.current?.();
      stopRef.current = Shake.watch((event) => {
        setLastShake(event);
        setIsSheetOpen(true);
        setStatus(`Shake detected · magnitude ${event.magnitude.toFixed(1)}`);
      });
      setIsListening(true);
      setStatus("Listening. Shake your phone to open the sheet.");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(message || "Failed to enable shake listening.");
    }
  }, []);

  useEffect(() => {
    return () => {
      stopRef.current?.();
      stopRef.current = null;
    };
  }, []);

  return {
    isSupported,
    needsPermission,
    isListening,
    isSheetOpen,
    lastShake,
    status,
    enableListening,
    disableListening,
    openSheet,
    closeSheet,
  };
}
