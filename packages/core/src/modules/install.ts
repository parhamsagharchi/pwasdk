/**
 * PWA install prompt helper.
 *
 * Call `Install.init()` early (e.g. app bootstrap) so the
 * `beforeinstallprompt` event can be captured.
 */

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let listenersAttached = false;

function attachListeners(): void {
  if (listenersAttached || typeof window === "undefined") return;
  listenersAttached = true;

  window.addEventListener("beforeinstallprompt", (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
  });
}

export const Install = {
  /**
   * Start listening for install prompt events.
   * Safe to call multiple times.
   */
  init(): void {
    attachListeners();
  },

  isSupported(): boolean {
    if (typeof window === "undefined") return false;
    return (
      "serviceWorker" in navigator &&
      ("BeforeInstallPromptEvent" in window ||
        window.matchMedia("(display-mode: standalone)").matches)
    );
  },

  isInstalled(): boolean {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true ||
      document.referrer.includes("android-app://")
    );
  },

  /**
   * Show the native install prompt if one was captured.
   * @returns whether the user accepted the install.
   */
  async prompt(): Promise<boolean> {
    attachListeners();

    if (this.isInstalled()) return false;

    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      return outcome === "accepted";
    } catch {
      deferredPrompt = null;
      return false;
    }
  },

  /** Whether a deferred install prompt is currently available. */
  canPrompt(): boolean {
    return deferredPrompt !== null;
  },
};
