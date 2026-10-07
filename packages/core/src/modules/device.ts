import type { NetworkInformation, OrientationType } from "../types";

/**
 * Device information and capabilities.
 */
export const Device = {
  get userAgent(): string {
    return typeof navigator !== "undefined" ? navigator.userAgent : "";
  },

  get isMobile(): boolean {
    return /Android|iPhone|iPad/i.test(this.userAgent);
  },

  get online(): boolean {
    return typeof navigator !== "undefined" ? navigator.onLine : false;
  },

  get platform(): string {
    return typeof navigator !== "undefined" ? navigator.platform : "";
  },

  get connection(): NetworkInformation | null {
    if (typeof navigator === "undefined") return null;
    const nav = navigator as Navigator & {
      connection?: NetworkInformation;
      mozConnection?: NetworkInformation;
      webkitConnection?: NetworkInformation;
    };
    return nav.connection || nav.mozConnection || nav.webkitConnection || null;
  },

  get orientation(): OrientationType | null {
    if (typeof screen === "undefined") return null;
    if ("orientation" in screen) {
      return (
        (screen as Screen & { orientation?: { type?: OrientationType } })
          .orientation?.type || null
      );
    }
    return null;
  },

  onOnlineStatusChange(callback: (online: boolean) => void): () => void {
    if (typeof window === "undefined") return () => {};

    const handleOnline = () => callback(true);
    const handleOffline = () => callback(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  },
};
