/**
 * Push Notifications helper.
 *
 * A VAPID public key must be provided by the consuming app.
 * Never ship a shared production key inside the library.
 */

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function isSecureContext(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.isSecureContext ||
    window.location.protocol === "https:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
}

export const Push = {
  isSupported(): boolean {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return false;
    }
    return (
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window &&
      isSecureContext()
    );
  },

  async register(
    swPath = "/sw.js"
  ): Promise<ServiceWorkerRegistration | null> {
    if (!this.isSupported()) return null;

    try {
      const reg = await navigator.serviceWorker.register(swPath);
      await navigator.serviceWorker.ready;
      return reg;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to register service worker: ${message}`);
    }
  },

  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      throw new Error("Push notifications are not supported");
    }

    if (Notification.permission === "granted") return "granted";
    if (Notification.permission === "denied") return "denied";

    return Notification.requestPermission();
  },

  /**
   * Subscribe to push notifications.
   * @param vapidPublicKey Required VAPID public key (base64 URL-safe).
   */
  async subscribe(vapidPublicKey: string): Promise<PushSubscription | null> {
    if (!this.isSupported()) {
      throw new Error("Push notifications are not supported");
    }
    if (!vapidPublicKey) {
      throw new Error(
        "A VAPID public key is required. Generate one for your project and pass it to Push.subscribe(vapidPublicKey)."
      );
    }

    try {
      const reg = await navigator.serviceWorker.ready;
      const existing = await reg.pushManager.getSubscription();
      if (existing) return existing;

      let applicationServerKey: BufferSource;
      try {
        applicationServerKey = urlBase64ToUint8Array(
          vapidPublicKey
        ) as unknown as BufferSource;
      } catch {
        throw new Error(
          "Invalid VAPID public key format. It must be a base64 URL-safe string."
        );
      }

      return await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.message.startsWith("Invalid VAPID")) {
        throw error;
      }
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        throw new Error(
          "Push subscription was blocked. Make sure notification permission is granted."
        );
      }
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to subscribe: ${message}`);
    }
  },
};
