/**
 * Camera torch / flashlight via MediaStreamTrack.applyConstraints.
 */

function getVideoTrack(stream: MediaStream): MediaStreamTrack | null {
  return stream.getVideoTracks()[0] ?? null;
}

export const Torch = {
  isSupported(): boolean {
    return !!(
      typeof navigator !== "undefined" &&
      navigator.mediaDevices?.getUserMedia
    );
  },

  /**
   * Open the back camera (torch usually needs environment-facing).
   */
  async open(): Promise<MediaStream> {
    if (!this.isSupported()) {
      throw new Error("Camera / torch is not supported");
    }
    return navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });
  },

  /**
   * Whether this stream's video track advertises torch support.
   */
  canUse(stream: MediaStream): boolean {
    const track = getVideoTrack(stream);
    if (!track) return false;
    const caps = track.getCapabilities?.() as
      | { torch?: boolean }
      | undefined;
    return Boolean(caps && "torch" in caps);
  },

  isOn(stream: MediaStream): boolean {
    const track = getVideoTrack(stream);
    if (!track) return false;
    const settings = track.getSettings?.() as { torch?: boolean } | undefined;
    return Boolean(settings?.torch);
  },

  async setEnabled(stream: MediaStream, enabled: boolean): Promise<boolean> {
    const track = getVideoTrack(stream);
    if (!track) return false;
    if (!this.canUse(stream)) {
      throw new Error("Torch is not available on this camera");
    }
    try {
      await track.applyConstraints({
        advanced: [{ torch: enabled } as MediaTrackConstraintSet],
      });
      return this.isOn(stream) === enabled || enabled;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to toggle torch");
    }
  },

  async toggle(stream: MediaStream): Promise<boolean> {
    const next = !this.isOn(stream);
    await this.setEnabled(stream, next);
    return next;
  },

  stop(stream: MediaStream | null | undefined): void {
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
  },
};
