import { useEffect, useState } from "react";
import {
  Clipboard,
  Device,
  Haptic,
  Install,
  Orientation,
  Push,
} from "@pwasdk/core";

export function useDemoBootstrap() {
  const [online, setOnline] = useState(Device.online);
  const [debugInfo, setDebugInfo] = useState("");
  const [protocol, setProtocol] = useState(window.location.protocol);
  const [orientation, setOrientation] = useState<string | null>(null);

  useEffect(() => {
    Install.init();
    const unsubscribe = Device.onOnlineStatusChange((isOnline) => {
      setOnline(isOnline);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!Orientation.isSupported()) return;
    setOrientation(Orientation.current());
    const unsubscribe = Orientation.onChange((o) => setOrientation(o));
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log("App mounted, checking features...");

    const isHTTPS = window.location.protocol === "https:";
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    const warnings: string[] = [];

    if (!isHTTPS && !isLocalhost) {
      warnings.push(
        "⚠️ HTTPS required for many PWA features! Use https:// instead of http://",
      );
    }

    if (!Haptic.isSupported()) {
      warnings.push(
        "📳 Haptic not supported - Make sure you're on a mobile device",
      );
    }

    if (!Clipboard.isSupported()) {
      warnings.push("📋 Clipboard requires HTTPS (except localhost)");
    }

    if (!Push.isSupported()) {
      warnings.push("🔔 Push notifications require HTTPS");
    }

    setDebugInfo(warnings.join("\n"));
    setProtocol(window.location.protocol);
    console.log("Protocol:", window.location.protocol);
    console.log("Hostname:", window.location.hostname);
  }, []);

  return { online, debugInfo, protocol, orientation };
}
