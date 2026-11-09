/**
 * Screen capture via getDisplayMedia.
 */

export const ScreenShare = {
  isSupported(): boolean {
    return !!(
      typeof navigator !== "undefined" &&
      navigator.mediaDevices?.getDisplayMedia
    );
  },

  async start(
    options?: DisplayMediaStreamOptions,
  ): Promise<MediaStream> {
    if (!this.isSupported()) {
      throw new Error("Screen share is not supported");
    }
    try {
      return await navigator.mediaDevices.getDisplayMedia(
        options ?? { video: true, audio: false },
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to start screen share");
    }
  },

  stop(stream: MediaStream | null | undefined): void {
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
  },
};
