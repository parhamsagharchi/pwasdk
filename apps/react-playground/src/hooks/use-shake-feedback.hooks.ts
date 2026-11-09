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
    setStatus("Stopped listening for shake.");
  }, []);

  const enableListening = useCallback(async () => {
    if (!Shake.isSupported()) {
      setStatus("This browser can’t detect phone shake.");
      return;
    }

    try {
      const permission = await Shake.requestPermission();
      if (permission === "denied") {
        setStatus(
          "Motion access was denied. Allow motion in Safari settings, then try again.",
        );
        return;
      }
      if (permission === "unsupported") {
        setStatus("Shake is not available on this device.");
        return;
      }

      stopRef.current?.();
      stopRef.current = Shake.watch((event) => {
        setLastShake(event);
        setIsSheetOpen(true);
        setStatus(
          `Shake detected (strength ${event.magnitude.toFixed(1)}).`,
        );
      });
      setIsListening(true);
      setStatus("Listening — shake your phone to open the report sheet.");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setStatus(message || "Could not start shake listening.");
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
