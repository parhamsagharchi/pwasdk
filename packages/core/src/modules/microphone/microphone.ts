/**
 * Microphone helper via getUserMedia.
 */
export const Microphone = {
  isSupported(): boolean {
    return !!(
      typeof navigator !== "undefined" &&
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia
    );
  },

  async open(
    audioConstraints: MediaTrackConstraints = {}
  ): Promise<MediaStream> {
    if (!this.isSupported()) {
      throw new Error("Microphone API is not supported");
    }
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio: audioConstraints,
        video: false,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(message || "Failed to open microphone");
    }
  },

  attachToAudio(audio: HTMLAudioElement, stream: MediaStream): void {
    audio.srcObject = stream;
    void audio.play().catch(() => {
      /* autoplay may be blocked */
    });
  },

  stop(stream: MediaStream | null | undefined): void {
    if (!stream) return;
    stream.getTracks().forEach((t) => t.stop());
  },
};
