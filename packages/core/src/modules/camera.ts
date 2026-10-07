/**
 * Camera helper via getUserMedia.
 */
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

  stop(stream: MediaStream | null | undefined): void {
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
  },
};
