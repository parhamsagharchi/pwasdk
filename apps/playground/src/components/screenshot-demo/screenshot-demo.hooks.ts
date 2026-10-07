import { useEffect, useState } from "react";
import { Screenshot, type IScreenshotEvent } from "@pwasdk/core";

export function useScreenshotDemo() {
  const [lastEvent, setLastEvent] = useState<IScreenshotEvent | null>(null);
  const [notifyResult, setNotifyResult] = useState<string>("");

  useEffect(() => {
    return Screenshot.onDetected((event) => {
      setLastEvent(event);
    });
  }, []);

  const simulateCapture = async () => {
    setNotifyResult("");
    Screenshot.notifyDetected({ source: "manual" });
    const ok = await Screenshot.showNotification({
      title: "Screenshot detected",
      body: "Demo: a screenshot event was reported to the app.",
    });
    setNotifyResult(
      ok
        ? "Notification shown (or queued via service worker)."
        : "Notification blocked or unsupported — check browser permission.",
    );
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
