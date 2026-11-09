/**
 * QR / barcode detection via BarcodeDetector (Chrome/Android).
 */

import type { IQrResult, TQrDetectListener } from "./qr.types";

type TBarcodeDetectorInstance = {
  detect: (source: ImageBitmapSource) => Promise<
    Array<{ rawValue: string; format: string }>
  >;
};

type TBarcodeDetectorCtor = new (options?: {
  formats?: string[];
}) => TBarcodeDetectorInstance;

function getBarcodeDetector(): TBarcodeDetectorCtor | null {
  if (typeof window === "undefined") return null;
  return (
    (window as Window & { BarcodeDetector?: TBarcodeDetectorCtor })
      .BarcodeDetector ?? null
  );
}

export const Qr = {
  isSupported(): boolean {
    return getBarcodeDetector() !== null;
  },

  async detect(source: ImageBitmapSource): Promise<IQrResult[]> {
    const Ctor = getBarcodeDetector();
    if (!Ctor) {
      throw new Error("BarcodeDetector is not supported in this browser");
    }
    const detector = new Ctor({ formats: ["qr_code"] });
    const codes = await detector.detect(source);
    return codes.map((c) => ({
      rawValue: c.rawValue,
      format: c.format,
    }));
  },

  /**
   * Poll a video element for QR codes. Returns a stop function.
   */
  watch(
    video: HTMLVideoElement,
    onDetect: TQrDetectListener,
    options?: { intervalMs?: number },
  ): () => void {
    if (typeof window === "undefined") return () => {};
    const intervalMs = options?.intervalMs ?? 400;
    let stopped = false;
    let timer = 0;
    let busy = false;
    let lastValue = "";

    const tick = () => {
      if (stopped) return;
      timer = window.setTimeout(async () => {
        if (stopped) return;
        if (
          !busy &&
          video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
        ) {
          busy = true;
          try {
            const results = await this.detect(video);
            if (results.length > 0 && results[0].rawValue !== lastValue) {
              lastValue = results[0].rawValue;
              onDetect(results);
            }
          } catch {
            /* frame may be empty */
          } finally {
            busy = false;
          }
        }
        tick();
      }, intervalMs);
    };

    tick();
    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  },
};
