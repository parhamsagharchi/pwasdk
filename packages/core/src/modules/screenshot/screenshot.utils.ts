import {
  SCREENSHOT_BRIDGE_GLOBAL,
  SCREENSHOT_BRIDGE_KEY,
  SCREENSHOT_EVENT,
} from "./screenshot.constants";
import type {
  IScreenshotBridge,
  IScreenshotEvent,
  TScreenshotMediaSource,
} from "./screenshot.types";

export function hasWindow(): boolean {
  return typeof window !== "undefined";
}

export function hasNativeBridge(): boolean {
  if (!hasWindow()) return false;
  const win = window as unknown as Record<string, unknown>;
  return win[SCREENSHOT_BRIDGE_KEY] === true;
}

export function createScreenshotEvent(
  partial?: Partial<IScreenshotEvent>,
): IScreenshotEvent {
  return {
    source: partial?.source ?? "unknown",
    at: partial?.at ?? Date.now(),
    detail: partial?.detail,
  };
}

export function dispatchScreenshotEvent(event: IScreenshotEvent): void {
  if (!hasWindow()) return;
  window.dispatchEvent(
    new CustomEvent(SCREENSHOT_EVENT, {
      detail: event,
    }),
  );
}

export function installBridgeObject(
  notify: (detail?: unknown) => void,
): IScreenshotBridge | null {
  if (!hasWindow()) return null;

  const win = window as unknown as Record<string, unknown>;
  win[SCREENSHOT_BRIDGE_KEY] = true;

  const bridge: IScreenshotBridge = {
    notify: (detail?: unknown) => {
      notify(detail);
    },
  };

  win[SCREENSHOT_BRIDGE_GLOBAL] = bridge;
  return bridge;
}

export function drawMediaToCanvas(
  source: TScreenshotMediaSource,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");

  if (source instanceof HTMLVideoElement) {
    const width = source.videoWidth || source.clientWidth;
    const height = source.videoHeight || source.clientHeight;
    if (!width || !height) {
      throw new Error("Video has no drawable dimensions yet");
    }
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas 2d context");
    ctx.drawImage(source, 0, 0, width, height);
    return canvas;
  }

  const htmlCanvas = source as HTMLCanvasElement;
  canvas.width = htmlCanvas.width;
  canvas.height = htmlCanvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas 2d context");
  ctx.drawImage(htmlCanvas, 0, 0);
  return canvas;
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type = "image/png",
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to encode screenshot blob"));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });
}
