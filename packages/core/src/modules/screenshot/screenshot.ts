/**
 * Screenshot helpers.
 *
 * Browsers do not expose an OS-level "user took a screenshot" API.
 * Detection works when a native WebView/host reports events via
 * `Screenshot.notifyDetected()` or the `pwasdk:screenshot` DOM event.
 *
 * Also provides:
 * - in-app Notification helper for reacting to captures
 * - capturing a frame from canvas / video into a PNG blob
 */

import { SCREENSHOT_EVENT } from "./screenshot.constants";
import type {
  IScreenshotEvent,
  IScreenshotNotifyOptions,
  TScreenshotListener,
  TScreenshotMediaSource,
} from "./screenshot.types";
import {
  canvasToBlob,
  createScreenshotEvent,
  dispatchScreenshotEvent,
  drawMediaToCanvas,
  hasNativeBridge,
  hasWindow,
} from "./screenshot.utils";

export const Screenshot = {
  /**
   * Whether screenshot helpers can run in this environment
   * (event bus + optional Notification / canvas capture).
   */
  isSupported(): boolean {
    return hasWindow();
  },

  /**
   * Whether a native host has advertised OS screenshot detection.
   * Pure browsers almost always return `false`.
   */
  isNativeDetectionSupported(): boolean {
    return hasNativeBridge();
  },

  isNotificationSupported(): boolean {
    return hasWindow() && "Notification" in window;
  },

  isCaptureSupported(): boolean {
    return (
      hasWindow() &&
      typeof document !== "undefined" &&
      typeof HTMLCanvasElement !== "undefined" &&
      typeof HTMLCanvasElement.prototype.toBlob === "function"
    );
  },

  /**
   * Subscribe to screenshot detection events.
   * Fires when `notifyDetected()` is called or a host dispatches
   * the `pwasdk:screenshot` event.
   */
  onDetected(callback: TScreenshotListener): () => void {
    if (!this.isSupported()) return () => {};

    const handler = (event: Event) => {
      const custom = event as CustomEvent<IScreenshotEvent>;
      const detail = custom.detail;
      callback(
        createScreenshotEvent({
          source: detail?.source,
          at: detail?.at,
          detail: detail?.detail ?? detail,
        }),
      );
    };

    window.addEventListener(SCREENSHOT_EVENT, handler);
    return () => window.removeEventListener(SCREENSHOT_EVENT, handler);
  },

  /**
   * Report a screenshot capture.
   * Native WebView / host apps should call this when the OS signals a screenshot.
   * Useful in demos to simulate detection.
   */
  notifyDetected(partial?: Partial<IScreenshotEvent>): void {
    if (!this.isSupported()) return;
    dispatchScreenshotEvent(createScreenshotEvent(partial));
  },

  /**
   * Show a user-visible notification about a screenshot.
   * Soft-fails when permission is missing or API unsupported.
   */
  async showNotification(
    options: IScreenshotNotifyOptions = {},
  ): Promise<boolean> {
    if (!this.isNotificationSupported()) return false;

    try {
      let permission = Notification.permission;
      if (permission === "default") {
        permission = await Notification.requestPermission();
      }
      if (permission !== "granted") return false;

      const registration =
        "serviceWorker" in navigator
          ? await navigator.serviceWorker.ready.catch(() => null)
          : null;

      const title = options.title ?? "Screenshot detected";
      const body =
        options.body ??
        "A screenshot of this screen was captured on your device.";
      const tag = options.tag ?? "pwasdk-screenshot";

      if (registration?.showNotification) {
        await registration.showNotification(title, { body, tag });
      } else {
        // Instant notification (may be less reliable on mobile)
        new Notification(title, { body, tag });
      }
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Capture a PNG blob from a canvas or video element.
   * Does not capture arbitrary DOM without an extra library.
   */
  async captureFromMedia(
    source: TScreenshotMediaSource,
    type = "image/png",
    quality?: number,
  ): Promise<Blob> {
    if (!this.isCaptureSupported()) {
      throw new Error("Screenshot capture is not supported");
    }
    try {
      if (
        typeof OffscreenCanvas !== "undefined" &&
        source instanceof OffscreenCanvas
      ) {
        return await source.convertToBlob({ type, quality });
      }
      const canvas = drawMediaToCanvas(source);
      return await canvasToBlob(canvas, type, quality);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to capture screenshot");
    }
  },
};
