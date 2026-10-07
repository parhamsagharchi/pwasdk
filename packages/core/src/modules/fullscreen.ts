/**
 * Fullscreen API helper (with vendor-prefixed fallbacks).
 */

type FullscreenDocument = Document & {
  webkitFullscreenEnabled?: boolean;
  mozFullScreenEnabled?: boolean;
  msFullscreenEnabled?: boolean;
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  mozCancelFullScreen?: () => Promise<void> | void;
  msExitFullscreen?: () => Promise<void> | void;
};

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  mozRequestFullScreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};

export const Fullscreen = {
  isSupported(): boolean {
    if (typeof document === "undefined") return false;
    const d = document as FullscreenDocument;
    return !!(
      d.fullscreenEnabled ||
      d.webkitFullscreenEnabled ||
      d.mozFullScreenEnabled ||
      d.msFullscreenEnabled
    );
  },

  isFullscreen(): boolean {
    if (typeof document === "undefined") return false;
    const d = document as FullscreenDocument;
    return !!(
      d.fullscreenElement ||
      d.webkitFullscreenElement ||
      d.mozFullScreenElement ||
      d.msFullscreenElement
    );
  },

  async enter(element?: HTMLElement | null): Promise<boolean> {
    if (!this.isSupported()) {
      throw new Error("Fullscreen API is not supported");
    }

    const el = (element || document.documentElement) as FullscreenElement;

    try {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) await el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) await el.msRequestFullscreen();
      else throw new Error("Fullscreen not supported on this element");
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to enter fullscreen");
    }
  },

  async exit(): Promise<boolean> {
    const d = document as FullscreenDocument;
    if (!this.isFullscreen()) return false;

    try {
      if (d.exitFullscreen) await d.exitFullscreen();
      else if (d.webkitExitFullscreen) await d.webkitExitFullscreen();
      else if (d.mozCancelFullScreen) await d.mozCancelFullScreen();
      else if (d.msExitFullscreen) await d.msExitFullscreen();
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to exit fullscreen");
    }
  },

  async toggle(element?: HTMLElement | null): Promise<boolean> {
    if (this.isFullscreen()) return this.exit();
    return this.enter(element || undefined);
  },
};
