/**
 * Camera helper via getUserMedia.
 * Frame handling stays in the app: pass a callback to `watch`.
 */

import type { TCameraFrameListener } from "./camera.types";

export const Camera = {
  isSupported(): boolean {
    return !!(
      typeof navigator !== "undefined" &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    );
  },

  async open(constraints: MediaStreamConstraints): Promise<MediaStream> {
    if (!this.isSupported()) {
      throw new Error("Camera API is not supported");
    }
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to open camera");
    }
  },

  openFront(): Promise<MediaStream> {
    return this.open({ video: { facingMode: "user" }, audio: false });
  },

  openBack(): Promise<MediaStream> {
    return this.open({ video: { facingMode: "environment" }, audio: false });
  },

  openDefault(): Promise<MediaStream> {
    return this.open({ video: true, audio: false });
  },

  attachToVideo(video: HTMLVideoElement, stream: MediaStream): void {
    video.srcObject = stream;
    void video.play().catch(() => {
      /* autoplay may be blocked */
    });
  },

  /**
   * Call `onFrame` for each video frame.
   * The callback is the app's action (QR scan, preview, and so on).
   * Returns a function that stops the loop.
   */
  watch(video: HTMLVideoElement, onFrame: TCameraFrameListener): () => void {
    if (typeof window === "undefined") return () => {};

    let stopped = false;
    let frameId = 0;
    const withFrameCallback = video as HTMLVideoElement & {
      requestVideoFrameCallback?: (
        callback: (now: number) => void,
      ) => number;
      cancelVideoFrameCallback?: (handle: number) => void;
    };
    const requestFrame = withFrameCallback.requestVideoFrameCallback;
    const useVideoFrames = typeof requestFrame === "function";

    const pump = (time: number) => {
      if (stopped) return;
      onFrame({ video, time });
      if (useVideoFrames && requestFrame) {
        frameId = requestFrame(pump);
        return;
      }
      frameId = window.requestAnimationFrame(pump);
    };

    if (useVideoFrames && requestFrame) {
      frameId = requestFrame(pump);
    } else {
      frameId = window.requestAnimationFrame(pump);
    }

    return () => {
      stopped = true;
      if (useVideoFrames) {
        withFrameCallback.cancelVideoFrameCallback?.(frameId);
        return;
      }
      window.cancelAnimationFrame(frameId);
    };
  },

  stop(stream: MediaStream | null | undefined): void {
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
  },
};
