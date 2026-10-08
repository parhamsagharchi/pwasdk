import { useEffect, useState } from "react";
import { Screenshot, type IScreenshotEvent } from "@pwasdk/core";

export function useScreenshotDemo() {
  const [lastEvent, setLastEvent] = useState<IScreenshotEvent | null>(null);
  const [notifyResult, setNotifyResult] = useState<string>("");

  useEffect(() => {
    return Screenshot.onDetected((event) => {
      setLastEvent(event);
      setNotifyResult("Your callback ran.");
    });
  }, []);

  const simulateCapture = () => {
    Screenshot.notifyDetected({ source: "manual" });
  };

  return {
    lastEvent,
    notifyResult,
    simulateCapture,
    nativeSupported: Screenshot.isNativeDetectionSupported(),
    notificationSupported: Screenshot.isNotificationSupported(),
    captureSupported: Screenshot.isCaptureSupported(),
  };
}
