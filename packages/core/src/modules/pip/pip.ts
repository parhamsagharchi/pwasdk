/**
 * Picture-in-Picture for HTMLVideoElement.
 */

export const Pip = {
  isSupported(): boolean {
    if (typeof document === "undefined") return false;
    return "pictureInPictureEnabled" in document && document.pictureInPictureEnabled;
  },

  isActive(): boolean {
    if (typeof document === "undefined") return false;
    return Boolean(document.pictureInPictureElement);
  },

  async enter(video: HTMLVideoElement): Promise<boolean> {
    if (!this.isSupported()) {
      throw new Error("Picture-in-Picture is not supported");
    }
    try {
      if (document.pictureInPictureElement === video) return true;
      await video.requestPictureInPicture();
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to enter Picture-in-Picture");
    }
  },

  async exit(): Promise<boolean> {
    if (!this.isSupported()) return false;
    if (!document.pictureInPictureElement) return false;
    try {
      await document.exitPictureInPicture();
      return true;
    } catch {
      return false;
    }
  },

  onChange(listener: (active: boolean) => void): () => void {
    if (typeof document === "undefined") return () => {};
    const handler = () => listener(this.isActive());
    document.addEventListener("enterpictureinpicture", handler);
    document.addEventListener("leavepictureinpicture", handler);
    return () => {
      document.removeEventListener("enterpictureinpicture", handler);
      document.removeEventListener("leavepictureinpicture", handler);
    };
  },
};
