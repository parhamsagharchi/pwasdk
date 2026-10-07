/**
 * PWA environment helpers (standalone mode, platform, install hints).
 */

import type { TPwaPlatform } from "./pwa.types";
import { getUA } from "./pwa.utils";

export const Pwa = {
  isStandalone(): boolean {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true ||
      document.referrer.includes("android-app://")
    );
  },

  platform(): TPwaPlatform {
    const ua = getUA();
    if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
    if (/Android/i.test(ua)) return "android";
    if (/Macintosh|Windows|Linux/i.test(ua)) return "desktop";
    return "unknown";
  },

  isInstallPromptSupported(): boolean {
    return typeof window !== "undefined" && "BeforeInstallPromptEvent" in window;
  },

  getIOSInstallInstructions(): string {
    return [
      "1. Open this page in Safari on iPhone/iPad.",
      "2. Tap the Share button (square with arrow).",
      "3. Choose 'Add to Home Screen'.",
      "4. Confirm the name and tap 'Add'.",
    ].join("\n");
  },
};
