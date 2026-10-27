import { useEffect, useState } from "react";
import { Screenshot, type IScreenshotEvent } from "@pwasdk/core";

export function useScreenshotDemo() {
  const [lastEvent, setLastEvent] = useState<IScreenshotEvent | null>(null);
  const [notifyResult, setNotifyResult] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [permission, setPermission] = useState<string>(() =>
    Screenshot.isNotificationSupported() ? Notification.permission : "unsupported",
  );

  useEffect(() => {
    Screenshot.installBridge();
    let hideToastTimer: number | undefined;

    const stopWatch = Screenshot.watch({
      autoNotify: true,
      notification: {
        title: "Screenshot detected",
        body: "You took a screenshot of this page.",
      },
      onDetected: (event) => {
        setLastEvent(event);
        setNotifyResult(
          event.source === "native"
            ? "Native bridge reported a screenshot — notification sent if allowed."
            : "Detection fired — notification sent if permission is granted.",
        );
        setToastVisible(true);
        window.clearTimeout(hideToastTimer);
        hideToastTimer = window.setTimeout(() => {
          setToastVisible(false);
        }, 3500);
      },
    });

    return () => {
      stopWatch();
      window.clearTimeout(hideToastTimer);
    };
  }, []);

  const handleEnableNotificationsClick = () => {
    void (async () => {
      const next = await Screenshot.requestPermission();
      setPermission(next);
      if (next === "granted") {
        setNotifyResult("Notifications enabled. Try reporting a screenshot.");
      } else if (next === "denied") {
        setNotifyResult("Notification permission denied in browser settings.");
      } else {
        setNotifyResult("Notifications are not supported here.");
      }
    })();
  };

  const handleSimulateCaptureClick = () => {
    Screenshot.notifyDetected({ source: "manual" });
  };

  return {
    lastEvent,
    notifyResult,
    toastVisible,
    permission,
    handleEnableNotificationsClick,
    handleSimulateCaptureClick,
    nativeSupported: Screenshot.isNativeDetectionSupported(),
    notificationSupported: Screenshot.isNotificationSupported(),
    captureSupported: Screenshot.isCaptureSupported(),
  };
}
